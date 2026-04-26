"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ecellBars = [18, 34, 24, 46, 29, 38];
const csiBars = [42, 26, 48, 22, 36, 30];

export default function LeadershipExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleGroupRef = useRef<HTMLDivElement>(null);
  const ecellWrapperRef = useRef<HTMLDivElement>(null);
  const csiWrapperRef = useRef<HTMLDivElement>(null);
  const ecellPanelRef = useRef<HTMLDivElement>(null);
  const csiPanelRef = useRef<HTMLDivElement>(null);
  const bgGridRef = useRef<HTMLDivElement>(null);
  const ambientEcellRef = useRef<HTMLDivElement>(null);
  const ambientCsiRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      setIsLoaded(true);

      gsap.to(bgGridRef.current, {
        backgroundPosition: "0px 100vh",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
        },
      });

      gsap.to([ecellPanelRef.current, csiPanelRef.current], {
        y: -15,
        rotationX: 2,
        rotationY: -2,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 2,
          anticipatePin: 1,
        },
      });

      tl.to(titleGroupRef.current, {
        scale: 2.5,
        opacity: 0,
        filter: "blur(15px)",
        duration: 2,
        ease: "power2.inOut",
      })
        .to(ambientEcellRef.current, { opacity: 0.8, duration: 1.5 }, "-=1.5")
        .fromTo(
          ecellWrapperRef.current,
          { y: "60vh", z: -1000, rotationX: 30, opacity: 0 },
          { y: "0vh", z: 0, rotationX: 0, opacity: 1, duration: 2.5, ease: "power4.out" }
        )
        .to({}, { duration: 1.5 })
        .to(ecellWrapperRef.current, {
          z: -1800,
          y: "-15vh",
          opacity: 0.05,
          filter: "blur(12px)",
          duration: 3,
          ease: "power3.inOut",
        })
        .to(ambientEcellRef.current, { opacity: 0, duration: 2 }, "<")
        .to(ambientCsiRef.current, { opacity: 0.8, duration: 2 }, "<")
        .fromTo(
          csiWrapperRef.current,
          { y: "70vh", z: 800, rotationX: -30, opacity: 0 },
          { y: "0vh", z: 0, rotationX: 0, opacity: 1, duration: 3, ease: "power4.out" },
          "<"
        )
        .to({}, { duration: 1.5 })
        .to(csiWrapperRef.current, {
          z: -1500,
          y: "-25vh",
          opacity: 0,
          filter: "blur(15px)",
          duration: 2.5,
          ease: "power3.in",
        })
        .to(ambientCsiRef.current, { opacity: 0, duration: 1.5 }, "<");
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section className="bg-[#020202] font-sans text-white selection:bg-[#00ffcc] selection:text-black">
      {!isLoaded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#020202]">
          <div className="animate-pulse text-xs text-[#00ffcc] font-mono tracking-[0.3em]">
            ESTABLISHING COMMAND LINK...
          </div>
        </div>
      )}

      <div ref={containerRef} className="relative w-full h-[400vh]">
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden [perspective:1500px]">
          <div
            ref={bgGridRef}
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
              transform: "rotateX(60deg) scale(2.5) translateZ(-500px)",
              transformOrigin: "center center",
            }}
          />

          <div
            ref={ambientEcellRef}
            className="absolute inset-0 opacity-0 pointer-events-none transition-opacity duration-1000"
            style={{
              background:
                "linear-gradient(120deg, rgba(16, 185, 129, 0.16), transparent 48%), linear-gradient(300deg, rgba(16, 185, 129, 0.08), transparent 55%)",
            }}
          />
          <div
            ref={ambientCsiRef}
            className="absolute inset-0 opacity-0 pointer-events-none transition-opacity duration-1000"
            style={{
              background:
                "linear-gradient(120deg, rgba(59, 130, 246, 0.16), transparent 48%), linear-gradient(300deg, rgba(59, 130, 246, 0.08), transparent 55%)",
            }}
          />

          <div ref={titleGroupRef} className="absolute z-10 flex flex-col items-center pointer-events-none px-6 text-center">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="w-16 h-16 md:w-20 md:h-20 text-zinc-400 mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2 20h20v2H2v-2zm19.9-4.8l-3.2-9.6c-.3-.8-1.5-.9-1.9-.1l-2.6 6.1L12 3.2c-.4-.9-1.6-.9-2 0l-2.3 8.4-2.6-6.1c-.4-.8-1.6-.7-1.9.1L2.1 15.2c-.2.6.2 1.3.8 1.4l18.2 1.8c.7.1 1.1-.6.8-1.2z"
              />
            </svg>
            <h2 className="text-5xl md:text-8xl lg:text-[10rem] font-black tracking-tight uppercase text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-400 to-transparent leading-none">
              Leadership
            </h2>
            <div className="flex items-center gap-4 mt-6">
              <div className="h-px w-8 md:w-12 bg-zinc-600" />
              <p className="text-zinc-400 font-mono tracking-[0.35em] text-[10px] md:text-xs uppercase">
                Command Protocols
              </p>
              <div className="h-px w-8 md:w-12 bg-zinc-600" />
            </div>
          </div>

          <div ref={ecellWrapperRef} className="absolute z-20 w-[92vw] md:w-[70vw] max-w-4xl opacity-0 [transform-style:preserve-3d]">
            <div
              ref={ecellPanelRef}
              className="relative bg-[#050505]/70 backdrop-blur-2xl border-t border-b border-emerald-500/30 p-5 md:p-12 overflow-hidden shadow-[0_0_80px_rgba(16,185,129,0.05)]"
              style={{ clipPath: "polygon(0 20px, 20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)" }}
            >
              <div className="absolute -right-6 md:-right-10 -bottom-6 md:-bottom-10 text-7xl md:text-[12rem] font-black text-emerald-500/5 select-none pointer-events-none leading-none tracking-tight z-0">
                PRESIDENT
              </div>
              <div className="leadership-scan absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-50 z-10" />

              <div className="relative z-10">
                <div className="flex flex-col md:flex-row items-start justify-between gap-5 md:gap-6 mb-7 md:mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 flex shrink-0 items-center justify-center border border-emerald-500/30 bg-emerald-500/10 rounded-sm">
                      <div className="w-4 h-4 bg-emerald-500 shadow-[0_0_15px_#10b981] animate-pulse" />
                    </div>
                    <div>
                      <h3 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase">E-Cell</h3>
                      <p className="text-emerald-500 font-mono text-xs md:text-sm tracking-[0.2em] mt-1">
                        ENTREPRENEURSHIP CELL
                      </p>
                    </div>
                  </div>
                  <div className="px-4 py-2 bg-white/5 border border-white/10 rounded font-mono text-xs text-zinc-400 tracking-widest uppercase backdrop-blur-sm">
                    Tenure // 202X-Pres
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                  <div className="md:col-span-2 space-y-4">
                    <p className="text-zinc-300 text-base md:text-xl font-light leading-relaxed">
                      Commanding a dynamic ecosystem of innovators. Spearheading the startup culture, orchestrating incubation
                      initiatives, and architecting the flagship <span className="text-white font-medium">E-Summit</span> that brings
                      industry leaders together.
                    </p>
                    <div className="flex gap-2 pt-4 opacity-70">
                      {ecellBars.map((width) => (
                        <div key={`ecell-${width}`} className="h-1 bg-emerald-500/50" style={{ width }} />
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="p-4 bg-black/40 border border-white/5 relative group hover:border-emerald-500/30 transition-colors">
                      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-emerald-500" />
                      <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-emerald-600">
                        10+
                      </div>
                      <div className="text-[10px] font-mono text-zinc-500 tracking-widest uppercase mt-1">Startups Incubated</div>
                    </div>
                    <div className="p-4 bg-black/40 border border-white/5 relative group hover:border-emerald-500/30 transition-colors">
                      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-emerald-500" />
                      <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-emerald-600">
                        5000+
                      </div>
                      <div className="text-[10px] font-mono text-zinc-500 tracking-widest uppercase mt-1">Active Members</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div ref={csiWrapperRef} className="absolute z-30 w-[92vw] md:w-[70vw] max-w-4xl opacity-0 [transform-style:preserve-3d]">
            <div
              ref={csiPanelRef}
              className="relative bg-[#050505]/70 backdrop-blur-2xl border-t border-b border-blue-500/30 p-5 md:p-12 overflow-hidden shadow-[0_0_80px_rgba(59,130,246,0.05)]"
              style={{ clipPath: "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)" }}
            >
              <div className="absolute -right-6 md:-right-10 -bottom-6 md:-bottom-10 text-7xl md:text-[11rem] font-black text-blue-500/5 select-none pointer-events-none leading-none tracking-tight z-0">
                CHAIRPERSON
              </div>
              <div className="leadership-scan leadership-scan-reverse absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-50 z-10" />

              <div className="relative z-10">
                <div className="flex flex-col md:flex-row items-start justify-between gap-5 md:gap-6 mb-7 md:mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 flex shrink-0 items-center justify-center border border-blue-500/30 bg-blue-500/10 rounded-full">
                      <div className="w-4 h-4 bg-blue-400 rounded-full shadow-[0_0_15px_#3b82f6] animate-ping" />
                    </div>
                    <div>
                      <h3 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase">CSI Chapter</h3>
                      <p className="text-blue-400 font-mono text-xs md:text-sm tracking-[0.2em] mt-1">
                        COMPUTER SOCIETY OF INDIA
                      </p>
                    </div>
                  </div>
                  <div className="px-4 py-2 bg-white/5 border border-white/10 rounded font-mono text-xs text-zinc-400 tracking-widest uppercase backdrop-blur-sm">
                    Tenure // 202X-Pres
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                  <div className="md:col-span-2 space-y-4">
                    <p className="text-zinc-300 text-base md:text-xl font-light leading-relaxed">
                      Architecting technical excellence and open-source momentum. Directing 24-hour hackathons, AI and Web3 bootcamps,
                      and pathways between academia and elite tech industries.
                    </p>
                    <div className="flex gap-2 pt-4 opacity-70">
                      {csiBars.map((width) => (
                        <div key={`csi-${width}`} className="h-1 bg-blue-500/50" style={{ width }} />
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="p-4 bg-black/40 border border-white/5 relative group hover:border-blue-500/30 transition-colors">
                      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-blue-500" />
                      <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-600">
                        24HR
                      </div>
                      <div className="text-[10px] font-mono text-zinc-500 tracking-widest uppercase mt-1">Mega Hackathons</div>
                    </div>
                    <div className="p-4 bg-black/40 border border-white/5 relative group hover:border-blue-500/30 transition-colors">
                      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-blue-500" />
                      <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-600">
                        20+
                      </div>
                      <div className="text-[10px] font-mono text-zinc-500 tracking-widest uppercase mt-1">Tech Bootcamps</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes leadershipScan {
          0% { transform: translateY(-10px); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(300px); opacity: 0; }
        }

        .leadership-scan {
          animation: leadershipScan 3s ease-in-out infinite;
        }

        .leadership-scan-reverse {
          animation-direction: reverse;
        }
      `}</style>
    </section>
  );
}
