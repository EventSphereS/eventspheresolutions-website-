'use client'
import { useState } from 'react'
import { upload } from '@vercel/blob/client'

// Lightweight deterrent against automated/opportunistic abuse of this unlisted endpoint — not a defense against a targeted attacker with page access, since any client-side value is technically inspectable.
const UPLOAD_SECRET = process.env.NEXT_PUBLIC_PARTNER_UPLOAD_SECRET

export default function PartnerFileUpload({ label, hint, accept, multiple = false, onUploaded }) {
  const [status, setStatus] = useState('idle')
  const [fileNames, setFileNames] = useState([])
  const [error, setError] = useState('')

  const handleChange = async (e) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return
    setStatus('uploading')
    setError('')
    const urls = []
    const uploadedNames = []
    let failedFileName = ''

    // Upload each file individually so a mid-batch failure doesn't discard the
    // files that already succeeded (which would orphan them in Blob storage).
    for (const file of files) {
      try {
        const blob = await upload(`partner-onboarding/${file.name}`, file, {
          access: 'private',
          handleUploadUrl: '/api/partner-onboarding/upload',
          clientPayload: UPLOAD_SECRET,
        })
        urls.push(blob.url)
        uploadedNames.push(file.name)
      } catch (err) {
        console.error('Partner onboarding upload failed', err)
        failedFileName = file.name
        break
      }
    }

    if (urls.length > 0) {
      setFileNames(uploadedNames)
      onUploaded(multiple ? urls : urls[0])
    }

    if (failedFileName) {
      setStatus('error')
      setError(`${failedFileName} failed to upload. ${urls.length ? 'Other files were saved. ' : ''}Please try again or email the file to hello@eventspheresolutions.com.`)
    } else {
      setStatus('done')
    }
  }

  return (
    <div>
      <label className="block text-sm font-semibold text-[#222123] mb-1.5">{label}</label>
      <input
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleChange}
        className="w-full text-sm text-gray-600 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:bg-[#6a256f] file:text-white file:font-semibold file:text-sm hover:file:opacity-90 file:cursor-pointer"
      />
      {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
      {status === 'uploading' && <p className="text-xs text-[#E07B20] mt-1">Uploading...</p>}
      {status === 'done' && <p className="text-xs text-green-600 mt-1">✓ {fileNames.join(', ')} uploaded</p>}
      {status === 'error' && <p className="text-xs text-[#EF4561] mt-1">{error}</p>}
    </div>
  )
}
