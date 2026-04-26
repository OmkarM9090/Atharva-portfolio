"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ExperienceItem = {
  id: string;
  company: string;
  role: string;
  period: string;
  desc: string;
  color: string;
  align: "left" | "right";
};

const experiences: ExperienceItem[] = [
  {
    id: "EXP-01",
    company: "TechNova AI Labs",
    role: "Machine Learning Intern",
    period: "May 2025 - Aug 2025",
    desc: "Developed predictive models for autonomous routing. Improved accuracy by 15% using PyTorch and TensorFlow.",
    color: "#00ffcc",
    align: "left",
  },
  {
    id: "EXP-02",
    company: "AeroDynamics India",
    role: "UAV Systems Developer",
    period: "Jan 2025 - Apr 2025",
    desc: "Architected flight controller logic for survey drones. Integrated ROS for real-time obstacle avoidance.",
    color: "#a855f7",
    align: "right",
  },
  {
    id: "EXP-03",
    company: "SmartCity Init.",
    role: "IoT Research Assistant",
    period: "Aug 2024 - Dec 2024",
    desc: "Deployed sensor networks for urban traffic analysis. Handled edge computing and AWS data pipelines.",
    color: "#f59e0b",
    align: "left",
  },
  {
    id: "EXP-04",
    company: "CyberDyne Systems",
    role: "Neural Net Engineer",
    period: "Feb 2024 - Jul 2024",
    desc: "Optimized core neural pathways for automated defense grids. Reduced latency by 22%.",
    color: "#ff0055",
    align: "right",
  },
];

const barcodeHeights = [6, 14, 9, 16, 7, 12];

export default function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const droneRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);
  const bgGridRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      setIsLoaded(true);

      gsap.to(droneRef.current, {
        y: "-=20",
        duration: 1.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      gsap.to(bgGridRef.current, {
        backgroundPosition: "0px 100vh",
        ease: "none",
        duration: 10,
        repeat: -1,
      });

      const dropZones = gsap.utils.toArray<HTMLElement>(".drop-zone-item");
      const header = containerRef.current?.querySelector(".section-header");

      if (!containerRef.current || !header || dropZones.length === 0) {
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${dropZones.length * 150 + 100}%`,
          pin: true,
          scrub: 1.5,
          anticipatePin: 1,
        },
      });

      tl.to(header, { opacity: 0, y: -100, duration: 1.5, ease: "power2.inOut" }, 0);

      dropZones.forEach((zone, index) => {
        const exp = experiences[index];

        if (!exp) {
          return;
        }

        const isLeft = exp.align === "left";
        const targetX = isLeft ? "-22vw" : "22vw";
        const core = zone.querySelector(".data-core");
        const beam = zone.querySelector(".laser-beam");
        const card = zone.querySelector(".exp-card");
        const shockwave = zone.querySelector(".shockwave");
        const targetReticle = zone.querySelector(".target-reticle");
        const timelineDot = zone.querySelector(".timeline-dot");

        if (!core || !beam || !card || !shockwave || !targetReticle || !timelineDot) {
          return;
        }

        tl.to(
          droneRef.current,
          {
            x: targetX,
            rotationZ: isLeft ? -20 : 20,
            duration: 1.5,
            ease: "power2.inOut",
          },
          `move${index}`
        )
          .to(droneRef.current, { rotationZ: 0, duration: 0.5 })
          .to(targetReticle, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(2)" }, "-=0.3")
          .to(targetReticle, { rotation: 180, duration: 1.5, ease: "none" }, "<")
          .to(beam, { height: "30vh", opacity: 0.9, duration: 0.4 })
          .fromTo(core, { y: "-30vh", scale: 0.2, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: 0.8, ease: "power4.in" }, "<")
          .to(beam, { height: "0px", opacity: 0, duration: 0.1 })
          .to(targetReticle, { opacity: 0, duration: 0.2 }, "<")
          .fromTo(shockwave, { scale: 0, opacity: 1 }, { scale: 4, opacity: 0, duration: 0.8, ease: "power2.out" })
          .to(timelineDot, { scale: 1.5, opacity: 1, duration: 0.5, ease: "elastic.out(1, 0.3)" }, "<")
          .to(core, { scale: 0, opacity: 0, duration: 0.2 }, "<")
          .fromTo(
            card,
            { scale: 0.8, opacity: 0, rotationX: 45, y: 50 },
            { scale: 1, opacity: 1, rotationX: 0, y: 0, duration: 1.2, ease: "power3.out" },
            "<"
          )
          .to({}, { duration: index === dropZones.length - 1 ? 3 : 1.5 });

        if (index < dropZones.length - 1) {
          tl.to(
            [card, timelineDot],
            {
              opacity: 0,
              y: -80,
              scale: 0.9,
              duration: 1.5,
              ease: "power2.in",
            },
            `transition${index}`
          )
            .to(
              worldRef.current,
              {
                y: `-${(index + 1) * 100}vh`,
                duration: 2.5,
                ease: "power2.inOut",
              },
              `transition${index}`
            )
            .to(
              droneRef.current,
              {
                x: "0vw",
                rotationZ: isLeft ? 10 : -10,
                duration: 2.5,
                ease: "power2.inOut",
              },
              `transition${index}`
            )
            .to(droneRef.current, { rotationZ: 0, duration: 0.5 });
        }
      });

      const lastZone = dropZones[dropZones.length - 1];
      const lastCard = lastZone?.querySelector(".exp-card");
      const lastDot = lastZone?.querySelector(".timeline-dot");

      if (!lastCard || !lastDot) {
        return;
      }

      tl.to(
        [lastCard, lastDot],
        {
          opacity: 0,
          y: -80,
          scale: 0.9,
          duration: 1.5,
          ease: "power2.in",
        },
        "outro"
      )
        .to(
          droneRef.current,
          {
            y: "-50vh",
            scale: 0.2,
            opacity: 0,
            duration: 2,
            ease: "power2.in",
          },
          "outro"
        )
        .to(
          worldRef.current,
          {
            y: `-${(dropZones.length - 1) * 100 + 15}vh`,
            duration: 2,
            ease: "power1.inOut",
          },
          "outro"
        );
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section className="bg-[#020202] font-sans text-white overflow-hidden relative selection:bg-[#00ffcc] selection:text-black">
      {!isLoaded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#020202] text-[#00ffcc] font-mono text-sm tracking-widest animate-pulse">
          INITIALIZING SECURE RECORDS...
        </div>
      )}

      <div ref={containerRef} className="relative w-full h-screen overflow-hidden [perspective:2000px]">
        <div
          ref={bgGridRef}
          className="absolute inset-0 opacity-15 pointer-events-none z-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            transform: "rotateX(60deg) scale(2) translateY(0)",
            transformOrigin: "top center",
          }}
        />

        <div className="section-header absolute top-10 w-full text-center z-20 pointer-events-none px-4">
          <div className="inline-block px-5 py-1.5 border border-[#00ffcc]/30 bg-[#00ffcc]/10 rounded-full mb-4 backdrop-blur-md shadow-[0_0_15px_rgba(0,255,204,0.2)]">
            <span className="text-[#00ffcc] font-mono tracking-[0.3em] text-xs font-bold uppercase">Atharva&apos;s Profile</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white drop-shadow-2xl">
            Internships &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ffcc] to-[#a855f7]">
              Experience
            </span>
          </h2>
        </div>

        <div ref={droneRef} className="absolute top-[18%] left-1/2 -translate-x-1/2 z-50 pointer-events-none will-change-transform">
          <div className="relative w-40 h-40 md:w-56 md:h-56 drop-shadow-[0_40px_30px_rgba(0,0,0,0.8)]">
            <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-zinc-300" aria-hidden="true">
              <polygon points="35,30 65,30 75,50 65,70 35,70 25,50" fill="#050505" stroke="#333" strokeWidth="2" />
              <polygon points="40,35 60,35 68,50 60,65 40,65 32,50" fill="#111" stroke="#00ffcc" strokeWidth="1" />
              <circle cx="50" cy="50" r="8" fill="#000" stroke="#444" />
              <circle cx="50" cy="50" r="3" fill="#00ffcc" className="animate-pulse" />
              <path d="M35 35 L15 15 M65 35 L85 15 M35 65 L15 85 M65 65 L85 85" stroke="#222" strokeWidth="6" strokeLinecap="square" />
              <path d="M35 35 L15 15 M65 35 L85 15 M35 65 L15 85 M65 65 L85 85" stroke="#00ffcc" strokeWidth="1" strokeLinecap="square" opacity="0.3" />
              <circle cx="15" cy="15" r="6" fill="#111" stroke="#444" />
              <circle cx="85" cy="15" r="6" fill="#111" stroke="#444" />
              <circle cx="15" cy="85" r="6" fill="#111" stroke="#444" />
              <circle cx="85" cy="85" r="6" fill="#111" stroke="#444" />
              <g className="origin-[15px_15px] animate-[spin_0.08s_linear_infinite]">
                <ellipse cx="15" cy="15" rx="18" ry="2" fill="#fff" opacity="0.2" filter="blur(1px)" />
                <line x1="-3" y1="15" x2="33" y2="15" stroke="#00ffcc" strokeWidth="1" opacity="0.5" />
              </g>
              <g className="origin-[85px_15px] animate-[spin_0.1s_linear_infinite_reverse]">
                <ellipse cx="85" cy="15" rx="18" ry="2" fill="#fff" opacity="0.2" filter="blur(1px)" />
                <line x1="67" y1="15" x2="103" y2="15" stroke="#00ffcc" strokeWidth="1" opacity="0.5" />
              </g>
              <g className="origin-[15px_85px] animate-[spin_0.1s_linear_infinite_reverse]">
                <ellipse cx="15" cy="85" rx="18" ry="2" fill="#fff" opacity="0.2" filter="blur(1px)" />
                <line x1="-3" y1="85" x2="33" y2="85" stroke="#00ffcc" strokeWidth="1" opacity="0.5" />
              </g>
              <g className="origin-[85px_85px] animate-[spin_0.08s_linear_infinite]">
                <ellipse cx="85" cy="85" rx="18" ry="2" fill="#fff" opacity="0.2" filter="blur(1px)" />
                <line x1="67" y1="85" x2="103" y2="85" stroke="#00ffcc" strokeWidth="1" opacity="0.5" />
              </g>
            </svg>
          </div>
        </div>

        <div ref={worldRef} className="absolute top-0 w-full z-10">
          <div
            className="absolute left-1/2 -translate-x-1/2 top-0 w-[2px] bg-gradient-to-b from-transparent via-zinc-800 to-transparent"
            style={{ height: `${experiences.length * 100}vh` }}
          />

          {experiences.map((exp) => {
            const isLeft = exp.align === "left";

            return (
              <div key={exp.id} className="drop-zone-item relative w-full h-screen flex items-center">
                <div
                  className="timeline-dot absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 bg-black opacity-0 z-0 shadow-[0_0_15px_currentColor]"
                  style={{ borderColor: exp.color, color: exp.color }}
                />

                <div
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center z-10"
                  style={{ left: isLeft ? "28%" : "72%" }}
                >
                  <div
                    className="laser-beam absolute bottom-[40px] w-8 opacity-0 pointer-events-none"
                    style={{
                      height: "0px",
                      background: `linear-gradient(to bottom, transparent, ${exp.color}90, ${exp.color}40)`,
                      filter: `drop-shadow(0 0 15px ${exp.color})`,
                    }}
                  />

                  <div className="target-reticle absolute bottom-0 w-32 h-32 opacity-0 pointer-events-none" style={{ transform: "rotateX(65deg) scale(0)" }}>
                    <div className="absolute inset-0 border-2 border-dashed rounded-full animate-[spin_3s_linear_infinite]" style={{ borderColor: exp.color }} />
                    <div className="absolute inset-4 border border-solid rounded-full opacity-30" style={{ borderColor: exp.color }} />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full" style={{ backgroundColor: exp.color }} />
                  </div>

                  <div className="data-core absolute bottom-[20px] w-10 h-10 flex items-center justify-center opacity-0 pointer-events-none">
                    <div className="w-full h-full border-2 rotate-45 bg-black" style={{ borderColor: exp.color, boxShadow: `0 0 25px ${exp.color}60` }} />
                  </div>

                  <div className="shockwave absolute bottom-[10px] w-16 h-16 rounded-full border-[3px] opacity-0 pointer-events-none" style={{ borderColor: exp.color, transform: "rotateX(65deg)" }} />

                  <article className="exp-card absolute top-8 w-[85vw] md:w-[35vw] bg-gradient-to-b from-[#0a0a0a]/95 to-[#020202]/95 backdrop-blur-3xl border border-white/5 rounded-xl p-6 md:p-8 opacity-0 pointer-events-auto shadow-[0_0_50px_rgba(0,0,0,0.8)] transition-all duration-700 hover:-translate-y-3 hover:shadow-[0_30px_60px_rgba(0,0,0,0.9)] hover:border-white/10 group overflow-hidden">
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none"
                      style={{ background: `radial-gradient(circle at top right, ${exp.color}, transparent 60%)` }}
                    />
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 opacity-30 group-hover:opacity-100 transition-opacity duration-500 rounded-tl-xl" style={{ borderColor: exp.color }} />
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 opacity-30 group-hover:opacity-100 transition-opacity duration-500 rounded-br-xl" style={{ borderColor: exp.color }} />

                    <div
                      className="absolute top-6 right-6 px-3 py-1.5 bg-black/50 backdrop-blur-md border border-white/10 rounded font-mono text-[10px] font-bold tracking-[0.2em] flex items-center gap-2 group-hover:border-white/30 transition-colors z-10"
                      style={{ color: exp.color }}
                    >
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: exp.color }} />
                        <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: exp.color }} />
                      </span>
                      {exp.id}
                    </div>

                    <div className="flex flex-col mb-6 pb-6 border-b border-white/5 relative z-10 pr-20">
                      <span className="font-mono text-xs tracking-[0.2em] text-zinc-400 mb-3 flex items-center gap-3">
                        <span className="h-px w-6" style={{ backgroundColor: exp.color }} />
                        {exp.period}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-500 uppercase tracking-tight leading-none mb-2 drop-shadow-sm">
                        {exp.role}
                      </h3>
                      <h4 className="text-sm md:text-base font-mono font-medium tracking-widest flex items-center gap-2" style={{ color: exp.color }}>
                        <svg className="w-4 h-4 opacity-70 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        {exp.company}
                      </h4>
                    </div>

                    <p className="text-zinc-300 text-sm md:text-base leading-relaxed font-light tracking-wide relative z-10">{exp.desc}</p>

                    <div className="mt-8 flex items-center justify-between gap-4 opacity-60 group-hover:opacity-100 transition-opacity duration-500 relative z-10">
                      <div className="flex gap-1.5 items-end">
                        {barcodeHeights.map((height, index) => (
                          <div
                            key={`${exp.id}-${height}-${index}`}
                            className="bg-zinc-500 rounded-t-sm transition-all duration-300 group-hover:bg-zinc-300"
                            style={{ width: "3px", height }}
                          />
                        ))}
                        <div className="w-1.5 h-1.5 rounded-full ml-2 animate-pulse" style={{ backgroundColor: exp.color }} />
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/5">
                        <span className="text-[9px] font-mono text-zinc-300 tracking-[0.3em] uppercase whitespace-nowrap">Verified Record</span>
                        <svg className="w-3 h-3 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="h-[50vh] flex flex-col items-center justify-center bg-[#020202] text-zinc-700 font-mono text-sm border-t border-zinc-900">
        <div className="w-px h-24 bg-gradient-to-b from-zinc-800 to-transparent mb-6" />
        [ END OF SECURE RECORDS ]
      </div>
    </section>
  );
}
