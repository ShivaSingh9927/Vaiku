"use client"

import { Star } from "lucide-react"

export default function Testimonials() {
  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "VP of Operations",
      company: "Global Financial Services",
      quote:
        "NueraLogic transformed our document processing workflow. We saw immediate ROI within the first 3 months.",
      avatar: "🧑‍💼",
    },
    {
      name: "Priya Sharma",
      role: "CTO",
      company: "Enterprise Software Platform",
      quote:
        "Their cloud migration expertise was exceptional. They handled a complex transition flawlessly.",
      avatar: "👩‍💻",
    },
    {
      name: "Amit Patel",
      role: "Director, Digital Transformation",
      company: "Healthcare Organization",
      quote:
        "The RPA solution saved us thousands of hours annually. The team was responsive and collaborative.",
      avatar: "🧑‍🔬",
    },
  ]

  // Duplicate testimonials to create seamless loop
  const infiniteTestimonials = [...testimonials, ...testimonials]

  return (
    <section className="py-16 md:py-32 bg-primary/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <div className="text-center space-y-3 md:space-y-4 mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">What Our Partners Say</h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Trusted by enterprise organizations across industries
          </p>
        </div>

        {/* Infinite scrolling container */}
        <div className="relative w-full overflow-hidden">
          <div className="flex gap-6 animate-scroll-left">
            {infiniteTestimonials.map((testimonial, index) => (
              <div
                key={index}
                className="min-w-[300px] md:min-w-[360px] p-5 md:p-6 rounded-2xl bg-card border border-border shadow-sm"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-secondary text-secondary" />
                  ))}
                </div>

                <p className="text-foreground mb-6 italic">{`"${testimonial.quote}"`}</p>

                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="text-3xl flex-shrink-0">{testimonial.avatar}</div>
                  <div>
                    <p className="font-bold text-foreground">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    <p className="text-xs text-primary font-semibold">{testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll-left {
          width: max-content;
          animation: scroll-left 25s linear infinite;
        }
      `}</style>
    </section>
  )
}
