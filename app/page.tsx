"use client"

import Hero from "@/components/hero"
import Services from "@/components/services"
import CaseStudies from "@/components/case-studies"
import WhyVaiku from "@/components/why-vaiku"
import Testimonials from "@/components/testimonials"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import ProcessFlow from "@/components/process-flow"
import PainPoints from "@/components/pain-points"   // <-- ADD THIS
import TeamStrength from "@/components/teamstrength"

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Hero />
      <PainPoints />
      <Services />
      <ProcessFlow />
      <CaseStudies />
      <WhyVaiku />
      <TeamStrength/>
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  )
}
