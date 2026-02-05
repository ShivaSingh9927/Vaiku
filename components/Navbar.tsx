"use client"
import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/#services" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/#contact" },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-between px-4 md:px-12 py-4">
      
      {/* 1. LOGO SECTION - Corrected with white background and scaling effect */}
      <Link href="/" className="flex items-center gap-3 cursor-pointer group">
        <div className="w-10 md:w-11 h-10 md:h-11 rounded-xl bg-white p-1.5 flex items-center justify-center overflow-hidden shadow-md group-hover:scale-105 transition-transform">
          <img 
            src="/android-chrome-192x192.png" 
            alt="NueraLogic Logo" 
            className="w-full h-full object-contain" 
          />
        </div>
        <span className="font-bold text-white text-lg md:text-2xl tracking-tight">
          NueraLogic
        </span>
      </Link>

      {/* 2. DESKTOP MENU */}
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <Link 
            key={link.label} 
            href={link.href} 
            className="text-sm font-medium text-white/90 hover:text-[#38BDF8] transition-colors"
          >
            {link.label}
          </Link>
        ))}
        <Link 
          href="/#contact" 
          className="bg-white text-[#1a103c] font-bold px-5 py-2 rounded-lg hover:bg-[#38BDF8] hover:text-white transition-all text-sm"
        >
          Book a free call
        </Link>
      </div>

      {/* 3. MOBILE TOGGLE */}
      <button 
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
        className="md:hidden text-white p-2"
      >
        {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* 4. MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#1a103c] border-t border-white/10 p-6 space-y-4 shadow-2xl animate-in fade-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <Link 
              key={link.label} 
              href={link.href} 
              onClick={() => setMobileMenuOpen(false)} 
              className="block text-xl font-medium text-white hover:text-[#38BDF8]"
            >
              {link.label}
            </Link>
          ))}
          <Link 
            href="/#contact" 
            onClick={() => setMobileMenuOpen(false)}
            className="block w-full bg-[#471FFF] text-white text-center py-4 rounded-xl font-bold"
          >
            Book a free call
          </Link>
        </div>
      )}
    </nav>
  )
}