const INDEXNOW_KEY = 'd87ca7b5b2b48bd3e10c991b60419fcf'
const SITE_URL = 'https://www.eventspheresolutions.com'

/** Pings the IndexNow protocol (Bing, Yandex and other participating engines) so pages get
 * crawled right away instead of waiting on the next scheduled crawl. Best-effort: a failure here
 * never blocks whatever triggered it — the page still shows up via the sitemap eventually. */
export async function submitToIndexNow(paths) {
  if (!paths.length) return
  const host = new URL(SITE_URL).host
  await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host,
      key: INDEXNOW_KEY,
      keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
      urlList: paths.map((p) => `${SITE_URL}${p.startsWith('/') ? p : `/${p}`}`),
    }),
    signal: AbortSignal.timeout(10_000),
  }).catch((err) => console.error('[indexNow] submit failed:', err))
}
