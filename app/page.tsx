import AboutSection from "@/components/portfolio/sections/AboutSection";
import AcademicProjects from "@/components/portfolio/sections/AcademicProjects";
import ExperienceSection from "@/components/portfolio/sections/ExperienceSection";
import IntroPortalSection from "@/components/portfolio/sections/IntroPortalSection";
import LeadershipExperience from "@/components/portfolio/sections/LeadershipExperience";
import SkillsExperience from "@/components/portfolio/sections/SkillsExperience";

export default function Home() {
  return (
    <main className="bg-[#050505] text-white">
      <IntroPortalSection />
      <AboutSection />
      <ExperienceSection />
      <LeadershipExperience />
      <SkillsExperience />
      <AcademicProjects />
    </main>
  );
}
