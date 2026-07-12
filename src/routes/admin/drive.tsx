import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useEffect, useState, useRef } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth, storage } from '@/lib/firebase'
import { ref, uploadBytesResumable, getDownloadURL, listAll, deleteObject, getMetadata, updateMetadata } from 'firebase/storage'
import { FileImage, LayoutGrid, List, MoreVertical, Search, Settings, User, FileText, FileArchive, FileAudio, FileVideo, File, ChevronDown, FolderPlus, Info, Home, HardDrive, Share2, Clock, Star, Trash, Cloud, PanelLeftClose, PanelLeftOpen, CheckSquare, Square, Download, Link as LinkIcon, X, Trash2, EyeOff, Eye, LogOut, Users } from 'lucide-react'
import { ThemeToggle } from '@/components/site/ThemeToggle'
import { NotificationsDropdown } from '@/components/admin/NotificationsDropdown'
import { logActivity } from '@/lib/activity'

function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

const getFileIcon = (type: string, size: number, className = "") => {
  if (type.startsWith('image/')) return <FileImage size={size} className={className} />
  if (type.startsWith('video/')) return <FileVideo size={size} className={className} />
  if (type.startsWith('audio/')) return <FileAudio size={size} className={className} />
  if (type.includes('pdf') || type.includes('document') || type.includes('text')) return <FileText size={size} className={className} />
  if (type.includes('zip') || type.includes('tar') || type.includes('compressed')) return <FileArchive size={size} className={className} />
  if (type.includes('apk') || type.includes('android')) return <FileArchive size={size} className={className} />
  return <File size={size} className={className} />
}

export const Route = createFileRoute('/admin/drive')({
  component: CloudDrive,
})

function CloudDrive() {
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const [images, setImages] = useState<{name: string, url: string, size: string, date: string, type: string, bytes: number, rawDate: number, owner: string, source: string, hidden: boolean}[]>([])
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list')
  const [filterType, setFilterType] = useState('Type')
  const [filterModified, setFilterModified] = useState('Modified')
  const [filterPeople, setFilterPeople] = useState('People')
  const [filterSource, setFilterSource] = useState('Source')
  const [openMenuIndex, setOpenMenuIndex] = useState<string | null>(null)
  
  const [activeSection, setActiveSection] = useState('all')
  const [isInfoOpen, setIsInfoOpen] = useState(false)
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true)
  
  // Dropdown states
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const [showPasswordPrompt, setShowPasswordPrompt] = useState<'upload' | 'delete' | 'hide' | null>(null)
  const [passwordInput, setPasswordInput] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [pendingUploadFiles, setPendingUploadFiles] = useState<File[]>([])
  const [pendingDeleteNames, setPendingDeleteNames] = useState<string[]>([])
  const [pendingHideNames, setPendingHideNames] = useState<string[]>([])
  
  const [selectedFiles, setSelectedFiles] = useState<string[]>([])
  const [filterVisibility, setFilterVisibility] = useState('Visible')
  
  const ADMIN_PASSWORD = "admin123"

  const handlePasswordSubmit = () => {
    if (passwordInput !== ADMIN_PASSWORD) {
      setPasswordError("Incorrect password")
      return
    }
    
    setPasswordError('')
    setPasswordInput('')
    
    if (showPasswordPrompt === 'upload' && pendingUploadFiles.length > 0) {
      setShowPasswordPrompt(null)
      executeUpload(pendingUploadFiles)
    } else if (showPasswordPrompt === 'delete' && pendingDeleteNames.length > 0) {
      setShowPasswordPrompt(null)
      executeMassDelete(pendingDeleteNames)
    } else if (showPasswordPrompt === 'hide' && pendingHideNames.length > 0) {
      setShowPasswordPrompt(null)
      executeMassHide(pendingHideNames)
    }
  }

  useEffect(() => {
    // TEMPORARY BYPASS
    const isTempAuth = localStorage.getItem('temp_admin_auth')
    if (isTempAuth) {
      setLoading(false)
      fetchImages()
      return
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) navigate({ to: '/login' })
      else {
        setLoading(false)
        fetchImages()
      }
    })
    return () => unsubscribe()
  }, [navigate])

  const fetchImages = async () => {
    try {
      const listRef = ref(storage, 'uploads/')
      const res = await listAll(listRef)
      const urls = await Promise.all(res.items.map(async (itemRef) => {
        const url = await getDownloadURL(itemRef)
        const meta = await getMetadata(itemRef)
        
        const bytes = meta.size || 0
        const size = meta.size ? formatBytes(meta.size) : 'Unknown'
        const rawDate = meta.timeCreated ? new Date(meta.timeCreated).getTime() : Date.now()
        const date = meta.timeCreated ? new Date(meta.timeCreated).toLocaleDateString() : 'Just now'
        const type = meta.contentType || 'unknown'
        const owner = 'Me'
        const source = 'Web'
        const hidden = meta.customMetadata?.hidden === 'true'
        
        return { name: itemRef.name, url, size, date, type, bytes, rawDate, owner, source, hidden }
      }))
      urls.sort((a, b) => b.rawDate - a.rawDate)
      setImages(urls)
    } catch (err) {
      console.error(err)
    }
  }


  const handleUploadClick = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '*/*'
    input.multiple = true
    input.onchange = (e: any) => {
      const files = Array.from(e.target.files) as File[]
      if (files.length > 0) {
        setPendingUploadFiles(files)
        setShowPasswordPrompt('upload')
      }
    }
    input.click()
  }

  const executeUpload = async (files: File[]) => {
    const isTempAuth = localStorage.getItem('temp_admin_auth')
    
    if (isTempAuth) {
      setUploading(true)
      
      const newFiles = files.map(file => {
        const fakeUrl = URL.createObjectURL(file)
        return {
          name: file.name,
          url: fakeUrl,
          size: formatBytes(file.size),
          date: new Date().toLocaleDateString(),
          type: file.type || 'unknown',
          bytes: file.size,
          rawDate: Date.now(),
          owner: 'Me',
          source: 'Web',
          hidden: false
        }
      })
      
      setImages(prev => [...newFiles, ...prev])
      setUploading(false)
      setPendingUploadFiles([])
      return
    }

    setUploading(true)
    let completedCount = 0

    try {
      await Promise.all(files.map(async (file) => {
        const fileRef = ref(storage, `uploads/${file.name}`)
        const uploadTask = uploadBytesResumable(fileRef, file)
        
        return new Promise((resolve, reject) => {
          uploadTask.on('state_changed', 
            (snapshot) => {
              // We'll just show an indeterminate progress or let it bounce since multiple are uploading
              const p = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              setProgress(p)
            },
            (error) => {
              console.error(error)
              reject(error)
            },
            () => {
              completedCount++
              resolve(true)
            }
          )
        })
      }))
      
      if (completedCount > 0) {
        logActivity(auth.currentUser?.email || 'Admin', `Uploaded ${completedCount} file(s) to Cloud Drive`, 'drive').catch(console.error)
      }
      
      fetchImages()
      setUploading(false)
      setProgress(0)
      setPendingUploadFiles([])
    } catch(error) {
      console.error(error)
      setUploading(false)
      setPendingUploadFiles([])
    }
  }

  const handleDeleteClick = (name: string) => {
    setPendingDeleteNames([name])
    setShowPasswordPrompt('delete')
    setOpenMenuIndex(null)
  }

  const executeMassDelete = async (names: string[]) => {
    const isTempAuth = localStorage.getItem('temp_admin_auth')
    if (isTempAuth) {
      setImages(prev => prev.filter(img => !names.includes(img.name)))
      setSelectedFiles([])
      setPendingDeleteNames([])
      return
    }

    try {
      await Promise.all(names.map(name => deleteObject(ref(storage, `uploads/${name}`))))
      logActivity(auth.currentUser?.email || 'Admin', `Deleted ${names.length} file(s) from Cloud Drive`, 'drive').catch(console.error)
      fetchImages()
      setSelectedFiles([])
      setPendingDeleteNames([])
    } catch(err) {
      console.error(err)
    }
  }

  const executeMassHide = async (names: string[]) => {
    const isTempAuth = localStorage.getItem('temp_admin_auth')
    if (isTempAuth) {
      setImages(prev => prev.map(img => names.includes(img.name) ? { ...img, hidden: !img.hidden } : img))
      setSelectedFiles([])
      setPendingHideNames([])
      return
    }

    try {
      await Promise.all(names.map(async (name) => {
        const fileRef = ref(storage, `uploads/${name}`)
        const meta = await getMetadata(fileRef)
        const currentlyHidden = meta.customMetadata?.hidden === 'true'
        await updateMetadata(fileRef, { customMetadata: { hidden: currentlyHidden ? 'false' : 'true' } })
      }))
      fetchImages()
      setSelectedFiles([])
      setPendingHideNames([])
    } catch(err) {
      console.error(err)
    }
  }

  const toggleSelection = (name: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedFiles(prev => prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name])
  }

  const handleMassCopy = () => {
    const urls = selectedFiles.map(name => images.find(img => img.name === name)?.url).filter(Boolean)
    navigator.clipboard.writeText(urls.join('\n'))
    setSelectedFiles([])
  }

  const handleMassDownload = () => {
    selectedFiles.forEach(name => {
      const img = images.find(i => i.name === name)
      if (img) {
        const a = document.createElement('a')
        a.href = img.url
        a.download = img.name
        a.target = '_blank'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
      }
    })
    setSelectedFiles([])
  }

  if (loading) return <div className="min-h-screen bg-background text-primary flex items-center justify-center">Loading...</div>

  // Apply filters
  let filteredImages = images.filter(img => img.name.toLowerCase().includes(searchQuery.toLowerCase()))
  
  if (activeSection === 'images') filteredImages = filteredImages.filter(img => img.type.startsWith('image/'))
  else if (activeSection === 'files') filteredImages = filteredImages.filter(img => !img.type.startsWith('image/') && !img.type.includes('apk') && !img.type.startsWith('video/'))
  else if (activeSection === 'folders') filteredImages = [] // Not supported yet
  else if (activeSection === 'apk') filteredImages = filteredImages.filter(img => img.type.includes('apk') || img.name.endsWith('.apk'))

  if (filterType !== 'Type') {
    if (filterType === 'Images') filteredImages = filteredImages.filter(img => img.type.startsWith('image/'))
    else if (filterType === 'Documents') filteredImages = filteredImages.filter(img => img.type.includes('pdf') || img.type.includes('document'))
    else if (filterType === 'Videos') filteredImages = filteredImages.filter(img => img.type.startsWith('video/'))
    else if (filterType === 'APK') filteredImages = filteredImages.filter(img => img.type.includes('apk') || img.name.endsWith('.apk'))
  }
  
  if (filterModified !== 'Modified') {
    const now = Date.now()
    if (filterModified === 'Today') {
       filteredImages = filteredImages.filter(img => now - img.rawDate < 24 * 60 * 60 * 1000)
    } else if (filterModified === 'Last 7 days') {
       filteredImages = filteredImages.filter(img => now - img.rawDate < 7 * 24 * 60 * 60 * 1000)
    } else if (filterModified === 'Last 30 days') {
       filteredImages = filteredImages.filter(img => now - img.rawDate < 30 * 24 * 60 * 60 * 1000)
    }
  }

  if (filterPeople !== 'People') {
    if (filterPeople === 'Me') filteredImages = filteredImages.filter(img => img.owner === 'Me')
  }

  if (filterSource !== 'Source') {
    if (filterSource === 'Web') filteredImages = filteredImages.filter(img => img.source === 'Web')
    else if (filterSource === 'Mobile App') filteredImages = filteredImages.filter(img => img.source === 'Mobile App')
  }

  if (filterVisibility === 'Visible') {
    filteredImages = filteredImages.filter(img => !img.hidden)
  } else if (filterVisibility === 'Hidden') {
    filteredImages = filteredImages.filter(img => img.hidden)
  }

  const totalBytes = images.reduce((acc, img) => acc + img.bytes, 0)
  const totalStorageAllowed = 5 * 1024 * 1024 * 1024 // 5 GB
  const storagePercentage = (totalBytes / totalStorageAllowed) * 100
  
  const closeDropdowns = () => setOpenDropdown(null)

  return (
    <div className="h-screen bg-background text-foreground flex flex-col font-sans overflow-hidden" onClick={closeDropdowns}>
      {/* Password Prompt Modal */}
      {showPasswordPrompt && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
          <div className="bg-background border border-border w-full max-w-sm rounded-xl p-6 shadow-2xl relative">
            <h3 className="text-xl font-display text-foreground mb-2">Authentication Required</h3>
            <p className="text-sm text-muted-foreground mb-4">Please enter the admin password to {showPasswordPrompt}.</p>
            
            <input 
              type="password" 
              value={passwordInput}
              onChange={(e) => { setPasswordInput(e.target.value); setPasswordError('') }}
              onKeyDown={(e) => { if (e.key === 'Enter') handlePasswordSubmit() }}
              className="w-full bg-black/5 dark:bg-white/5 border border-border rounded-lg px-4 py-2.5 text-foreground focus:outline-none focus:border-primary mb-2"
              placeholder="Enter password..."
              autoFocus
            />
            {passwordError && <p className="text-xs text-red-500 mb-4">{passwordError}</p>}
            
            <div className="flex justify-end gap-3 mt-6">
              <button 
                onClick={() => { setShowPasswordPrompt(null); setPasswordInput(''); setPasswordError(''); setPendingUploadFiles([]); setPendingDeleteNames([]); setPendingHideNames([]); }}
                className="px-4 py-2 rounded-lg text-sm font-medium hover:bg-black/5 dark:hover:bg-white/5 text-foreground transition"
              >
                Cancel
              </button>
              <button 
                onClick={handlePasswordSubmit}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition shadow-sm"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Mass Selection Bar */}
      {selectedFiles.length > 0 && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-foreground text-background px-6 py-3 rounded-full shadow-2xl flex items-center gap-6 z-50">
          <span className="font-medium">{selectedFiles.length} selected</span>
          <div className="w-px h-5 bg-background/20"></div>
          <button onClick={handleMassCopy} className="hover:text-primary transition" title="Copy URLs">
            <LinkIcon size={18} />
          </button>
          <button onClick={handleMassDownload} className="hover:text-primary transition" title="Download">
            <Download size={18} />
          </button>
          <button onClick={() => { setPendingHideNames(selectedFiles); setShowPasswordPrompt('hide'); }} className="hover:text-primary transition" title="Toggle Visibility">
            <EyeOff size={18} />
          </button>
          <button onClick={() => { setPendingDeleteNames(selectedFiles); setShowPasswordPrompt('delete'); }} className="hover:text-red-400 transition" title="Delete">
            <Trash2 size={18} />
          </button>
          <button onClick={() => setSelectedFiles([])} className="hover:text-primary transition ml-2 border-l border-background/20 pl-6">
            <X size={18} />
          </button>
        </div>
      )}

      {/* Settings Modal */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-2xl p-8 max-w-md w-full shadow-2xl relative">
            <button onClick={() => setIsSettingsOpen(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">&times;</button>
            <h3 className="text-2xl font-display mb-6">Drive Settings</h3>
            
            <div className="mb-6">
              <p className="text-sm text-muted-foreground mb-2 flex justify-between">
                <span>Storage Used</span>
                <span>{formatBytes(totalBytes)} / 5 GB</span>
              </p>
              <div className="w-full bg-black/10 dark:bg-white/5 rounded-full h-3 border border-border overflow-hidden">
                <div className="bg-primary h-3 rounded-full" style={{ width: `${Math.min(100, storagePercentage)}%` }}></div>
              </div>
            </div>

            <div className="space-y-6">
              {/* Preferences */}
              <div className="space-y-3">
                <h4 className="text-xs uppercase font-semibold text-muted-foreground tracking-wider">Preferences</h4>
                <label className="flex items-center justify-between p-3 bg-black/5 dark:bg-white/5 rounded-lg border border-border cursor-pointer hover:bg-black/10 dark:hover:bg-white/10 transition">
                  <span className="text-sm font-medium">Auto-sync files</span>
                  <input type="checkbox" defaultChecked className="accent-primary w-4 h-4 cursor-pointer" />
                </label>
                <label className="flex items-center justify-between p-3 bg-black/5 dark:bg-white/5 rounded-lg border border-border cursor-pointer hover:bg-black/10 dark:hover:bg-white/10 transition">
                  <span className="text-sm font-medium">Show hidden files</span>
                  <input type="checkbox" className="accent-primary w-4 h-4 cursor-pointer" />
                </label>
                <div className="flex items-center justify-between p-3 bg-black/5 dark:bg-white/5 rounded-lg border border-border">
                  <span className="text-sm font-medium">Default View</span>
                  <select className="bg-background border border-border rounded text-sm px-2 py-1 outline-none focus:border-primary">
                    <option value="list">List View</option>
                    <option value="grid">Grid View</option>
                  </select>
                </div>
              </div>

              {/* Upload & Storage */}
              <div className="space-y-3">
                <h4 className="text-xs uppercase font-semibold text-muted-foreground tracking-wider">Upload & Storage</h4>
                <label className="flex items-center justify-between p-3 bg-black/5 dark:bg-white/5 rounded-lg border border-border cursor-pointer hover:bg-black/10 dark:hover:bg-white/10 transition">
                  <div>
                    <span className="text-sm font-medium block">Image Compression</span>
                    <span className="text-xs text-muted-foreground">Save space by converting to WebP</span>
                  </div>
                  <input type="checkbox" defaultChecked className="accent-primary w-4 h-4 cursor-pointer" />
                </label>
                
                <div className="flex items-center justify-between p-3 bg-black/5 dark:bg-white/5 rounded-lg border border-border">
                  <div>
                    <span className="text-sm font-medium block">Storage Cache</span>
                    <span className="text-xs text-muted-foreground">12.4 MB local data</span>
                  </div>
                  <button onClick={() => alert('Cache cleared successfully!')} className="px-3 py-1.5 text-xs font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded transition">
                    Clear
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Top Header */}
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-6 py-3 border-b border-border gap-4 shrink-0 bg-background">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
            <Cloud size={24} />
          </div>
          <Link to="/admin/dashboard" className="text-xl font-display text-foreground hover:text-primary transition shrink-0 ml-2">
            Cloud Drive
          </Link>
        </div>
        <div className="flex items-center gap-6 text-muted-foreground w-full sm:w-auto">
          <div className="relative w-full sm:w-96">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search in Drive" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/5 dark:bg-white/5 border border-transparent hover:border-border rounded-full py-2.5 pl-10 pr-4 text-sm text-foreground focus:outline-none focus:border-primary/50 focus:bg-background transition"
            />
          </div>
          <button onClick={() => setIsSettingsOpen(true)} className="hover:text-foreground transition">
            <Settings size={20} />
          </button>
          <NotificationsDropdown />
          <ThemeToggle />
          <div className="relative">
            <button 
              onClick={(e) => { e.stopPropagation(); setOpenDropdown(openDropdown === 'account' ? null : 'account') }}
              className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary ml-2 shrink-0 hover:bg-primary/30 transition shadow-sm"
            >
              <User size={18} />
            </button>
            
            {openDropdown === 'account' && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-card border border-border rounded-xl shadow-2xl z-50 overflow-hidden flex flex-col py-1 backdrop-blur-md">
                <div className="px-4 py-3 border-b border-border/50 bg-black/5 dark:bg-white/5">
                  <p className="text-sm font-medium text-foreground">NGO Member</p>
                  <p className="text-xs text-muted-foreground mt-0.5">admin@bhandara.local</p>
                </div>
                <div className="p-1">
                  <Link 
                    to="/admin/profile" 
                    className="flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition"
                  >
                    <User size={16} />
                    My Profile
                  </Link>
                  <Link 
                    to="/admin/members" 
                    className="flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition"
                  >
                    <Users size={16} />
                    Members & Access
                  </Link>
                  <button 
                    onClick={async () => {
                      localStorage.removeItem('temp_admin_auth')
                      try { await signOut(auth) } catch(e) {}
                      navigate({ to: '/login' })
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-500/10 rounded-lg transition mt-1"
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className={`border-r border-border hidden md:flex flex-col gap-6 shrink-0 bg-background overflow-y-auto transition-all duration-300 ${isSidebarExpanded ? 'w-56 p-4' : 'w-[72px] py-4 px-2 items-center'}`}>
          <div className="flex items-center justify-between mb-2">
            {isSidebarExpanded && <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider pl-2">Menu</span>}
            <button onClick={() => setIsSidebarExpanded(!isSidebarExpanded)} className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-muted-foreground transition self-center">
              {isSidebarExpanded ? <PanelLeftClose size={20} /> : <PanelLeftOpen size={20} />}
            </button>
          </div>
          
          <label className={`cursor-pointer bg-primary text-primary-foreground py-3 rounded-2xl font-medium hover:bg-primary/90 transition shadow-lg flex items-center justify-center hover:shadow-xl ${isSidebarExpanded ? 'px-4 gap-2' : 'px-0 w-12 h-12 rounded-2xl'}`}>
            <FolderPlus size={20} />
            {isSidebarExpanded && "New Upload"}
            <input type="file" className="hidden" onChange={handleUploadClick} disabled={uploading} />
          </label>
          
          <nav className="flex flex-col gap-1 mt-2 w-full">
            <button onClick={() => setActiveSection('all')} className={`flex items-center rounded-full text-sm font-medium transition ${isSidebarExpanded ? 'gap-3 px-4 py-2' : 'justify-center p-3 w-12 h-12 mx-auto'} ${activeSection === 'all' ? 'bg-primary/20 text-primary' : 'text-foreground hover:bg-black/5 dark:hover:bg-white/5'}`} title="My Drive">
              <HardDrive size={18} /> {isSidebarExpanded && "My Drive"}
            </button>
            <button onClick={() => setActiveSection('images')} className={`flex items-center rounded-full text-sm font-medium transition ${isSidebarExpanded ? 'gap-3 px-4 py-2' : 'justify-center p-3 w-12 h-12 mx-auto'} ${activeSection === 'images' ? 'bg-primary/20 text-primary' : 'text-foreground hover:bg-black/5 dark:hover:bg-white/5'}`} title="Images">
              <FileImage size={18} /> {isSidebarExpanded && "Images"}
            </button>
            <button onClick={() => setActiveSection('files')} className={`flex items-center rounded-full text-sm font-medium transition ${isSidebarExpanded ? 'gap-3 px-4 py-2' : 'justify-center p-3 w-12 h-12 mx-auto'} ${activeSection === 'files' ? 'bg-primary/20 text-primary' : 'text-foreground hover:bg-black/5 dark:hover:bg-white/5'}`} title="Files">
              <FileText size={18} /> {isSidebarExpanded && "Files"}
            </button>
            <button onClick={() => setActiveSection('folders')} className={`flex items-center rounded-full text-sm font-medium transition ${isSidebarExpanded ? 'gap-3 px-4 py-2' : 'justify-center p-3 w-12 h-12 mx-auto'} ${activeSection === 'folders' ? 'bg-primary/20 text-primary' : 'text-foreground hover:bg-black/5 dark:hover:bg-white/5'}`} title="Folders">
              <FolderPlus size={18} /> {isSidebarExpanded && "Folders"}
            </button>
            <button onClick={() => setActiveSection('apk')} className={`flex items-center rounded-full text-sm font-medium transition ${isSidebarExpanded ? 'gap-3 px-4 py-2' : 'justify-center p-3 w-12 h-12 mx-auto'} ${activeSection === 'apk' ? 'bg-primary/20 text-primary' : 'text-foreground hover:bg-black/5 dark:hover:bg-white/5'}`} title="APK Updates">
              <FileArchive size={18} /> {isSidebarExpanded && "APK Updates"}
            </button>
          </nav>

          <div className="mt-auto w-full">
            {isSidebarExpanded ? (
              <div className="px-4 text-xs text-muted-foreground">
                <div className="flex justify-between mb-2">
                  <span>Storage</span>
                  <span>{Math.round(storagePercentage)}%</span>
                </div>
                <div className="w-full bg-black/10 dark:bg-white/10 rounded-full h-1.5 mb-2">
                  <div className="bg-primary h-1.5 rounded-full" style={{ width: `${Math.min(100, storagePercentage)}%` }}></div>
                </div>
                <p>{formatBytes(totalBytes)} of 5 GB used</p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 mb-4">
                 <Cloud size={24} className="text-primary/50" />
                 <div className="w-8 bg-black/10 dark:bg-white/10 rounded-full h-1.5 rotate-180" style={{ writingMode: 'vertical-rl' }}>
                    <div className="bg-primary w-full rounded-full" style={{ height: `${Math.min(100, storagePercentage)}%` }}></div>
                 </div>
              </div>
            )}
          </div>
        </aside>

        <main className="flex-1 p-6 overflow-y-auto bg-card rounded-tl-2xl border-t border-l border-border relative flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-xl font-medium">
              <span className="text-foreground/70">My Drive</span>
              {activeSection !== 'all' && (
                <>
                  <span className="text-muted-foreground mx-1 text-sm">&gt;</span>
                  <span className="capitalize">{activeSection}</span>
                </>
              )}
              <ChevronDown size={20} className="text-muted-foreground cursor-pointer" />
            </div>
            
            <div className="flex items-center gap-4">
              {/* View Toggle */}
              <div className="flex items-center bg-black/5 dark:bg-white/5 rounded-full border border-border p-0.5">
                <button 
                  onClick={() => setViewMode('list')} 
                  className={`p-1.5 rounded-full transition ${viewMode === 'list' ? 'bg-black/10 dark:bg-white/10 text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  <List size={18} />
                </button>
                <button 
                  onClick={() => setViewMode('grid')} 
                  className={`p-1.5 rounded-full transition ${viewMode === 'grid' ? 'bg-black/10 dark:bg-white/10 text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  <LayoutGrid size={18} />
                </button>
              </div>
              <button onClick={() => setIsInfoOpen(!isInfoOpen)} className={`p-2 rounded-full transition ${isInfoOpen ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:bg-black/5 dark:hover:bg-white/5 hover:text-foreground'}`}>
                <Info size={20} />
              </button>
            </div>
          </div>

          {/* Filters Toolbar */}
          <div className="flex items-center gap-2 mb-6 flex-wrap pb-2 text-sm z-10 relative">
            <button className="flex items-center gap-2 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-border/50 px-4 py-2 rounded-xl transition shrink-0 text-foreground" onClick={() => alert('No suggestions available at this time.')}>
              <FolderPlus size={16} />
              Suggest file moves
            </button>
            <div className="w-px h-6 bg-border mx-1 shrink-0"></div>
            
            {/* Type Dropdown */}
            <div className="relative shrink-0">
              <button 
                onClick={(e) => { e.stopPropagation(); setOpenDropdown(openDropdown === 'Type' ? null : 'Type') }}
                className={`flex items-center gap-2 border px-4 py-2 rounded-xl transition ${filterType !== 'Type' ? 'bg-primary/10 border-primary/30 text-primary' : 'bg-black/5 dark:bg-white/5 border-border/50 hover:bg-black/10 dark:hover:bg-white/10 text-foreground'}`}
              >
                {filterType} <ChevronDown size={14} />
              </button>
              {openDropdown === 'Type' && (
                <div className="absolute top-full left-0 mt-1 w-40 bg-card border border-border rounded-lg shadow-xl z-20 overflow-hidden py-1">
                  {['Type', 'Images', 'Documents', 'Videos', 'APK'].map(t => (
                    <button key={t} onClick={() => { setFilterType(t); setOpenDropdown(null) }} className="w-full text-left px-4 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/5">{t === 'Type' ? 'All Types' : t}</button>
                  ))}
                </div>
              )}
            </div>
            
            {/* People Dropdown */}
            <div className="relative shrink-0">
              <button 
                onClick={(e) => { e.stopPropagation(); setOpenDropdown(openDropdown === 'People' ? null : 'People') }}
                className={`flex items-center gap-2 border px-4 py-2 rounded-xl transition ${filterPeople !== 'People' ? 'bg-primary/10 border-primary/30 text-primary' : 'bg-black/5 dark:bg-white/5 border-border/50 hover:bg-black/10 dark:hover:bg-white/10 text-foreground'}`}
              >
                {filterPeople} <ChevronDown size={14} />
              </button>
              {openDropdown === 'People' && (
                <div className="absolute top-full left-0 mt-1 w-40 bg-card border border-border rounded-lg shadow-xl z-20 overflow-hidden py-1">
                  {['People', 'Me', 'Anyone'].map(t => (
                    <button key={t} onClick={() => { setFilterPeople(t); setOpenDropdown(null) }} className="w-full text-left px-4 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/5">{t === 'People' ? 'All People' : t}</button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Modified Dropdown */}
            <div className="relative shrink-0">
              <button 
                onClick={(e) => { e.stopPropagation(); setOpenDropdown(openDropdown === 'Modified' ? null : 'Modified') }}
                className={`flex items-center gap-2 border px-4 py-2 rounded-xl transition ${filterModified !== 'Modified' ? 'bg-primary/10 border-primary/30 text-primary' : 'bg-black/5 dark:bg-white/5 border-border/50 hover:bg-black/10 dark:hover:bg-white/10 text-foreground'}`}
              >
                {filterModified} <ChevronDown size={14} />
              </button>
              {openDropdown === 'Modified' && (
                <div className="absolute top-full left-0 mt-1 w-40 bg-card border border-border rounded-lg shadow-xl z-20 overflow-hidden py-1">
                  {['Modified', 'Today', 'Last 7 days', 'Last 30 days'].map(t => (
                    <button key={t} onClick={() => { setFilterModified(t); setOpenDropdown(null) }} className="w-full text-left px-4 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/5">{t === 'Modified' ? 'Any time' : t}</button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Source Dropdown */}
            <div className="relative shrink-0">
              <button 
                onClick={(e) => { e.stopPropagation(); setOpenDropdown(openDropdown === 'Source' ? null : 'Source') }}
                className={`flex items-center gap-2 border px-4 py-2 rounded-xl transition ${filterSource !== 'Source' ? 'bg-primary/10 border-primary/30 text-primary' : 'bg-black/5 dark:bg-white/5 border-border/50 hover:bg-black/10 dark:hover:bg-white/10 text-foreground'}`}
              >
                {filterSource} <ChevronDown size={14} />
              </button>
              {openDropdown === 'Source' && (
                <div className="absolute top-full left-0 mt-1 w-40 bg-card border border-border rounded-lg shadow-xl z-20 overflow-hidden py-1">
                  {['Source', 'Web', 'Mobile App'].map(t => (
                    <button key={t} onClick={() => { setFilterSource(t); setOpenDropdown(null) }} className="w-full text-left px-4 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/5">{t === 'Source' ? 'All Sources' : t}</button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Visibility Dropdown */}
            <div className="relative shrink-0">
              <button 
                onClick={(e) => { e.stopPropagation(); setOpenDropdown(openDropdown === 'Visibility' ? null : 'Visibility') }}
                className={`flex items-center gap-2 border px-4 py-2 rounded-xl transition ${filterVisibility !== 'Visible' ? 'bg-primary/10 border-primary/30 text-primary' : 'bg-black/5 dark:bg-white/5 border-border/50 hover:bg-black/10 dark:hover:bg-white/10 text-foreground'}`}
              >
                {filterVisibility} <ChevronDown size={14} />
              </button>
              {openDropdown === 'Visibility' && (
                <div className="absolute top-full left-0 mt-1 w-40 bg-card border border-border rounded-lg shadow-xl z-20 overflow-hidden py-1">
                  {['All', 'Visible', 'Hidden'].map(t => (
                    <button key={t} onClick={() => { setFilterVisibility(t); setOpenDropdown(null) }} className="w-full text-left px-4 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/5">{t}</button>
                  ))}
                </div>
              )}
            </div>
            
            {(filterType !== 'Type' || filterModified !== 'Modified' || filterPeople !== 'People' || filterSource !== 'Source' || filterVisibility !== 'Visible') && (
              <button 
                onClick={() => { setFilterType('Type'); setFilterModified('Modified'); setFilterPeople('People'); setFilterSource('Source'); setFilterVisibility('Visible') }} 
                className="ml-2 text-xs text-primary hover:underline"
              >
                Clear Filters
              </button>
            )}
          </div>

          {uploading && (
            <div className="mb-8 bg-black/5 dark:bg-white/5 p-4 rounded-xl border border-border">
              <p className="text-sm text-muted-foreground mb-2">Uploading... {Math.round(progress)}%</p>
              <div className="w-full bg-black/10 dark:bg-white/10 rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
          )}

          <div className="flex-1 overflow-y-auto pr-2">
            {/* List View */}
            {viewMode === 'list' && (
              <div className="w-full">
                <div className="grid grid-cols-12 text-sm font-medium text-muted-foreground border-b border-border pb-2 mb-2 px-4">
                  <div className="col-span-6 flex items-center gap-3">
                    <button onClick={() => {
                      if (selectedFiles.length === filteredImages.length && filteredImages.length > 0) setSelectedFiles([])
                      else setSelectedFiles(filteredImages.map(i => i.name))
                    }} className="text-muted-foreground hover:text-foreground">
                      {selectedFiles.length > 0 && selectedFiles.length === filteredImages.length ? <CheckSquare size={18} /> : <Square size={18} />}
                    </button>
                    Name
                  </div>
                  <div className="col-span-2">Last modified</div>
                  <div className="col-span-2">File size</div>
                  <div className="col-span-2 flex justify-end"></div>
                </div>
                
                <div className="flex flex-col">
                  {filteredImages.map((img) => (
                    <div key={img.name} onClick={() => window.open(img.url, '_blank')} className={`grid grid-cols-12 items-center py-3 px-4 hover:bg-black/5 dark:hover:bg-white/5 border-b border-border transition group relative rounded-lg cursor-pointer ${selectedFiles.includes(img.name) ? 'bg-primary/5 dark:bg-primary/10' : ''}`}>
                      <div className="col-span-6 flex items-center gap-3">
                        <button onClick={(e) => toggleSelection(img.name, e)} className={`text-muted-foreground hover:text-foreground transition ${selectedFiles.includes(img.name) ? 'opacity-100 text-primary' : 'opacity-0 group-hover:opacity-100 focus:opacity-100'}`}>
                          {selectedFiles.includes(img.name) ? <CheckSquare size={18} className="text-primary" /> : <Square size={18} />}
                        </button>
                        {getFileIcon(img.type, 18, "text-muted-foreground")}
                        <span className="text-sm font-medium truncate pr-4 text-foreground">{img.name}</span>
                      </div>
                      <div className="col-span-2 text-sm text-muted-foreground">
                        {img.date}
                      </div>
                      <div className="col-span-2 text-sm text-muted-foreground">{img.size}</div>
                      
                      {/* Action Menu */}
                      <div className="col-span-2 flex justify-end">
                        <div className="relative">
                          <button 
                            onClick={(e) => { e.stopPropagation(); setOpenMenuIndex(openMenuIndex === img.name ? null : img.name) }} 
                            className="p-1.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 focus:opacity-100"
                          >
                            <MoreVertical size={18} />
                          </button>
                          
                          {openMenuIndex === img.name && (
                            <div className="absolute right-0 top-full mt-1 w-36 bg-card border border-border rounded-lg shadow-xl z-20 overflow-hidden py-1">
                              <button onClick={() => { navigator.clipboard.writeText(img.url); setOpenMenuIndex(null) }} className="w-full text-left px-4 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/5 transition">Copy URL</button>
                              <button onClick={(e) => { e.stopPropagation(); handleDeleteClick(img.name) }} className="w-full text-left px-4 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/5 text-red-500 transition">Delete</button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {filteredImages.length === 0 && !uploading && (
                    <div className="py-16 flex flex-col items-center justify-center text-center">
                       <Cloud size={48} className="text-muted-foreground/30 mb-4" />
                      <p className="text-muted-foreground">
                        {searchQuery || filterType !== 'Type' || activeSection !== 'all' ? "No files match your criteria." : "No files in drive. Upload one to get started!"}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Grid View */}
            {viewMode === 'grid' && (
              <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredImages.map((img) => (
                  <div key={img.name} onClick={() => window.open(img.url, '_blank')} className={`relative group bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border rounded-xl overflow-hidden aspect-[4/3] flex flex-col transition cursor-pointer ${selectedFiles.includes(img.name) ? 'border-primary shadow-sm bg-primary/5 dark:bg-primary/10' : 'border-border'}`}>
                    <div className="flex-1 flex items-center justify-center p-4 overflow-hidden relative">
                      {img.type.startsWith('image/') ? (
                         <img src={img.url} alt={img.name} className="object-cover w-full h-full rounded shadow-sm" />
                      ) : (
                         getFileIcon(img.type, 48, "text-muted-foreground/50")
                      )}
                      
                      {/* Checkbox Overlay */}
                      <div className={`absolute top-2 left-2 transition ${selectedFiles.includes(img.name) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                        <button 
                          onClick={(e) => toggleSelection(img.name, e)} 
                          className={`p-1 rounded bg-background/80 backdrop-blur-sm border border-border shadow-sm transition ${selectedFiles.includes(img.name) ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                          {selectedFiles.includes(img.name) ? <CheckSquare size={16} /> : <Square size={16} />}
                        </button>
                      </div>

                      <div className={`absolute top-2 right-2 transition ${openMenuIndex === img.name ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                         <div className="relative">
                            <button 
                              onClick={(e) => { e.stopPropagation(); setOpenMenuIndex(openMenuIndex === img.name ? null : img.name) }} 
                              className="p-1 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-background transition text-foreground shadow-sm"
                            >
                              <MoreVertical size={16} />
                            </button>
                            {openMenuIndex === img.name && (
                              <div className="absolute right-0 top-full mt-1 w-36 bg-card border border-border rounded-lg shadow-xl z-20 overflow-hidden py-1">
                                <button onClick={(e) => { e.stopPropagation(); navigator.clipboard.writeText(img.url); setOpenMenuIndex(null) }} className="w-full text-left px-4 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/5 transition">Copy URL</button>
                                <a href={img.url} download={img.name} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="w-full text-left px-4 py-2 hover:bg-black/5 dark:hover:bg-white/5 flex items-center gap-2 text-sm">
                                  <Download size={16} />
                                  Download
                                </a>
                                <button onClick={(e) => { e.stopPropagation(); setPendingHideNames([img.name]); setShowPasswordPrompt('hide'); setOpenMenuIndex(null); }} className="w-full text-left px-4 py-2 hover:bg-black/5 dark:hover:bg-white/5 flex items-center gap-2 text-sm">
                                  {img.hidden ? <Eye size={16} /> : <EyeOff size={16} />}
                                  {img.hidden ? 'Unhide' : 'Hide'}
                                </button>
                                <button onClick={(e) => { e.stopPropagation(); handleDeleteClick(img.name) }} className="w-full text-left px-4 py-2 text-sm hover:bg-red-500/10 text-red-500 transition">Delete</button>
                              </div>
                            )}
                          </div>
                      </div>
                    </div>
                    <div className="p-3 bg-card border-t border-border flex items-center gap-3">
                      {getFileIcon(img.type, 16, "text-muted-foreground shrink-0")}
                      <div className="truncate flex-1">
                        <h4 className="text-sm font-medium text-foreground truncate">{img.name}</h4>
                      </div>
                    </div>
                  </div>
                ))}
                
                {filteredImages.length === 0 && !uploading && (
                  <div className="col-span-full py-16 flex flex-col items-center justify-center text-center border-2 border-dashed border-border rounded-xl">
                    <Cloud size={48} className="text-muted-foreground/30 mb-4" />
                    <p className="text-muted-foreground">
                      {searchQuery || filterType !== 'Type' || activeSection !== 'all' ? "No files match your criteria." : "No files in drive. Upload one to get started!"}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
        
        {/* Info Right Sidebar */}
        {isInfoOpen && (
          <aside className="w-72 border-l border-border bg-card p-6 flex flex-col shrink-0 overflow-y-auto">
             <div className="flex items-center justify-between mb-6">
                <h3 className="font-medium text-foreground">Details</h3>
                <button onClick={() => setIsInfoOpen(false)} className="text-muted-foreground hover:text-foreground">
                  &times;
                </button>
             </div>
             
             <div className="flex justify-center mb-6 py-8 border-b border-border text-primary">
                <Cloud size={64} className="opacity-50" />
             </div>
             
             <div className="space-y-4 text-sm">
                <div>
                   <h4 className="text-muted-foreground mb-1 text-xs uppercase tracking-wider font-semibold">Drive Status</h4>
                   <p className="text-foreground">Healthy, Syncing Active</p>
                </div>
                <div>
                   <h4 className="text-muted-foreground mb-1 text-xs uppercase tracking-wider font-semibold">Total Items</h4>
                   <p className="text-foreground">{images.length} files</p>
                </div>
                <div>
                   <h4 className="text-muted-foreground mb-1 text-xs uppercase tracking-wider font-semibold">Storage Used</h4>
                   <p className="text-foreground">{formatBytes(totalBytes)}</p>
                </div>
                <div>
                   <h4 className="text-muted-foreground mb-1 text-xs uppercase tracking-wider font-semibold">Shared With</h4>
                   <p className="text-foreground">Administrators only</p>
                </div>
             </div>
          </aside>
        )}
      </div>
    </div>
  )
}
