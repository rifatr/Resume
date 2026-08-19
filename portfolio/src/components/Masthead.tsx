import AsciiPortrait from "./AsciiPortrait";
import ThemeToggle from "./ThemeToggle";
import { nav, person, links } from "@/content/site";

/** The title page: seal, name, rule, standing, and the running nav. */
export default function Masthead() {
  return (
    <header className="pt-10 sm:pt-14">
      <nav className="flex items-center justify-between gap-4 mb-16 sm:mb-24">
        <a
          href="#top"
          className="smallcaps text-[0.95rem] text-ink-faded hover:text-oxblood transition-colors"
        >
          {person.domain}
        </a>
        <div className="flex items-center gap-4 sm:gap-6">
          <ul className="hidden md:flex items-center gap-6">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="smallcaps text-[0.95rem] text-ink-faded hover:text-oxblood transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <span aria-hidden className="hidden md:block w-px h-4 bg-rule" />
          <ThemeToggle />
        </div>
      </nav>

      <div className="text-center">
        <AsciiPortrait className="w-[248px] sm:w-[330px]" />

        <h1 className="font-display impress font-semibold leading-[0.95] text-[clamp(2.7rem,9vw,5.6rem)] mt-12">
          Mohammad&nbsp;Lutfar
          <br />
          Rahman&nbsp;Rifat
        </h1>

        <div className="flex items-center justify-center gap-4 mt-8 mb-6">
          <span aria-hidden className="rule-ornament w-16 sm:w-28" />
          <span aria-hidden className="w-1.5 h-1.5 rotate-45 bg-brass shrink-0" />
          <span aria-hidden className="rule-ornament w-16 sm:w-28" />
        </div>

        <p className="tracked text-[0.82rem] sm:text-[0.95rem] text-ink-faded">
          {person.role}
          <span aria-hidden className="text-brass mx-2.5">
            &middot;
          </span>
          {person.location}
        </p>

        <a
          href={links.resume}
          className="inline-block mt-10 smallcaps text-[1.05rem] text-oxblood border-b border-oxblood/40 hover:border-oxblood transition-colors pb-0.5"
        >
          Read the r&eacute;sum&eacute;
        </a>
      </div>
    </header>
  );
}
