"use client"

import { useEffect, useState, useRef } from "react"
import { Search, Hammer, Rocket } from "lucide-react"

export default function ProcessFlow() {
  const [visible, setVisible] = useState<number[]>([])
  const refs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-step"))
            setVisible((prev) => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.1 },
    )

    refs.current.forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const steps = [
    {
      icon: Search,
      title: "Analyze Your Operations",
      description: "We find inefficiencies, cost leaks, and automation opportunities.",
    },
    {
      icon: Hammer,
      title: "Build Custom AI Solutions",
      description: "Dashboards, automations, and AI copilots integrated into your tools.",
    },
    {
      icon: Rocket,
      title: "Deploy & Optimize",
      description: "Your team runs faster with less manual work and better decisions.",
    },
  ]

  return (
    <section className="py-20 md:py-32 bg-muted/40">
      <div className="max-w-6xl mx-auto px-4 md:px-10">
        <div className="text-center mb-14 space-y-3">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground">We Help at Every Step</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            From discovery to deployment — fast, clear, and outcome-driven.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 relative">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isVisible = visible.includes(index)

            return (
              <div
                key={index}
                ref={(el) => (refs.current[index] = el)}
                data-step={index}
                className={`relative p-6 rounded-2xl bg-card border border-border transition-all duration-300 shadow-sm flex-1 text-center ${
                  isVisible ? "animate-fade-in-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-primary/10 text-primary mb-4 mx-auto">
                  <Icon size={26} />
                </div>

                <h3 className="text-lg md:text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>

                <div className="mt-4 text-xs font-semibold text-primary"></div>

                {/* Arrow for all but last step */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 right-[-40px] w-10 h-1 bg-primary transform -translate-y-1/2"></div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
