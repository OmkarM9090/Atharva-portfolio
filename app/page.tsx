import AboutSection from "@/components/portfolio/sections/AboutSection";
import IntroPortalSection from "@/components/portfolio/sections/IntroPortalSection";

export default function Home() {
  return (
    <main className="bg-[#050505] text-white">
      <IntroPortalSection />
      <AboutSection />
    </main>
  );
}
