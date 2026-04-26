"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type SkillIconProps = {
  name: string;
};

type SkillCategory = {
  category: string;
  skills: string[];
  color: string;
};

const skillData: SkillCategory[] = [
  {
    category: "PROGRAMMING",
    skills: ["Python", "C", "C++", "Java"],
    color: "#00ffcc",
  },
  {
    category: "FRAMEWORKS",
    skills: ["TensorFlow", "PyTorch", "Keras", "Scikit-learn", "OpenCV", "Flask", "Pandas", "NumPy"],
    color: "#a855f7",
  },
  {
    category: "CLOUD & TOOLS",
    skills: ["Docker", "Kubernetes", "AWS", "ROS (Robot OS)"],
    color: "#f59e0b",
  },
  {
    category: "DATABASES",
    skills: ["MySQL", "MongoDB", "PostgreSQL", "Redis"],
    color: "#10b981",
  },
  {
    category: "CORE DOMAINS",
    skills: ["Artificial Intelligence", "Machine Learning", "Computer Vision", "Robotics", "IoT", "Embedded Systems"],
    color: "#ff0055",
  },
];

const scatterX = [-180, 150, -90, 210, -230, 80, 190, -140];
const scatterY = [120, -160, 210, -90, 60, -210, 150, -130];
const rotationX = [-70, 55, -35, 80, 25, -85, 45, -20];
const rotationY = [65, -50, 35, -75, 90, -30, 15, -60];

function SkillIcon({ name }: SkillIconProps): ReactNode {
  const n = name.toLowerCase();

  if (n.includes("python")) {
    return (
      <g>
        <path d="M12.05 1c-4.43 0-5.42.92-5.42 2.76v2.33h5.53v.68H6.55c-3.4 0-4.14 1.4-4.14 4.43 0 3 .75 4.43 4.14 4.43h1.81v-2.58c0-2.16 1.84-3.87 3.96-3.87h4.3v-2.7c0-2.6-1.12-5.48-4.57-5.48zm-1.8 1.42c.6 0 1.1.5 1.1 1.1 0 .6-.5 1.1-1.1 1.1s-1.1-.5-1.1-1.1c0-.6.5-1.1 1.1-1.1z" />
        <path d="M11.95 23c4.43 0 5.42-.92 5.42-2.76v-2.33h-5.53v-.68h5.6c3.4 0 4.14-1.4 4.14-4.43 0-3-.75-4.43-4.14-4.43h-1.81v2.58c0 2.16-1.84 3.87-3.96 3.87h-4.3v2.7c0 2.6 1.12 5.48 4.57 5.48zm1.8-1.42c-.6 0-1.1-.5-1.1-1.1 0-.6.5-1.1 1.1-1.1s1.1.5 1.1 1.1c0 .6-.5 1.1-1.1 1.1z" />
      </g>
    );
  }

  if (n === "c") {
    return <path d="M12 2L2 7.8v8.4L12 22l10-5.8V7.8L12 2zm4.3 12.4c-1.3 1-2.9 1.5-4.6 1.3-3.1-.3-5.4-3.1-5.1-6.2.3-2.9 2.5-5.1 5.4-5.2 1.5 0 2.9.5 4.1 1.4l-1.7 2.5c-.7-.5-1.5-.7-2.3-.7-1.8.1-3 1.7-2.8 3.5.2 1.6 1.5 2.8 3.1 2.9 1 .1 1.9-.3 2.6-1l1.3 1.5z" />;
  }

  if (n === "c++") {
    return <path d="M12 2L2 7.8v8.4L12 22l10-5.8V7.8L12 2zm-1.5 12.4c-2.4 0-4.3-1.8-4.3-4.4s1.9-4.4 4.3-4.4c1.1 0 2.1.4 2.9 1l-1.3 1.9c-.4-.3-1-.6-1.6-.6-1.2 0-2.1 1-2.1 2.1s.9 2.1 2.1 2.1c.6 0 1.2-.2 1.6-.6l1.3 1.9c-.8.6-1.8 1-2.9 1zm4.8-1.5h-1.2v-1.5h-1.5v-1.2h1.5v-1.5h1.2v1.5h1.5v1.2h-1.5v1.5zm4.5 0h-1.2v-1.5h-1.5v-1.2h1.5v-1.5h1.2v1.5h1.5v1.2h-1.5v1.5z" />;
  }

  if (n.includes("java")) {
    return <path d="M15.4 14.5c-.8 1.5-2.3 2.5-4.4 2.5-2 0-3.5-1-4.2-2.3H5.2c.9 2 2.9 3.7 5.8 3.7 3 0 5-1.5 6-3.9h-1.6zm2.2-2.6c0-1.3-.4-2.4-1.2-3.3-1.1-1.1-2.9-1.8-5.3-2v3.3c1.7.2 3 .5 3.9 1 .4.2.6.5.6.8 0 .4-.3.8-1 1.2-.8.9-2.3 1.5-4.1 1.7v1.4c2.6-.2 4.6-1 5.8-2.1.8-1 1.3-2 1.3-3zm-11.8.2v-1.1c1.3.4 3 .8 4.8.8v1.6c-2-.1-3.7-.5-4.8-1.3zM12 21.8c-4.3 0-7.8-1.6-7.8-3.6V17h15.6v1.2c0 2-3.5 3.6-7.8 3.6zM13.7 8c0-1-.3-1.5-1.3-2-.7-.3-1-.6-1-1 0-.5.4-.9 1.1-.9.6 0 1.1.2 1.5.5l.8-1c-.6-.6-1.3-1-2.3-1-1.5 0-2.7.8-2.7 2.4 0 1 .4 1.6 1.4 2l.7.3c.5.2.7.5.7.9 0 .6-.5.9-1.2.9-.8 0-1.5-.4-2-1L8.5 8c.7.8 1.6 1.3 2.8 1.3 1.7 0 2.8-.9 2.8-2.3z" />;
  }

  if (n.includes("tensorflow")) {
    return <path d="M1.02 5.5l10.96-6.17 10.98 6.17-2.18 13.06-8.8 5.46-8.8-5.46L1.02 5.5zm10.96-3.8L4.35 6l7.63 4.28 7.64-4.28-7.64-4.29zm.01 19.33l6.58-4.08 1.52-9.1-8.1 4.54v8.64zm-1.87-8.62L5.8 9.38l-1.04 6.25 5.36 3.32v-6.54z" />;
  }

  if (n.includes("pytorch")) {
    return <path d="M11.96 0c-1.33 0-2.92.83-3.66 2.17l-.87 1.55c-.1.17-.3.26-.5.2-.68-.2-1.36-.2-2.02.04l-1.63.59C1.94 5.06 1 6.51 1 8.04v7.75c0 1.46.88 2.81 2.22 3.34l7.15 2.76c1.03.4 2.19.4 3.23 0l7.14-2.76c1.33-.53 2.23-1.88 2.23-3.34V8.04c0-1.53-.94-2.98-2.28-3.49l-1.63-.59c-.66-.24-1.34-.24-2.02-.04-.2.06-.4-.03-.5-.2l-.87-1.55C14.88.83 13.29 0 11.96 0zm0 1.76c.72 0 1.5.47 1.88 1.15l1.01 1.8c.32.58.95.88 1.6.65l1.62-.59c.78-.28 1.63.15 1.95.91l.86 2.06c.33.78-.06 1.67-.85 1.98l-7.73 3.03v-4.9c0-.49-.4-.88-.88-.88-.49 0-.88.4-.88.88v4.9L3.81 9.73c-.79-.31-1.18-1.2-.85-1.98l.86-2.06c.32-.76 1.17-1.19 1.95-.91l1.62.59c.65.23 1.28-.07 1.6-.65l1.01-1.8c.38-.68 1.16-1.15 1.88-1.15v.01c.03 0 .05 0 .08 0zM12.04 15.6l8.03 3.1c.14.05.24.18.24.33v.03l-8.27 3.2-8.27-3.2v-.03c0-.15.1-.28.24-.33l8.03-3.1z" />;
  }

  if (n.includes("keras")) {
    return <path d="M6 3h3v18H6zM18 3l-6 8 6 10h-3.5l-4.5-8 4.5-8z" />;
  }

  if (n.includes("scikit")) {
    return <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" fill="none" stroke="currentColor" strokeWidth="2" />;
  }

  if (n.includes("opencv") || n.includes("vision")) {
    return (
      <g>
        <path d="M12 4C7 4 2.5 8 1 12c1.5 4 6 8 11 8s9.5-4 11-8c-1.5-4-6-8-11-8zm0 13a5 5 0 110-10 5 5 0 010 10z" />
        <circle cx="12" cy="12" r="3" />
      </g>
    );
  }

  if (n.includes("flask")) {
    return <path d="M16.5 15.5l-3.2-5.1V4h1.2V2H9.5v2h1.2v6.4l-3.2 5.1c-.8 1.3-.4 3 1 3.8.4.2.9.3 1.4.3h8.2c1.5 0 2.8-1.2 2.8-2.8 0-.5-.1-1-.4-1.3z" />;
  }

  if (n.includes("pandas") || n.includes("numpy")) {
    return <path d="M4 6h4v12H4zm6-4h4v16h-4zm6 8h4v8h-4z" />;
  }

  if (n.includes("docker")) {
    return <path d="M13.98 10.82c-.01-.11-.03-.22-.05-.34 0 0 1.34-1.04 2.86-.33.05-.33.05-.67.01-1.01-.84-.57-1.86-.44-2.28-.35a3.83 3.83 0 00-3.32-2.1c-.04 0-.08 0-.12.01A3.87 3.87 0 008.2 8.75c-1.3.06-2.2.82-2.2.82.02.43.14.85.35 1.22-.52-.06-1.08.06-1.5.34-.1.35-.12.72-.08 1.09 1.18-.5 2.16-.14 2.16-.14a3.86 3.86 0 004.88 2.05c1.47.67 3.12.33 3.89-.13a2.95 2.95 0 002.3-2.12c-1.3-.06-2.2.82-2.2.82.02.43.14.85.35 1.22l-2.15-.88zM2.85 10.22c-.65-.12-1.34-.07-2 .16.03.35.15.69.34 1a4 4 0 001.66 1.48c.18-.87.49-1.72 1-2.5zm6.85-5.83h-2.1v2.12h2.1V4.39zm2.34 0h-2.1v2.12h2.1V4.39zm-4.68 2.34h-2.1v2.1h2.1v-2.1zm2.34 0h-2.1v2.1h2.1v-2.1zm2.34 0h-2.1v2.1h2.1v-2.1zm2.35 0h-2.1v2.1h2.1v-2.1zm-7.03 2.34h-2.1v2.1h2.1v-2.1zm2.34 0h-2.1v2.1h2.1v-2.1zm2.34 0h-2.1v2.1h2.1v-2.1zm2.34 0h-2.1v2.1h2.1v-2.1z" />;
  }

  if (n.includes("kubernetes")) {
    return (
      <g>
        <polygon points="12 2 20.66 7 20.66 17 12 22 3.34 17 3.34 7" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="4" />
      </g>
    );
  }

  if (n.includes("aws")) {
    return <path d="M12.28 17.55c-2.43 0-5.46-.77-7.7-2.16-1.04-.64-1.32-1.63-.5-2.27.67-.53 1.8-.18 2.76.2 3.06 1.2 5.56 1.63 8.35.6 1.5-.54 2.96-1.56 2.5-2.8-.46-1.2-2.58-1.5-4.22-1.42-3.1.18-5.32 1.34-5.32 4.14 0 1.94 1.3 3.2 3.5 3.2 2.12 0 4.12-1 5.3-2.52.26 1.07.9 1.76 2.1 1.76 1.1 0 2.22-.5 3.12-1.2.23-.18.42-.36.6-.55v.72c0 .5-.26.96-.8 1.12-1.62.5-4.5 1.1-7.2 1.1zm3.84-4.8c-.8.8-2 1.4-3.1 1.4s-1.8-.5-1.8-1.5c0-1.8 1.6-2.5 3.5-2.5h1.4v2.6zM22.5 22.38c-3.16 1.22-6.52 1.8-9.88 1.8s-6.73-.58-9.88-1.8c-.7-.27-1.1-1.03-.78-1.66.27-.5.84-.7 1.37-.5 2.8 1 5.86 1.5 9.28 1.5 3.4 0 6.47-.5 9.28-1.5.53-.2 1.1 0 1.37.5.3.62-.06 1.38-.76 1.66z" />;
  }

  if (n.includes("ros") || n.includes("robot")) {
    return <path d="M12 2a2 2 0 00-2 2v2H6a2 2 0 00-2 2v4c0 1 .5 1.5 1 2v4a2 2 0 002 2h10a2 2 0 002-2v-4c.5-.5 1-1 1-2V8a2 2 0 00-2-2h-4V4a2 2 0 00-2-2zm-3 8a1 1 0 110-2 1 1 0 010 2zm6 0a1 1 0 110-2 1 1 0 010 2zm-5 5h4v2H10v-2z" />;
  }

  if (n.includes("sql") || n.includes("mongo") || n.includes("redis") || n.includes("database")) {
    return (
      <g>
        <path d="M4 6c0-2 4-3 8-3s8 1 8 3v12c0 2-4 3-8 3s-8-1-8-3V6z" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M4 6c0 2 4 3 8 3s8-1 8-3" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M4 12c0 2 4 3 8 3s8-1 8-3" fill="none" stroke="currentColor" strokeWidth="2" />
      </g>
    );
  }

  if (n.includes("intelligence") || n.includes("learning")) {
    return <path d="M12 2a4 4 0 00-4 4c0 1.5.8 2.8 2 3.5v5c-1.2.7-2 2-2 3.5a4 4 0 108 0c0-1.5-.8-2.8-2-3.5v-5c1.2-.7 2-2 2-3.5a4 4 0 00-4-4zM10 6a2 2 0 114 0 2 2 0 01-4 0zm2 14a2 2 0 110-4 2 2 0 010 4z" />;
  }

  if (n.includes("iot") || n.includes("embedded")) {
    return (
      <g>
        <rect x="5" y="5" width="14" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M9 9h6v6H9z" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke="currentColor" strokeWidth="2" />
      </g>
    );
  }

  return (
    <g>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v6M12 16v6M2 12h6M16 12h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </g>
  );
}

function getHex(skill: string) {
  let hash = 0;

  for (let i = 0; i < skill.length; i += 1) {
    hash = skill.charCodeAt(i) + (hash << 5) - hash;
  }

  return `0x${(Math.abs(hash) & 0xffff).toString(16).toUpperCase().padStart(4, "0")}`;
}

export default function SkillsExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const layers = gsap.utils.toArray<HTMLElement>(".portfolio-skill-layer");
      const introLayer = containerRef.current?.querySelector(".portfolio-skills-intro");
      const globalGlow = containerRef.current?.querySelector(".portfolio-skills-glow");
      const radarRings = containerRef.current?.querySelector(".portfolio-radar-rings");

      if (!containerRef.current || !introLayer || !globalGlow || !radarRings || layers.length === 0) {
        return;
      }

      setIsLoaded(true);

      gsap.to(radarRings, {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "linear",
      });

      gsap.to(".portfolio-skill-node", {
        yPercent: -10,
        duration: 2.5,
        stagger: {
          each: 0.1,
          from: "random",
          repeat: -1,
          yoyo: true,
        },
        ease: "sine.inOut",
      });

      gsap.set(layers, { autoAlpha: 0, display: "none" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${layers.length * 100 + 50}%`,
          scrub: 1.5,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.to(introLayer, {
        scale: 2.5,
        opacity: 0,
        filter: "blur(20px)",
        duration: 1.5,
        ease: "power2.inOut",
      });

      layers.forEach((layer, layerIndex) => {
        const nodes = layer.querySelectorAll(".portfolio-skill-node");
        const bgText = layer.querySelector(".portfolio-skill-bg-text");
        const categoryHeader = layer.querySelector(".portfolio-skill-category-header");
        const category = skillData[layerIndex];

        if (!category || !bgText || !categoryHeader || nodes.length === 0) {
          return;
        }

        tl.set(layer, { display: "flex" })
          .to(layer, { autoAlpha: 1, duration: 0.1 })
          .to(
            globalGlow,
            {
              background: `radial-gradient(circle at center, ${category.color}15 0%, transparent 60%)`,
              duration: 0.5,
            },
            "<"
          )
          .to(radarRings, { borderColor: `${category.color}30`, duration: 0.5 }, "<")
          .fromTo(
            bgText,
            { scale: 2, opacity: 0, filter: "blur(20px)", z: 500, yPercent: -50 },
            { scale: 1, opacity: 0.04, filter: "blur(0px)", z: 0, yPercent: 0, duration: 1.5, ease: "power3.out" },
            "<"
          )
          .fromTo(
            categoryHeader,
            { y: -50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "back.out(1.5)" },
            "<0.2"
          )
          .fromTo(
            nodes,
            {
              z: -1000,
              y: (index) => scatterY[index % scatterY.length],
              x: (index) => scatterX[index % scatterX.length],
              rotationX: (index) => rotationX[index % rotationX.length],
              rotationY: (index) => rotationY[index % rotationY.length],
              opacity: 0,
              scale: 0.1,
            },
            {
              z: 0,
              y: 0,
              x: 0,
              rotationX: 0,
              rotationY: 0,
              opacity: 1,
              scale: 1,
              stagger: 0.05,
              duration: 1.5,
              ease: "expo.out",
            },
            "<0.2"
          );

        if (layerIndex < layers.length - 1) {
          tl.to({}, { duration: 1.5 })
            .to(bgText, { scale: 3, opacity: 0, filter: "blur(20px)", duration: 1.5, ease: "power2.in" })
            .to(categoryHeader, { y: -50, opacity: 0, duration: 1, ease: "power2.in" }, "<")
            .to(
              nodes,
              {
                z: 800,
                opacity: 0,
                rotationX: (index) => rotationX[(index + 3) % rotationX.length],
                rotationY: (index) => rotationY[(index + 5) % rotationY.length],
                stagger: 0.03,
                duration: 1.2,
                ease: "power3.in",
              },
              "<"
            )
            .set(layer, { display: "none", autoAlpha: 0 });
        }
      });

      tl.to({}, { duration: 2 });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section className="bg-[#020202] font-sans text-white overflow-hidden selection:bg-[#00ffcc] selection:text-black relative">
      {!isLoaded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#020202] text-[#00ffcc] font-mono text-sm tracking-widest animate-pulse">
          LOADING TECHNICAL PROTOCOLS...
        </div>
      )}

      <div ref={containerRef} className="relative w-full h-screen [perspective:1500px] overflow-hidden">
        <div
          className="portfolio-skills-glow absolute inset-0 transition-colors duration-1000 ease-in-out z-0"
          style={{ background: "radial-gradient(circle at center, #00ffcc15 0%, transparent 60%)" }}
        />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[50vw] md:h-[50vw] pointer-events-none z-0 opacity-20 [perspective:1000px]">
          <div
            className="portfolio-radar-rings relative w-full h-full rounded-full border border-dashed transition-colors duration-1000"
            style={{ borderColor: "#00ffcc30", transform: "rotateX(60deg)" }}
          >
            <div className="absolute inset-8 rounded-full border border-solid border-inherit opacity-50" />
            <div className="absolute inset-16 rounded-full border-2 border-dotted border-inherit opacity-30" />
            <div className="absolute top-1/2 left-1/2 w-1/2 h-px bg-gradient-to-r from-transparent to-current origin-left animate-[spin_4s_linear_infinite]" />
          </div>
        </div>

        <div
          className="absolute inset-0 opacity-10 pointer-events-none z-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            transform: "rotateX(60deg) scale(2.5) translateY(20%)",
            transformOrigin: "top center",
          }}
        />

        <div className="absolute inset-6 pointer-events-none z-50">
          <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-white/10" />
          <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-white/10" />
          <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-white/10" />
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-white/10" />
          <div className="absolute top-6 left-6 font-mono text-[10px] text-zinc-500 tracking-[0.3em] uppercase">
            Tech.Stack.v2
          </div>
          <div className="absolute bottom-6 right-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00ffcc] animate-pulse" />
            <span className="font-mono text-[10px] text-[#00ffcc] tracking-[0.3em] uppercase">Live</span>
          </div>
        </div>

        <div className="portfolio-skills-intro absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none px-4 text-center">
          <div className="inline-block px-5 py-1.5 border border-[#00ffcc]/30 bg-[#00ffcc]/10 rounded-full mb-6 backdrop-blur-md shadow-[0_0_15px_rgba(0,255,204,0.2)]">
            <span className="text-[#00ffcc] font-mono tracking-[0.3em] text-xs font-bold uppercase">System Capabilities</span>
          </div>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white drop-shadow-2xl">
            Technical{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ffcc] to-[#a855f7]">Skills</span>
          </h2>
          <div className="flex items-center gap-4 mt-8">
            <div className="h-px w-8 md:w-12 bg-zinc-600" />
            <p className="text-zinc-500 font-mono tracking-[0.3em] text-[10px] uppercase">Initializing Database...</p>
            <div className="h-px w-8 md:w-12 bg-zinc-600" />
          </div>
        </div>

        {skillData.map((data) => (
          <div
            key={data.category}
            className="portfolio-skill-layer absolute inset-0 flex flex-col items-center justify-center p-4 md:p-8 z-10"
          >
            <h3
              className="portfolio-skill-bg-text absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[18vw] md:text-[14vw] font-black uppercase text-transparent select-none pointer-events-none tracking-tight"
              style={{ WebkitTextStroke: `2px ${data.color}` }}
            >
              {data.category}
            </h3>

            <div className="relative z-10 w-full max-w-6xl flex flex-col items-center mt-10">
              <div className="portfolio-skill-category-header mb-8 md:mb-12 flex flex-col items-center text-center">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-0.5 w-8 md:w-16 bg-gradient-to-r from-transparent to-current" style={{ color: data.color }} />
                  <span
                    className="font-mono text-sm md:text-base font-bold tracking-[0.3em] md:tracking-[0.4em] uppercase text-white drop-shadow-[0_0_10px_currentColor]"
                    style={{ color: data.color }}
                  >
                    {data.category}
                  </span>
                  <div className="h-0.5 w-8 md:w-16 bg-gradient-to-l from-transparent to-current" style={{ color: data.color }} />
                </div>
                <div className="font-mono text-[9px] text-zinc-500 tracking-widest uppercase">Module Extracted // Secure</div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6 lg:gap-8 [transform-style:preserve-3d]">
                {data.skills.map((skill) => (
                  <div
                    key={skill}
                    className="portfolio-skill-node group relative flex items-center gap-3 md:gap-4 px-4 py-3 md:px-6 md:py-4 bg-[#050505]/80 backdrop-blur-xl border border-white/5 transition-all duration-500 hover:-translate-y-2 cursor-crosshair overflow-hidden max-w-[92vw]"
                    style={{
                      clipPath: "polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)",
                      boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
                    }}
                  >
                    <div
                      className="absolute top-0 left-0 w-full h-0.5 opacity-50 group-hover:opacity-100 transition-opacity"
                      style={{ backgroundColor: data.color }}
                    />
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                      style={{ background: `radial-gradient(circle at center, ${data.color}, transparent 70%)` }}
                    />
                    <div className="portfolio-skill-sweep absolute top-0 left-[-100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-45deg]" />

                    <div
                      className="relative z-10 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-lg bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors shadow-inner shrink-0"
                      style={{ color: data.color }}
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 drop-shadow-[0_0_8px_currentColor]" aria-hidden="true">
                        <SkillIcon name={skill} />
                      </svg>
                    </div>

                    <div className="relative z-10 flex flex-col justify-center min-w-0">
                      <span className="font-mono text-[8px] md:text-[10px] tracking-widest text-zinc-600 mb-0.5 group-hover:text-white/50 transition-colors">
                        {getHex(skill)}
                        {" // NODE"}
                      </span>
                      <span className="font-sans font-black text-base md:text-xl tracking-tight text-zinc-300 group-hover:text-white transition-colors break-words">
                        {skill}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes portfolioSkillSweep {
          0% { left: -100%; }
          100% { left: 200%; }
        }

        .portfolio-skill-node:hover .portfolio-skill-sweep {
          animation: portfolioSkillSweep 1s ease-in-out;
        }
      `}</style>
    </section>
  );
}
