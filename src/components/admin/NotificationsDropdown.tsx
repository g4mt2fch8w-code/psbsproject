import { useState } from 'react'
import { Bell, CheckCircle2 } from 'lucide-react'

export const NotificationsDropdown = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="hover:text-foreground transition text-muted-foreground hidden sm:block relative p-1"
      >
        <Bell size={20} />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 top-full mt-3 w-80 bg-card border border-border rounded-2xl shadow-xl overflow-hidden z-50 animate-in slide-in-from-top-2">
          <div className="p-4 border-b border-border bg-black/5 dark:bg-white/5">
            <h3 className="font-semibold text-sm text-foreground">Notifications</h3>
          </div>
          <div className="p-8 text-center flex flex-col items-center">
            <div className="w-12 h-12 bg-green-500/10 text-green-600 rounded-full flex items-center justify-center mb-3">
              <CheckCircle2 size={24} />
            </div>
            <p className="text-sm font-medium text-foreground mb-1">It's quiet in the forest...</p>
            <p className="text-xs text-muted-foreground">The crickets are chirping, but there are no new notifications for you!</p>
          </div>
        </div>
      )}
    </div>
  )
}
