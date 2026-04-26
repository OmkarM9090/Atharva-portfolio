"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const educationData = {
  institute: "Watumull Institute of Engineering & Tech",
  location: "Ulhasnagar",
  link: "https://watumull.edu.in",
  degree: "Bachelor of Engineering (B.E.)",
  major: "Computer Engineering",
  period: "Aug 2022 - Jun 2026",
  cgpa: 8.18,
  maxCgpa: 10,
  subjects: [
    "Machine Learning",
    "Artificial Intelligence",
    "Computer Vision",
    "Internet of Things",
    "Robotics",
    "Database Management Systems",
  ],
};

export default function EducationSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const laptopLid = containerRef.current?.querySelector(".education-laptop-lid");
      const screenContent = containerRef.current?.querySelector(".education-screen-content");
      const bootScreen = containerRef.current?.querySelector(".education-boot-screen");
      const eduElements = gsap.utils.toArray<HTMLElement>(".education-reveal");
      const cgpaBar = containerRef.current?.querySelector(".education-cgpa-fill");
      const bootTextOne = containerRef.current?.querySelector(".education-boot-text-1");
      const bootTextTwo = containerRef.current?.querySelector(".education-boot-text-2");

      if (!containerRef.current || !laptopLid || !screenContent || !bootScreen || !cgpaBar || !bootTextOne || !bootTextTwo) {
        return;
      }

      setIsLoaded(true);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      gsap.set(laptopLid, { rotationX: -85, transformOrigin: "bottom center" });
      gsap.set(screenContent, { autoAlpha: 0 });
      gsap.set(bootScreen, { autoAlpha: 1 });
      gsap.set(eduElements, { y: 30, opacity: 0 });
      gsap.set(cgpaBar, { width: "0%" });
      gsap.set([bootTextOne, bootTextTwo], { opacity: 0 });

      tl.to(laptopLid, {
        rotationX: 0,
        duration: 2,
        ease: "power2.inOut",
      })
        .to(bootTextOne, { opacity: 1, duration: 0.2 })
        .to({}, { duration: 0.3 })
        .to(bootTextTwo, { opacity: 1, duration: 0.2 })
        .to({}, { duration: 0.5 })
        .to(bootScreen, { autoAlpha: 0, duration: 0.5 })
        .to(screenContent, { autoAlpha: 1, duration: 0.5 }, "<")
        .to(eduElements, {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 1,
          ease: "back.out(1.5)",
        })
        .to(
          cgpaBar,
          {
            width: `${(educationData.cgpa / educationData.maxCgpa) * 100}%`,
            duration: 1.5,
            ease: "power4.out",
          },
          "<0.5"
        )
        .to({}, { duration: 1.5 });

      gsap.to(".education-laptop-wrapper", {
        y: -10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section className="bg-[#020202] font-sans text-white overflow-hidden selection:bg-[#00ffcc] selection:text-black">
      {!isLoaded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#020202] text-[#00ffcc] font-mono text-sm tracking-widest animate-pulse">
          BOOTING EDUCATION MODULE...
        </div>
      )}

      <div ref={containerRef} className="relative w-full h-screen flex flex-col items-center justify-center [perspective:2000px] overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none z-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0, 255, 204, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 204, 0.05) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="absolute top-[8%] w-full text-center z-10 px-4 pointer-events-none">
          <div className="inline-block px-5 py-1.5 border border-[#00ffcc]/30 bg-[#00ffcc]/10 rounded-full mb-4 backdrop-blur-md">
            <span className="text-[#00ffcc] font-mono tracking-[0.3em] text-xs font-bold uppercase">Academic Core</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white drop-shadow-2xl">
            Education{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ffcc] to-[#a855f7]">
              Record
            </span>
          </h2>
        </div>

        <div className="education-laptop-wrapper relative w-[92vw] md:w-[75vw] max-w-5xl h-[58vh] md:h-[70vh] mt-[12vh] [perspective:2500px] z-20">
          <div className="absolute bottom-0 left-[5%] w-[90%] h-10 md:h-12 bg-zinc-900 border border-zinc-700 rounded-b-3xl shadow-[0_30px_60px_rgba(0,0,0,0.9)] [transform-style:preserve-3d] translate-y-full rotate-x-[80deg] origin-top opacity-80 flex items-center justify-center">
            <div className="w-24 h-1 bg-[#00ffcc]/30 rounded-full shadow-[0_0_10px_#00ffcc]" />
          </div>

          <div className="education-laptop-lid absolute inset-0 w-full h-full bg-zinc-800 rounded-t-3xl border-t-4 border-x-4 border-zinc-700 shadow-[0_-10px_40px_rgba(0,255,204,0.15)] flex items-center justify-center p-2 md:p-4 [transform-style:preserve-3d]">
            <div className="relative w-full h-full bg-[#050505] rounded-xl md:rounded-2xl overflow-hidden border border-zinc-900">
              <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-white/10 pointer-events-none z-30" />
              <div
                className="absolute inset-0 opacity-20 pointer-events-none z-0"
                style={{ background: "radial-gradient(circle at center, #00ffcc, transparent 80%)" }}
              />

              <div className="education-boot-screen absolute inset-0 p-5 md:p-8 font-mono text-[#00ffcc] text-xs md:text-lg z-20 bg-[#050505] flex flex-col justify-center">
                <p className="education-boot-text-1 opacity-0 mb-2">{">"} Establishing secure connection to university servers...</p>
                <p className="education-boot-text-2 opacity-0">{">"} Academic Profile Found. Decrypting records...</p>
                <div className="w-4 h-6 bg-[#00ffcc] animate-pulse mt-2" />
              </div>

              <div className="education-screen-content absolute inset-0 w-full h-full p-4 md:p-12 z-10 flex flex-col justify-between overflow-y-auto md:overflow-hidden">
                <div className="education-reveal border-b border-zinc-800 pb-4 md:pb-6">
                  <div className="flex justify-between items-start mb-2 gap-4">
                    <div className="flex items-start md:items-center gap-3 min-w-0">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-[#00ffcc] shrink-0">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                        </svg>
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-lg md:text-3xl font-black text-white uppercase tracking-tight leading-tight">
                          {educationData.institute}
                        </h3>
                        <a
                          href={educationData.link}
                          target="_blank"
                          rel="noreferrer"
                          className="text-zinc-500 font-mono text-[10px] md:text-xs hover:text-[#00ffcc] transition-colors flex flex-wrap items-center gap-1"
                        >
                          {educationData.location} <span className="opacity-50">|</span> {educationData.link.replace("https://", "")}
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      </div>
                    </div>
                    <div className="hidden md:block px-3 py-1 bg-white/5 border border-white/10 rounded font-mono text-[10px] tracking-widest uppercase text-zinc-400 shrink-0">
                      {educationData.period}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-5 md:gap-8 py-5 md:py-6">
                  <div className="education-reveal flex-1">
                    <div className="font-mono text-[10px] text-zinc-500 tracking-widest uppercase mb-2">Academic Program</div>
                    <h4 className="text-2xl md:text-4xl font-bold text-white mb-1 leading-tight">{educationData.degree}</h4>
                    <p className="text-[#00ffcc] font-mono text-sm md:text-base tracking-wider uppercase">
                      {">"} {educationData.major}
                    </p>
                    <div className="md:hidden mt-4 inline-block px-3 py-1 bg-white/5 border border-white/10 rounded font-mono text-[10px] tracking-widest uppercase text-zinc-400">
                      {educationData.period}
                    </div>
                  </div>

                  <div className="education-reveal w-full md:w-1/3 flex flex-col justify-center">
                    <div className="flex justify-between items-end mb-2 gap-4">
                      <div className="font-mono text-[10px] text-zinc-500 tracking-widest uppercase">Cumulative CGPA</div>
                      <div className="font-black text-3xl text-white whitespace-nowrap">
                        {educationData.cgpa} <span className="text-zinc-600 text-lg">/ 10</span>
                      </div>
                    </div>
                    <div className="w-full h-3 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800 relative">
                      <div className="education-cgpa-fill h-full bg-gradient-to-r from-[#00ffcc] to-[#a855f7] rounded-full relative shadow-[0_0_15px_#00ffcc]">
                        <div className="education-cgpa-shimmer absolute top-0 right-0 bottom-0 w-10 bg-gradient-to-r from-transparent to-white/50" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="education-reveal mt-auto pt-5 md:pt-6 border-t border-zinc-800">
                  <div className="font-mono text-[10px] text-zinc-500 tracking-widest uppercase mb-4 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#a855f7] animate-pulse" />
                    Major Specialized Modules
                  </div>
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {educationData.subjects.map((subject) => (
                      <div
                        key={subject}
                        className="px-3 py-1.5 md:px-4 md:py-2 bg-black/50 hover:bg-[#a855f7]/10 border border-zinc-800 hover:border-[#a855f7]/50 transition-all duration-300 rounded-lg font-mono text-[10px] md:text-xs tracking-wider text-zinc-300 hover:text-white flex items-center gap-2 cursor-default group"
                      >
                        <svg className="w-3 h-3 text-zinc-600 group-hover:text-[#a855f7] transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {subject}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes educationCgpaScan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }

        .education-cgpa-shimmer {
          animation: educationCgpaScan 2s linear infinite;
        }
      `}</style>
    </section>
  );
}
