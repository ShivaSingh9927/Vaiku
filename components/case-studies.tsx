"use client"

import { useEffect, useRef, useState } from "react"
import { Play, X, Volume, VolumeX } from "lucide-react"

type CaseItem = {
  id: number
  title: string
  subtitle: string
  description: string
  video: string
}

export default function CaseStudies() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const videoRefs = useRef<HTMLVideoElement[]>([])
  const previewObserverRef = useRef<IntersectionObserver | null>(null)

  // Modal state
  const [modalOpen, setModalOpen] = useState(false)
  const [modalIndex, setModalIndex] = useState<number | null>(null)
  const [modalMuted, setModalMuted] = useState(true)

  // --- CASE DATA ---
  const cases: CaseItem[] = [
    {
      id: 1,
      title: "MarkoAI",
      subtitle: "One-stop marketing campaign creator",
      description:
        "MarkoAI is a one-stop solution for creating marketing campaigns...",
      video: "/Markoai.mp4",
    },
    {
      id: 2,
      title: "MedAssist AI",
      subtitle: "Next-gen clinical decision support",
      description:
        "MedAssist-AI is a next-generation clinical decision support system...",
      video: "/MedAssit-AI.mp4",
    },
    {
      id: 3,
      title: "NHAI NHMMS",
      subtitle: "Smart highway monitoring system",
      description:
        "NHMMS is a smart monitoring, AI scoring and analytics system...",
      video: "/NHAI_NHMMS.mp4",
    },
    {
      id: 4,
      title: "SensAi (Ongoing)",
      subtitle: "AI prenatal screening project",
      description: "SensAi detects congenital heart defects...",
      video: "/Sensai-video.mp4",
    },
    {
      id: 5,
      title: "AIM-N",
      subtitle: "Market Notifier",
      description: "Real-time automated trading insights...",
      video: "",
    },
  ]

  // ============================================================
  // ✔ MOBILE FIX: Prevent fullscreen + exit fullscreen on close
  // ============================================================

  const exitFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen?.()
    }

    // iOS Safari hack
    const anyVideo = document.querySelector("video") as any
    anyVideo?.webkitExitFullscreen?.()
  }

  useEffect(() => {
    const fsHandler = () => {
      // This runs when user enters fullscreen
      console.log("Fullscreen change detected")
    }

    document.addEventListener("fullscreenchange", fsHandler)
    document.addEventListener("webkitfullscreenchange", fsHandler)

    return () => {
      document.removeEventListener("fullscreenchange", fsHandler)
      document.removeEventListener("webkitfullscreenchange", fsHandler)
    }
  }, [])

  const openModal = (index: number) => {
    setModalIndex(index)
    setModalMuted(true)
    setModalOpen(true)
  }

  const closeModal = () => {
    exitFullscreen() // IMPORTANT FIX
    setModalOpen(false)
    setModalIndex(null)
  }

  // IntersectionObserver for autoplay preview cards
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idxAttr = entry.target.getAttribute("data-index")
          if (!idxAttr) return
          const index = Number(idxAttr)

          if (entry.isIntersecting) {
            setVisibleItems((prev) =>
              prev.includes(index) ? prev : [...prev, index]
            )
            const v = videoRefs.current[index]
            if (v && v.paused && !modalOpen) {
              v.muted = true
              v.play().catch(() => {})
            }
          } else {
            const v = videoRefs.current[index]
            if (v && !modalOpen) {
              v.pause()
              v.currentTime = 0
            }
          }
        })
      },
      { threshold: 0.4 }
    )

    previewObserverRef.current = observer
    document.querySelectorAll("[data-case-item]").forEach((el) => observer.observe(el))

    return () => {
      previewObserverRef.current?.disconnect()
    }
  }, [modalOpen])

  return (
    <>
      {/* ===================== CASE GRID ===================== */}
      <section id="cases" className="py-20 md:py-32 bg-neutral-900 text-white">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold">Our Projects</h2>
            <p className="text-lg text-neutral-400">Real projects creating impact</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {cases.map((item, index) => {
              const visible = visibleItems.includes(index)
              return (
                <article
                  key={item.id}
                  data-case-item
                  data-index={index}
                  className={`relative rounded-xl overflow-hidden border border-neutral-800 bg-neutral-800 transition-all duration-500 cursor-pointer
                    ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                  onClick={() => openModal(index)}
                >
                  {/* Preview Video */}
                  <div className="relative">
                    <video
                      ref={(el) => {
                        if (el) videoRefs.current[index] = el
                      }}
                      src={item.video}
                      muted
                      loop
                      playsInline
                      webkit-playsinline="true"
                      x5-playsinline="true"
                      preload="metadata"
                      className="w-full h-56 object-contain"
                    />

                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="flex items-center justify-center bg-black/40 rounded-full w-14 h-14 backdrop-blur-sm">
                        <Play size={20} />
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 space-y-3">
                    <h3 className="text-xl font-bold">{item.title}</h3>
                    <p className="text-sm text-white">{item.subtitle}</p>
                    <p className="text-sm text-neutral-300 line-clamp-3">{item.description}</p>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===================== MODAL ===================== */}
      {modalOpen && modalIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={closeModal} />

          <div className="relative max-w-5xl w-full bg-neutral-900 rounded-xl shadow-xl overflow-hidden z-50">

            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-neutral-800">
              <div>
                <h3 className="text-lg font-bold">{cases[modalIndex].title}</h3>
                <p className="text-sm text-neutral-400">{cases[modalIndex].subtitle}</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setModalMuted((s) => !s)}
                  className="px-3 py-2 rounded-md bg-neutral-800 hover:bg-neutral-700 flex items-center gap-2"
                >
                  {modalMuted ? <VolumeX size={16} /> : <Volume size={16} />}
                  <span className="text-sm">{modalMuted ? "Sound off" : "Sound on"}</span>
                </button>

                {/* FIXED CLOSE BUTTON */}
                <button
                  onClick={() => {
                    exitFullscreen()
                    closeModal()
                  }}
                  className="p-2 rounded-md hover:bg-neutral-800"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Main content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* VIDEO */}
              <div className="bg-black w-full">
                <video
                  key={cases[modalIndex].video}
                  src={cases[modalIndex].video}
                  controls
                  autoPlay
                  muted={modalMuted}
                  playsInline
                  webkit-playsinline="true"
                  x5-playsinline="true"
                  className="w-full h-96 md:h-[520px] object-cover bg-black"
                />
              </div>

              {/* DESCRIPTION */}
              <div className="p-6 space-y-4">
                <h4 className="text-lg font-semibold">About the project</h4>
                <p className="text-sm text-neutral-300 whitespace-pre-line">
                  {cases[modalIndex].description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
