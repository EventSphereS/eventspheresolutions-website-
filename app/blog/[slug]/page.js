import Link from 'next/link'
import { getAllPosts, getPostBySlug } from '@/lib/blog-posts'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }) {
  const post = getPostBySlug(params.slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.publishedAt,
      images: [{ url: post.ogImage, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.ogImage],
    },
  }
}

function renderBlock(block, i) {
  switch (block.type) {
    case 'h2':
      return (
        <h2 key={i} className="font-display font-extrabold text-2xl md:text-3xl text-[#1a0f40] mt-12 mb-4">
          {block.text}
        </h2>
      )
    case 'h3':
      return (
        <h3 key={i} className="font-display font-bold text-xl text-[#6a256f] mt-8 mb-3">
          {block.text}
        </h3>
      )
    case 'p':
      return (
        <p key={i} className="text-gray-600 leading-relaxed mb-5 text-lg">
          {block.text}
        </p>
      )
    case 'ul':
      return (
        <ul key={i} className="mb-6 space-y-3">
          {block.items.map((item, j) => (
            <li key={j} className="flex items-start gap-3 text-gray-600 text-lg">
              <span className="mt-1 w-5 h-5 rounded-full bg-[#E07B20]/15 text-[#E07B20] font-bold text-xs flex items-center justify-center shrink-0">✓</span>
              {item}
            </li>
          ))}
        </ul>
      )
    case 'cta':
      return (
        <div key={i} className="my-10 bg-gradient-to-br from-[#1a0f40] to-[#2d0a35] rounded-2xl p-8 text-center">
          <h3 className="font-display font-extrabold text-2xl text-white mb-3">{block.headline}</h3>
          <p className="text-white/60 mb-6">{block.body}</p>
          <Link
            href={block.buttonHref}
            className="inline-block bg-gradient-to-r from-[#EF4561] to-[#E07B20] text-white font-bold px-8 py-4 rounded-full hover:opacity-90 transition-all shadow-xl"
          >
            {block.buttonText}
          </Link>
        </div>
      )
    default:
      return null
  }
}

export default function BlogPostPage({ params }) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    author: {
      '@type': 'Person',
      name: 'Samia Kohler',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Event Sphere Solutions',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.eventspheresolutions.com/images/logo-main.png',
      },
    },
    image: `https://www.eventspheresolutions.com${post.ogImage}`,
    url: `https://www.eventspheresolutions.com/blog/${post.slug}`,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />

      {/* Hero */}
      <section className="pt-28 pb-12 bg-gradient-to-br from-[#1a0f40] to-[#2d0a35] text-white">
        <div className="max-w-3xl mx-auto px-6">
          <Link href="/blog" className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 text-sm mb-8 transition-colors">
            ← Back to Blog
          </Link>
          <p className="text-[#E07B20] text-xs font-bold uppercase tracking-[0.25em] mb-4">{post.category}</p>
          <h1 className="font-display font-extrabold text-3xl md:text-5xl leading-tight tracking-tight mb-5">
            {post.title}
          </h1>
          <p className="text-white/60 text-lg mb-6">{post.description}</p>
          <p className="text-white/30 text-sm">
            {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} · {post.readTime}
          </p>
        </div>
      </section>

      {/* Article body */}
      <article className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="border-b border-gray-100 mb-10" />
          {post.content.map((block, i) => renderBlock(block, i))}
        </div>
      </article>

      {/* Bottom CTA */}
      <section className="py-16 bg-[#6a256f] text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-display font-extrabold text-3xl mb-4">Ready to grow your private event revenue?</h2>
          <p className="text-white/70 mb-8">Join Sphere as a Founding Partner — 3 months free, pricing locked for life. Limited spots.</p>
          <Link href="/founding-partner" className="inline-block bg-gradient-to-r from-[#EF4561] to-[#E07B20] text-white font-bold px-8 py-4 rounded-full hover:opacity-90 transition-all shadow-xl">
            Claim Your Founding Partner Spot →
          </Link>
        </div>
      </section>
    </>
  )
}
