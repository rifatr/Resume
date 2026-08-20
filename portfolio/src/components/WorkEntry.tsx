import type { WorkEntry as Entry } from "@/content/site";
import SectionRule from "./SectionRule";

export default function WorkEntry({
  entry,
  anchor,
}: {
  entry: Entry;
  anchor: string;
}) {
  return (
    <article className="mt-20 sm:mt-28">
      <SectionRule index={entry.index} title={entry.section} id={anchor} />

      {/* Marginalia rail: period and place sit in the margin on wide screens
          and fold above the prose on narrow ones. */}
      <div className="mt-8 grid gap-x-10 gap-y-4 lg:grid-cols-[12rem_minmax(0,1fr)]">
        <aside className="smallcaps text-[0.95rem] text-ink-faded leading-relaxed lg:text-right lg:pt-2">
          <p>{entry.period}</p>
          <p className="mt-0.5">{entry.meta}</p>
        </aside>

        <div className="min-w-0">
          <h3 className="font-display impress text-[clamp(2rem,4.6vw,3.1rem)] leading-tight font-semibold">
            {entry.title}
          </h3>

          <p className="mt-4 text-[1.3rem] leading-[1.6] text-ink/90 max-w-[58ch] text-justify hyphens-auto">
            {entry.summary}
          </p>

          <ul className="mt-10 space-y-8">
            {entry.points.map((point) => (
              <li key={point.heading} className="max-w-[58ch]">
                <h4 className="smallcaps text-[1.08rem] text-oxblood">
                  {point.heading}
                </h4>
                <p className="mt-1.5 text-ink/85 text-justify hyphens-auto">{point.body}</p>
              </li>
            ))}
          </ul>

          <ul className="mt-10 flex flex-wrap gap-x-3 gap-y-2.5">
            {entry.stack.map((tech) => (
              <li
                key={tech}
                className="font-mono text-[0.85rem] text-ink-faded border border-rule px-2.5 py-1 lining"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
