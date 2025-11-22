"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle, Mail, Phone } from "lucide-react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    domain: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  return (
    <section id="contact" className="py-16 md:py-32 bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-12">
        <div className="text-center space-y-3 md:space-y-4 mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">Let's Talk</h2>
          <p className="text-base md:text-lg text-muted-foreground">
            Ready to transform your business with intelligent solutions?
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
          {/* Contact form */}
          <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4 animate-slide-in-left">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg md:rounded-lg bg-card border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground placeholder:text-muted-foreground text-sm md:text-base"
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg md:rounded-lg bg-card border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground placeholder:text-muted-foreground text-sm md:text-base"
              />
            </div>
            <div>
              <input
                type="text"
                name="company"
                placeholder="Company Name"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg md:rounded-lg bg-card border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground placeholder:text-muted-foreground text-sm md:text-base"
              />
            </div>
            <div>
              <select
                name="domain"
                value={formData.domain}
                onChange={handleChange}
                className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg md:rounded-lg bg-card border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground text-sm md:text-base"
              >
                <option value="">Select Your Industry</option>
                <option value="finance">Finance</option>
                <option value="healthcare">Healthcare</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="retail">Retail & E-commerce</option>
                <option value="tech">Technology</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <textarea
                name="message"
                placeholder="Tell us about your project"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg md:rounded-lg bg-card border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground placeholder:text-muted-foreground resize-none text-sm md:text-base"
              />
            </div>
            <Button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-2 md:py-3 text-sm md:text-base">
              Send Message
            </Button>
          </form>

          {/* Contact info */}
          <div className="space-y-6 md:space-y-8 animate-slide-in-right">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 md:mb-4">Get in Touch</h3>
              <p className="text-muted-foreground text-sm md:text-base mb-6 md:mb-8">
                Have questions? Our team is ready to help you transform your business with intelligent solutions.
              </p>
            </div>

            <div className="space-y-4 md:space-y-6">
              <a
                href="mailto:info@vaikutabs.com"
                className="flex items-start gap-3 md:gap-4 p-3 md:p-4 rounded-lg hover:bg-card transition-colors"
              >
                <Mail className="text-primary flex-shrink-0 mt-1" size={20} />
                <div className="min-w-0">
                  <p className="font-semibold text-foreground text-sm md:text-base">Email</p>
                  <p className="text-muted-foreground text-xs md:text-sm break-all">shivasinghjadon1924@gmail.com</p>
                </div>
              </a>

              <a
                href="tel:+911234567890"
                className="flex items-start gap-3 md:gap-4 p-3 md:p-4 rounded-lg hover:bg-card transition-colors"
              >
                <Phone className="text-primary flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="font-semibold text-foreground text-sm md:text-base">Phone</p>
                  <p className="text-muted-foreground text-xs md:text-sm">+91 9368084140</p>
                </div>
              </a>

              <a
                href="#"
                className="flex items-start gap-3 md:gap-4 p-3 md:p-4 rounded-lg hover:bg-card transition-colors"
              >
                <MessageCircle className="text-primary flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="font-semibold text-foreground text-sm md:text-base">WhatsApp</p>
                  <p className="text-muted-foreground text-xs md:text-sm">Quick support available 24/7</p>
                </div>
              </a>
            </div>

            <div className="pt-4 md:pt-4 border-t border-border">
              <p className="text-xs md:text-sm text-muted-foreground">
                We typically respond within 2 hours during business hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
