import AboutSection from "@/components/portfolio/sections/AboutSection";
import AcademicProjects from "@/components/portfolio/sections/AcademicProjects";
import ContactSection from "@/components/portfolio/sections/ContactSection";
import EducationSection from "@/components/portfolio/sections/EducationSection";
import ExperienceSection from "@/components/portfolio/sections/ExperienceSection";
import IntroPortalSection from "@/components/portfolio/sections/IntroPortalSection";
import LeadershipExperience from "@/components/portfolio/sections/LeadershipExperience";
import PortfolioNavBar from "@/components/portfolio/PortfolioNavBar";
import ResearchExperience from "@/components/portfolio/sections/ResearchExperience";
import SkillsExperience from "@/components/portfolio/sections/SkillsExperience";

export default function Home() {
  return (
    <main className="bg-[#050505] text-white">
      <IntroPortalSection />

      <div id="about" className="relative scroll-mt-24">
        <AboutSection />
      </div>

      <div id="skills" className="relative scroll-mt-24">
        <SkillsExperience />
      </div>

      <div id="internship-experience" className="relative scroll-mt-24">
        <ExperienceSection />
      </div>

      <div id="projects" className="relative scroll-mt-24">
        <AcademicProjects />
      </div>

      <div id="research-publication" className="relative scroll-mt-24">
        <ResearchExperience />
      </div>

      <div id="leadership" className="relative scroll-mt-24">
        <LeadershipExperience />
      </div>

      <div id="education" className="relative scroll-mt-24">
        <EducationSection />
      </div>

      <div id="contact-us" className="relative scroll-mt-24">
        <ContactSection />
      </div>

      <PortfolioNavBar />
    </main>
  );
}
