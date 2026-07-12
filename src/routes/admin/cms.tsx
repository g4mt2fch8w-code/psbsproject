import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '@/lib/firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { Puck } from '@measured/puck'
import '@/lib/puck-local.css'
import { puckConfig } from '@/lib/puck.config'
import { ThemeToggle } from '@/components/site/ThemeToggle'
import { NotificationsDropdown } from '@/components/admin/NotificationsDropdown'
import { ChevronLeft } from 'lucide-react'
import { logActivity } from '@/lib/activity'

export const Route = createFileRoute('/admin/cms')({
  component: AdminCMS,
})

const PAGES = ['home', 'about', 'wildlife', 'projects', 'news', 'contact']

import { defaultLayouts } from '@/lib/defaultLayouts'

function getInitialData(pageId: string): any {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(`puck_page_${pageId}`)
    if (saved) {
      try { 
        const parsed = JSON.parse(saved);
        // If it's a completely empty canvas that was saved by mistake, ignore it
        if (parsed && parsed.content && parsed.content.length > 0) {
          return parsed;
        }
      } catch(e) {}
    }
  }
  return defaultLayouts[pageId] || { content: [], root: {}, zones: {} }
}

function AdminCMS() {
  const [pageId, setPageId] = useState('home')
  const [data, setData] = useState<any>(() => getInitialData('home'))
  const [authChecked, setAuthChecked] = useState(false)
  const navigate = useNavigate()

  // Auth check only — data is already loaded synchronously above
  useEffect(() => {
    const isTempAuth = localStorage.getItem('temp_admin_auth')
    if (isTempAuth) {
      setAuthChecked(true)
      return
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate({ to: '/login' })
      } else {
        setAuthChecked(true)
        // Optionally load from Firebase
        loadFromFirebase(pageId)
      }
    })
    return () => unsubscribe()
  }, [navigate])

  // When page changes, reload data from local storage or default
  useEffect(() => {
    const isTempAuth = localStorage.getItem('temp_admin_auth')
    if (isTempAuth) {
      setData(getInitialData(pageId))
    } else if (authChecked) {
      loadFromFirebase(pageId)
    }
  }, [pageId])

  const loadFromFirebase = async (id: string) => {
    try {
      const docSnap = await getDoc(doc(db, 'pages', id))
      if (docSnap.exists() && docSnap.data().content) {
        setData(docSnap.data().content)
      }
    } catch (e) {
      console.error('Firebase load failed, using default:', e)
    }
  }

  const handlePublish = async (newData: any) => {
    try {
      const isTempAuth = localStorage.getItem('temp_admin_auth')
      if (isTempAuth) {
        localStorage.setItem(`puck_page_${pageId}`, JSON.stringify(newData))
        alert('Page published locally!')
        return
      }
      await setDoc(doc(db, 'pages', pageId), { content: newData }, { merge: true })
      const userEmail = auth.currentUser?.email || 'Admin'
      await logActivity(userEmail, `Published layout changes to ${pageId} page`, 'content')
      alert('Page published to Firebase!')
    } catch (error: any) {
      console.error('Failed to publish:', error)
      alert(`Could not publish: ${error.message}`)
    }
  }

  const handleReset = () => {
    if (confirm(`Are you sure you want to reset the ${pageId} page to its default layout? All unsaved changes will be lost.`)) {
      localStorage.removeItem(`puck_page_${pageId}`);
      setData(defaultLayouts[pageId] || { content: [], root: {}, zones: {} });
    }
  }

  return (
    <div className="h-screen w-full flex flex-col bg-background font-sans">
      <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6 shrink-0 z-10">
        <div className="flex items-center gap-4">
          <Link to="/admin/dashboard" className="text-muted-foreground hover:text-foreground transition p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5">
            <ChevronLeft size={20} />
          </Link>
          <h1 className="font-bold text-lg hidden md:block">Visual Page Builder</h1>
          <select
            value={pageId}
            onChange={(e) => setPageId(e.target.value)}
            className="bg-black/5 dark:bg-white/5 border border-border rounded-lg px-3 py-1.5 text-sm outline-none focus:border-primary"
          >
            {PAGES.map(p => <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>)}
          </select>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={handleReset}
            className="text-xs font-semibold px-3 py-1.5 bg-red-500/10 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-500/20 transition"
          >
            Reset Layout
          </button>
          <NotificationsDropdown />
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-1 overflow-hidden relative">
        <Puck
          key={pageId}
          config={puckConfig}
          data={data}
          onPublish={handlePublish}
        />
      </main>
    </div>
  )
}
