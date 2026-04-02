import { getAllPosts } from '@/lib/blog-posts'

export default function sitemap() {
  const baseUrl = 'https://www.eventspheresolutions.com'
  const lastModified = new Date()

  const staticRoutes = [
    { url: baseUrl, lastModified, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/platform`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/services`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/pricing`, lastModified, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/founding-partner`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/blog`, lastModified, changeFrequency: 'weekly', priority: 0.8 },
  ]

  const blogRoutes = getAllPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticRoutes, ...blogRoutes]
}
