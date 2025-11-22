"use client"

import { useEffect, useState } from "react"
import { CheckCircle, Zap, Shield, Lightbulb } from "lucide-react"

export default function WhyVaiku() {
  const [visibleMetrics, setVisibleMetrics] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleMetrics(true)
          }
        })
      },
      { threshold: 0.3 },
    )

    const metricsSection = document.querySelector("[data-metrics]")
    if (metricsSection) observer.observe(metricsSection)
    return () => observer.disconnect()
  }, [])

  const features = [
    {
      icon: CheckCircle,
      title: "End-to-End Delivery",
      description: "Full-stack solutions from strategy to implementation and support",
    },
    {
      icon: Shield,
      title: "Secure Architecture",
      description: "Enterprise-grade security and compliance built into every solution",
    },
    {
      icon: Zap,
      title: "Proven Outcomes",
      description: "Measurable business impact with documented success metrics",
    },
    {
      icon: Lightbulb,
      title: "Expert Innovation",
      description: "Industry-leading team of AI and software architecture specialists",
    },
  ]

  return (
    <section id="about" className="py-16 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left content */}
          <div className="space-y-6 md:space-y-8 animate-slide-in-left">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 md:mb-4">
                Why Vaiku Labs
              </h2>
              <p className="text-base md:text-lg text-muted-foreground">
                We combine deep technical expertise with business acumen to deliver solutions that drive real
                transformation.
              </p>
            </div>

            <div className="space-y-3 md:space-y-4">
              {features.map((feature, index) => {
                const IconComponent = feature.icon
                return (
                  <div
                    key={index}
                    className="flex gap-3 md:gap-4 animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-lg bg-primary text-white flex items-center justify-center mt-1">
                      <IconComponent size={18} />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground text-sm md:text-base">{feature.title}</h3>
                      <p className="text-muted-foreground text-xs md:text-sm">{feature.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right - Metrics */}
          <div data-metrics className="space-y-4 md:space-y-6 animate-slide-in-right">
            <div
              className={`p-6 md:p-8 rounded-xl md:rounded-2xl bg-primary text-white transition-all duration-1000 ${
                visibleMetrics ? "animate-scale-in" : "opacity-0"
              }`}
            >
              <div className="space-y-6 md:space-y-8">
                {[
                  { value: "25+", label: "AI Products & Solutions Delivered", color: "text-secondary" },
                  { value: "100%", label: "Client Retention Rate", color: "text-secondary" },
                  { value: "500M+", label: "Records Processed Annually", color: "text-accent" },
                  { value: "24/7", label: "Production Support Available", color: "text-secondary" },
                ].map((metric, index) => (
                  <div
                    key={index}
                    className={`transition-all duration-700 ${visibleMetrics ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                    style={{ transitionDelay: `${index * 150}ms` }}
                  >
                    <div className={`text-3xl md:text-5xl font-bold mb-1 md:mb-2 ${metric.color}`}>{metric.value}</div>
                    <p className="text-sm md:text-base text-white/80">{metric.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
