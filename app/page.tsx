import AboutSection from "@/components/portfolio/sections/AboutSection";
import ExperienceSection from "@/components/portfolio/sections/ExperienceSection";
import IntroPortalSection from "@/components/portfolio/sections/IntroPortalSection";

export default function Home() {
  return (
    <main className="bg-[#050505] text-white">
      <IntroPortalSection />
      <AboutSection />
      <ExperienceSection />
    </main>
  );
}
