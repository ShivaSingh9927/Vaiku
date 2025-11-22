"use client"

import Link from "next/link"
import { Mail, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-12 py-12 md:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-8 md:mb-12">
          {/* Brand */}
          <div className="animate-fade-in-up">
            <div className="flex items-center gap-2 mb-3 md:mb-4">
              <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-bold">V</span>
              </div>
              <span className="font-bold text-lg">VAIKU LABS</span>
            </div>
            <p className="text-white/70 text-xs md:text-sm">Intelligent Solutions. Empowered Futures.</p>
          </div>

          {/* Services */}
          <div className="animate-fade-in-up" style={{ animationDelay: "100ms" }}>
            <h4 className="font-bold mb-3 md:mb-4 text-secondary text-sm md:text-base">Services</h4>
            <ul className="space-y-2 text-xs md:text-sm text-white/70">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  AI & Analytics
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Cloud Development
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Automation & RPA
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Industry Solutions
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            <h4 className="font-bold mb-3 md:mb-4 text-secondary text-sm md:text-base">Company</h4>
            <ul className="space-y-2 text-xs md:text-sm text-white/70">
              <li>
                <Link href="#about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#cases" className="hover:text-white transition-colors">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="animate-fade-in-up" style={{ animationDelay: "300ms" }}>
            <h4 className="font-bold mb-3 md:mb-4 text-secondary text-sm md:text-base">Connect</h4>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="mailto:info@vaikutabs.com"
                className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-6 md:pt-8">
          <div className="grid sm:grid-cols-2 gap-3 md:gap-4 text-xs md:text-sm text-white/60">
            <div>© 2025 Vaiku Labs. All rights reserved.</div>
            <div className="flex gap-3 md:gap-4 sm:justify-end">
              <Link href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
