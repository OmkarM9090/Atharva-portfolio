"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const roles = ["Robotics Engineer", "AI/ML Developer", "Drone Architect", "IoT Specialist"] as const;

type ParticleModel = {
	id: string;
	left: number;
	top: number;
	size: number;
	alpha: number;
};

const makeParticles = (count: number): ParticleModel[] =>
	Array.from({ length: count }, (_, i) => ({
		id: `portal-p-${i}`,
		left: 8 + ((i * 19) % 84),
		top: 10 + ((i * 31) % 78),
		size: 1 + (i % 3),
		alpha: 0.08 + ((i % 5) * 0.035),
	}));

export default function IntroPortalSection() {
	const containerRef = useRef<HTMLElement>(null);
	const portalRef = useRef<HTMLDivElement>(null);
	const outerTextGroupRef = useRef<HTMLDivElement>(null);
	const innerContentRef = useRef<HTMLDivElement>(null);
	const droneRef = useRef<HTMLDivElement>(null);
	const scannerLineRef = useRef<HTMLDivElement>(null);
	const scannerRingARef = useRef<HTMLDivElement>(null);
	const scannerRingBRef = useRef<HTMLDivElement>(null);
	const scannerPulseRef = useRef<HTMLDivElement>(null);
	const flashRef = useRef<HTMLDivElement>(null);
	const borderShimmerRef = useRef<HTMLDivElement>(null);
	const portalGlowRef = useRef<HTMLDivElement>(null);
	const spotlightRef = useRef<HTMLDivElement>(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [currentRole, setCurrentRole] = useState(0);
	const [fade, setFade] = useState(true);

	const particles = useMemo(() => makeParticles(28), []);

	useEffect(() => {
		const roleInterval = window.setInterval(() => {
			setFade(false);
			window.setTimeout(() => {
				setCurrentRole((prev) => (prev + 1) % roles.length);
				setFade(true);
			}, 250);
		}, 2200);

		return () => window.clearInterval(roleInterval);
	}, []);

	useEffect(() => {
		let ctx: gsap.Context | null = null;

		const init = () => {
			setIsLoaded(true);

			ctx = gsap.context(() => {
				gsap.set(innerContentRef.current, { y: 92, opacity: 0, scale: 0.92, filter: "blur(10px)" });
				gsap.set(flashRef.current, { opacity: 0, scale: 0.85 });

				// Continuous hovering and scanner loops.
				gsap.to(droneRef.current, {
					y: -14,
					x: 5,
					rotation: 2,
					duration: 2.5,
					ease: "sine.inOut",
					yoyo: true,
					repeat: -1,
				});

				gsap.to(droneRef.current, {
					scale: 1.03,
					duration: 1.8,
					ease: "sine.inOut",
					yoyo: true,
					repeat: -1,
				});

				gsap.to(spotlightRef.current, {
					opacity: 0.52,
					scale: 1.12,
					duration: 1.9,
					ease: "sine.inOut",
					yoyo: true,
					repeat: -1,
				});

				gsap.to(scannerLineRef.current, {
					rotation: 360,
					duration: 4,
					ease: "none",
					repeat: -1,
					transformOrigin: "bottom center",
				});

				gsap.to(scannerRingARef.current, { rotation: 360, duration: 13, ease: "none", repeat: -1 });
				gsap.to(scannerRingBRef.current, { rotation: -360, duration: 9, ease: "none", repeat: -1 });

				gsap.fromTo(
					scannerPulseRef.current,
					{ opacity: 0.4, scale: 0.78 },
					{ opacity: 0, scale: 1.26, duration: 1.8, ease: "sine.out", repeat: -1 }
				);

				gsap.fromTo(
					portalGlowRef.current,
					{ opacity: 0.18, scale: 0.95 },
					{ opacity: 0.42, scale: 1.04, duration: 2.7, ease: "sine.inOut", yoyo: true, repeat: -1 }
				);

				gsap.to(borderShimmerRef.current, {
					rotation: 360,
					duration: 8.5,
					ease: "none",
					repeat: -1,
					transformOrigin: "center center",
				});

				gsap.to(".intro-particle", {
					y: (index) => -22 - (index % 8) * 2,
					x: (index) => (index % 2 === 0 ? 8 : -8),
					opacity: (index) => 0.08 + ((index % 5) * 0.05),
					duration: (index) => 3 + (index % 6) * 0.4,
					ease: "sine.inOut",
					yoyo: true,
					repeat: -1,
					stagger: 0.06,
				});

				// Keep the original scroll-triggered portal timeline and refine it.
				const tl = gsap.timeline({
					scrollTrigger: {
						trigger: containerRef.current,
						start: "top top",
						end: "+=200%",
						scrub: 1.2,
						pin: true,
						anticipatePin: 1,
					},
				});

				tl.to(
					outerTextGroupRef.current,
					{
						scale: 1.5,
						opacity: 0,
						duration: 1,
						ease: "power2.in",
					},
					0
				)
					.to(
						portalRef.current,
						{
							clipPath: "circle(165vw at 50% 50%)",
							duration: 2.55,
							ease: "expo.inOut",
						},
						0
					)
					.fromTo(
						flashRef.current,
						{
							opacity: 0,
							scale: 0.78,
						},
						{
							opacity: 0.72,
							scale: 1.28,
							duration: 0.18,
							ease: "power2.out",
						},
						1.45
					)
					.to(
						flashRef.current,
						{
							opacity: 0,
							scale: 1.55,
							duration: 0.35,
							ease: "power3.in",
						},
						1.62
					)
					.to(
						innerContentRef.current,
						{
							y: 0,
							opacity: 1,
							scale: 1,
							filter: "blur(0px)",
							duration: 1.5,
							ease: "back.out(1.2)",
						},
						1.8
					)
					.fromTo(
						".reveal-line",
						{ y: 24, opacity: 0, filter: "blur(8px)" },
						{
							y: 0,
							opacity: 1,
							filter: "blur(0px)",
							stagger: 0.09,
							duration: 0.55,
							ease: "power2.out",
						},
						2.05
					);
			}, containerRef);
		};

		init();

		return () => {
			if (ctx) {
				ctx.revert();
			}
		};
	}, []);

	return (
		<div className="bg-[#030303] font-sans overflow-hidden text-white">
			{!isLoaded && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-[#030303] text-[#00ffcc] font-mono text-sm tracking-widest animate-pulse">
					BOOTING CORE SYSTEMS...
				</div>
			)}

			<section ref={containerRef} className="relative w-full h-screen flex items-center justify-center">
				<div className="pointer-events-none absolute inset-0 z-[3]">
					{particles.map((particle) => (
						<span
							key={particle.id}
							className="intro-particle absolute rounded-full bg-[#9fffe6] will-change-transform"
							style={{
								left: `${particle.left}%`,
								top: `${particle.top}%`,
								width: `${particle.size}px`,
								height: `${particle.size}px`,
								opacity: particle.alpha,
							}}
						/>
					))}
				</div>

				<div
					ref={flashRef}
					className="absolute inset-0 z-40 opacity-0 pointer-events-none will-change-transform"
					style={{
						background:
							"radial-gradient(circle at 50% 50%, rgba(0,255,204,0.9) 0%, rgba(0,255,204,0.38) 26%, rgba(0,255,204,0.04) 64%, transparent 76%)",
						filter: "blur(5px)",
						mixBlendMode: "screen",
					}}
				/>

				<div ref={outerTextGroupRef} className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none will-change-transform">
					<div className="absolute top-[15%] text-center w-full">
						<h2 className="text-zinc-500 font-mono tracking-[0.5em] text-sm md:text-base uppercase mb-4">Pioneering</h2>
						<h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-zinc-200">The Next</h1>
					</div>
					<div className="absolute bottom-[15%] text-center w-full">
						<h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-zinc-200">Frontier</h1>
					</div>
				</div>

				<div
					ref={portalRef}
					className="absolute inset-0 z-20 bg-[#080808] flex items-center justify-center overflow-hidden will-change-transform"
					style={{
						clipPath: "circle(clamp(140px, 18vw, 250px) at 50% 50%)",
						boxShadow: "inset 0 0 50px rgba(0, 255, 204, 0.1)",
					}}
				>
					<div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(0,255,204,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,204,0.1)_1px,transparent_1px)] bg-[size:30px_30px]" />

					<div
						ref={portalGlowRef}
						className="absolute z-[2] h-[340px] w-[340px] rounded-full pointer-events-none"
						style={{
							background: "radial-gradient(circle, rgba(0,255,204,0.28) 0%, rgba(0,255,204,0.05) 58%, transparent 74%)",
						}}
					/>

					<div
						ref={borderShimmerRef}
						className="absolute z-[2] h-[360px] w-[360px] rounded-full pointer-events-none"
						style={{
							background: "conic-gradient(from 0deg, transparent 0deg, rgba(0,255,204,0.6) 55deg, transparent 115deg, rgba(76,121,255,0.45) 184deg, transparent 255deg, rgba(0,255,204,0.52) 330deg, transparent 360deg)",
							maskImage: "radial-gradient(circle, transparent 59%, black 60%, black 64%, transparent 66%)",
						}}
					/>

					<div className="absolute inset-0 flex items-center justify-center opacity-35 z-[3]">
						<div ref={scannerRingARef} className="w-[300px] h-[300px] border border-[#00ffcc] rounded-full will-change-transform" />
						<div ref={scannerRingBRef} className="absolute w-[220px] h-[220px] border border-[#00ffcc]/50 rounded-full border-dashed will-change-transform" />
						<div ref={scannerPulseRef} className="absolute w-[180px] h-[180px] border border-[#00ffcc]/40 rounded-full will-change-transform" />

						<div className="absolute w-[340px] h-[340px] rounded-full pointer-events-none">
							{Array.from({ length: 24 }, (_, i) => (
								<span
									key={`tick-${i}`}
									className="absolute left-1/2 top-1/2 block h-[8px] w-[1px] bg-[#aefeed]/70 origin-bottom"
									style={{
										transform: `translate(-50%, -170px) rotate(${i * 15}deg)`,
										opacity: i % 3 === 0 ? 0.72 : 0.4,
									}}
								/>
							))}
						</div>

						<div className="absolute w-full h-full flex items-center justify-center">
							<div
								ref={scannerLineRef}
								className="w-[1px] h-[150px] bg-gradient-to-t from-[#00ffcc] to-transparent origin-bottom absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full"
							/>
						</div>
					</div>

					<div ref={spotlightRef} className="absolute z-[4] w-52 h-16 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,255,204,0.35),rgba(0,255,204,0.05)_58%,transparent_75%)] blur-md opacity-35" />

					<div ref={droneRef} className="absolute z-10 w-48 h-48 md:w-64 md:h-64 text-[#00ffcc] drop-shadow-[0_0_15px_rgba(0,255,204,0.8)] will-change-transform">
						<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
							<polygon points="40,40 60,40 65,50 60,60 40,60 35,50" fill="rgba(0,255,204,0.1)" stroke="currentColor" strokeWidth="1" />
							<circle cx="50" cy="50" r="4" fill="currentColor" />

							<line x1="40" y1="40" x2="25" y2="25" stroke="currentColor" />
							<line x1="60" y1="40" x2="75" y2="25" stroke="currentColor" />
							<line x1="40" y1="60" x2="25" y2="75" stroke="currentColor" />
							<line x1="60" y1="60" x2="75" y2="75" stroke="currentColor" />

							<circle cx="25" cy="25" r="10" strokeDasharray="2 2" opacity="0.8" />
							<circle cx="75" cy="25" r="10" strokeDasharray="2 2" opacity="0.8" />
							<circle cx="25" cy="75" r="10" strokeDasharray="2 2" opacity="0.8" />
							<circle cx="75" cy="75" r="10" strokeDasharray="2 2" opacity="0.8" />

							<g className="origin-[25px_25px] animate-spin">
								<line x1="18" y1="25" x2="32" y2="25" stroke="currentColor" strokeWidth="2" />
							</g>
							<g className="origin-[75px_25px] animate-spin">
								<line x1="68" y1="25" x2="82" y2="25" stroke="currentColor" strokeWidth="2" />
							</g>
							<g className="origin-[25px_75px] animate-spin">
								<line x1="18" y1="75" x2="32" y2="75" stroke="currentColor" strokeWidth="2" />
							</g>
							<g className="origin-[75px_75px] animate-spin">
								<line x1="68" y1="75" x2="82" y2="75" stroke="currentColor" strokeWidth="2" />
							</g>

							<rect x="46" y="60" width="8" height="6" rx="2" fill="currentColor" />
							<circle cx="50" cy="63" r="1.5" fill="#080808" />
						</svg>
					</div>

					<div ref={innerContentRef} className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-4 bg-[#050505]/60 backdrop-blur-sm will-change-transform">
						<div className="mb-6 flex items-center gap-3 reveal-line opacity-0">
							<span className="relative flex h-3 w-3">
								<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ffcc] opacity-75" />
								<span className="relative inline-flex rounded-full h-3 w-3 bg-[#00ffcc]" />
							</span>
							<span className="font-mono text-xs md:text-sm tracking-[0.3em] text-[#00ffcc] uppercase">Uplink Established</span>
						</div>

						

						

						

						
					</div>
				</div>
			</section>

			
		</div>
	);
}
