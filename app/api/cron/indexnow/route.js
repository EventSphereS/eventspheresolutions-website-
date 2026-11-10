import sitemap from '@/app/sitemap'
import { submitToIndexNow } from '@/lib/indexNow'

export const maxDuration = 30

/** Runs on a schedule (see vercel.json). Re-submits every URL currently in the sitemap to
 * IndexNow, so Bing and other participating engines pick up new blog posts and edited pages
 * without waiting for their own crawl cycle. Blog posts here are added by code deploy rather than
 * a runtime publish action, so this daily sweep (not a per-publish hook) is what actually gets a
 * new post pushed to Bing quickly. */
export async function GET(request) {
  const expected = process.env.CRON_SECRET
  if (!expected || request.headers.get('authorization') !== `Bearer ${expected}`) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const entries = sitemap()
  const paths = entries.map((e) => new URL(e.url).pathname || '/')
  await submitToIndexNow(paths)

  return Response.json({ submitted: paths.length })
}
