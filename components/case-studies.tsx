"use client"

import React, { useEffect, useRef, useState } from "react";
import { Play, X, Volume, VolumeX, ChevronLeft, ChevronRight } from "lucide-react";

type CaseItem = {
  id: number;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  video?: string;
  image?: string; // <-- ADDED
  metrics?: { label: string; value: string }[];
};

const ALL_CATEGORIES = [
  "All",
  "Healthcare",
  "Logistics",
  "Marketing",
  "Automation",
  "Market Intelligence",
];

export default function CaseStudies() {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const videoRefs = useRef<HTMLVideoElement[]>([]);
  const previewObserverRef = useRef<IntersectionObserver | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const [modalMuted, setModalMuted] = useState(true);

  const [category, setCategory] = useState<string>("All");
  const [search, setSearch] = useState<string>("");

  // ======================================================
  // Projects
  // ======================================================
  const cases: CaseItem[] = [
    {
      id: 1,
      title: "MarkoAI",
      subtitle: "One-stop marketing campaign creator",
      category: "Marketing",
      description:
        "MarkoAI is an end-to-end AI-powered marketing engine that generates campaign ideas, ad copy, creative assets, visuals, captions, and platform-ready posts within minutes. It eliminates dependency on designers and content teams by unifying ideation, creation, and scheduling into a single automated workflow.",
      video: "/Markoai.mp4",
      problemsSolved: [
        "Slow, manual campaign creation cycles",
        "Dependency on multiple teams (design, copy, strategy)",
        "Inconsistent brand voice across posts",
        "Lack of automation in content production"
      ],
      impact: [
        "Reduced campaign creation time by 70%",
        "Generated 30+ assets per campaign",
        "Enabled teams to publish faster with fewer resources"
      ],
      metrics: [
        { label: "Time Saved", value: "70%" },
        { label: "Assets / Campaign", value: "30+" },
      ],
    },
  
    {
      id: 2,
      title: "MedAssist AI",
      subtitle: "Next-gen clinical decision support",
      category: "Healthcare",
      description:
        "MedAssist AI is a multimodal clinical support system combining chest X-ray analysis, pathology detection, OCR report processing, literature search, and an LLM-based medical assistant.",
      video: "/MedAssit-AI.mp4",
      problemsSolved: [
        "High turnaround time for radiology reports",
        "Lack of unified patient data interpretation",
        "Difficulty accessing relevant medical literature quickly"
      ],
      impact: [
        "40% reduction in diagnostic turnaround time",
        "95% sensitivity in classification models",
        "Improved clinician decision-making using multimodal evidence"
      ],
      metrics: [
        { label: "TAT Reduction", value: "40%" },
        { label: "Sensitivity", value: "95%" },
      ],
    },
  
    {
      id: 3,
      title: "NHAI NHMMS",
      subtitle: "Smart highway monitoring & hygiene",
      category: "Logistics",
      description:
        "NHMMS is a nation-scale sanitation monitoring system enabling workers to upload images & logs, which are scored by AI and visualized on dashboards for supervisors.",
      video: "/NHAI_NHMMS.mp4",
      problemsSolved: [
        "No real-time visibility into sanitation work",
        "Manual, inaccurate reporting from field teams",
        "Difficulty assessing cleanliness quality across sites"
      ],
      impact: [
        "Digitized monitoring across 100+ sites",
        "Created consistent, objective cleanliness scoring",
        "Improved transparency between field teams and management"
      ],
      metrics: [
        { label: "Coverage", value: "100+ Sites" },
        { label: "Avg Cleanliness Score", value: "4.2 / 5" },
      ],
    },
  
    {
      id: 4,
      title: "SensAi",
      subtitle: "AI prenatal ultrasound screening (Ongoing)",
      category: "Healthcare",
      description:
        "SensAi uses AI to identify congenital heart defects and fetal abnormalities from ultrasound scans in real time, helping radiologists and sonographers in low-resource settings.",
      video: "/Sensai-video.mp4",
      problemsSolved: [
        "Shortage of expert radiologists",
        "Difficulty maintaining consistent scan quality",
        "Undetected fetal abnormalities due to human variability"
      ],
      impact: [
        "90%+ detection accuracy in pilot",
        "Standardized ultrasound screening workflow",
        "Enabled early intervention in rural clinical settings"
      ],
      metrics: [
        { label: "Pilot Sites", value: "5" },
        { label: "Detection Accuracy", value: "90%+" },
      ],
    },
  
    {
      id: 5,
      title: "AIM-N",
      subtitle: "Automated Intelligent Market Notifier",
      category: "Market Intelligence",
      description:
        "AIM-N continuously monitors markets using trader-defined strategies and sends opportunity alerts via WhatsApp and email.",
      video: "",
      image: "/aimn.png",
      problemsSolved: [
        "Missed trading opportunities",
        "Manual monitoring of multiple indicators",
        "Delayed decision-making during volatility"
      ],
      impact: [
        "Delivered real-time actionable signals",
        "Reduced manual monitoring workload",
        "Improved trader response speed"
      ],
      metrics: [
        { label: "Alerts / Day", value: "Varies" },
        { label: "Latency", value: "< 10m" },
      ],
    },
  
    {
      id: 6,
      title: "Supply Chain Risk Radar",
      subtitle: "AI-driven supply chain risk monitoring",
      category: "Logistics",
      description:
        "Risk Radar scrapes supplier websites, filings, and news to compute risk scores and trigger Slack alerts. Daily summaries and backup vendor suggestions support procurement teams.",
      video: "",
      image: "/Monitor Supply Chain Risks with ScrapeGraphAI Alerts via Slack and Email.png",
      problemsSolved: [
        "Late detection of supplier disruptions",
        "No automated risk intelligence",
        "Over-reliance on manual tracking of global events"
      ],
      impact: [
        "Proactively flagged supplier disruptions",
        "Increased supply chain visibility across critical vendors",
        "Improved procurement decision-making with backup suggestions"
      ],
      metrics: [
        { label: "Daily Checks", value: "1× / Day" },
        { label: "Risk Signals", value: "Multi-Source" },
      ],
    },
  
    {
      id: 7,
      title: "Damage Reporting Assistant",
      subtitle: "Vision-based damage reporting for logistics",
      category: "Logistics",
      description:
        "Operators upload photos via Telegram. AI extracts barcodes, identifies damage, and creates HTML summary reports sent directly via email.",
      video: "",
      image: "/AI-Powered Damage Reporting Tool for Logistics with Gmail, Telegram and GPTs.png",
      problemsSolved: [
        "Time-consuming manual damage documentation",
        "Human errors in damage classification",
        "Delayed resolution of claims and audits"
      ],
      impact: [
        "Cut documentation time from 15 minutes to 30 seconds",
        "Achieved consistent damage classification",
        "Improved audit and claim resolution speed"
      ],
      metrics: [
        { label: "Report Time", value: "< 30s" },
        { label: "Human Input", value: "Photos Only" },
      ],
    },
  
    {
      id: 8,
      title: "WhatsApp Support AI",
      subtitle: "Knowledge-driven customer support assistant",
      category: "Automation",
      description:
        "A WhatsApp support bot connected to Google Docs knowledge base that responds instantly and logs all conversations into Google Sheets.",
      video: "",
      image: "/Customer Support WhatsApp Bot with Google Docs Knowledge Base and Gemini AI.png",
      problemsSolved: [
        "Slow response times in customer support",
        "Knowledge scattered across documents and teams",
        "No centralized tracking of customer interactions"
      ],
      impact: [
        "Response times reduced to <5 seconds",
        "Unified knowledge across channels",
        "Improved support KPIs and documentation quality"
      ],
      metrics: [
        { label: "Response Time", value: "< 5s" },
        { label: "Availability", value: "24/7" },
      ],
    },
  
    {
      id: 9,
      title: "LinkedIn AutoPilot",
      subtitle: "Automated LinkedIn content creation & posting",
      category: "Marketing",
      description:
        "LinkedIn AutoPilot generates ideas, writes posts, designs images, and schedules publishing automatically.",
      video: "",
      image: "/linkdin_content_agent.png",
      problemsSolved: [
        "Inconsistent posting schedule",
        "Difficulty generating high-quality content regularly",
        "Time-intensive manual design + writing workflow"
      ],
      impact: [
        "Generated 120+ posts per month automatically",
        "Saved founders 15+ hours weekly",
        "Improved engagement with consistent posting"
      ],
      metrics: [
        { label: "Posts / Month", value: "120+" },
        { label: "Time Saved", value: "15 hrs/week" },
      ],
    },
  ];
  

  // FILTER
  const filtered = cases.filter((c) => {
    if (category !== "All" && c.category !== category) return false;
    if (search.trim() !== "") {
      const s = search.toLowerCase();
      if (!(`${c.title} ${c.subtitle} ${c.description}`.toLowerCase().includes(s))) return false;
    }
    return true;
  });

  // OBSERVER
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idxAttr = entry.target.getAttribute("data-index");
          if (!idxAttr) return;
          const index = Number(idxAttr);
          if (entry.isIntersecting) {
            setVisibleItems((p) => (p.includes(index) ? p : [...p, index]));
            const v = videoRefs.current[index];
            if (v && v.paused && !modalOpen) {
              v.muted = true;
              v.play().catch(() => {});
            }
          } else {
            const v = videoRefs.current[index];
            if (v && !modalOpen) {
              v.pause();
              v.currentTime = 0;
            }
          }
        });
      },
      { threshold: 0.4 }
    );

    previewObserverRef.current = observer;
    document.querySelectorAll("[data-case-item]").forEach((el) => observer.observe(el));
    return () => previewObserverRef.current?.disconnect();
  }, [modalOpen]);

  useEffect(() => {
    if (modalOpen) {
      videoRefs.current.forEach((v) => v?.pause());
    } else {
      visibleItems.forEach((index) => {
        const v = videoRefs.current[index];
        if (v) {
          v.muted = true;
          v.play().catch(() => {});
        }
      });
    }
  }, [modalOpen, visibleItems]);

  const exitFullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen?.();
    const anyVideo = document.querySelector("video") as any;
    anyVideo?.webkitExitFullscreen?.();
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && modalOpen) closeModal();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalOpen]);

  const openModal = (index: number) => {
    setModalIndex(index);
    setModalMuted(true);
    setModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    exitFullscreen();
    setModalOpen(false);
    setModalIndex(null);
    document.body.style.overflow = "";
  };

  const nextInModal = () => {
    if (modalIndex === null) return;
    const cur = filtered.findIndex((c) => c.id === filtered[modalIndex].id);
    const next = (cur + 1) % filtered.length;
    const nextId = filtered[next].id;
    setModalIndex(cases.findIndex((c) => c.id === nextId));
  };

  const prevInModal = () => {
    if (modalIndex === null) return;
    const cur = filtered.findIndex((c) => c.id === filtered[modalIndex].id);
    const prev = (cur - 1 + filtered.length) % filtered.length;
    const prevId = filtered[prev].id;
    setModalIndex(cases.findIndex((c) => c.id === prevId));
  };

  // ======================================================
  // UI
  // ======================================================
  return (
    <section id="cases" className="py-20 md:py-32 bg-gradient-to-b from-neutral-900 to-neutral-950 text-white">
      <div className="max-w-7xl mx-auto px-5">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold">Projects & Work</h2>
            <p className="text-neutral-400">Showcasing productized AI solutions and automations.</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex gap-2 bg-neutral-800 p-1 rounded-lg">
              {ALL_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                    category === cat
                      ? "bg-primary text-white"
                      : "text-neutral-300 hover:bg-neutral-800"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="md:hidden px-3 py-2 rounded-md bg-neutral-800 text-sm border border-neutral-700"
            >
              {ALL_CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item, index) => {
            const visible = visibleItems.includes(index);
            return (
              <article
                key={item.id}
                data-case-item
                data-index={index}
                onClick={() => openModal(cases.findIndex(c => c.id === item.id))}
                className={`relative rounded-2xl border border-neutral-800 bg-gradient-to-br from-neutral-800 via-neutral-850 to-neutral-800 
                overflow-hidden cursor-pointer transition-transform duration-500 
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
                hover:scale-[1.01]`}
              >

                {/* MEDIA */}
                <div className="relative h-44 bg-black flex items-center justify-center">
                  {item.video ? (
                    <video
                      ref={(el) => el && (videoRefs.current[index] = el)}
                      src={item.video}
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-contain p-2"
                    />
                  ) : (
                    <div className="text-neutral-400 text-sm">No preview available</div>
                  )}

                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="bg-black/40 backdrop-blur-sm w-14 h-14 rounded-full flex items-center justify-center">
                      <Play size={22} />
                    </div>
                  </div>
                </div>

                {/* TEXT */}
                <div className="p-5 space-y-3">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-neutral-300 text-sm">{item.subtitle}</p>
                  <p className="line-clamp-3 text-neutral-400 text-sm">{item.description}</p>

                  <div className="flex gap-3 pt-3">
                    {item.metrics?.slice(0, 2).map((m, i) => (
                      <div key={i} className="bg-neutral-800 px-3 py-2 rounded-md text-xs">
                        <div className="font-semibold text-sm">{m.value}</div>
                        <div className="text-[11px] text-neutral-400">{m.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center text-neutral-500 mt-10">No matching projects.</div>
        )}
      </div>

      {/* ======================================================
         MODAL
      ====================================================== */}
      {modalOpen && modalIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={closeModal} />

          <div className="relative z-10 max-w-6xl w-full bg-neutral-900 rounded-2xl shadow-2xl overflow-hidden">

            {/* HEADER */}
            <div className="flex justify-between items-center p-4 border-b border-neutral-800">
              <div>
                <h3 className="text-xl font-bold text-white">{cases[modalIndex].title}</h3>
                <p className="text-neutral-400 text-sm">{cases[modalIndex].subtitle}</p>
              </div>

              <div className="flex items-center gap-3">
                {cases[modalIndex].video && (
                  <button
                    onClick={() => setModalMuted((s) => !s)}
                    className="px-3 py-2 bg-neutral-800 rounded-md hover:bg-neutral-700 flex items-center gap-2"
                  >
                    {modalMuted ? <VolumeX size={16} /> : <Volume size={16} />}
                    <span className="text-sm">{modalMuted ? "Muted" : "Sound"}</span>
                  </button>
                )}

                <button onClick={closeModal} className="p-2 hover:bg-neutral-800 rounded-md">
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* CONTENT */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* LEFT SIDE (MEDIA) */}
              <div className="bg-black p-4 flex items-center justify-center">
                {cases[modalIndex].video ? (
                  <video
                    src={cases[modalIndex].video}
                    controls
                    autoPlay
                    muted={modalMuted}
                    playsInline
                    className="w-full h-96 md:h-[520px] object-contain bg-black"
                  />
                ) : cases[modalIndex].image ? (
                  <img
                    src={cases[modalIndex].image}
                    alt={cases[modalIndex].title}
                    className="w-full h-96 md:h-[520px] object-contain bg-black"
                  />
                ) : (
                  <div className="text-neutral-400 text-center">No media available</div>
                )}
              </div>

              {/* RIGHT SIDE (INFO) */}
              <div className="p-6 space-y-4">

                <h4 className="text-lg font-semibold text-white">About the project</h4>

                <p className="text-neutral-300 text-sm whitespace-pre-line">
                  {cases[modalIndex].description}
                </p>

                <div className="grid grid-cols-2 gap-3 pt-4">
                  {cases[modalIndex].metrics?.map((m, i) => (
                    <div key={i} className="bg-neutral-800 rounded-md p-3">
                      <div className="text-lg font-semibold text-white">{m.value}</div>
                      <div className="text-xs text-neutral-400">{m.label}</div>
                    </div>
                  ))}
                </div>

                <div className="pt-6 flex items-center gap-3">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                  >
                    Close
                  </button>

                  <button className="px-4 py-2 border border-neutral-700 text-neutral-200 rounded-md">
                    View More
                  </button>

                  <div className="ml-auto flex items-center gap-2">
                    <button onClick={prevInModal} className="p-2 hover:bg-neutral-800 rounded-md">
                      <ChevronLeft />
                    </button>
                    <button onClick={nextInModal} className="p-2 hover:bg-neutral-800 rounded-md">
                      <ChevronRight />
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
