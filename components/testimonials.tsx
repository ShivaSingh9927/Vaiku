"use client"

import { useEffect, useState } from "react"
import { Star } from "lucide-react"

export default function Testimonials() {
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

    document.querySelectorAll("[data-testimonial]").forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "VP of Operations",
      company: "Global Financial Services",
      quote: "VAIKU LABS transformed our document processing workflow. We saw immediate ROI within the first 3 months.",
      avatar: "🧑‍💼",
    },
    {
      name: "Priya Sharma",
      role: "CTO",
      company: "Enterprise Software Platform",
      quote: "Their cloud migration expertise was exceptional. They handled a complex transition flawlessly.",
      avatar: "👩‍💻",
    },
    {
      name: "Amit Patel",
      role: "Director, Digital Transformation",
      company: "Healthcare Organization",
      quote: "The RPA solution saved us thousands of hours annually. The team was responsive and collaborative.",
      avatar: "🧑‍🔬",
    },
  ]

  return (
    <section className="py-16 md:py-32 bg-primary/5">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <div className="text-center space-y-3 md:space-y-4 mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">What Our Partners Say</h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Trusted by enterprise organizations across industries
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {testimonials.map((testimonial, index) => {
            const isVisible = visibleItems.includes(index)
            return (
              <div
                key={index}
                data-testimonial
                data-index={index}
                className={`p-5 md:p-6 rounded-xl md:rounded-2xl bg-card border border-border hover:border-primary transition-all duration-300 ${
                  isVisible ? "animate-fade-in-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-secondary text-secondary" />
                  ))}
                </div>

                <p className="text-foreground mb-4 md:mb-6 italic text-sm md:text-base">{`"${testimonial.quote}"`}</p>

                <div className="flex items-center gap-3 pt-4 md:pt-4 border-t border-border">
                  <div className="text-2xl md:text-3xl flex-shrink-0">{testimonial.avatar}</div>
                  <div className="min-w-0">
                    <p className="font-bold text-foreground text-sm md:text-base">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    <p className="text-xs text-primary font-semibold">{testimonial.company}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
