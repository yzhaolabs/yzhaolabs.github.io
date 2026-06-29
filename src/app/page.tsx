import Hero from "@/components/Hero";
import Metrics from "@/components/Metrics";
import ResearchFocus from "@/components/ResearchFocus";
import SelectedWork from "@/components/SelectedWork";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import TechStack from "@/components/TechStack";
import Education from "@/components/Education";
import Awards from "@/components/Awards";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />

      <hr className="section-divider" />
      <Metrics />

      <hr className="section-divider" />
      <ResearchFocus />

      <hr className="section-divider" />
      <SelectedWork />

      <hr className="section-divider" />
      <ExperienceTimeline />

      <hr className="section-divider" />
      <TechStack />

      <hr className="section-divider" />
      <Education />

      <hr className="section-divider" />
      <Awards />

      <hr className="section-divider" />
      <Contact />
    </>
  );
}
