"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

type FormStatus = "hidden" | "active" | "packing" | "submitted";

type SceneRefs = {
  robot: THREE.Group | null;
  robotLegL: THREE.Group | null;
  robotLegR: THREE.Group | null;
  headGroup: THREE.Group | null;
  laser: THREE.Mesh | null;
  laserMat: THREE.MeshBasicMaterial | null;
  drone: THREE.Group | null;
  droneProps: THREE.Mesh[];
  package3D: THREE.Mesh | null;
};

function GitHubIcon() {
  return (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

function addEdges(mesh: THREE.Mesh, color = 0x6fffe9, opacity = 0.8) {
  const edges = new THREE.EdgesGeometry(mesh.geometry);
  const lines = new THREE.LineSegments(
    edges,
    new THREE.LineBasicMaterial({ color, transparent: true, opacity })
  );
  mesh.add(lines);
}

function createLeg(xPos: number, metalMat: THREE.Material, darkMetalMat: THREE.Material) {
  const leg = new THREE.Group();
  leg.position.set(xPos, 1.5, 0);

  const thigh = new THREE.Mesh(new THREE.BoxGeometry(0.6, 1.4, 0.6), metalMat);
  addEdges(thigh);
  thigh.position.y = -0.7;
  leg.add(thigh);

  const knee = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.7), darkMetalMat);
  addEdges(knee, 0x9efcff, 0.65);
  knee.rotation.z = Math.PI / 2;
  knee.position.y = -1.4;
  leg.add(knee);

  const calf = new THREE.Mesh(new THREE.BoxGeometry(0.5, 1.4, 0.5), metalMat);
  addEdges(calf);
  calf.position.y = -2.1;
  leg.add(calf);

  return leg;
}

function createArm(xPos: number, darkMetalMat: THREE.Material, neonCyanMat: THREE.Material) {
  const arm = new THREE.Group();
  arm.position.set(xPos, 4, 0);

  const shoulder = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.6, 0.8), neonCyanMat);
  addEdges(shoulder, 0xffffff, 0.7);
  arm.add(shoulder);

  const upperArm = new THREE.Mesh(new THREE.BoxGeometry(0.4, 2, 0.4), darkMetalMat);
  addEdges(upperArm, 0x9efcff, 0.65);
  upperArm.position.y = -1;
  arm.add(upperArm);

  return arm;
}

export default function ContactSection() {
  const mountRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const htmlFormRef = useRef<HTMLFormElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [formStatus, setFormStatus] = useState<FormStatus>("hidden");

  const sceneRefs = useRef<SceneRefs>({
    robot: null,
    robotLegL: null,
    robotLegR: null,
    headGroup: null,
    laser: null,
    laserMat: null,
    drone: null,
    droneProps: [],
    package3D: null,
  });

  useEffect(() => {
    const container = mountRef.current;
    const triggerElement = containerRef.current;

    if (!container || !triggerElement) {
      return;
    }

    container.innerHTML = "";

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.02);

    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 2, 20);
    camera.lookAt(0, 2, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.9));

    const spotLight = new THREE.SpotLight(0x00f0ff, 10);
    spotLight.position.set(0, 20, 10);
    spotLight.angle = Math.PI / 4;
    spotLight.penumbra = 0.8;
    scene.add(spotLight);

    const backLight = new THREE.DirectionalLight(0xa855f7, 5);
    backLight.position.set(-10, 5, -5);
    scene.add(backLight);

    const fillLight = new THREE.PointLight(0x9efcff, 4, 30);
    fillLight.position.set(-8, 0, 8);
    scene.add(fillLight);

    const metalMat = new THREE.MeshStandardMaterial({
      color: 0x8f9db3,
      emissive: 0x102535,
      emissiveIntensity: 0.45,
      metalness: 0.72,
      roughness: 0.24,
    });
    const darkMetalMat = new THREE.MeshStandardMaterial({
      color: 0x314155,
      emissive: 0x061d28,
      emissiveIntensity: 0.55,
      metalness: 0.85,
      roughness: 0.22,
    });
    const neonCyanMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
    const laserMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
    });

    sceneRefs.current.laserMat = laserMat;

    const robot = new THREE.Group();
    robot.position.set(-20, -4, 0);
    sceneRefs.current.robot = robot;

    const torsoGroup = new THREE.Group();
    torsoGroup.position.y = 3;
    const torso = new THREE.Mesh(new THREE.BoxGeometry(1.8, 2.2, 1.2), metalMat);
    addEdges(torso, 0x9efcff, 0.8);
    torsoGroup.add(torso);

    const chestCore = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 1.3, 16), neonCyanMat);
    chestCore.rotation.x = Math.PI / 2;
    torsoGroup.add(chestCore);

    const abdomen = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1, 0.8), darkMetalMat);
    addEdges(abdomen, 0x9efcff, 0.65);
    abdomen.position.y = -1.5;
    torsoGroup.add(abdomen);
    robot.add(torsoGroup);

    const headGroup = new THREE.Group();
    headGroup.position.y = 4.8;
    const head = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1, 1.2), darkMetalMat);
    addEdges(head, 0x9efcff, 0.8);
    headGroup.add(head);

    const eyes = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.2, 0.1), neonCyanMat);
    eyes.position.set(0, 0, 0.6);
    headGroup.add(eyes);

    const antenna = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.6), metalMat);
    antenna.position.set(0.4, 0.7, 0);
    const antennaTip = new THREE.Mesh(new THREE.SphereGeometry(0.1), neonCyanMat);
    antennaTip.position.set(0.4, 1, 0);
    headGroup.add(antenna, antennaTip);
    robot.add(headGroup);
    sceneRefs.current.headGroup = headGroup;

    const legL = createLeg(-0.6, metalMat, darkMetalMat);
    const legR = createLeg(0.6, metalMat, darkMetalMat);
    sceneRefs.current.robotLegL = legL;
    sceneRefs.current.robotLegR = legR;
    robot.add(legL, legR, createArm(-1.4, darkMetalMat, neonCyanMat), createArm(1.4, darkMetalMat, neonCyanMat));
    scene.add(robot);

    const laserGeo = new THREE.CylinderGeometry(0.08, 0.08, 1, 8);
    laserGeo.translate(0, 0.5, 0);
    const laser = new THREE.Mesh(laserGeo, laserMat);
    laser.rotation.x = Math.PI / 2;
    laser.scale.y = 0.001;
    laser.position.set(0, 0, 0.6);
    headGroup.add(laser);
    sceneRefs.current.laser = laser;

    const drone = new THREE.Group();
    drone.position.set(0, 20, 0);
    sceneRefs.current.drone = drone;

    const droneBaseMat = new THREE.MeshStandardMaterial({ color: 0x2a2d34, metalness: 0.7, roughness: 0.2 });
    const droneEdgeMat = new THREE.LineBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.8 });
    const dBodyGeo = new THREE.BoxGeometry(1.5, 0.5, 1.5);
    const dBody = new THREE.Mesh(dBodyGeo, droneBaseMat);
    dBody.add(new THREE.LineSegments(new THREE.EdgesGeometry(dBodyGeo), droneEdgeMat));
    drone.add(dBody);

    const dEye = new THREE.Mesh(new THREE.SphereGeometry(0.25, 16, 16), neonCyanMat);
    dEye.position.set(0, -0.2, 0.75);
    drone.add(dEye);

    const droneProps: THREE.Mesh[] = [];
    const armPositions = [
      { x: 1, z: 1 },
      { x: -1, z: 1 },
      { x: 1, z: -1 },
      { x: -1, z: -1 },
    ];

    armPositions.forEach((position) => {
      const dArmGeo = new THREE.CylinderGeometry(0.06, 0.06, 1.8, 8);
      const dArm = new THREE.Mesh(dArmGeo, droneBaseMat);
      dArm.rotation.x = Math.PI / 2;
      dArm.rotation.z = Math.atan2(position.x, position.z);
      dArm.position.set(position.x * 0.6, 0, position.z * 0.6);
      dArm.add(new THREE.LineSegments(new THREE.EdgesGeometry(dArmGeo), droneEdgeMat));
      drone.add(dArm);

      const motorGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.4, 16);
      const motor = new THREE.Mesh(motorGeo, droneBaseMat);
      motor.position.set(position.x * 1.2, 0.2, position.z * 1.2);
      motor.add(new THREE.LineSegments(new THREE.EdgesGeometry(motorGeo), droneEdgeMat));
      drone.add(motor);

      const prop = new THREE.Mesh(
        new THREE.BoxGeometry(1.4, 0.02, 0.15),
        new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.7 })
      );
      prop.position.set(position.x * 1.2, 0.45, position.z * 1.2);
      droneProps.push(prop);
      drone.add(prop);
    });

    sceneRefs.current.droneProps = droneProps;
    scene.add(drone);

    const package3D = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1, 1), new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.8 }));
    package3D.add(new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, 1.05), neonCyanMat));
    package3D.position.set(0, -2, 0);
    package3D.visible = false;
    scene.add(package3D);
    sceneRefs.current.package3D = package3D;

    const clock = new THREE.Clock();
    let animationId = 0;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      sceneRefs.current.droneProps.forEach((prop, index) => {
        prop.rotation.y += index % 2 === 0 ? 0.5 : -0.5;
      });

      if (sceneRefs.current.drone && sceneRefs.current.drone.position.y < 10) {
        sceneRefs.current.drone.position.y += Math.sin(time * 4) * 0.005;
        sceneRefs.current.drone.rotation.z = Math.sin(time * 2) * 0.01;
        sceneRefs.current.drone.rotation.x = Math.cos(time * 1.5) * 0.01;
      }

      renderer.render(scene, camera);
    };

    animate();

    const ctx = gsap.context(() => {
      if (!formRef.current) {
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          start: "top 60%",
          onEnter: () => setFormStatus("active"),
          once: true,
        },
      });

      tl.to(robot.position, {
        x: -7,
        duration: 2.5,
        ease: "power2.out",
        onStart: () => {
          gsap.to(legL.rotation, { x: 0.6, duration: 0.4, yoyo: true, repeat: 5 });
          gsap.to(legR.rotation, { x: -0.6, duration: 0.4, yoyo: true, repeat: 5, delay: 0.2 });
        },
      })
        .to(headGroup.rotation, { y: Math.PI / 6, duration: 0.5 })
        .to(laserMat, { opacity: 0.9, duration: 0.1 })
        .to(laser.scale, { y: 12, duration: 0.3, ease: "power2.out" })
        .fromTo(
          formRef.current,
          { scale: 0, opacity: 0, rotationY: -90 },
          { scale: 1, opacity: 1, rotationY: 0, duration: 1, ease: "elastic.out(1, 0.6)" },
          "-=0.1"
        )
        .to(laserMat, { opacity: 0, duration: 0.2 }, "-=0.5")
        .to(laser.scale, { y: 0.001, duration: 0.1 })
        .to(headGroup.rotation, { y: 0, duration: 0.5 })
        .to(
          drone.position,
          {
            x: 5.5,
            y: 5.5,
            z: 3,
            duration: 2,
            ease: "back.out(1.2)",
          },
          "-=0.5"
        )
        .to(drone.rotation, { y: -0.4, z: 0.1, duration: 2 }, "<");
    }, containerRef);

    const handleResize = () => {
      if (!mountRef.current) {
        return;
      }

      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };

    window.addEventListener("resize", handleResize);
    setIsLoaded(true);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      ctx.revert();
      renderer.dispose();
      container.innerHTML = "";
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === triggerElement) {
          trigger.kill();
        }
      });
    };
  }, []);

  const handleDispatch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formStatus !== "active" || !formRef.current || !successRef.current) {
      return;
    }

    const { drone, package3D } = sceneRefs.current;

    if (!drone || !package3D) {
      return;
    }

    setFormStatus("packing");

    const tl = gsap.timeline({
      onComplete: () => setFormStatus("submitted"),
    });

    tl.to(formRef.current, {
      scale: 0.1,
      opacity: 0,
      rotationX: 90,
      duration: 0.5,
      ease: "power2.in",
    })
      .add(() => {
        package3D.visible = true;

        if (formRef.current) {
          formRef.current.style.pointerEvents = "none";
        }
      })
      .fromTo(package3D.scale, { x: 0, y: 0, z: 0 }, { x: 1, y: 1, z: 1, duration: 0.5, ease: "back.out(2)" })
      .to(drone.position, {
        x: 0,
        y: -1.2,
        z: 0,
        duration: 0.8,
        ease: "power2.inOut",
      })
      .to(drone.rotation, { x: 0.15, y: 0, z: 0, duration: 0.3 }, "-=0.3")
      .to(drone.position, { y: -1.5, duration: 0.15, yoyo: true, repeat: 1 })
      .to(drone.position, { y: 25, x: 15, duration: 1.5, ease: "power2.in" }, "+=0.2")
      .to(package3D.position, { y: 24, x: 15, duration: 1.5, ease: "power2.in" }, "<")
      .to(drone.rotation, { z: -0.4, duration: 1 }, "<")
      .fromTo(
        successRef.current,
        { opacity: 0, y: 40, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.5)", display: "flex" }
      )
      .to({}, { duration: 5 })
      .to(successRef.current, {
        opacity: 0,
        y: -40,
        scale: 0.9,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          if (successRef.current) {
            successRef.current.style.display = "none";
          }

          htmlFormRef.current?.reset();
        },
      })
      .add(() => {
        package3D.visible = false;
        package3D.position.set(0, -2, 0);
        package3D.scale.set(1, 1, 1);
        drone.position.set(0, 20, 0);
        drone.rotation.set(0, 0, 0);
      })
      .to(drone.position, {
        x: 5.5,
        y: 5.5,
        z: 3,
        duration: 1.5,
        ease: "back.out(1.2)",
      })
      .to(drone.rotation, { y: -0.4, z: 0.1, duration: 1.5, ease: "power2.out" }, "<")
      .to(
        formRef.current,
        {
          scale: 1,
          opacity: 1,
          rotationX: 0,
          duration: 0.8,
          ease: "elastic.out(1, 0.6)",
          onComplete: () => {
            if (formRef.current) {
              formRef.current.style.pointerEvents = "auto";
            }

            setFormStatus("active");
          },
        },
        "-=0.8"
      );
  };

  return (
    <section className="bg-[#050505] min-h-[920px] md:min-h-screen flex items-center justify-center font-sans text-white relative overflow-hidden selection:bg-[#00f0ff] selection:text-black">
      {!isLoaded && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#050505] text-[#00f0ff] font-mono text-sm tracking-widest animate-pulse">
          ASSEMBLING 3D ASSETS...
        </div>
      )}

      <div ref={mountRef} className="absolute inset-0 z-0 pointer-events-none" />

      <div
        className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(0,240,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,1)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"
        style={{ transform: "rotateX(60deg) scale(2) translateY(50%)", transformOrigin: "bottom center" }}
      />

      <div ref={containerRef} className="max-w-6xl w-full mx-auto px-6 relative z-10 flex flex-col items-center justify-center min-h-[920px] md:min-h-screen pt-16 pb-12">
        <div className="relative text-center pointer-events-none mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00f0ff]/10 border border-[#00f0ff]/30 rounded-full mb-3">
            <span className="w-2 h-2 bg-[#00f0ff] rounded-full animate-ping" />
            <span className="text-[#00f0ff] font-mono text-[10px] tracking-widest uppercase">Secure Channel Open</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white drop-shadow-[0_0_15px_rgba(0,240,255,0.3)] leading-none">
            Initiate{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-blue-500">
              Contact
            </span>
          </h2>
        </div>

        <div
          ref={formRef}
          className="relative w-full max-w-md bg-[#0a0a0a]/90 backdrop-blur-md border border-zinc-800 rounded-2xl p-6 md:p-8 opacity-0 pointer-events-auto [transform-style:preserve-3d]"
          style={{
            boxShadow: "0 0 30px rgba(0, 240, 255, 0.1), inset 0 0 20px rgba(0, 240, 255, 0.05)",
            borderTop: "2px solid #00f0ff",
          }}
        >
          <div className="flex justify-center gap-6 mb-8 border-b border-zinc-800 pb-6">
            <a href="#" className="text-zinc-500 hover:text-[#00f0ff] hover:scale-110 transition-all duration-300" title="GitHub">
              <GitHubIcon />
            </a>
            <a href="#" className="text-zinc-500 hover:text-[#00f0ff] hover:scale-110 transition-all duration-300" title="LinkedIn">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                />
              </svg>
            </a>
            <a href="mailto:hello@atharv.dev" className="text-zinc-500 hover:text-[#00f0ff] hover:scale-110 transition-all duration-300" title="Email">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </div>

          <form ref={htmlFormRef} onSubmit={handleDispatch} className="space-y-4" suppressHydrationWarning>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full bg-[#111] border border-zinc-800 rounded px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-[#00f0ff] transition-colors"
              required
              suppressHydrationWarning
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full bg-[#111] border border-zinc-800 rounded px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-[#00f0ff] transition-colors"
              required
              suppressHydrationWarning
            />
            <textarea
              placeholder="Message Payload..."
              rows={3}
              className="w-full bg-[#111] border border-zinc-800 rounded px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-[#00f0ff] transition-colors resize-none"
              required
              suppressHydrationWarning
            />

            <button
              type="submit"
              disabled={formStatus !== "active"}
              className="w-full bg-[#00f0ff]/10 hover:bg-[#00f0ff] disabled:hover:bg-[#00f0ff]/10 text-[#00f0ff] hover:text-[#050505] disabled:hover:text-[#00f0ff] border border-[#00f0ff] disabled:opacity-60 font-bold font-mono uppercase py-3 mt-2 rounded transition-all duration-300 flex justify-center items-center gap-2"
              suppressHydrationWarning
            >
              <span>{formStatus === "packing" ? "Dispatching..." : "Initialize Dispatch"}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </button>
          </form>
        </div>

        <div
          ref={successRef}
          className="absolute hidden flex-col items-center justify-center text-center bg-[#050505]/90 backdrop-blur-md border border-[#00f0ff] p-8 rounded-2xl shadow-[0_0_50px_rgba(0,240,255,0.2)] z-20 pointer-events-none"
        >
          <div className="w-16 h-16 bg-[#00f0ff]/10 border-2 border-[#00f0ff] rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-[#00f0ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-black uppercase text-white tracking-widest mb-2">Payload Secured</h3>
          <p className="text-zinc-400 font-mono text-sm max-w-[250px] mb-2">Drone dispatched successfully.</p>
          <p className="text-[#00f0ff]/50 font-mono text-[10px] uppercase tracking-widest animate-pulse">
            Resetting terminal in 5s...
          </p>
        </div>
      </div>
    </section>
  );
}
