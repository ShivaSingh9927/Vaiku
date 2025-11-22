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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        alert("Message sent successfully! We will contact you soon.")

        setFormData({
          name: "",
          email: "",
          company: "",
          domain: "",
          message: "",
        })
      } else {
        alert("Failed to send message. Please try again later.")
      }
    } catch (error) {
      console.error("Error:", error)
      alert("Something went wrong!")
    }
  }

  return (
    <section id="contact" className="py-16 md:py-32 bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-12">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Let&apos;s Talk
          </h2>
          <p className="text-lg text-muted-foreground">
            Ready to transform your business with intelligent solutions?
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-4 animate-slide-in-left">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground"
            />

            <input
              type="text"
              name="company"
              placeholder="Company Name"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground"
            />

            <select
              name="domain"
              value={formData.domain}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground"
            >
              <option value="">Select Your Industry</option>
              <option value="finance">Finance</option>
              <option value="healthcare">Healthcare</option>
              <option value="manufacturing">Manufacturing</option>
              <option value="retail">Retail & E-commerce</option>
              <option value="tech">Technology</option>
              <option value="other">Other</option>
            </select>

            <textarea
              name="message"
              placeholder="Tell us about your project"
              rows={4}
              required
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground resize-none"
            />

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3"
            >
              Send Message
            </Button>
          </form>

          {/* Contact Details */}
          <div className="space-y-8 animate-slide-in-right">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Get in Touch
              </h3>
              <p className="text-muted-foreground mb-8">
                Have questions? Our team is ready to help.
              </p>
            </div>

            <div className="space-y-6">
              <a
                href="mailto:shivasinghjadon1924@gmail.com"
                className="flex items-start gap-4 p-4 rounded-lg hover:bg-card"
              >
                <Mail className="text-primary mt-1" size={20} />
                <div>
                  <p className="font-semibold text-foreground">Email</p>
                  <p className="text-muted-foreground text-sm">
                    shivasinghjadon1924@gmail.com
                  </p>
                </div>
              </a>

              <a
                href="tel:+919368084140"
                className="flex items-start gap-4 p-4 rounded-lg hover:bg-card"
              >
                <Phone className="text-primary mt-1" size={20} />
                <div>
                  <p className="font-semibold text-foreground">Phone</p>
                  <p className="text-muted-foreground text-sm">
                    +91 9368084140
                  </p>
                </div>
              </a>

              <a
                href="#"
                className="flex items-start gap-4 p-4 rounded-lg hover:bg-card"
              >
                <MessageCircle className="text-primary mt-1" size={20} />
                <div>
                  <p className="font-semibold text-foreground">WhatsApp</p>
                  <p className="text-muted-foreground text-sm">
                    Quick support available 24/7
                  </p>
                </div>
              </a>
            </div>

            <div className="pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground">
                We typically respond within 2 hours during business hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
