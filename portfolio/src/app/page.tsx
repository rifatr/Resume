import Masthead from "@/components/Masthead";
import WorkEntry from "@/components/WorkEntry";
import Catalogue from "@/components/Catalogue";
import Skills from "@/components/Skills";
import StandingsSheet from "@/components/StandingsSheet";
import Education from "@/components/Education";
import Colophon from "@/components/Colophon";
import Rise from "@/components/Rise";
import { experience, featuredProject, intro, person } from "@/content/site";

export default function Home() {
  return (
    <div id="top" className="mx-auto w-full max-w-[70rem] px-5 sm:px-8 lg:px-12">
      <a
        href="#experience"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:bg-paper focus:text-oxblood focus:px-4 focus:py-2 focus:border focus:border-oxblood"
      >
        Skip to content
      </a>

      <Masthead />

      {/* Lede */}
      <section className="mt-16 sm:mt-24">
        <Rise>
          <p className="font-display impress text-center text-[clamp(1.7rem,3.8vw,2.4rem)] leading-[1.38] max-w-[52ch] mx-auto text-balance">
            {person.lede}
          </p>
          <div className="flex items-center justify-center gap-4 mt-10 mb-12">
            <span aria-hidden className="rule-ornament w-20" />
            <span aria-hidden className="w-1.5 h-1.5 rotate-45 bg-brass shrink-0" />
            <span aria-hidden className="rule-ornament w-20" />
          </div>
          <div className="max-w-[58ch] mx-auto">
            {intro.map((paragraph, i) => (
              <p key={i} className={i === 0 ? "dropcap text-justify hyphens-auto" : "mt-5 indent-8 text-justify hyphens-auto"}>
                {paragraph}
              </p>
            ))}
          </div>
        </Rise>
      </section>

      {/* Section order mirrors the LaTeX resume: experience, projects,
          skills, achievements, education. */}
      <main>
        <Rise as="section">
          <WorkEntry entry={experience} anchor="experience" />
        </Rise>

        <Rise as="section">
          <WorkEntry entry={featuredProject} anchor="projects" />
          <Catalogue />
        </Rise>

        <Rise as="div">
          <Skills />
        </Rise>

        <Rise as="div">
          <StandingsSheet />
        </Rise>

        <Rise as="div">
          <Education />
        </Rise>
      </main>

      <Colophon />
    </div>
  );
}
