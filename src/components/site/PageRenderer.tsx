import { useEffect, useState } from 'react'
import { Render } from '@measured/puck'
import { puckConfig } from '@/lib/puck.config'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { defaultLayouts } from '@/lib/defaultLayouts'

export function PageRenderer({ pageId }: { pageId: string }) {
  // Synchronously initialize with default layout for instant SSR & Client render
  const [data, setData] = useState<any>(defaultLayouts[pageId] || null)

  useEffect(() => {
    async function loadData() {
      if (typeof window === 'undefined') return;
      
      try {
        // If we have temporary auth and local data, prioritize that (for previewing edits)
        const isTempAuth = localStorage.getItem('temp_admin_auth')
        if (isTempAuth) {
          const localData = localStorage.getItem(`puck_page_${pageId}`)
          if (localData) {
             setData(JSON.parse(localData))
             return
          }
        }

        const docRef = doc(db, 'pages', pageId)
        const docSnap = await getDoc(docRef)
        
        if (docSnap.exists() && docSnap.data().content) {
          setData(docSnap.data())
        }
      } catch (e) {
        console.error("Failed to load page from database:", e)
      }
    }
    loadData()
  }, [pageId])

  if (!data || !data.content) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center bg-ink">
        <h2 className="text-3xl font-display text-[color:var(--gold)] mb-4">Page Under Construction</h2>
        <p className="text-fog/70">The admin has not published content for this page yet.</p>
      </div>
    )
  }

  return <Render config={puckConfig} data={data} />
}
