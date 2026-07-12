import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from './firebase'

export type ActivityType = 'security' | 'content' | 'system' | 'drive'

export async function logActivity(userEmail: string, action: string, type: ActivityType) {
  try {
    await addDoc(collection(db, 'activities'), {
      user: userEmail,
      action,
      type,
      timestamp: serverTimestamp()
    })
  } catch (error) {
    console.error('Failed to log activity:', error)
  }
}
