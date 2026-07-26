import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 min-h-[60vh] flex items-center bg-white">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <p className="text-[#E07B20] text-xs font-bold uppercase tracking-[0.2em] mb-3">404</p>
          <h1 className="text-4xl md:text-5xl font-extrabold font-display tracking-tight text-[#6a256f] mb-6 leading-tight">
            Page Not Found
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed mb-10">
            The page you&apos;re looking for doesn&apos;t exist or may have moved.
          </p>
          <Link href="/" className="btn-primary">
            Back to Home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
