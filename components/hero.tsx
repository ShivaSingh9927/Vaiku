"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Vortex } from "@/components/ui/wave-grid-background"
import { Navbar } from "@/components/Navbar" // Import your new fixed Navbar

export default function Hero() {
  // Function to handle smooth scrolling for hero buttons
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <div className="relative min-h-screen text-white overflow-hidden flex flex-col">
      
      {/* 1. GLOBAL NAVIGATION */}
      <Navbar />

      {/* 2. BACKGROUND & VISUALS */}
      <Vortex
        className="absolute inset-0 w-full h-full z-0"
        color="#847AFF"
        gridSize={60}
        waveHeight={80}
        backgroundColor="#1a103c" 
      />

      <div className="absolute inset-0 opacity-20 z-0">
        <div className="absolute top-10 right-10 w-72 h-72 md:w-96 md:h-96 bg-secondary rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-10 left-10 w-64 h-64 md:w-80 md:h-80 bg-accent rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* 3. HERO CONTENT */}
      <div className="relative z-20 max-w-6xl mx-auto px-4 md:px-12 py-32 md:py-48 text-center md:text-left">
        <div className="space-y-6 animate-slide-in-left">
          <div className="inline-block px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-medium">
            Trusted by ops teams in Retail • Healthcare • SaaS • Supply Chain
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            Cut Costs. Automate Work. <br />
            <span className="text-secondary">Make Better Decisions.</span>
          </h1>

          <p className="text-md md:text-lg text-white/80 max-w-2xl">
            We build AI solutions, copilots, automation, and dashboards that reduce manual work and deliver measurable ROI.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start">
            <Button
              onClick={() => scrollToSection("services")}
              className="bg-secondary hover:bg-secondary/90 text-primary px-8 py-6 font-semibold"
            >
              Explore Services
            </Button>

            <Button
              variant="outline"
              onClick={() => scrollToSection("contact")}
              className="bg-white/10 border-white text-white hover:bg-white/30 px-8 py-6 font-semibold w-full sm:w-auto"
            >
              Book a free Call
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}