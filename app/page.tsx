"use client"

import Hero from "@/components/hero"
import Services from "@/components/services"
import CaseStudies from "@/components/case-studies"
import WhyVaiku from "@/components/why-vaiku"
import Testimonials from "@/components/testimonials"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Hero />
      <Services />
      <CaseStudies />
      <WhyVaiku />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  )
}
