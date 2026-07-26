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
        <h2 key={i} className="font-display font-extrabold text-2xl md:text-3xl text-[#1a0f40] mt-14 mb-4">
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
      if (block.segments) {
        return (
          <p key={i} className="text-gray-600 leading-relaxed mb-5 text-lg">
            {block.segments.map((seg, j) =>
              seg.href ? (
                <Link key={j} href={seg.href} className="text-[#6a256f] font-semibold underline underline-offset-2 hover:text-[#E07B20] transition-colors">{seg.text}</Link>
              ) : seg.text
            )}
          </p>
        )
      }
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
    case 'stat':
      return (
        <div key={i} className="my-10 py-10 px-8 bg-gradient-to-br from-[#1a0f40] to-[#2d0a35] rounded-2xl text-center">
          <p className="font-display font-extrabold text-6xl md:text-7xl text-[#E07B20] leading-none mb-3">{block.number}</p>
          <p className="text-white/70 text-lg max-w-sm mx-auto">{block.label}</p>
        </div>
      )
    case 'quote':
      return (
        <blockquote key={i} className="my-10 pl-6 border-l-4 border-[#6a256f]">
          <p className="font-display font-bold text-xl md:text-2xl text-[#1a0f40] leading-snug italic mb-3">"{block.text}"</p>
          {block.attribution && (
            <p className="text-sm text-gray-400 font-medium">{block.attribution}</p>
          )}
        </blockquote>
      )
    case 'tip':
      return (
        <div key={i} className="my-8 flex gap-4 bg-[#E07B20]/8 border border-[#E07B20]/25 rounded-2xl p-6">
          <span className="text-2xl shrink-0 mt-0.5">💡</span>
          <div>
            <p className="font-display font-bold text-[#E07B20] text-sm uppercase tracking-widest mb-1">Pro Tip</p>
            <p className="text-gray-700 leading-relaxed">{block.text}</p>
          </div>
        </div>
      )
    case 'highlight':
      return (
        <div key={i} className="my-8 bg-[#6a256f]/8 border border-[#6a256f]/20 rounded-2xl p-6">
          <p className="font-display font-bold text-[#6a256f] text-sm uppercase tracking-widest mb-2">{block.label || 'Key Takeaway'}</p>
          <p className="text-gray-700 text-lg leading-relaxed">{block.text}</p>
        </div>
      )
    case 'steps':
      return (
        <ol key={i} className="mb-8 space-y-4">
          {block.items.map((item, j) => (
            <li key={j} className="flex gap-4 items-start">
              <span className="shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#6a256f] to-[#2d0a35] text-white font-bold text-sm flex items-center justify-center mt-0.5">{j + 1}</span>
              <div className="flex-1 pt-1">
                {typeof item === 'string' ? (
                  <p className="text-gray-600 text-lg">{item}</p>
                ) : (
                  <>
                    <p className="font-semibold text-[#1a0f40] mb-1">{item.title}</p>
                    <p className="text-gray-500">{item.body}</p>
                  </>
                )}
              </div>
            </li>
          ))}
        </ol>
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
