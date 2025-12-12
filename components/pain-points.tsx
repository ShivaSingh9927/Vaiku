import { AlertTriangle, Clock, Layers, Brain } from "lucide-react";

export default function PainPoints() {
  const pains = [
    { icon: AlertTriangle, text: "No team to turn your website/AI idea into reality" },
    { icon: AlertTriangle, text: "MVP taking too long or costing too much to build" },
    { icon: AlertTriangle, text: "High cost for repetitive, low-value tasks" },
    { icon: AlertTriangle, text: "Hiring more people just to manage routine processes" },
    { icon: AlertTriangle, text: "Manual data entry & reconciliation" },
    { icon: Clock, text: "Struggling to build AI services for your company" },
    { icon: Layers, text: "Fragmented systems with no single view" },
    { icon: Brain, text: "No internal AI expertise to deploy tools" },
  ];

  return (
    <section className="py-20 md:py-28 bg-background" id="problems">
      <div className="max-w-6xl mx-auto px-6 text-center">

        {/* Heading with fade-in */}
        <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-10 animate-fade-in">
          What’s Blocking You?
        </h2>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-12 place-items-center">
          {pains.map((pain, index) => {
            const Icon = pain.icon;
            return (
              <div
                key={index}
                data-aos-delay={index * 100}
                className={`
                  group flex items-center gap-4 p-5 rounded-2xl 
                  border bg-card shadow-sm w-full max-w-md

                  opacity-0 animate-slide-up 
                  [animation-delay:${index * 120}ms]
                  
                  transition-all duration-300 
                  hover:shadow-xl hover:-translate-y-1 hover:border-primary/40
                `}
              >
                {/* Icon */}
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-primary/10 text-primary 
                                transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                  <Icon size={24} className="group-hover:animate-pulse" />
                </div>

                {/* Text */}
                <p className="text-foreground/90 text-left font-medium text-sm md:text-base">
                  {pain.text}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA button */}
        <a
          href="#how-it-works"
          className="inline-block mt-12 px-6 py-3 text-sm font-semibold 
                     bg-primary text-primary-foreground rounded-xl shadow 
                     hover:opacity-90 transition animate-fade-in-up"
        >
          Then don't worry — we are here for you
        </a>
      </div>
    </section>
  );
}
