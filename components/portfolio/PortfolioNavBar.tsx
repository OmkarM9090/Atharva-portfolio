"use client";

import { useEffect, useMemo, useState } from "react";

type NavItem = {
  id: string;
  label: string;
  icon: string;
};

const NAV_ITEMS: NavItem[] = [
  {
    id: "about",
    label: "About",
    icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
  },
  {
    id: "skills",
    label: "Skills",
    icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
  },
  {
    id: "internship-experience",
    label: "Internship Experience",
    icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  },
  {
    id: "projects",
    label: "Projects",
    icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
  },
  {
    id: "research-publication",
    label: "Research & Publication",
    icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z",
  },
  {
    id: "leadership",
    label: "Leadership",
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
  },
  {
    id: "education",
    label: "Education",
    icon: "M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222",
  },
  {
    id: "contact-us",
    label: "Contact Us",
    icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  },
];

export default function PortfolioNavBar() {
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>(NAV_ITEMS[0].id);

  const sectionIds = useMemo(() => NAV_ITEMS.map((item) => item.id), []);
  const quickAccessItems = useMemo(() => NAV_ITEMS.slice(0, 5), []);
  const isQuickAccessActive = quickAccessItems.some((item) => item.id === activeSection);

  useEffect(() => {
    const aboutSection = document.getElementById("about");

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      if (!aboutSection) {
        setIsNavVisible(true);
        return;
      }

      const aboutTop = aboutSection.getBoundingClientRect().top;
      const revealThreshold = window.innerHeight * 0.72;
      setIsNavVisible(aboutTop <= revealThreshold);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!isNavVisible && isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [isNavVisible, isMenuOpen]);

  useEffect(() => {
    const idsInDom = sectionIds.filter((id) => document.getElementById(id));

    if (idsInDom.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (mostVisible?.target?.id) {
          setActiveSection(mostVisible.target.id);
        }
      },
      {
        root: null,
        rootMargin: "-35% 0px -45% 0px",
        threshold: [0.2, 0.35, 0.5, 0.75],
      }
    );

    idsInDom.forEach((id) => {
      const section = document.getElementById(id);

      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [sectionIds]);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isMenuOpen]);

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setIsMenuOpen(false);

    const section = document.getElementById(id);

    if (!section) {
      return;
    }

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <>
      <div
        className={`fixed z-80 left-1/2 -translate-x-1/2 transition-all duration-500 ease-in-out hidden md:flex ${
          isNavVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none translate-y-6"
        } ${
          isScrolled ? "bottom-5 scale-90" : "bottom-8 scale-100"
        }`}
      >
        <div className="bg-[#0a0a0c]/80 backdrop-blur-xl border border-zinc-800 rounded-full px-2 py-2 flex items-center gap-1 shadow-[0_10px_40px_rgba(0,0,0,0.8)] relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-[#00f0ff]/5 to-transparent pointer-events-none" />

          {quickAccessItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`relative group flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
                activeSection === item.id
                  ? "bg-[#22c55e]/15 text-[#22c55e] shadow-[0_0_16px_rgba(34,197,94,0.28)]"
                  : "text-zinc-500 hover:text-white hover:bg-zinc-800/50"
              }`}
              title={item.label}
              aria-label={item.label}
            >
              <svg
                className={`w-5 h-5 ${activeSection === item.id ? "animate-[pulse_0.9s_ease-in-out_infinite]" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
              </svg>

              <div className="absolute -top-10 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-200 bg-[#111] border border-zinc-800 text-xs font-mono px-2 py-1 rounded text-white pointer-events-none whitespace-nowrap">
                {item.label}
              </div>

              {activeSection === item.id && (
                <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-[#22c55e] shadow-[0_0_8px_#22c55e] animate-pulse" />
              )}
            </button>
          ))}

          <div className="w-px h-6 bg-zinc-800 mx-2" />

          <button
            onClick={() => setIsMenuOpen(true)}
            className={`flex items-center gap-2 px-4 py-2 h-12 rounded-full transition-all duration-300 font-mono text-xs uppercase tracking-widest ${
              isQuickAccessActive
                ? "bg-zinc-900 text-white hover:bg-[#00f0ff] hover:text-black"
                : "bg-[#22c55e]/15 text-[#22c55e] border border-[#22c55e]/40 shadow-[0_0_20px_rgba(34,197,94,0.22)] animate-[pulse_1s_ease-in-out_infinite]"
            }`}
            aria-label="Open systems menu"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
            <span>Systems Menu</span>
          </button>
        </div>
      </div>

      <div
        className={`fixed z-80 bottom-6 right-6 md:hidden transition-all duration-500 ${
          isNavVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none translate-y-6"
        }`}
      >
        <button
          onClick={() => setIsMenuOpen(true)}
          className="w-14 h-14 rounded-full bg-[#00f0ff] text-black shadow-[0_0_20px_rgba(0,240,255,0.4)] flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
          aria-label="Open navigation menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
            />
          </svg>
        </button>
      </div>

      <div
        className={`fixed inset-0 z-100 bg-[#050505]/95 backdrop-blur-xl flex flex-col items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.87,0,0.13,1)] ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{
          clipPath: isMenuOpen ? "circle(150% at 50% 50%)" : "circle(0% at 50% 100%)",
        }}
      >
        <button
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-8 right-8 w-12 h-12 rounded-full border border-zinc-800 bg-zinc-900 flex items-center justify-center text-white hover:text-[#00f0ff] hover:border-[#00f0ff] transition-all duration-300 group"
          aria-label="Close navigation menu"
        >
          <svg
            className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(0,240,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,1)_1px,transparent_1px)] bg-size-[50px_50px] pointer-events-none" />

        <div className="max-w-5xl w-full px-6 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00f0ff]/10 border border-[#00f0ff]/30 rounded-full mb-4">
              <span className="w-2 h-2 bg-[#00f0ff] rounded-full animate-ping" />
              <span className="text-[#00f0ff] font-mono text-[10px] tracking-widest uppercase">System Map Navigation</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">
              Select <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00f0ff] to-blue-500">Destination</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {NAV_ITEMS.map((item, index) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="group relative bg-[#0a0a0a] border border-zinc-800 hover:border-[#00f0ff] rounded-xl p-6 text-left overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,240,255,0.15)] hover:-translate-y-1"
                aria-label={`Go to ${item.label}`}
              >
                <div className="absolute top-4 right-4 font-mono text-xs text-zinc-600 group-hover:text-[#00f0ff] transition-colors">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="w-10 h-10 mb-4 rounded bg-zinc-900 flex items-center justify-center text-zinc-500 group-hover:bg-[#00f0ff]/10 group-hover:text-[#00f0ff] transition-all">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={item.icon} />
                  </svg>
                </div>

                <h3 className="font-mono text-xs md:text-sm font-bold text-zinc-300 group-hover:text-white uppercase tracking-widest transition-colors">
                  {item.label}
                </h3>

                <div className="absolute bottom-0 left-0 w-0 h-1 bg-linear-to-r from-[#00f0ff] to-blue-500 group-hover:w-full transition-all duration-500" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
