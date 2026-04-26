"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type PaperType = "award" | "published" | "presented";

type Paper = {
  id: string;
  badge: string;
  type: PaperType;
  title: string;
  conf: string;
  desc: string;
  color: string;
  keywords: string[];
};

type DocumentSealProps = {
  type: PaperType;
  color: string;
};

const papers: Paper[] = [
  {
    id: "DOC-01",
    badge: "AWARD WINNING",
    type: "award",
    title: "VAYU - Vision Assisted Yaan for Utility",
    conf: "ICATES 2024",
    desc: "Awarded Best Research Paper at the International Conference on Advanced Technologies in Engineering and Science. Focuses on vision-assisted utility drone architecture for complex environments.",
    color: "#f59e0b",
    keywords: ["Computer Vision", "UAV Architecture", "Autonomous Systems"],
  },
  {
    id: "DOC-02",
    badge: "PRESENTED",
    type: "presented",
    title: "Drone Deconfliction System",
    conf: "International Conference",
    desc: "UAV conflict prevention model with advanced routing algorithms and collision avoidance frameworks ensuring safe airspace for autonomous aerial vehicles.",
    color: "#00ffcc",
    keywords: ["Path Planning", "Collision Avoidance", "Airspace Management"],
  },
  {
    id: "DOC-03",
    badge: "PRESENTED",
    type: "presented",
    title: "UrbanPulse",
    conf: "International Conference",
    desc: "Smart city automation and monitoring framework with IoT sensor networks for real-time urban infrastructure monitoring and automated management.",
    color: "#a855f7",
    keywords: ["IoT", "Smart Cities", "Sensor Networks"],
  },
  {
    id: "DOC-04",
    badge: "PUBLISHED",
    type: "published",
    title: "Saksham 2.0",
    conf: "JETIR Journal (Dec 2024)",
    desc: "A quadruped robot for assistive technology and tourism applications. Explores advanced robotics tailored for enhancing human assistance.",
    color: "#10b981",
    keywords: ["Quadruped Robotics", "Assistive Tech", "Kinematics"],
  },
];

const barcodeHeights = [8, 16, 4, 12, 20, 8, 16];

function DocumentSeal({ type, color }: DocumentSealProps) {
  return (
    <div className="relative flex items-center justify-center w-24 h-24 md:w-32 md:h-32 opacity-80" style={{ color }}>
      <svg className="absolute inset-0 w-full h-full animate-[spin_10s_linear_infinite]" viewBox="0 0 100 100" aria-hidden="true">
        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
        <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="0.5" />
      </svg>

      {type === "award" ? (
        <svg className="w-10 h-10 md:w-14 md:h-14 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>
      ) : type === "published" ? (
        <svg className="w-10 h-10 md:w-12 md:h-12 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        </svg>
      ) : (
        <svg className="w-10 h-10 md:w-12 md:h-12 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
        </svg>
      )}

      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[6px] font-mono tracking-widest uppercase opacity-50 translate-y-[25px]">Verified</span>
      </div>
    </div>
  );
}

export default function ResearchExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".research-manuscript-card");
      const headerContent = containerRef.current?.querySelector(".research-header-content");
      const scrollObject = containerRef.current?.querySelector(".research-scroll-object");
      const globalGlow = containerRef.current?.querySelector(".research-ambient-glow");

      if (!containerRef.current || !headerContent || !scrollObject || !globalGlow || cards.length === 0) {
        return;
      }

      setIsLoaded(true);

      gsap.to(cards, {
        yPercent: -3,
        rotationX: 1,
        rotationY: -1,
        duration: 4,
        stagger: { each: 0.3, repeat: -1, yoyo: true },
        ease: "sine.inOut",
      });

      gsap.set(cards, { xPercent: 120, z: -1000, rotationY: -25, opacity: 0, scale: 0.85 });
      gsap.set(scrollObject, {
        x: "-100vw",
        rotation: -1080,
        scale: 0.2,
        opacity: 0,
        width: "4rem",
        height: "4rem",
        borderRadius: "50%",
      });
      gsap.set(headerContent, { opacity: 0, scale: 0.8, filter: "blur(10px)", y: 20 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${papers.length * 150 + 150}%`,
          pin: true,
          scrub: 1.5,
          anticipatePin: 1,
        },
      });

      tl.to(scrollObject, {
        x: 0,
        rotation: 0,
        scale: 1,
        opacity: 1,
        duration: 1.5,
        ease: "power4.out",
      })
        .to(scrollObject, {
          width: "60vw",
          borderRadius: "10px",
          duration: 1,
          ease: "power3.inOut",
        })
        .to(scrollObject, {
          height: "25vh",
          opacity: 0,
          duration: 1,
          ease: "power2.out",
        })
        .to(
          headerContent,
          {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            y: 0,
            duration: 1,
          },
          "<0.2"
        )
        .to({}, { duration: 1.5 })
        .to(headerContent, { opacity: 0, y: -60, filter: "blur(10px)", duration: 1 });

      cards.forEach((card, index) => {
        const paper = papers[index];

        if (!paper) {
          return;
        }

        tl.to(
          globalGlow,
          {
            background: `radial-gradient(circle at 70% 50%, ${paper.color}15 0%, transparent 60%)`,
            duration: 1,
          },
          index === 0 ? 0 : "<0.5"
        );

        tl.to(card, {
          xPercent: 0,
          z: 0,
          rotationY: 0,
          opacity: 1,
          scale: 1,
          duration: 1.8,
          ease: "power3.out",
        });

        tl.to({}, { duration: 1.5 });

        if (index < cards.length - 1) {
          tl.to(card, {
            xPercent: -120,
            z: -1000,
            rotationY: 25,
            opacity: 0,
            scale: 0.85,
            duration: 1.8,
            ease: "power3.in",
          });
        }
      });

      tl.to({}, { duration: 1.5 });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section className="bg-[#020202] font-sans text-white overflow-hidden selection:bg-[#00ffcc] selection:text-black relative">
      {!isLoaded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#020202] text-[#00ffcc] font-mono text-sm tracking-widest animate-pulse">
          RETRIEVING ACADEMIC RECORDS...
        </div>
      )}

      <div ref={containerRef} className="relative w-full h-screen [perspective:2500px] overflow-hidden">
        <div
          className="research-ambient-glow absolute inset-0 transition-colors duration-1000 ease-in-out z-0"
          style={{ background: "radial-gradient(circle at 70% 50%, #f59e0b10 0%, transparent 60%)" }}
        />

        <div className="absolute inset-0 pointer-events-none z-0">
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
              transform: "rotateX(60deg) scale(2.5) translateZ(-500px)",
              transformOrigin: "center center",
            }}
          />
        </div>

        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <div className="research-scroll-object absolute flex items-center justify-center bg-[#00ffcc] shadow-[0_0_40px_rgba(0,255,204,0.6)]">
            <div className="w-full h-full border-2 border-white/20 rounded-full animate-pulse" />
          </div>

          <div className="research-header-content absolute flex flex-col items-center px-4 text-center">
            <div className="inline-block px-5 py-1.5 border border-[#00ffcc]/30 bg-[#00ffcc]/10 rounded-full mb-4 backdrop-blur-md shadow-[0_0_15px_rgba(0,255,204,0.2)]">
              <span className="text-[#00ffcc] font-mono tracking-[0.3em] text-xs font-bold uppercase">
                Academic Contributions
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-black uppercase tracking-tight text-white drop-shadow-2xl leading-none">
              Research & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ffcc] to-[#a855f7]">
                Publications
              </span>
            </h2>
            <div className="flex items-center gap-4 mt-6">
              <div className="h-px w-10 md:w-12 bg-zinc-600" />
              <p className="text-zinc-500 font-mono tracking-[0.3em] md:tracking-[0.4em] text-[10px] uppercase">
                Archived Manuscripts
              </p>
              <div className="h-px w-10 md:w-12 bg-zinc-600" />
            </div>
          </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
          {papers.map((paper, index) => (
            <div key={paper.id} className="research-manuscript-card absolute w-[92vw] md:w-[75vw] max-w-5xl [transform-style:preserve-3d] pointer-events-auto">
              <div className="relative bg-[#070707] border border-zinc-800/80 rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.9)] flex flex-col md:flex-row group">
                <div className="w-full md:w-[35%] bg-zinc-950/80 border-b md:border-b-0 md:border-r border-zinc-800/80 p-5 md:p-8 flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 md:w-2 h-full" style={{ backgroundColor: paper.color }} />

                  <div>
                    <div className="font-mono text-zinc-500 text-xs tracking-widest mb-1">RECORD ID</div>
                    <div className="font-mono text-2xl font-bold text-white mb-5 md:mb-8">{paper.id}</div>

                    <div className="font-mono text-zinc-500 text-xs tracking-widest mb-1">CONFERENCE / JOURNAL</div>
                    <div className="text-sm font-medium tracking-wide text-zinc-300 mb-5 md:mb-8" style={{ color: paper.color }}>
                      {paper.conf}
                    </div>
                  </div>

                  <div className="mt-4 md:mt-8 flex flex-col items-center justify-center">
                    <DocumentSeal type={paper.type} color={paper.color} />
                    <div
                      className="mt-4 px-3 py-1 bg-white/5 border border-white/10 rounded font-mono text-[10px] tracking-widest font-bold uppercase text-center"
                      style={{ color: paper.color }}
                    >
                      {paper.badge}
                    </div>
                  </div>
                </div>

                <div
                  className="w-full md:w-[65%] p-5 md:p-12 relative"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 15% 20%, rgba(255,255,255,0.045) 0 1px, transparent 1px), linear-gradient(135deg, rgba(255,255,255,0.035), transparent 35%)",
                    backgroundSize: "18px 18px, 100% 100%",
                  }}
                >
                  <div className="absolute right-6 md:right-8 top-6 md:top-8 font-serif italic text-7xl md:text-8xl text-white/5 pointer-events-none select-none">
                    0{index + 1}
                  </div>

                  <h3 className="text-2xl md:text-4xl font-bold text-white mb-6 md:mb-8 leading-tight tracking-tight pr-8 md:pr-12 uppercase">
                    {paper.title}
                  </h3>

                  <div className="relative pl-5 md:pl-6 py-2 border-l-2 mb-6 md:mb-8" style={{ borderColor: `${paper.color}50` }}>
                    <div className="font-mono text-[10px] tracking-widest text-zinc-500 mb-3 uppercase">Abstract</div>
                    <p className="text-zinc-300 text-sm md:text-lg leading-relaxed font-light">{paper.desc}</p>
                  </div>

                  <div>
                    <div className="font-mono text-[10px] tracking-widest text-zinc-500 mb-3 uppercase">Keywords</div>
                    <div className="flex flex-wrap gap-2">
                      {paper.keywords.map((keyword) => (
                        <span
                          key={`${paper.id}-${keyword}`}
                          className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-xs text-zinc-400 font-mono uppercase tracking-wider"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="absolute bottom-6 md:bottom-8 right-6 md:right-8 hidden sm:flex gap-1 opacity-20">
                    {barcodeHeights.map((height, barIndex) => (
                      <div key={`${paper.id}-bar-${barIndex}`} className="w-1 bg-white rounded-full" style={{ height }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="h-[20vh] flex flex-col items-center justify-center bg-[#020202] text-zinc-700 font-mono text-sm border-t border-zinc-900">
        <div className="w-px h-16 bg-gradient-to-b from-zinc-800 to-transparent mb-6" />
      </div>
    </section>
  );
}
