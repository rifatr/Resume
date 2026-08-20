import { catalogue } from "@/content/site";

/**
 * Other work, as a contents list. Each row carries exactly one rule, at its
 * foot. Dot leaders used to run between the name and the status, which put a
 * dotted line and a solid line a few pixels apart with neither one aligned to
 * the other.
 */
export default function Catalogue() {
  return (
    <div className="mt-20">
      <h3 className="smallcaps text-[1.08rem] text-oxblood">Other projects</h3>

      <ul className="mt-6">
        {catalogue.map((item) => {
          const heading = (
            <span className="font-display text-[1.6rem] sm:text-[1.8rem] leading-tight">
              {item.name}
            </span>
          );

          return (
            <li key={item.name} className="pt-7">
              <div className="flex items-baseline justify-between gap-6">
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-baseline gap-2 hover:text-oxblood transition-colors min-w-0"
                  >
                    {heading}
                    <span aria-hidden className="text-brass text-[0.95rem]">
                      &#8599;
                    </span>
                  </a>
                ) : (
                  heading
                )}
                <span className="smallcaps text-[0.92rem] text-ink-faded shrink-0">
                  {item.status}
                </span>
              </div>

              <p className="mt-2 text-ink/85 max-w-[58ch] text-justify hyphens-auto">{item.blurb}</p>
              <p className="mt-1.5 font-mono text-[0.85rem] text-ink-faded">
                {item.stack}
              </p>

              <div className="rule-row mt-7" aria-hidden />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
