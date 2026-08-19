/**
 * A section opener: number in the margin, title in tracked capitals, one rule
 * beneath. Deliberately a single rule. An earlier version also ran a hairline
 * out from the title, which put two lines of different weight and different
 * start points within a few pixels of each other.
 */
export default function SectionRule({
  index,
  title,
  id,
}: {
  index: string;
  title: string;
  id?: string;
}) {
  return (
    <header id={id} className="scroll-mt-24">
      <div className="flex items-baseline gap-5 sm:gap-7">
        <span
          aria-hidden
          className="font-mono text-oxblood text-base shrink-0 lining"
        >
          {index}
        </span>
        <h2 className="tracked impress text-[0.95rem] sm:text-[1.05rem] font-body">
          {title}
        </h2>
      </div>
      <div className="rule-section mt-3" aria-hidden />
    </header>
  );
}
