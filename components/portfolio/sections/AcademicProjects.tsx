"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Project = {
  id: string;
  title: string;
  highlight: string;
  desc: string;
  tech: string[];
  color: string;
  image: string;
  github: string | null;
  demo: string | null;
};

const projects: Project[] = [
  {
    id: "PRJ-01",
    title: "Drone Deconfliction System",
    highlight: "95% Collision Risk Reduction",
    desc: "Real-time UAV conflict prevention model utilizing advanced mathematical models and simulations to ensure safe autonomous routing in complex airspaces.",
    tech: ["PYTHON", "NUMPY", "UAV SIMS"],
    color: "#00ffcc",
    image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=1000&auto=format&fit=crop",
    github: "#",
    demo: "#",
  },
  {
    id: "PRJ-02",
    title: "Vision Assisted Yaan",
    highlight: "Best Paper @ ICATES 2024",
    desc: "An ESP32-CAM based robotic system achieving 92% motion detection accuracy. Engineered for smart surveillance, autonomous monitoring, and utility operations.",
    tech: ["ESP32", "C++", "COMPUTER VISION"],
    color: "#f59e0b",
    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=1000&auto=format&fit=crop",
    github: "#",
    demo: "#",
  },
  {
    id: "PRJ-03",
    title: "Attendify Automation",
    highlight: "High Accuracy Face Recognition",
    desc: "Created a robust face recognition-based attendance system. Implemented deep learning pipelines to improve accuracy and efficiency in institutional record management.",
    tech: ["PYTHON", "OPENCV", "DEEP LEARNING"],
    color: "#a855f7",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=1000&auto=format&fit=crop",
    github: "#",
    demo: null,
  },
  {
    id: "PRJ-04",
    title: "Saksham Quadruped",
    highlight: "Published in JETIR",
    desc: "Designed and engineered an Arduino-based four-legged robot using precise servo motor kinematics. Focused on assistive technology and tourism applications.",
    tech: ["ARDUINO", "PYTHON", "KINEMATICS"],
    color: "#10b981",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1000&auto=format&fit=crop",
    github: "#",
    demo: "#",
  },
];

export default function AcademicProjects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(".academic-project-panel");
      const header = containerRef.current?.querySelector(".academic-project-header");
      const globalGlow = containerRef.current?.querySelector(".academic-project-glow");

      if (!containerRef.current || !header || !globalGlow || panels.length === 0) {
        return;
      }

      setIsLoaded(true);

      gsap.to(".academic-project-3d-card", {
        y: -15,
        rotationX: "+=1.5",
        rotationY: "-=1.5",
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${panels.length * 150}%`,
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      gsap.set(panels, { autoAlpha: 0, display: "none" });
      tl.to(header, { opacity: 0, y: -40, filter: "blur(10px)", duration: 1 }, 0);

      panels.forEach((panel, index) => {
        const revealItems = panel.querySelectorAll(".academic-project-reveal");
        const rightCard = panel.querySelector(".academic-project-card-wrapper");
        const project = projects[index];

        if (!project || !rightCard || revealItems.length === 0) {
          return;
        }

        tl.set(panel, { display: "flex" }).to(panel, { autoAlpha: 1, duration: 0.1 });

        tl.to(
          globalGlow,
          {
            background: `radial-gradient(circle at 75% 50%, ${project.color}15 0%, transparent 60%)`,
            duration: 1,
          },
          "<"
        );

        if (index === 0) {
          tl.fromTo(
            revealItems,
            { y: 80, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.1, duration: 1.2, ease: "expo.out" },
            "<"
          ).fromTo(
            rightCard,
            { x: 100, opacity: 0, scale: 0.9 },
            { x: 0, opacity: 1, scale: 1, duration: 1.5, ease: "power3.out" },
            "<"
          );
        } else {
          tl.fromTo(
            revealItems,
            { y: 100, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.1, duration: 1.5, ease: "expo.out" },
            "<"
          ).fromTo(
            rightCard,
            { x: 200, z: -300, rotationY: -10, opacity: 0, scale: 0.8 },
            { x: 0, z: 0, rotationY: 0, opacity: 1, scale: 1, duration: 1.8, ease: "expo.out" },
            "<0.1"
          );
        }

        tl.to({}, { duration: 2 });

        if (index < panels.length - 1) {
          tl.to(revealItems, {
            y: -100,
            opacity: 0,
            stagger: 0.05,
            duration: 1,
            ease: "power3.in",
          })
            .to(
              rightCard,
              {
                x: -150,
                z: -200,
                rotationY: -20,
                opacity: 0,
                scale: 0.9,
                duration: 1.2,
                ease: "power3.in",
              },
              "<"
            )
            .set(panel, { display: "none", autoAlpha: 0 });
        }
      });

      tl.to({}, { duration: 1 });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section className="bg-[#020202] font-sans text-white selection:bg-[#00ffcc] selection:text-black">
      {!isLoaded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#020202] text-[#00ffcc] font-mono text-sm tracking-widest animate-pulse">
          LOADING SYSTEM BUILDS...
        </div>
      )}

      <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-[#020202] [perspective:2500px]">
        <div
          className="academic-project-glow absolute inset-0 transition-colors duration-1000 ease-in-out z-0"
          style={{ background: "radial-gradient(circle at 75% 50%, #00ffcc15 0%, transparent 60%)" }}
        />

        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.5) 1px, transparent 1px)",
            backgroundSize: "120px 120px",
          }}
        />

        <div className="academic-project-header absolute top-[8%] w-full text-center z-20 px-4 pointer-events-none">
          <div className="overflow-hidden inline-block mb-3">
            <span className="block text-zinc-500 font-mono tracking-[0.4em] text-xs font-bold uppercase">System Builds</span>
          </div>
          <div className="overflow-hidden pb-4">
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-black uppercase tracking-tight text-white drop-shadow-2xl leading-none">
              Academic{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ffcc] to-[#a855f7]">Projects</span>
            </h2>
          </div>
        </div>

        <div className="absolute inset-0 pt-[10vh] md:pt-0">
          {projects.map((project) => (
            <div
              key={project.id}
              className="academic-project-panel absolute inset-0 w-full h-full flex-col md:flex-row items-center justify-center px-5 md:px-24 z-10"
            >
              <div className="w-full md:w-1/2 flex flex-col justify-center order-2 md:order-1 mt-4 md:mt-0 z-20 pl-0 md:pl-8 h-auto md:h-full">
                <div className="overflow-hidden mb-3 md:mb-4 py-1">
                  <div className="academic-project-reveal flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: project.color }} />
                    <span className="font-mono text-[10px] md:text-xs font-bold tracking-widest uppercase" style={{ color: project.color }}>
                      {project.highlight}
                    </span>
                  </div>
                </div>

                <div className="overflow-hidden mb-4 md:mb-6 py-2">
                  <h3 className="academic-project-reveal text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-[0.9] drop-shadow-lg max-w-3xl">
                    {project.title}
                  </h3>
                </div>

                <div className="overflow-hidden mb-6 md:mb-8 max-w-lg py-1">
                  <p className="academic-project-reveal text-zinc-400 text-sm md:text-lg leading-relaxed font-light">
                    {project.desc}
                  </p>
                </div>

                <div className="overflow-hidden mb-6 md:mb-8 py-1">
                  <div className="academic-project-reveal flex flex-wrap gap-3">
                    {project.tech.map((tech) => (
                      <span
                        key={`${project.id}-${tech}`}
                        className="px-4 py-1.5 bg-transparent border border-zinc-800 rounded-full font-mono text-[10px] uppercase tracking-widest text-zinc-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="overflow-hidden pb-8 md:pb-10 pt-2">
                  <div className="academic-project-reveal flex flex-wrap items-center gap-4">
                    {project.github && (
                      <a
                        href={project.github}
                        className="flex items-center justify-center gap-3 px-6 md:px-8 py-3.5 bg-transparent hover:bg-white/5 border border-zinc-700 hover:border-zinc-400 transition-all duration-300 rounded-full group/source cursor-pointer"
                      >
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                          />
                        </svg>
                        <span className="font-mono text-xs tracking-widest font-bold text-white uppercase mt-0.5">View Source</span>
                        <svg className="w-4 h-4 text-zinc-500 group-hover/source:text-white group-hover/source:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14m-6-6l6 6-6 6" />
                        </svg>
                      </a>
                    )}

                    {project.demo && (
                      <a
                        href={project.demo}
                        className="flex items-center justify-center gap-2 px-6 md:px-8 py-3.5 transition-all duration-300 rounded-full group/demo cursor-pointer"
                        style={{ backgroundColor: `${project.color}15`, border: `1px solid ${project.color}40` }}
                      >
                        <span className="font-mono text-xs tracking-widest font-bold uppercase mt-0.5" style={{ color: project.color }}>
                          Live Demo
                        </span>
                        <svg
                          className="w-4 h-4 transform group-hover/demo:-translate-y-0.5 group-hover/demo:translate-x-0.5 transition-transform"
                          style={{ color: project.color }}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div className="academic-project-card-wrapper w-full md:w-1/2 h-[38vh] md:h-full flex items-center justify-center order-1 md:order-2 [perspective:2500px]">
                <div
                  className="academic-project-3d-card relative w-[52%] min-w-[170px] max-w-[270px] md:w-[65%] md:max-w-sm aspect-[9/16] md:aspect-[4/6] [transform-style:preserve-3d] group"
                  style={{ transform: "rotateY(-30deg) rotateX(15deg) rotateZ(2deg)" }}
                >
                  <div className="absolute inset-0 rounded-[2rem] md:rounded-[2.5rem] bg-zinc-800 pointer-events-none translate-x-2 translate-y-2 -translate-z-[15px] shadow-[-30px_30px_60px_rgba(0,0,0,0.9)]" />
                  <div className="absolute inset-0 rounded-[2rem] md:rounded-[2.5rem] bg-zinc-700 pointer-events-none translate-x-1 translate-y-1 -translate-z-[8px]" />

                  <div className="absolute inset-0 bg-[#050505] border-[8px] md:border-[10px] border-zinc-950 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden">
                    <div
                      className="absolute inset-0 opacity-20 pointer-events-none z-10"
                      style={{ background: `radial-gradient(circle at bottom right, ${project.color}, transparent 70%)` }}
                    />
                    <div className="absolute top-0 w-full h-6 md:h-7 bg-zinc-950 z-20 flex justify-center items-center rounded-b-xl md:rounded-b-2xl max-w-[45%] md:max-w-[40%] left-1/2 -translate-x-1/2">
                      <div className="w-10 md:w-14 h-1 md:h-1.5 bg-zinc-800 rounded-full mt-0.5" />
                    </div>
                    <div
                      role="img"
                      aria-label={project.title}
                      className="absolute inset-0 w-full h-full bg-cover bg-center opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out z-0"
                      style={{ backgroundImage: `url("${project.image}")` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-white/20 pointer-events-none z-30 opacity-60" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="h-[15vh] flex flex-col items-center justify-center bg-[#020202] text-zinc-700 font-mono text-sm border-t border-zinc-900">
        <div className="w-px h-12 bg-gradient-to-b from-zinc-800 to-transparent mb-6" />
      </div>
    </section>
  );
}
