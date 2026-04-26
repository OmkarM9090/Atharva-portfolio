"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const roles = ["Robotics Engineer", "AI/ML Developer", "Drone Architect", "IoT Specialist"] as const;

export default function AboutSection() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [currentRole, setCurrentRole] = useState(0);
  const [fade, setFade] = useState(true);
  const [isThreeLoaded, setIsThreeLoaded] = useState(false);

  useEffect(() => {
    const roleInterval = window.setInterval(() => {
      setFade(false);
      window.setTimeout(() => {
        setCurrentRole((prev) => (prev + 1) % roles.length);
        setFade(true);
      }, 500);
    }, 2500);

    return () => window.clearInterval(roleInterval);
  }, []);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) {
      return;
    }

    let animationId = 0;
    let scene: THREE.Scene | null = null;
    let camera: THREE.PerspectiveCamera | null = null;
    let renderer: THREE.WebGLRenderer | null = null;
    let controls: OrbitControls | null = null;
    let robotGroup: THREE.Group | null = null;
    let head: THREE.Mesh | null = null;
    let leftHand: THREE.Mesh | null = null;
    let rightHand: THREE.Mesh | null = null;
    let coreLight: THREE.PointLight | null = null;
    let particlesMesh: THREE.Points | null = null;

    const cleanRenderer = () => {
      if (renderer && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };

    const initThreeScene = () => {
      cleanRenderer();

      scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x050505, 0.05);

      camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
      camera.position.set(0, 2, 12);

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      container.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.enableZoom = false;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 1.3;

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
      scene.add(ambientLight);

      const dirLight = new THREE.DirectionalLight(0x00ffcc, 1);
      dirLight.position.set(5, 5, 5);
      scene.add(dirLight);

      const dirLight2 = new THREE.DirectionalLight(0xa855f7, 0.8);
      dirLight2.position.set(-5, 5, -5);
      scene.add(dirLight2);

      robotGroup = new THREE.Group();

      const bodyMat = new THREE.MeshStandardMaterial({ color: 0x222222, metalness: 0.8, roughness: 0.2 });
      const glowMat = new THREE.MeshStandardMaterial({
        color: 0x00ffcc,
        emissive: 0x00ffcc,
        emissiveIntensity: 2,
        metalness: 0.3,
        roughness: 0.2,
      });

      const torso = new THREE.Mesh(new THREE.BoxGeometry(2, 2.5, 1.5), bodyMat);
      robotGroup.add(torso);

      const core = new THREE.Mesh(new THREE.SphereGeometry(0.6, 16, 16), glowMat);
      core.position.z = 0.5;
      torso.add(core);

      coreLight = new THREE.PointLight(0x00ffcc, 2, 5);
      core.add(coreLight);

      head = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.2, 1.4), bodyMat);
      head.position.y = 2;
      robotGroup.add(head);

      const visor = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.3, 0.2), glowMat);
      visor.position.set(0, 0, 0.7);
      head.add(visor);

      leftHand = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.8, 0.8), bodyMat);
      leftHand.position.set(-2.5, 0, 0);
      robotGroup.add(leftHand);

      rightHand = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.8, 0.8), bodyMat);
      rightHand.position.set(2.5, 0, 0);
      robotGroup.add(rightHand);

      const leftFoot = new THREE.Mesh(new THREE.BoxGeometry(1, 0.5, 1.2), bodyMat);
      leftFoot.position.set(-0.8, -2.5, 0);
      robotGroup.add(leftFoot);

      const rightFoot = new THREE.Mesh(new THREE.BoxGeometry(1, 0.5, 1.2), bodyMat);
      rightFoot.position.set(0.8, -2.5, 0);
      robotGroup.add(rightFoot);

      scene.add(robotGroup);

      const particlesGeo = new THREE.BufferGeometry();
      const particlesCount = 100;
      const posArray = new Float32Array(particlesCount * 3);
      for (let i = 0; i < particlesCount * 3; i += 1) {
        posArray[i] = (Math.random() - 0.5) * 15;
      }
      particlesGeo.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
      const particlesMat = new THREE.PointsMaterial({
        size: 0.05,
        color: 0x00ffcc,
        transparent: true,
        opacity: 0.8,
      });
      particlesMesh = new THREE.Points(particlesGeo, particlesMat);
      scene.add(particlesMesh);

      const clock = new THREE.Clock();
      const animate = () => {
        animationId = requestAnimationFrame(animate);
        const t = clock.getElapsedTime();

        if (robotGroup) {
          robotGroup.position.y = Math.sin(t * 2) * 0.3;
        }

        if (head) {
          head.rotation.y = Math.sin(t * 1.5) * 0.3;
          head.rotation.z = Math.cos(t) * 0.1;
        }

        if (leftHand) {
          leftHand.position.y = Math.sin(t * 4) * 0.5;
          leftHand.position.z = Math.cos(t * 4) * 0.5;
          leftHand.rotation.x = t;
        }

        if (rightHand) {
          rightHand.position.y = Math.cos(t * 4) * 0.5;
          rightHand.position.z = Math.sin(t * 4) * 0.5;
          rightHand.rotation.x = -t;
        }

        if (coreLight) {
          coreLight.intensity = 1 + Math.sin(t * 8) * 0.5;
        }

        if (particlesMesh) {
          particlesMesh.rotation.y = t * 0.1;
        }

        controls?.update();
        renderer?.render(scene!, camera!);
      };

      animate();
      setIsThreeLoaded(true);
    };

    initThreeScene();

    const handleResize = () => {
      if (!camera || !renderer || !mountRef.current) {
        return;
      }
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      controls?.dispose();

      scene?.traverse((object) => {
        const mesh = object as THREE.Mesh;
        if (mesh.geometry) {
          mesh.geometry.dispose();
        }
        if (mesh.material) {
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((material) => material.dispose());
          } else {
            mesh.material.dispose();
          }
        }
      });

      renderer?.dispose();
      cleanRenderer();
    };
  }, []);

  return (
    <section className="min-h-screen bg-[#050505] text-white flex items-center justify-center relative overflow-hidden font-sans pt-20 pb-10">
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="flex flex-col items-start text-left space-y-6 order-2 lg:order-1">
          <div className="inline-block px-3 py-1 bg-[#00ffcc]/10 border border-[#00ffcc]/30 rounded-full">
            <span className="font-mono text-xs md:text-sm text-[#00ffcc] tracking-widest uppercase">System Boot Complete</span>
          </div>

          <div>
            <h2 className="text-xl md:text-3xl text-zinc-400 font-light mb-2">Hello World, I am</h2>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mb-2">Atharv Khetle</h1>

            <div className="h-10 md:h-14 flex items-center overflow-hidden">
              <span className="text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00ffcc] to-blue-500">
                &gt;_ <span className={`transition-opacity duration-500 ease-in-out ${fade ? "opacity-100" : "opacity-0"}`}>{roles[currentRole]}</span>
              </span>
              <span className="w-3 h-8 md:h-10 bg-[#00ffcc] ml-2 animate-pulse" />
            </div>
          </div>

          <p className="text-zinc-400 text-base md:text-lg font-mono leading-relaxed max-w-lg border-l-2 border-zinc-800 pl-4">
            Passionate about bridging the gap between digital intelligence and physical hardware. I build intelligent systems,
            autonomous drones, and innovative robotics solutions to engineer a smarter future.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <button className="px-6 py-3 bg-[#00ffcc] text-[#050505] font-mono font-bold uppercase tracking-wider hover:bg-white transition-colors duration-300 shadow-[0_0_20px_rgba(0,255,204,0.3)]">
              View Resume
            </button>

            <a
              href="#"
              className="p-3 border border-zinc-700 rounded-sm bg-zinc-900/50 hover:border-[#00ffcc] hover:text-[#00ffcc] transition-all duration-300 group flex items-center justify-center"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
            </a>

            <a
              href="#"
              className="p-3 border border-zinc-700 rounded-sm bg-zinc-900/50 hover:border-[#00ffcc] hover:text-[#00ffcc] transition-all duration-300 group flex items-center justify-center"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>

        <div className="relative w-full h-[400px] md:h-[600px] order-1 lg:order-2 flex items-center justify-center cursor-grab active:cursor-grabbing">
          {!isThreeLoaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-[#00ffcc] font-mono animate-pulse">
              <div className="w-16 h-16 border-4 border-[#00ffcc] border-t-transparent rounded-full animate-spin mb-4" />
              Rendering 3D Mech...
            </div>
          )}

          <div ref={mountRef} className="absolute inset-0 z-10" />

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#00ffcc] opacity-[0.05] blur-[100px] rounded-full pointer-events-none z-0" />

          <div className="absolute bottom-0 text-center w-full text-zinc-600 font-mono text-xs tracking-widest pointer-events-none z-20 opacity-50">
            [ DRAG TO ROTATE 3D MODEL ]
          </div>
        </div>
      </div>
    </section>
  );
}
