"use client";

import { TypeAnimation } from "react-type-animation";

export default function TeamStrength() {
  return (
    <section className="relative py-32 overflow-hidden">

      {/* Background Video */}
      <video
        src="/team.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-80"
      />

      {/* Dark Overlay for readability */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative max-w-5xl mx-auto px-6 text-center">

        {/* Main Heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
          A Team Engineered for
        </h2>

        {/* Animated Subheading */}
        <div className="text-4xl md:text-5xl font-extrabold h-16">
          <TypeAnimation
            sequence={[
              "Breakthrough Performance", 1500,
              "AI Excellence", 1500,
              "Enterprise Impact", 1500,
            ]}
            wrapper="span"
            speed={40}
            className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
            repeat={Infinity}
          />
        </div>

        {/* Description */}
        <p className="mt-8 text-neutral-200 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
          We are a team of top-tier engineers, AI researchers, and product builders from 
          <span className="text-white font-semibold"> IITs </span>, leading tech companies, 
          and high-growth startups — bringing deep industry expertise to deliver results that matter.
        </p>

      </div>
    </section>
  );
}
