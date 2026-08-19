import SectionRule from "./SectionRule";
import { composition } from "@/content/site";

/** Skills, set as a printer's type-specimen block. */
export default function Skills() {
  return (
    <section className="mt-20 sm:mt-28">
      <SectionRule index="03" title="Technical Skills" id="skills" />

      <dl className="mt-9 grid gap-x-10 gap-y-7 sm:grid-cols-[12rem_minmax(0,1fr)]">
        {composition.map((row) => (
          <div key={row.label} className="contents">
            <dt className="smallcaps text-[1.05rem] text-oxblood sm:text-right sm:pt-0.5">
              {row.label}
            </dt>
            <dd className="font-mono text-[0.98rem] leading-relaxed text-ink/85 min-w-0 break-words">
              {row.items}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
