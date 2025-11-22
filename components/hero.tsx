"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Hero() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { label: "Services", href: "#services" },
    { label: "Case Studies", href: "#cases" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ]

  return (
    <div className="relative min-h-screen text-white overflow-hidden flex flex-col">

      {/* === 🔥 Video Background === */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="/vecteezy_digital-background-of-connection-structure-with-spheres-and_7237670.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60 z-0" />

      {/* Floating Colors */}
      <div className="absolute inset-0 opacity-20 z-0">
        <div className="absolute top-20 right-20 w-72 h-72 md:w-96 md:h-96 bg-secondary rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-20 left-20 w-64 h-64 md:w-80 md:h-80 bg-accent rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* === Navigation === */}
      <nav className="relative z-20 flex items-center justify-between px-4 md:px-12 py-4 md:py-6">
        <div className="flex items-center gap-2">
          <div className="w-8 md:w-10 h-8 md:h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
            <span className="text-primary font-bold text-sm md:text-lg">V</span>
          </div>
          <span className="font-bold text-sm md:text-xl">VAIKU LABS</span>
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium hover:text-secondary transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex gap-4">
          <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
            Get in Touch
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-primary/95 backdrop-blur-sm z-30 p-4 space-y-3 animate-fade-in-up">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-white hover:text-secondary transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Button className="w-full bg-secondary hover:bg-secondary/90 text-primary">Get in Touch</Button>
        </div>
      )}

      {/* Hero Content */}
      <div className="relative z-20 max-w-6xl mx-auto px-4 md:px-12 py-20 md:py-40 text-center md:text-left">
        <div className="space-y-6 animate-slide-in-left">
          <div className="inline-block px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-medium">
            Transforming Business Through Intelligence
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            Intelligent Solutions. <span className="text-secondary">Empowered Futures.</span>
          </h1>

          <p className="text-md md:text-lg text-white/80 max-w-2xl">
            We build scalable AI & software solutions that transform businesses. From enterprise automation to custom
            intelligence systems, we deliver results that matter.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start">
            <Button className="bg-secondary hover:bg-secondary/90 text-primary px-8 py-6 font-semibold w-full sm:w-auto">
              Explore Services
            </Button>
            <Button
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white/10 px-8 py-6 font-semibold w-full sm:w-auto"
            >
              Get a Consultation
            </Button>
          </div>

        </div>
      </div>

    </div>
  )
}
