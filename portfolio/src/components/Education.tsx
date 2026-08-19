import SectionRule from "./SectionRule";
import { education } from "@/content/site";

export default function Education() {
  return (
    <section className="mt-20 sm:mt-28">
      <SectionRule index="05" title="Education" id="education" />

      <div className="mt-9 grid gap-x-10 gap-y-4 lg:grid-cols-[12rem_minmax(0,1fr)]">
        <aside className="smallcaps text-[0.95rem] text-ink-faded leading-relaxed lg:text-right lg:pt-2">
          <p>{education.period}</p>
          <p className="mt-0.5">{education.location}</p>
        </aside>

        <div className="min-w-0">
          <h3 className="font-display text-[1.75rem] sm:text-[2rem] leading-snug">
            {education.school}
          </h3>
          <p className="text-ink/85 mt-2">{education.degree}</p>

          <h4 className="smallcaps text-[1.05rem] text-oxblood mt-9">
            Leadership
          </h4>
          <ul className="mt-2 space-y-1.5">
            {education.roles.map((role) => (
              <li key={role} className="text-ink/85">
                {role}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
