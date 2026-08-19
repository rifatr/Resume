import { links, person } from "@/content/site";

const contacts = [
  { label: "Email", value: person.email, href: `mailto:${person.email}` },
  { label: "GitHub", value: "rifatr", href: links.github },
  { label: "LinkedIn", value: "mlr-rifat", href: links.linkedin },
  { label: "Codeforces", value: "rifatrraazz", href: links.codeforces },
  { label: "ICPC", value: "6CCD8YMF6YLS", href: links.icpc },
  { label: "Résumé", value: "PDF", href: links.resume },
];

export default function Colophon() {
  return (
    <footer id="contact" className="mt-24 sm:mt-32 scroll-mt-24">
      <div className="rule-section" aria-hidden />

      <div className="text-center pt-14">
        <h2 className="font-display impress text-[2.2rem] sm:text-[2.9rem] mt-8 leading-tight">
          Get in touch
        </h2>
        <p className="mt-3 text-ink-faded max-w-[44ch] mx-auto">
          Open to conversations about payments, backend systems, and anything
          that has to be right the first time.
        </p>
      </div>

      <ul className="mt-12 grid gap-x-10 sm:grid-cols-2 max-w-2xl mx-auto">
        {contacts.map((contact) => (
          <li key={contact.label} className="rule-row-after py-4">
            <a
              href={contact.href}
              {...(contact.href.startsWith("http")
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="flex items-baseline gap-3 group"
            >
              <span className="smallcaps text-[0.92rem] text-ink-faded w-28 shrink-0">
                {contact.label}
              </span>
              <span className="font-mono text-[0.95rem] group-hover:text-oxblood transition-colors break-all">
                {contact.value}
              </span>
            </a>
          </li>
        ))}
      </ul>

      <div className="text-center mt-16 pb-14">
        <span
          aria-hidden
          className="inline-block w-1.5 h-1.5 rotate-45 bg-brass"
        />
        <p className="smallcaps text-[0.92rem] text-ink-faded mt-5 leading-relaxed">
          Set in Cormorant Garamond, EB Garamond and Fira Mono.
          <br />
          {person.location}
          <span aria-hidden className="text-brass mx-2.5">
            &middot;
          </span>
          2026
        </p>
      </div>
    </footer>
  );
}
