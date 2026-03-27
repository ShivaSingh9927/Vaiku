"use client"

import { useEffect, useState } from "react"
import { Brain, Cloud, Zap, Settings,Rocket } from "lucide-react"
import Link from "next/link"

export default function Services() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"))
            setVisibleItems((prev) => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.1 },
    )

    document.querySelectorAll("[data-service-item]").forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const services = [
    {
      icon: Zap,
      title: "AI Automation",
      description:
        "Eliminate manual work with end-to-end AI automation that cuts costs and removes repetitive tasks from your operations.",
      link: "#",
    },
    {
      icon: Brain,
      title: "Decision Intelligence Dashboards",
      description:
        "Get a unified real-time view of your business—no more fragmented systems, slow reporting, or delayed decisions.",
      link: "#",
    },
    {
      icon: Settings,
      title: "Custom AI Solutions",
      description:
        "AI solutions built for your workflows—assist with decisions, summaries, content, and routine processes instantly.",
      link: "#",
    },
    {
      icon: Cloud,
      title: "Predictive Analytics",
      description:
        "Predict demand, risks, trends, and bottlenecks before they become problems using advanced machine learning.",
      link: "#",
    },
    {
      icon: Rocket,
      title: "MVP & Product Development",
      description:
        "Turn your idea into a working web or AI product—fast. Full development, integration, and deployment.",
      link: "#",
    },
    {
      icon: Settings,
      title: "Systems Integration",
      description:
        "Break silos with seamless integrations between your CRM, ERP, analytics, and internal tools.",
      link: "#",
    },
  ]

  return (
    <section id="services" className="py-16 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <div className="text-center space-y-3 md:space-y-4 mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">How We Solve Your Biggest Problems</h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Comprehensive solutions across AI, software engineering, and digital transformation
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {services.map((service, index) => {
            const IconComponent = service.icon
            const isVisible = visibleItems.includes(index)
            return (
              <Link key={index} href={service.link}>
                <div
                  data-service-item
                  data-index={index}
                  className={`group p-5 md:p-6 rounded-xl md:rounded-2xl bg-card border border-border hover:border-primary hover:shadow-lg transition-all duration-300 cursor-pointer h-full ${
                    isVisible ? "animate-fade-in-up" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-10 md:w-12 h-10 md:h-12 rounded-lg md:rounded-xl bg-primary/10 group-hover:bg-primary group-hover:text-white flex items-center justify-center text-primary transition-all mb-3 md:mb-4">
                    <IconComponent size={24} />
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-foreground mb-2">{service.title}</h3>
                  <p className="text-muted-foreground text-xs md:text-sm">{service.description}</p>
                  <div className="mt-3 md:mt-4 text-primary font-semibold text-xs md:text-sm group-hover:translate-x-1 transition-transform">
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}


