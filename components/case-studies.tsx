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
  const [modalMuted, setModalMuted] = useState(true) // start muted, user can toggle (Ask toggle)

  const cases: CaseItem[] = [
    {
      id: 1,
      title: "MarkoAI",
      subtitle: "One-stop marketing campaign creator",
      description:
        "MarkoAI is a one-stop solution for creating marketing campaigns that generate promotion ad ideas, images, and posts. It helps teams ideate, produce visuals, and produce ready-to-publish marketing assets quickly.",
      video: "/Markoai.mp4",
    },
    {
      id: 2,
      title: "MedAssist AI",
      subtitle: "Next-gen clinical decision support",
      description:
        "MedAssist-AI is a next-generation clinical decision support system built on advanced AI and multimodal healthcare capabilities. Features include chest X-ray abnormality classification, bounding-box disease detection, OCR-based report understanding, evidence-based recommendations via literature retrieval, web search for latest clinical knowledge, and conversational assistance for clinicians — improving speed, accuracy and reducing staff workload while keeping patient safety and privacy central.",
      video: "/MedAssit-AI.mp4",
    },
    {
      id: 3,
      title: "NHAI NHMMS",
      subtitle: "Smart highway monitoring & hygiene system",
      description:
        "NHMMS is a smart monitoring and feedback system designed to ensure hygiene, transparency, and accountability in highway toilet maintenance. Key features include worker dashboards for uploading activities and photos, QR-based activity submission, AI scoring for cleanliness, public feedback, damage reporting, and a centralized analytics dashboard for benchmarking and monitoring.",
      video: "/NHAI_NHMMS.mp4",
    },
    {
      id: 4,
      title: "SensAi (Ongoing)",
      subtitle: "Ongoing AI-driven prenatal screening project",
      description:
        "SensAi is an AI-powered fetal ultrasound screening solution that detects congenital heart defects and fetal risks in real-time. It empowers clinicians in all settings — from advanced hospitals to rural clinics — by delivering specialist-level diagnosis instantly and offline. Every heartbeat matters.",
      video: "/Sensai-video.mp4",
    },
    {
      id: 5,
      title: "AIM-N",
      subtitle: "Automated Intelligent Market Notifier (Ongoing)",
      description:
        "AIM-N is an automated market analysis and opportunity alerting system. It continuously evaluates financial markets using multiple client-driven trading strategies and real-time indicators. Every day, AIM-N generates new opportunity insights and instantly notifies the user via WhatsApp and email—ensuring traders never miss profitable entry points.",
      video: "", // no video yet (placeholder)
    }
  ]

  // Intersection Observer to autoplay preview when visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idxAttr = entry.target.getAttribute("data-index")
          if (!idxAttr) return
          const index = Number(idxAttr)
          if (entry.isIntersecting) {
            setVisibleItems((prev) => {
              if (!prev.includes(index)) return [...prev, index]
              return prev
            })
            // play preview muted
            const v = videoRefs.current[index]
            if (v && v.paused && !modalOpen) {
              v.muted = true
              v.play().catch(() => {})
            }
          } else {
            // pause preview when out of view
            const v = videoRefs.current[index]
            if (v && !modalOpen) {
              v.pause()
              v.currentTime = 0
            }
          }
        })
      },
      { threshold: 0.4 } // start playing when 40% visible
    )

    previewObserverRef.current = observer
    document.querySelectorAll("[data-case-item]").forEach((el) => observer.observe(el))
    return () => {
      previewObserverRef.current?.disconnect()
      previewObserverRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalOpen])

  // Pause previews when modal opens
  useEffect(() => {
    if (modalOpen) {
      videoRefs.current.forEach((v) => {
        try {
          v.pause()
        } catch {}
      })
    } else {
      // when closing modal, resume previews for visible items
      visibleItems.forEach((index) => {
        const v = videoRefs.current[index]
        if (v) {
          v.muted = true
          v.play().catch(() => {})
        }
      })
    }
  }, [modalOpen, visibleItems])

  // Keyboard: ESC closes modal
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && modalOpen) setModalOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [modalOpen])

  const openModal = (index: number) => {
    setModalIndex(index)
    setModalMuted(true) // start muted and ask user to toggle
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setModalIndex(null)
  }

  return (
    <>
      <section id="cases" className="py-20 md:py-32 bg-neutral-900 text-white">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center space-y-3 md:space-y-4 mb-12 md:mb-16">
            <h2 className="text-4xl md:text-5xl font-bold">Our Projects</h2>
            <p className="text-lg text-neutral-400">Real projects creating real-world impact</p>
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
                    ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
                  `}
                  onClick={() => openModal(index)}
                >
                  {/* video preview */}
                  <div className="relative">
                    <video
                      ref={(el) => {
                        if (el) videoRefs.current[index] = el
                      }}
                      src={item.video}
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      className="w-full h-56 object-contain"
                    />
                    {/* Play overlay icon (always visible but subtle) */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div
                        className="flex items-center justify-center bg-black/40 rounded-full w-14 h-14 backdrop-blur-sm"
                        aria-hidden
                      >
                        <Play size={20} className="text-white" />
                      </div>
                    </div>
                  </div>

                  {/* content */}
                  <div className="p-6 space-y-3">
                    <h3 className="text-xl font-bold">{item.title}</h3>
                    <p className="text-sm text-primary">{item.subtitle}</p>
                    <p className="text-sm text-neutral-300 line-clamp-3">{item.description}</p>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* Modal */}
      {modalOpen && modalIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={closeModal}
            aria-hidden
          />

          <div className="relative z-60 max-w-5xl w-full bg-neutral-900 rounded-xl shadow-xl overflow-hidden">
            {/* top controls */}
            <div className="flex items-center justify-between p-4 border-b border-neutral-800">
              <div>
                <h3 className="text-lg font-bold">{cases[modalIndex].title}</h3>
                <p className="text-sm text-neutral-400">{cases[modalIndex].subtitle}</p>
              </div>

              <div className="flex items-center gap-3">
                {/* Sound toggle (Ask toggle) */}
                <button
                  onClick={() => setModalMuted((s) => !s)}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-neutral-800 hover:bg-neutral-700 transition"
                  aria-label={modalMuted ? "Unmute video" : "Mute video"}
                >
                  {modalMuted ? <VolumeX size={16} /> : <Volume size={16} />}
                  <span className="text-sm">{modalMuted ? "Sound off" : "Sound on"}</span>
                </button>

                {/* Close */}
                <button
                  onClick={closeModal}
                  className="p-2 rounded-md hover:bg-neutral-800 transition"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Video + details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="w-full bg-black">
                <video
                  key={cases[modalIndex].video}
                  src={cases[modalIndex].video}
                  controls
                  autoPlay
                  muted={modalMuted}
                  playsInline
                  className="w-full h-96 md:h-[520px] object-cover bg-black"
                />
              </div>

              <div className="p-6 space-y-4">
                <h4 className="text-lg font-semibold">About the project</h4>
                <p className="text-sm text-neutral-300 whitespace-pre-line">{cases[modalIndex].description}</p>

                {/* Optional extra metadata — you can expand these */}
                <div className="pt-4 space-y-2">
                  <div>
                    <p className="text-xs text-neutral-400 uppercase tracking-wide">Deliverables</p>
                    <p className="text-sm text-neutral-200">Video demo, Documentation, Deployment</p>
                  </div>

                  <div>
                    <p className="text-xs text-neutral-400 uppercase tracking-wide">Tech</p>
                    <p className="text-sm text-neutral-200">AI, Computer Vision, OCR, Web</p>
                  </div>

                  <div>
                    <p className="text-xs text-neutral-400 uppercase tracking-wide">Role</p>
                    <p className="text-sm text-neutral-200">Design, Implementation, DevOps</p>
                  </div>
                </div>

                <div className="pt-6 flex gap-3">
                  <button
                    className="px-4 py-2 rounded-md bg-primary hover:bg-primary/90 transition text-white"
                    onClick={() => {
                      // for example: navigate to project details page or download
                      // placeholder: close modal
                      closeModal()
                    }}
                  >
                    View More
                  </button>

                  <button
                    className="px-4 py-2 rounded-md border border-neutral-700 text-neutral-200 hover:bg-neutral-800 transition"
                    onClick={() => {
                      // toggle sound quickly
                      setModalMuted((s) => !s)
                    }}
                  >
                    {modalMuted ? "Enable Sound" : "Disable Sound"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
