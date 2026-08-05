import { handleUpload } from '@vercel/blob/client'

const ALLOWED_CONTENT_TYPES = [
  'image/png',
  'image/jpeg',
  'image/webp',
  'application/pdf',
  'text/csv',
  'text/plain',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]

const PATH_PREFIX = 'partner-onboarding/'

export async function POST(request) {
  try {
    const body = await request.json()

    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        // Throwing here rejects the request before any token or blob is created.
        // Fail closed if the secret isn't configured, rather than letting two
        // undefined values compare equal and silently disable the gate.
        if (!process.env.NEXT_PUBLIC_PARTNER_UPLOAD_SECRET || clientPayload !== process.env.NEXT_PUBLIC_PARTNER_UPLOAD_SECRET) {
          throw new Error('Unauthorized upload request')
        }
        if (!pathname.startsWith(PATH_PREFIX)) {
          throw new Error('Invalid upload path')
        }
        return {
          allowedContentTypes: ALLOWED_CONTENT_TYPES,
          addRandomSuffix: true,
          maximumSizeInBytes: 25 * 1024 * 1024,
        }
      },
      onUploadCompleted: async ({ blob }) => {
        console.log('Partner onboarding file uploaded:', blob.url)
      },
    })

    return Response.json(jsonResponse)
  } catch (error) {
    console.error('Partner onboarding upload error:', error)
    return Response.json({ error: 'Upload failed' }, { status: 400 })
  }
}
