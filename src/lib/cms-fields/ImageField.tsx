import React, { useState } from 'react'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { storage } from '@/lib/firebase'
import { Image as ImageIcon, Upload, X, Loader2 } from 'lucide-react'

interface ImageFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export function ImageField({ value, onChange }: ImageFieldProps) {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setProgress(0)

    try {
      const filename = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`
      const storageRef = ref(storage, `cms-uploads/${filename}`)
      
      const uploadTask = uploadBytesResumable(storageRef, file)
      
      uploadTask.on('state_changed', 
        (snapshot) => {
          const p = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          setProgress(Math.round(p))
        },
        (error) => {
          console.error("Upload failed:", error)
          alert("Failed to upload image. Please try again.")
          setUploading(false)
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
          onChange(downloadURL)
          setUploading(false)
        }
      )
    } catch (err) {
      console.error(err)
      setUploading(false)
    }
  }

  return (
    <div className="flex flex-col gap-3">
      {value ? (
        <div className="relative group rounded-lg overflow-hidden border border-border/50 bg-black/10">
          <img 
            src={value} 
            alt="Uploaded content" 
            className="w-full h-32 object-cover"
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button 
              onClick={() => onChange('')}
              className="bg-red-500/90 text-white p-2 rounded-full hover:bg-red-500 transition"
              title="Remove Photo"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      ) : (
        <div className="relative">
          <input 
            type="file" 
            accept="image/*"
            onChange={handleUpload}
            disabled={uploading}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
          />
          <div className={`flex flex-col items-center justify-center p-6 border-2 border-dashed border-border rounded-lg text-muted-foreground transition ${uploading ? 'bg-black/5' : 'hover:bg-black/5 hover:border-primary/50'}`}>
            {uploading ? (
              <>
                <Loader2 size={24} className="animate-spin mb-2 text-primary" />
                <span className="text-xs font-medium">Uploading {progress}%</span>
              </>
            ) : (
              <>
                <Upload size={24} className="mb-2" />
                <span className="text-sm font-medium">Click to upload photo</span>
              </>
            )}
          </div>
        </div>
      )}
      
      {/* Hidden manual input just in case */}
      <input 
        type="text" 
        value={value || ''} 
        onChange={(e) => onChange(e.target.value)}
        placeholder="Or paste an image URL here..."
        className="text-xs px-2 py-1.5 bg-black/5 border border-border rounded w-full outline-none focus:border-primary"
      />
    </div>
  )
}
