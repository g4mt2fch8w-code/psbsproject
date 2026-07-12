import { createFileRoute, Link, Outlet, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { ThemeToggle } from '@/components/site/ThemeToggle'

export const Route = createFileRoute('/admin/dashboard')({
  component: AdminLayout,
})

function AdminLayout() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    // TEMPORARY BYPASS
    const isTempAuth = localStorage.getItem('temp_admin_auth')
    if (isTempAuth) {
      setUser({ email: 'admin@bhandara.local' })
      setLoading(false)
      return
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) navigate({ to: '/login' })
      else {
        setUser(currentUser)
        setLoading(false)
      }
    })
    return () => unsubscribe()
  }, [navigate])

  const handleLogout = async () => {
    localStorage.removeItem('temp_admin_auth')
    try { await signOut(auth) } catch(e) {}
    navigate({ to: '/login' })
  }

  if (loading) {
    return <div className="min-h-screen bg-ink flex items-center justify-center text-gold">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-ink text-fog flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 bg-white/5 p-6 flex flex-col hidden md:flex relative">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-display text-gold">Admin Console</h2>
          <ThemeToggle />
        </div>
        <nav className="space-y-4 flex-1">
          <Link to="/admin/dashboard" className="block text-fog/70 hover:text-gold transition">Dashboard Home</Link>
          <Link to="/admin/cms" className="block text-fog/70 hover:text-gold transition">Content Editor</Link>
          <Link to="/admin/drive" className="block text-fog/70 hover:text-gold transition">Cloud Drive</Link>
          <Link to="/admin/members" className="block text-fog/70 hover:text-gold transition">Members & Access</Link>
        </nav>
        <div className="absolute bottom-6 left-6">
          <p className="text-xs text-fog/50 mb-2">{user?.email}</p>
          <button onClick={handleLogout} className="text-sm text-red-400 hover:text-red-300">
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <h1 className="text-3xl font-display mb-8">Welcome back, Admin</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-medium text-gold mb-2">Content Management</h3>
            <p className="text-sm text-fog/60 mb-4">Edit the text and data points that appear on your live site.</p>
            <Link to="/admin/cms" className="text-sm text-gold underline">Open CMS</Link>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-medium text-gold mb-2">Cloud Drive</h3>
            <p className="text-sm text-fog/60 mb-4">Upload and manage images remotely to keep the site fast.</p>
            <Link to="/admin/drive" className="text-sm text-gold underline">Open Drive</Link>
          </div>
        </div>
      </main>
    </div>
  )
}
