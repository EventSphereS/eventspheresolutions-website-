'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="w-full px-4 sm:px-8 lg:px-16 py-1.5 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/images/logo-main.png"
            alt="Event Sphere Solutions"
            width={480}
            height={116}
            className="h-[55px] sm:h-[64px] w-auto object-contain"
            priority
            quality={100}
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-7">
          <Link href="/about" className="text-[#6a256f] hover:text-[#E07B20] font-medium text-sm transition-colors">About</Link>
          <Link href="/services" className="text-[#6a256f] hover:text-[#E07B20] font-medium text-sm transition-colors">Services</Link>
          <Link href="/platform" className="text-[#6a256f] hover:text-[#E07B20] font-medium text-sm transition-colors">Sphere</Link>
          <Link href="/pricing" className="text-[#6a256f] hover:text-[#E07B20] font-medium text-sm transition-colors">Pricing</Link>
          <Link href="/founding-partner" className="text-[#E07B20] font-bold text-sm hover:underline transition-colors">🏆 Founding Partner</Link>
          <Link href="/contact" className="btn-primary text-sm">Contact Us</Link>
        </nav>

        {/* Mobile: Contact button + Hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <Link
            href="/contact"
            className="text-xs font-bold text-white bg-[#6a256f] px-3 py-2 rounded-full"
            onClick={() => setOpen(false)}
          >
            Contact
          </Link>
          <button
            className="p-2 text-[#6a256f]"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-6 flex flex-col gap-5 shadow-lg">
          <Link href="/about" className="text-[#6a256f] font-semibold text-base border-b border-gray-100 pb-4" onClick={() => setOpen(false)}>About</Link>
          <Link href="/services" className="text-[#6a256f] font-semibold text-base border-b border-gray-100 pb-4" onClick={() => setOpen(false)}>Services</Link>
          <Link href="/platform" className="text-[#6a256f] font-semibold text-base border-b border-gray-100 pb-4" onClick={() => setOpen(false)}>Sphere</Link>
          <Link href="/pricing" className="text-[#6a256f] font-semibold text-base border-b border-gray-100 pb-4" onClick={() => setOpen(false)}>Pricing</Link>
          <Link href="/founding-partner" className="text-[#E07B20] font-bold text-base border-b border-gray-100 pb-4" onClick={() => setOpen(false)}>🏆 Founding Partner</Link>
          <Link href="/contact" className="btn-primary text-center text-sm mt-1" onClick={() => setOpen(false)}>Contact Us</Link>
        </div>
      )}
    </header>
  )
}
