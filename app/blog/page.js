import Link from 'next/link'
import { getAllPosts } from '@/lib/blog-posts'

export const metadata = {
  title: 'Blog | Private Event Sales Insights for Hospitality',
  description: 'Practical guides, tips, and insights for restaurant owners, venue managers, and hospitality operators looking to grow their private event revenue.',
  openGraph: {
    title: 'Blog | Private Event Sales Insights for Hospitality',
    description: 'Practical guides and insights for hospitality operators growing their private event revenue.',
    images: [{ url: '/feature-image.png', width: 1200, height: 630, alt: 'Sphere Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Private Event Sales Insights for Hospitality',
    description: 'Practical guides for hospitality operators growing their private event revenue.',
    images: ['/feature-image.png'],
  },
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16 bg-gradient-to-br from-[#1a0f40] to-[#2d0a35] text-white text-center">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-[#E07B20] text-xs font-bold uppercase tracking-[0.25em] mb-4">Resources</p>
          <h1 className="font-display font-extrabold text-4xl md:text-5xl tracking-tight mb-5">
            Private Event Sales.<br />Insights for Hospitality.
          </h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            Practical guides for restaurant owners, venue managers, and hospitality teams growing their private event revenue.
          </p>
        </div>
      </section>

      {/* Posts grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-2xl border border-gray-100 p-8 hover:shadow-lg transition-all duration-200 flex flex-col"
              >
                <p className="text-[#E07B20] text-xs font-bold uppercase tracking-[0.2em] mb-3">{post.category}</p>
                <h2 className="font-display font-bold text-xl text-[#1a0f40] leading-snug mb-3 group-hover:text-[#6a256f] transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">{post.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-xs">{post.readTime} · {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  <span className="text-[#6a256f] font-semibold text-sm group-hover:text-[#E07B20] transition-colors">Read →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#6a256f] text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-display font-extrabold text-3xl mb-4">Ready to sell more private events?</h2>
          <p className="text-white/70 mb-8">Join Sphere as a Founding Partner — 3 months free, pricing locked for life.</p>
          <Link href="/founding-partner" className="inline-block bg-gradient-to-r from-[#EF4561] to-[#E07B20] text-white font-bold px-8 py-4 rounded-full hover:opacity-90 transition-all shadow-xl">
            Claim Your Founding Partner Spot →
          </Link>
        </div>
      </section>
    </>
  )
}
