import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth, db } from '@/lib/firebase'
import { collection, onSnapshot, query, orderBy, addDoc, updateDoc, doc, serverTimestamp, deleteDoc } from 'firebase/firestore'
import { logActivity } from '@/lib/activity'
import { ThemeToggle } from '@/components/site/ThemeToggle'
import { NotificationsDropdown } from '@/components/admin/NotificationsDropdown'
import { 
  Users, UserPlus, Settings, Activity, ShieldAlert,
  Search, Filter, MoreVertical, Edit2, Lock, Trash2, 
  CheckCircle2, Clock, ShieldCheck, Mail, LogOut, HardDrive, X
} from 'lucide-react'

export const Route = createFileRoute('/admin/members')({
  component: MembersLayout,
})

function MembersLayout() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'directory' | 'activity'>('directory')
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingMember, setEditingMember] = useState<any>(null)
  const [editName, setEditName] = useState('')
  const [editEmail, setEditEmail] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  const navigate = useNavigate()

  // Firestore Data States
  const [members, setMembers] = useState<any[]>([])
  const [activities, setActivities] = useState<any[]>([])
  
  // New Member Form State
  const [newEmail, setNewEmail] = useState('')
  const [newName, setNewName] = useState('')
  const [newRole, setNewRole] = useState('Volunteer')
  const [isAdding, setIsAdding] = useState(false)

  useEffect(() => {
    // TEMPORARY BYPASS
    const isTempAuth = localStorage.getItem('temp_admin_auth')
    if (isTempAuth) {
      setUser({ email: 'admin@bhandara.local' })
      setLoading(false)
    } else {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (!currentUser) navigate({ to: '/login' })
        else {
          setUser(currentUser)
          setLoading(false)
        }
      })
      return () => unsubscribe()
    }
  }, [navigate])

  useEffect(() => {
    // Fetch users
    const unsubscribeUsers = onSnapshot(collection(db, 'users'), (snapshot) => {
      setMembers(snapshot.docs.map(d => ({ id: d.id, ...d.data() })))
    })

    // Fetch activities
    const unsubscribeActivities = onSnapshot(query(collection(db, 'activities'), orderBy('timestamp', 'desc')), (snapshot) => {
      setActivities(snapshot.docs.map(d => {
        const data = d.data()
        return {
          id: d.id,
          ...data,
          time: data.timestamp ? new Date(data.timestamp.toDate()).toLocaleString() : 'Just now'
        }
      }))
    })

    return () => {
      unsubscribeUsers()
      unsubscribeActivities()
    }
  }, [])

  const handleLogout = async () => {
    localStorage.removeItem('temp_admin_auth')
    try { await signOut(auth) } catch(e) {}
    navigate({ to: '/login' })
  }

  const handleAddMember = async () => {
    if (!newEmail || !newName) return
    setIsAdding(true)
    try {
      await addDoc(collection(db, 'users'), {
        email: newEmail,
        name: newName,
        role: newRole,
        status: 'Pending',
        lastLogin: 'Never',
        stats: { hours: 0, events: 0, uploads: 0 },
        createdAt: serverTimestamp()
      })
      await logActivity(user?.email || 'Admin', `Invited ${newEmail} as ${newRole}`, 'security')
      setIsAddModalOpen(false)
      setNewEmail('')
      setNewName('')
      setNewRole('Volunteer')
    } catch (error) {
      console.error(error)
      alert("Failed to add member")
    } finally {
      setIsAdding(false)
    }
  }

  const handleUpdateRole = async (memberId: string, newRole: string) => {
    await updateDoc(doc(db, 'users', memberId), { role: newRole })
    await logActivity(user?.email || 'Admin', `Updated role to ${newRole}`, 'security')
  }

  const handleUpdateStatus = async (memberId: string, newStatus: string) => {
    await updateDoc(doc(db, 'users', memberId), { status: newStatus })
    await logActivity(user?.email || 'Admin', `Changed status to ${newStatus}`, 'security')
  }

  const handleSeedTestUsers = async () => {
    const testUsers = [
      { email: 'sarah.connor@bhandara.local', name: 'Sarah Connor', role: 'Content Editor', status: 'Active', lastLogin: '1 hour ago', stats: { hours: 42, events: 5, uploads: 12 } },
      { email: 'john.smith@bhandara.local', name: 'John Smith', role: 'Observer', status: 'Active', lastLogin: '2 days ago', stats: { hours: 10, events: 1, uploads: 0 } },
      { email: 'emma.watson@bhandara.local', name: 'Emma Watson', role: 'Volunteer', status: 'Pending', lastLogin: 'Never', stats: { hours: 0, events: 0, uploads: 0 } },
      { email: 'bruce.wayne@bhandara.local', name: 'Bruce Wayne', role: 'Admin', status: 'Active', lastLogin: 'Just now', stats: { hours: 120, events: 15, uploads: 50 } },
      { email: 'clark.kent@bhandara.local', name: 'Clark Kent', role: 'Volunteer', status: 'Suspended', lastLogin: '1 month ago', stats: { hours: 5, events: 1, uploads: 2 } },
    ]
    
    for (const u of testUsers) {
      await addDoc(collection(db, 'users'), { ...u, createdAt: serverTimestamp() })
    }
    await logActivity(user?.email || 'Admin', `Seeded 5 test users`, 'system')
    alert("Test users added successfully!")
  }

  const handleDeleteMember = async (memberId: string, memberEmail: string) => {
    if (!confirm(`Are you sure you want to delete ${memberEmail}?`)) return
    try {
      await deleteDoc(doc(db, 'users', memberId))
      await logActivity(user?.email || 'Admin', `Deleted member: ${memberEmail}`, 'security')
    } catch (error) {
      console.error(error)
      alert("Failed to delete member")
    }
  }

  const openEditModal = (member: any) => {
    setEditingMember(member)
    setEditName(member.name || '')
    setEditEmail(member.email || '')
    setIsEditModalOpen(true)
  }

  const handleEditMember = async () => {
    if (!editingMember) return
    setIsEditing(true)
    try {
      await updateDoc(doc(db, 'users', editingMember.id), {
        name: editName,
        email: editEmail
      })
      await logActivity(user?.email || 'Admin', `Edited profile for ${editingMember.email}`, 'system')
      setIsEditModalOpen(false)
    } catch (error) {
      console.error(error)
      alert("Failed to update profile")
    } finally {
      setIsEditing(false)
    }
  }

  if (loading) {
    return <div className="min-h-screen bg-background flex items-center justify-center text-primary">Loading...</div>
  }

  const filteredMembers = members.filter(m => 
    (m.name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) || 
    (m.email?.toLowerCase() || '').includes(searchQuery.toLowerCase())
  )

  const activeAdminsCount = members.filter(m => m.role === 'Admin' && m.status === 'Active').length
  const pendingCount = members.filter(m => m.status === 'Pending').length

  return (
    <div className="min-h-screen bg-background text-foreground flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card p-6 hidden md:flex flex-col relative shrink-0">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-foreground">Admin Console</h2>
          <div className="flex items-center gap-2">
            <NotificationsDropdown />
            <ThemeToggle />
          </div>
        </div>
        <nav className="space-y-2 flex-1">
          <Link to="/admin/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 transition">
            <Activity size={18} /> Dashboard
          </Link>
          <Link to="/admin/cms" className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 transition">
            <Edit2 size={18} /> Content Editor
          </Link>
          <Link to="/admin/drive" className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 transition">
            <HardDrive size={18} /> Cloud Drive
          </Link>
          <Link to="/admin/members" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 text-primary font-medium transition">
            <Users size={18} /> Members & Access
          </Link>
        </nav>
        <div className="absolute bottom-6 left-6 right-6">
          <div className="p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-border/50">
            <p className="text-sm font-medium truncate mb-1">{user?.email}</p>
            <p className="text-xs text-muted-foreground mb-3">Super Admin</p>
            <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-red-500 hover:text-red-600 transition w-full">
              <LogOut size={16} /> Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-border bg-card/50 backdrop-blur-md px-8 flex items-center justify-between shrink-0">
          <h1 className="text-xl font-semibold flex items-center gap-2">
            <Users className="text-primary" /> Members & Access
          </h1>
          <div className="flex items-center gap-4">
            <button 
              onClick={handleSeedTestUsers}
              className="flex items-center gap-2 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-foreground px-4 py-2 rounded-xl text-sm font-medium transition"
              title="Add mock users for testing"
            >
              Seed Data
            </button>
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-xl text-sm font-medium transition shadow-sm"
            >
              <UserPlus size={16} /> Add Member
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-6xl mx-auto space-y-8">
            
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-card border border-border p-5 rounded-2xl shadow-sm">
                <p className="text-sm text-muted-foreground font-medium mb-1">Total Members</p>
                <div className="flex items-end justify-between">
                  <h3 className="text-3xl font-bold text-foreground">{members.length}</h3>
                  <span className="text-xs font-medium text-green-500 bg-green-500/10 px-2 py-1 rounded-full">Active DB</span>
                </div>
              </div>
              <div className="bg-card border border-border p-5 rounded-2xl shadow-sm">
                <p className="text-sm text-muted-foreground font-medium mb-1">Active Admins</p>
                <div className="flex items-end justify-between">
                  <h3 className="text-3xl font-bold text-foreground">{activeAdminsCount}</h3>
                  <ShieldCheck className="text-primary opacity-50" size={24} />
                </div>
              </div>
              <div className="bg-card border border-border p-5 rounded-2xl shadow-sm">
                <p className="text-sm text-muted-foreground font-medium mb-1">Pending Invites</p>
                <div className="flex items-end justify-between">
                  <h3 className="text-3xl font-bold text-foreground">{pendingCount}</h3>
                  <Mail className="text-orange-500 opacity-50" size={24} />
                </div>
              </div>
              <div className="bg-card border border-border p-5 rounded-2xl shadow-sm">
                <p className="text-sm text-muted-foreground font-medium mb-1">Activity Logs</p>
                <div className="flex items-end justify-between">
                  <h3 className="text-3xl font-bold text-foreground">{activities.length}</h3>
                  <Activity className="text-blue-500 opacity-50" size={24} />
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-6 border-b border-border">
              <button 
                onClick={() => setActiveTab('directory')}
                className={`pb-3 text-sm font-medium transition border-b-2 ${activeTab === 'directory' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
              >
                Member Directory
              </button>
              <button 
                onClick={() => setActiveTab('activity')}
                className={`pb-3 text-sm font-medium transition border-b-2 ${activeTab === 'activity' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
              >
                Activity Logs
              </button>
            </div>

            {/* Tab Content: Directory */}
            {activeTab === 'directory' && (
              <div className="space-y-4">
                {/* Search & Filter */}
                <div className="flex items-center gap-3">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                    <input 
                      type="text" 
                      placeholder="Search members by name or email..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-xl text-sm focus:outline-none focus:border-primary transition"
                    />
                  </div>
                </div>

                {/* Table */}
                <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                      <thead className="bg-black/5 dark:bg-white/5 text-muted-foreground">
                        <tr>
                          <th className="px-6 py-4 font-medium">User</th>
                          <th className="px-6 py-4 font-medium">Role & Access</th>
                          <th className="px-6 py-4 font-medium">Status</th>
                          <th className="px-6 py-4 font-medium">Last Login</th>
                          <th className="px-6 py-4 font-medium text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {filteredMembers.map(member => (
                          <tr key={member.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold uppercase">
                                  {member.name?.charAt(0) || '?'}
                                </div>
                                <div>
                                  <p className="font-medium text-foreground">{member.name}</p>
                                  <p className="text-xs text-muted-foreground">{member.email}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <select 
                                value={member.role} 
                                onChange={(e) => handleUpdateRole(member.id, e.target.value)}
                                className={`px-2 py-1 rounded-lg text-xs font-medium border-0 outline-none cursor-pointer ${
                                  member.role === 'Admin' ? 'bg-primary/20 text-primary' : 
                                  member.role === 'Content Editor' ? 'bg-blue-500/20 text-blue-500' : 
                                  'bg-black/10 dark:bg-white/10 text-muted-foreground'
                                }`}
                              >
                                <option value="Admin">Admin</option>
                                <option value="Content Editor">Content Editor</option>
                                <option value="Volunteer">Volunteer</option>
                                <option value="Observer">Observer</option>
                              </select>
                            </td>
                            <td className="px-6 py-4">
                              <select 
                                value={member.status} 
                                onChange={(e) => handleUpdateStatus(member.id, e.target.value)}
                                className={`flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-medium border-0 outline-none cursor-pointer ${
                                  member.status === 'Active' ? 'text-green-500 bg-green-500/10' : 
                                  member.status === 'Suspended' ? 'text-red-500 bg-red-500/10' : 
                                  'text-orange-500 bg-orange-500/10'
                                }`}
                              >
                                <option value="Active">Active</option>
                                <option value="Pending">Pending</option>
                                <option value="Suspended">Suspended</option>
                              </select>
                            </td>
                            <td className="px-6 py-4 text-muted-foreground">
                              {member.lastLogin || 'Never'}
                            </td>
                            <td className="px-6 py-4 text-right">
                              <button 
                                onClick={() => openEditModal(member)}
                                className="p-2 hover:bg-blue-500/10 text-muted-foreground hover:text-blue-500 rounded-lg transition mr-1"
                                title="Edit Member"
                              >
                                <Edit2 size={16} />
                              </button>
                              <button 
                                onClick={() => handleDeleteMember(member.id, member.email)}
                                className="p-2 hover:bg-red-500/10 text-muted-foreground hover:text-red-500 rounded-lg transition"
                                title="Delete Member"
                              >
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        ))}
                        {filteredMembers.length === 0 && (
                          <tr>
                            <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                              No members found. Try adding one!
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Tab Content: Activity Logs */}
            {activeTab === 'activity' && (
              <div className="bg-card border border-border rounded-2xl shadow-sm p-6">
                <div className="space-y-6">
                  {activities.map(activity => (
                    <div key={activity.id} className="flex gap-4">
                      <div className="mt-1">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                          activity.type === 'security' ? 'bg-red-500/20 text-red-500' :
                          activity.type === 'content' ? 'bg-blue-500/20 text-blue-500' :
                          activity.type === 'system' ? 'bg-orange-500/20 text-orange-500' :
                          'bg-primary/20 text-primary'
                        }`}>
                          {activity.type === 'security' && <Lock size={14} />}
                          {activity.type === 'content' && <Edit2 size={14} />}
                          {activity.type === 'system' && <Settings size={14} />}
                          {activity.type === 'drive' && <HardDrive size={14} />}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-foreground">
                          <span className="font-semibold">{activity.user}</span> {activity.action}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                  {activities.length === 0 && (
                    <div className="text-center text-muted-foreground py-8">
                      No activities logged yet.
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>
        </div>
      </main>

      {/* Add Member Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <UserPlus className="text-primary" size={20} /> Add New Member
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1 block">Email Address</label>
                <input 
                  type="email" 
                  value={newEmail}
                  onChange={e => setNewEmail(e.target.value)}
                  placeholder="member@example.com" 
                  className="w-full bg-black/5 dark:bg-white/5 border border-transparent focus:border-primary px-4 py-2.5 rounded-xl text-sm transition outline-none" 
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1 block">Full Name</label>
                <input 
                  type="text" 
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  placeholder="e.g. Jane Doe" 
                  className="w-full bg-black/5 dark:bg-white/5 border border-transparent focus:border-primary px-4 py-2.5 rounded-xl text-sm transition outline-none" 
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1 block">Assign Role</label>
                <select 
                  value={newRole}
                  onChange={e => setNewRole(e.target.value)}
                  className="w-full bg-black/5 dark:bg-white/5 border border-transparent focus:border-primary px-4 py-2.5 rounded-xl text-sm transition outline-none"
                >
                  <option value="Volunteer">Volunteer</option>
                  <option value="Content Editor">Content Editor</option>
                  <option value="Admin">Admin</option>
                  <option value="Observer">Observer</option>
                </select>
              </div>
              <div className="bg-primary/10 p-4 rounded-xl mt-4">
                <p className="text-xs text-primary font-medium flex items-start gap-2">
                  <ShieldAlert size={14} className="shrink-0 mt-0.5" />
                  This user will be added to the database. (In a real app, an email invite would be sent here).
                </p>
              </div>
            </div>
            <div className="p-6 border-t border-border bg-black/5 dark:bg-white/5 flex justify-end gap-3">
              <button onClick={() => setIsAddModalOpen(false)} className="px-5 py-2.5 text-sm font-medium text-foreground hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition">Cancel</button>
              <button disabled={isAdding || !newEmail || !newName} onClick={handleAddMember} className="px-5 py-2.5 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl transition shadow-sm disabled:opacity-50">
                {isAdding ? 'Adding...' : 'Add Member'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Member Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <Edit2 className="text-blue-500" size={20} /> Edit Profile
              </h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1 block">Email Address</label>
                <input 
                  type="email" 
                  value={editEmail}
                  onChange={e => setEditEmail(e.target.value)}
                  className="w-full bg-black/5 dark:bg-white/5 border border-transparent focus:border-primary px-4 py-2.5 rounded-xl text-sm transition outline-none" 
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1 block">Full Name</label>
                <input 
                  type="text" 
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  className="w-full bg-black/5 dark:bg-white/5 border border-transparent focus:border-primary px-4 py-2.5 rounded-xl text-sm transition outline-none" 
                />
              </div>
            </div>
            <div className="p-6 border-t border-border bg-black/5 dark:bg-white/5 flex justify-end gap-3">
              <button onClick={() => setIsEditModalOpen(false)} className="px-5 py-2.5 text-sm font-medium text-foreground hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition">Cancel</button>
              <button disabled={isEditing || !editEmail || !editName} onClick={handleEditMember} className="px-5 py-2.5 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl transition shadow-sm disabled:opacity-50">
                {isEditing ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
