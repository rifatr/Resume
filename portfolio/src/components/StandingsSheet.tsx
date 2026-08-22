import SectionRule from "./SectionRule";
import { contests } from "@/content/site";

/** The contest record, set as a printed standings sheet: ruled rows, mono
 *  figures, rank in its own column. Cards on narrow screens, table on wide. */
export default function StandingsSheet() {
  return (
    <section className="mt-20 sm:mt-28">
      <SectionRule index="04" title="Achievements" id="achievements" />

      <div className="mt-8 grid gap-x-10 gap-y-4 lg:grid-cols-[12rem_minmax(0,1fr)]">
        <aside className="hidden lg:block smallcaps text-[0.95rem] text-ink-faded leading-relaxed lg:text-right lg:pt-2">
          <p>{contests.period}</p>
          <p className="mt-0.5">{contests.role}</p>
        </aside>

        <div className="min-w-0">
          {/* Mobile: stacked cards */}
          <ul className="md:hidden space-y-0">
            {contests.standings.map((row) => (
              <li key={row.event} className="border-b border-rule py-5">
                <div className="flex items-baseline justify-between gap-4 mb-2">
                  <span className="font-mono lining text-oxblood text-[1.15rem]">
                    {row.rank}
                  </span>
                  <span className="font-mono lining text-ink-faded text-[0.9rem] shrink-0">
                    {row.year}
                  </span>
                </div>
                {row.href ? (
                  <a
                    href={row.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-display text-[1.35rem] leading-snug border-b border-transparent hover:border-oxblood hover:text-oxblood transition-colors"
                  >
                    {row.event}
                  </a>
                ) : (
                  <span className="font-display text-[1.35rem] leading-snug">
                    {row.event}
                  </span>
                )}
                <span className="block smallcaps text-[0.92rem] text-ink-faded mt-1">
                  {row.note}
                </span>
              </li>
            ))}
          </ul>

          {/* Desktop: ruled table */}
          <table className="hidden md:table w-full border-collapse text-left">
            <caption className="sr-only">Contest results</caption>
            <thead>
              <tr className="border-b border-ink">
                <th
                  scope="col"
                  className="smallcaps text-[0.92rem] text-ink-faded pb-2 pr-4 font-normal w-[6rem]"
                >
                  Rank
                </th>
                <th
                  scope="col"
                  className="smallcaps text-[0.92rem] text-ink-faded pb-2 pr-4 font-normal"
                >
                  Contest
                </th>
                <th
                  scope="col"
                  className="smallcaps text-[0.92rem] text-ink-faded pb-2 text-right font-normal w-[5rem]"
                >
                  Year
                </th>
              </tr>
            </thead>
            <tbody>
              {contests.standings.map((row) => (
                <tr key={row.event} className="border-b border-rule align-baseline">
                  <td className="py-5 pr-4 font-mono lining text-oxblood text-[1.2rem] whitespace-nowrap">
                    {row.rank}
                  </td>
                  <td className="py-5 pr-4">
                    {row.href ? (
                      <a
                        href={row.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-display text-[1.45rem] border-b border-transparent hover:border-oxblood hover:text-oxblood transition-colors"
                      >
                        {row.event}
                      </a>
                    ) : (
                      <span className="font-display text-[1.45rem]">{row.event}</span>
                    )}
                    <span className="block smallcaps text-[0.92rem] text-ink-faded mt-0.5">
                      {row.note}
                    </span>
                  </td>
                  <td className="py-5 font-mono lining text-ink-faded text-[0.95rem] text-right whitespace-nowrap">
                    {row.year}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <section className="mt-12 pt-6 sm:mt-16 sm:pt-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="smallcaps text-[0.92rem] text-oxblood">Problems set &amp; judged</p>
                <h3 className="font-display impress mt-2 text-[clamp(1.9rem,4vw,2.8rem)] leading-tight">
                  On the other side of the judge&apos;s desk
                </h3>
              </div>
            </div>

            <p className="mt-4 max-w-[56ch] text-ink/85 text-justify hyphens-auto">
              Problem setter and judge for national and international contests,
              from writing the problems to keeping the scoreboard honest.
            </p>

            <ol className="mt-8 grid gap-x-8 gap-y-0 sm:grid-cols-2">
              {contests.authored.map((item, index) => (
                <li key={item.name} className="group border-t border-rule py-4">
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-12 items-baseline gap-4 transition-colors hover:text-oxblood"
                  >
                    <span className="font-mono text-[0.8rem] text-ink-faded group-hover:text-oxblood">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-1 font-display text-[1.35rem] leading-tight">
                      {item.name}
                    </span>
                    <span aria-hidden className="text-brass text-[1.05rem] transition-transform group-hover:translate-x-1">
                      &#8599;
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </div>
    </section>
  );
}
