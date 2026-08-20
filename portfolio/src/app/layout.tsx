import type { Metadata } from "next";
import { Cormorant_Garamond, EB_Garamond, Fira_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { person, links } from "@/content/site";
import "./globals.css";

// Self-hosted at build time by next/font: no external requests, no FOUT.
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const garamond = EB_Garamond({
  variable: "--font-garamond",
  subsets: ["latin"],
  display: "swap",
});

const fira = Fira_Mono({
  variable: "--font-fira",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const description =
  "Software engineer in Dhaka building payment systems at ChaldalPay: wallet binding, e-KYC and gRPC gateways. Two-time ICPC Asia West Continent finalist.";

export const metadata: Metadata = {
  metadataBase: new URL(`https://${person.domain}`),
  title: {
    default: `${person.name}, ${person.role}`,
    template: `%s, ${person.name}`,
  },
  description,
  authors: [{ name: person.name, url: `https://${person.domain}` }],
  creator: person.name,
  keywords: [
    "software engineer",
    "payments",
    "fintech",
    "backend",
    "gRPC",
    "FastAPI",
    ".NET",
    "competitive programming",
    "ICPC",
    "Dhaka",
    "Bangladesh",
  ],
  openGraph: {
    type: "profile",
    title: `${person.name}, ${person.role}`,
    description,
    url: `https://${person.domain}`,
    siteName: person.domain,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${person.name}, ${person.role}`,
    description,
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

// Applies the stored edition before first paint so the night edition never
// flashes ivory. Runs blocking in <head>, hence the raw string.
const editionScript = `
(function () {
  try {
    var saved = localStorage.getItem("rifat-edition");
    if (saved === "dark" || saved === "light") {
      document.documentElement.dataset.theme = saved;
    }
  } catch (e) {}
})();
`;

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: person.name,
  jobTitle: person.role,
  url: `https://${person.domain}`,
  email: `mailto:${person.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dhaka",
    addressCountry: "BD",
  },
  worksFor: { "@type": "Organization", name: "Chaldal" },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Rajshahi University of Engineering & Technology",
  },
  sameAs: [links.github, links.linkedin, links.codeforces, links.icpc],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${cormorant.variable} ${garamond.variable} ${fira.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: editionScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        {/* .rise starts at opacity 0 and is revealed by an IntersectionObserver.
            Without JS nothing would ever reveal it, leaving a blank page. */}
        <noscript>
          <style>{`.rise { opacity: 1 !important; transform: none !important; }`}</style>
        </noscript>
      </head>
      <body className="paper-grain">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
