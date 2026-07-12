import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth, db, storage } from '@/lib/firebase'
import { collection, query, where, onSnapshot, orderBy, updateDoc, doc, addDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { NotificationsDropdown } from '@/components/admin/NotificationsDropdown'
import { ThemeToggle } from '@/components/site/ThemeToggle'
import { 
  Bell, 
  Settings, 
  User, 
  Home, 
  HardDrive, 
  LogOut, 
  Award,
  Calendar,
  Clock,
  Heart,
  ShieldCheck,
  Activity,
  Edit3,
  CheckCircle2,
  ChevronLeft,
  FileImage,
  Star,
  Users,
  Edit2,
  Lock
} from 'lucide-react'

export const Route = createFileRoute('/admin/profile')({
  component: Profile,
})

function Profile() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [userDoc, setUserDoc] = useState<any>(null)
  const [userActivities, setUserActivities] = useState<any[]>([])
  const [uploadingPhoto, setUploadingPhoto] = useState(false)

  useEffect(() => {
    // TEMPORARY BYPASS
    const isTempAuth = localStorage.getItem('temp_admin_auth')
    let currentEmail = ''
    
    if (isTempAuth) {
      currentEmail = 'admin@bhandara.local'
      setCurrentUser({ email: currentEmail })
      setLoading(false)
    }

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user && !isTempAuth) {
        navigate({ to: '/login' })
      } else if (user) {
        currentEmail = user.email || ''
        setCurrentUser(user)
        setLoading(false)
      }
    })
    
    return () => unsubscribeAuth()
  }, [navigate])

  useEffect(() => {
    const isTempAuth = localStorage.getItem('temp_admin_auth')
    const emailToFetch = auth.currentUser?.email || (isTempAuth ? 'admin@bhandara.local' : null)
    
    if (emailToFetch) {
      // Fetch User Doc
      const qUser = query(collection(db, 'users'), where('email', '==', emailToFetch))
      const unSubUser = onSnapshot(qUser, (snap) => {
        if (!snap.empty) setUserDoc({ id: snap.docs[0].id, ...snap.docs[0].data() })
        else setUserDoc(null)
      }, (error) => {
        console.error("Error fetching user doc:", error)
      })

      // Fetch User Activities
      const qAct = query(collection(db, 'activities'), where('user', '==', emailToFetch), orderBy('timestamp', 'desc'))
      const unSubAct = onSnapshot(qAct, (snap) => {
        setUserActivities(snap.docs.map(d => {
          const data = d.data()
          return {
            id: d.id,
            ...data,
            time: data.timestamp ? new Date(data.timestamp.toDate()).toLocaleString() : 'Just now'
          }
        }))
      }, (error) => {
        console.error("Error fetching activities:", error)
      })
      
      return () => { unSubUser(); unSubAct(); }
    }
  }, [currentUser])

  if (loading) {
    return <div className="min-h-screen bg-background flex items-center justify-center text-primary font-medium">Loading Profile...</div>
  }

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    setUploadingPhoto(true)
    try {
      let docId = userDoc?.id
      if (!docId) {
        // If they are on a temp bypass and not in the DB yet, create them.
        const newEmail = auth.currentUser?.email || (localStorage.getItem('temp_admin_auth') ? 'admin@bhandara.local' : 'unknown')
        const newDoc = await addDoc(collection(db, 'users'), { 
          email: newEmail, 
          name: 'NGO Member',
          role: 'Admin',
          status: 'Active',
          stats: { hours: 0, events: 0, uploads: 0 }
        })
        docId = newDoc.id
      }

      const storageRef = ref(storage, `profiles/${docId}-${file.name}`)
      await uploadBytes(storageRef, file)
      const url = await getDownloadURL(storageRef)
      
      await updateDoc(doc(db, 'users', docId), { photoURL: url })
      // Don't need to logActivity for photo update since it's personal
    } catch (error) {
      console.error(error)
      alert("Failed to upload photo")
    } finally {
      setUploadingPhoto(false)
      // reset file input
      e.target.value = ''
    }
  }

  // Fallback defaults
  const name = userDoc?.name || currentUser?.displayName || currentUser?.email?.split('@')[0] || 'User'
  const role = userDoc?.role || 'Volunteer'
  const email = currentUser?.email || ''
  const stats = userDoc?.stats || { hours: 0, events: 0, uploads: 0 }
  const joinDate = userDoc?.createdAt ? new Date(userDoc.createdAt.toDate()).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'Recently'

  return (
    <div className="h-screen w-full bg-background flex flex-col font-sans overflow-hidden">
      {/* Topbar */}
      <header className="h-16 border-b border-border bg-card/80 backdrop-blur-md flex items-center justify-between px-4 sm:px-6 shrink-0 z-20">
        <div className="flex items-center gap-3">
          <Link to="/admin/dashboard" className="p-2 -ml-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-muted-foreground transition">
            <ChevronLeft size={20} />
          </Link>
          <div className="flex items-center gap-2 text-primary">
            <Heart className="fill-primary/20" size={24} />
            <span className="font-bold text-lg tracking-tight hidden sm:block">NGO Member Portal</span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <NotificationsDropdown />
          <ThemeToggle />
          <div className="relative">
            <button 
              onClick={() => setOpenDropdown(openDropdown === 'account' ? null : 'account')}
              className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground ml-2 shrink-0 hover:bg-primary/90 transition shadow-md ring-2 ring-background uppercase"
            >
              {name.charAt(0)}
            </button>
            
            {openDropdown === 'account' && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-card border border-border rounded-xl shadow-2xl z-50 overflow-hidden flex flex-col py-1 backdrop-blur-md">
                <div className="px-4 py-3 border-b border-border/50 bg-black/5 dark:bg-white/5">
                  <p className="text-sm font-medium text-foreground">{name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{email}</p>
                </div>
                <div className="p-1">
                  <Link 
                    to="/admin/dashboard" 
                    className="flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition"
                  >
                    <Home size={16} />
                    Dashboard
                  </Link>
                  <Link 
                    to="/admin/members" 
                    className="flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition"
                  >
                    <Users size={16} />
                    Members & Access
                  </Link>
                  <Link 
                    to="/admin/drive" 
                    className="flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition"
                  >
                    <HardDrive size={16} />
                    Cloud Drive
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

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Cover Photo / Hero */}
        <div className="h-48 md:h-64 w-full bg-gradient-to-r from-primary/80 via-primary to-primary/60 relative">
          <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
          {/* Decorative circles */}
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white/10 blur-2xl"></div>
          <div className="absolute bottom-10 right-20 w-48 h-48 rounded-full bg-black/10 blur-3xl"></div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          {/* Profile Header */}
          <div className="relative -mt-16 sm:-mt-24 mb-8 sm:mb-12 flex flex-col sm:flex-row items-center sm:items-end gap-4 sm:gap-6">
            <div className="relative">
              <label className={`w-32 h-32 sm:w-40 sm:h-40 rounded-3xl bg-card border-4 border-background shadow-xl flex items-center justify-center text-primary overflow-hidden relative z-10 group cursor-pointer text-5xl uppercase font-bold ${uploadingPhoto ? 'opacity-50' : ''}`}>
                <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} disabled={uploadingPhoto} />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5"></div>
                {userDoc?.photoURL ? (
                  <img src={userDoc.photoURL} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="opacity-80 group-hover:scale-110 transition-transform duration-300">{name.charAt(0)}</span>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-xs gap-1 font-medium">
                  {uploadingPhoto ? <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent" /> : <><Edit3 size={20} /> Update Photo</>}
                </div>
              </label>
              <div className="absolute bottom-2 right-2 w-8 h-8 bg-green-500 border-4 border-background rounded-full z-20 flex items-center justify-center" title="Online & Active">
                <ShieldCheck size={14} className="text-white" />
              </div>
            </div>
            
            <div className="text-center sm:text-left flex-1 pt-2 sm:pt-0 sm:pb-2">
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground">{name}</h1>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-2 text-muted-foreground">
                <span className="flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                  <Heart size={14} /> {role}
                </span>
                <span className="flex items-center gap-1.5 text-sm">
                  <Calendar size={14} /> Joined {joinDate}
                </span>
              </div>
            </div>

            <div className="sm:pb-2 flex gap-3">
              <Link to="/admin/members" className="px-5 py-2.5 bg-card hover:bg-black/5 dark:hover:bg-white/5 border border-border rounded-xl text-foreground text-sm font-medium transition shadow-sm">
                Edit Profile
              </Link>
              <Link to="/admin/cms" className="px-5 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl text-sm font-medium transition shadow-md shadow-primary/20">
                View Tasks
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Stats & Details */}
            <div className="lg:col-span-1 space-y-8">
              {/* Quick Stats */}
              <div className="bg-card rounded-3xl border border-border p-6 shadow-sm">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Activity size={18} className="text-primary" /> 
                  Your Impact
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black/5 dark:bg-white/5 p-4 rounded-2xl flex flex-col items-center justify-center text-center">
                    <span className="text-2xl font-bold text-foreground">{stats.events}</span>
                    <span className="text-xs text-muted-foreground font-medium mt-1 uppercase tracking-wider">Events</span>
                  </div>
                  <div className="bg-primary/10 p-4 rounded-2xl flex flex-col items-center justify-center text-center">
                    <span className="text-2xl font-bold text-primary">{stats.hours}h</span>
                    <span className="text-xs text-primary/70 font-medium mt-1 uppercase tracking-wider">Logged</span>
                  </div>
                  <div className="bg-black/5 dark:bg-white/5 p-4 rounded-2xl flex flex-col items-center justify-center text-center">
                    <span className="text-2xl font-bold text-foreground">{stats.uploads}</span>
                    <span className="text-xs text-muted-foreground font-medium mt-1 uppercase tracking-wider">Uploads</span>
                  </div>
                  <div className="bg-black/5 dark:bg-white/5 p-4 rounded-2xl flex flex-col items-center justify-center text-center">
                    <span className="text-2xl font-bold text-foreground">1</span>
                    <span className="text-xs text-muted-foreground font-medium mt-1 uppercase tracking-wider">Badges</span>
                  </div>
                </div>
              </div>

              {/* Badges & Achievements */}
              <div className="bg-card rounded-3xl border border-border p-6 shadow-sm">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Award size={18} className="text-yellow-500" /> 
                  Achievements
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-yellow-500/20 flex items-center justify-center text-yellow-600 shrink-0">
                      <Star size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-foreground">Registered Member</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">Officially joined the team.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Activity Timeline & Security */}
            <div className="lg:col-span-2 space-y-8">
              {/* Timeline */}
              <div className="bg-card rounded-3xl border border-border p-6 sm:p-8 shadow-sm">
                <h3 className="font-semibold text-foreground mb-6 flex items-center gap-2 text-lg">
                  <Clock size={20} className="text-primary" /> 
                  Your Recent Activity
                </h3>
                
                <div className="relative border-l-2 border-border/60 ml-4 space-y-8 pb-4">
                  {userActivities.length === 0 && (
                    <div className="pl-8 text-muted-foreground">No recent activity.</div>
                  )}
                  {userActivities.map((activity, idx) => (
                    <div key={activity.id} className="relative pl-8">
                      <div className={`absolute -left-[11px] top-1 w-5 h-5 rounded-full ring-4 ring-card flex items-center justify-center ${idx === 0 ? 'bg-primary' : 'bg-black/10 dark:bg-white/10'}`}>
                        {idx === 0 && <div className="w-2 h-2 rounded-full bg-primary-foreground"></div>}
                      </div>
                      <div className="mb-1 flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-foreground">{activity.action}</h4>
                        <span className="text-xs font-medium text-muted-foreground bg-black/5 dark:bg-white/5 px-2 py-1 rounded-full">{activity.time}</span>
                      </div>
                      
                      {activity.type === 'drive' && (
                        <div className="flex gap-2 mt-3">
                          <div className="w-10 h-10 rounded-xl bg-black/5 dark:bg-white/5 border border-border flex items-center justify-center text-muted-foreground">
                            <HardDrive size={16} />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>


            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
