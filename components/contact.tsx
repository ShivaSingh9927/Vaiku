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
        alert("Message sent successfully!")
        setFormData({ name: "", email: "", company: "", domain: "", message: "" })
      } else {
        alert("Failed to send message.")
      }
    } catch (error) {
      console.error("Error:", error)
      alert("Something went wrong!")
    }
  }

  return (
    <section id="contact" className="py-16 md:py-32 bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-12">
        {/* Header Section */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Let&apos;s Talk
          </h2>
          <p className="text-lg text-muted-foreground">
            Ready to transform your business with intelligent solutions?
          </p>
        </div>

        {/* Premium Strategy Session Section (Moved outside <p>) */}
        <div className="mb-16 bg-gradient-to-br from-neutral-900 to-neutral-800 border border-neutral-700 rounded-2xl p-8 md:p-12 shadow-xl">
          <div className="text-center space-y-4">
            <h3 className="text-2xl md:text-3xl font-semibold text-white">
              Book Your 30-Minute Free Strategy Session
            </h3>
            <p className="text-neutral-400 max-w-2xl mx-auto text-sm md:text-base">
              A focused consultation where we analyze your goals and co-create an execution roadmap.
            </p>
            <p className="text-primary text-sm font-medium mt-4">
              Fill out the form below, and we will reach out within 2 hours.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground focus:ring-2 focus:ring-primary outline-none transition-all"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground focus:ring-2 focus:ring-primary outline-none transition-all"
            />

            <input
              type="text"
              name="company"
              placeholder="Company Name"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground focus:ring-2 focus:ring-primary outline-none transition-all"
            />

            <select
              name="domain"
              value={formData.domain}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground focus:ring-2 focus:ring-primary outline-none"
            >
              <option value="">Select Your Industry</option>
              <option value="infrastructure">Infrastructure & Utilities</option>
              <option value="manufacturing">Manufacturing</option>
              <option value="healthcare">Healthcare</option>
              <option value="finance">Finance</option>
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
              className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground focus:ring-2 focus:ring-primary outline-none resize-none"
            />

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 text-lg shadow-lg transition-transform active:scale-95"
            >
              Start My Strategy Session
            </Button>
          </form>

          {/* Contact Details */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Contact Info</h3>
              <p className="text-muted-foreground">Direct lines to our founding team.</p>
            </div>

            <div className="space-y-4">
              <a href="mailto:shivasinghjadon1924@gmail.com" className="flex items-center gap-4 p-4 rounded-xl border border-transparent hover:border-border hover:bg-card transition-all">
                <div className="p-3 bg-primary/10 rounded-lg text-primary"><Mail size={24} /></div>
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-sm text-muted-foreground">business@nueralogic.com</p>
                </div>
              </a>

              <a href="tel:+919368084140" className="flex items-center gap-4 p-4 rounded-xl border border-transparent hover:border-border hover:bg-card transition-all">
                <div className="p-3 bg-primary/10 rounded-lg text-primary"><Phone size={24} /></div>
                <div>
                  <p className="font-semibold">Phone</p>
                  <p className="text-sm text-muted-foreground">+91 9368084140</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}