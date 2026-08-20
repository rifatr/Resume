import AsciiPortrait from "./AsciiPortrait";
import { person, links } from "@/content/site";

/** The title page: portrait, name, rule, standing. Navigation lives in SiteHeader. */
export default function Masthead() {
  return (
    <header className="pt-8 sm:pt-12">
      <div className="text-center">
        <AsciiPortrait className="w-full max-w-[248px] sm:max-w-[330px]" />

        <h1 className="font-display impress font-semibold leading-[1.05] text-[clamp(2rem,7.5vw,5.6rem)] mt-10 sm:mt-12 text-balance">
          Mohammad&nbsp;Lutfar&nbsp;Rahman
          <br className="hidden sm:block" />
          <span className="sm:whitespace-nowrap"> Rifat</span>
        </h1>

        <div className="flex items-center justify-center gap-3 sm:gap-4 mt-7 sm:mt-8 mb-5 sm:mb-6">
          <span aria-hidden className="rule-ornament w-12 sm:w-28" />
          <span aria-hidden className="w-1.5 h-1.5 rotate-45 bg-brass shrink-0" />
          <span aria-hidden className="rule-ornament w-12 sm:w-28" />
        </div>

        <p className="tracked text-[0.82rem] sm:text-[0.95rem] text-ink-faded">
          {person.role}
          <span aria-hidden className="text-brass mx-1">
            &middot;
          </span>
          <span>{person.location}</span>
        </p>

        <a
          href={links.resume}
          className="inline-block mt-8 sm:mt-10 smallcaps text-[1rem] sm:text-[1.05rem] text-oxblood border-b border-oxblood/40 hover:border-oxblood transition-colors pb-0.5 min-h-[44px] leading-[44px] sm:leading-normal sm:min-h-0"
        >
          Read the r&eacute;sum&eacute;
        </a>
      </div>
    </header>
  );
}
