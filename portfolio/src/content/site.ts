/**
 * Every string on the site lives here.
 *
 * Sourced from Mohammad_Lutfar_Rahman_Rifat.tex and the withProjects /
 * backendHeavy / dotNet branches, so the site and the LaTeX resume stay in
 * step. Section order mirrors the resume's own order. Components below this
 * file are purely presentational.
 *
 * House style: no em dashes. Use commas, colons, semicolons, parentheses or
 * a full stop. Date ranges are written out with "to" or "Since".
 */

export const person = {
  name: "Mohammad Lutfar Rahman Rifat",
  shortName: "M. L. R. Rifat",
  role: "Software Engineer",
  location: "Dhaka, Bangladesh",
  domain: "rifat.app",
  email: "mlrifat370@gmail.com",
  lede:
    "Competitive programming taught me to solve. Engineering is teaching me to build, and that is what I intend to be very good at.",
} as const;

export const links = {
  github: "https://github.com/rifatr",
  linkedin: "https://linkedin.com/in/mlr-rifat/",
  icpc: "https://icpc.global/ICPCID/6CCD8YMF6YLS",
  codeforces: "https://codeforces.com/profile/rifatrraazz",
  resume: "/resume.pdf",
} as const;

export const intro = [
  `For years the problem was always the same shape: read the statement, find the
   idea, get it right before the clock ran out. That was two ICPC Asia West
   Continent Finals, a long run of contests, and enough time on the other side of
   the judge's desk to have set problems for national and international ones.`,
  `Engineering asks for something else. The constraints are regulators, money and
   other people rather than a five hour time limit, and the work is judged over
   months instead of an afternoon. At Chaldal I work on ChaldalPay, where being
   almost correct is the same as being wrong. Closing the distance between
   solving and building is the whole job, and I expect to be at it for a long
   time.`,
] as const;

export type WorkEntry = {
  index?: string;
  section?: string;
  title: string;
  meta: string;
  period: string;
  summary: string;
  stack: readonly string[];
  points: readonly { heading: string; body: string }[];
  groups?: readonly {
    title: string;
    summary: string;
    points: readonly { heading: string; body: string }[];
  }[];
};

export const experience: WorkEntry = {
  index: "01",
  section: "Experience",
  title: "Chaldal Engineering",
  meta: "Software Engineer",
  period: "Since June 2024",
  summary: `I build payment products across Chaldal and ChaldalPay, working from
    customer-facing mobile flows to regulated financial services and
    merchant-facing gRPC contracts.`,
  stack: [
    "C#",
    "F#",
    ".NET Core",
    "gRPC",
    "Protobuf",
    "React Native",
    "Azure DevOps",
  ],
  points: [],
  groups: [
    {
      title: "Chaldal",
      summary: `Payment integration for Chaldal's customer checkout experience.`,
      points: [
        {
          heading: "Multi-account bKash wallet binding",
          body: `Built the secure binding system that lets a customer attach
            several bKash wallets to one Chaldal account and pay with a single
            tap. It supports upwards of a thousand transactions a day.`,
        },
      ],
    },
    {
      title: "ChaldalPay",
      summary: `A mobile financial service operating under Bangladesh Bank
        supervision, spanning customer payments, compliance, operations and
        merchant integrations.`,
      points: [
        {
          heading: "Identity, verified twice",
          body: `Integrated Amazon Rekognition and DeepFace for face verification,
            and the Election Commission API for national ID checks, so e-KYC
            clears against a government record rather than a photograph alone.`,
        },
        {
          heading: "QR payments and dispute flows",
          body: `Developed QR code payment and dispute workflows, together with
            operational tooling for dispute resolution, bulk QR generation and
            wallet control.`,
        },
        {
          heading: "Audit and compliance",
          body: `Contributed to passing the Bangladesh Bank audit for the MFS app,
            and closed VAPT findings for PCI-DSS: domain whitelisting, and
            blocking a man-in-the-middle path.`,
        },
        {
          heading: "Payment gateway",
          body: `Currently building a merchant-facing payment gateway on gRPC
            services with protobuf contracts for secure merchant payments.`,
        },
      ],
    },
  ],
};

export const featuredProjects: readonly WorkEntry[] = [
  {
    title: "GhuriAI",
    meta: "Personal project",
    period: "Since 2025",
    summary: `An AI travel planner that builds detailed day-by-day itineraries
      with real places, travel times and photos. The mobile client turns a trip
      brief into an itinerary backed by Google Maps data.`,
    stack: [
      "NestJS",
      "React Native",
      "Expo",
      "PostgreSQL",
      "Prisma",
      "Redis",
      "BullMQ",
      "Gemini",
      "OpenAI",
      "Google Maps APIs",
    ],
    points: [
      {
        heading: "Itineraries grounded in real places",
        body: `The planner combines Gemini or GPT-4o-mini with Google Places,
          Routes and Photos APIs to generate trips with real locations and travel
          times rather than generic recommendations.`,
      },
      {
        heading: "A complete product surface",
        body: `Built authentication with email/password, Google OAuth and Apple
          Sign-In, alongside trip generation, day and event regeneration, and
          subscription tiers with quota controls.`,
      },
      {
        heading: "Cost-aware AI integration",
        body: `The system supports provider fallback and place caching so repeated
          Google API requests are reduced while the generated itinerary stays
          useful and consistent.`,
      },
    ],
  },
  {
    title: "MediBuddy AI",
    meta: "Personal project",
    period: "Since 2026",
    summary: `A mobile health organizer for medical records, medication reminders
      and provider discovery. Prescription intelligence turns uploaded documents
      into editable drafts, and only what a user confirms becomes a reminder.`,
    stack: [
      "TypeScript",
      "NestJS",
      "React Native",
      "Expo",
      "PostgreSQL",
      "Prisma",
      "Azurite",
    ],
    points: [
      {
        heading: "Confirm before scheduling",
        body: `GPT-5.6 extracts medicines, dosage, duration and follow-up dates
          into an editable draft. Device notifications are registered only after
          the user confirms the extracted data.`,
      },
      {
        heading: "Private medical records",
        body: `Prescriptions and reports are stored in private per-user object
          storage, with identity derived from a verified Firebase token rather
          than request-body data.`,
      },
      {
        heading: "Care Finder that refuses to guess",
        body: `Provider discovery is grounded in Google Search, while symptom
          input is explicitly refused instead of being turned into medical advice.`,
      },
    ],
  },
];

export const catalogue = [
  {
    name: "Porua AI",
    blurb:
      "AI study tutor that answers from uploaded class notes and cites its sources",
    stack: "Python · FastAPI · SQLAlchemy · PostgreSQL · Gemini · Pytest · Docker",
    status: "Personal",
    href: null,
  },
  {
    name: "Shorojontro",
    blurb: "Real-time multiplayer card game with bots and in-game chat",
    stack: "React · Socket.IO · Express · Redis · TypeScript",
    status: "Live",
    href: "https://shorojontro.rifat.app/",
  },
  {
    name: "ManiTrack",
    blurb: "Android budget tracker with category budgets and a home-screen widget",
    stack: "Kotlin · Jetpack Compose · Material 3 · MVVM",
    status: "Source + Live",
    href: "https://github.com/rifatr/Budget",
  },
  {
    name: "RiShop",
    blurb: "Full-stack e-commerce with product management, cart, and a RESTful backend",
    stack: "Angular · ASP.NET Core · Entity Framework",
    status: "Source",
    href: "https://github.com/rifatr/RiShop",
  },
] as const;

export const composition = [
  { label: "Languages", items: "C# · F# · TypeScript · Python · C++" },
  { label: "Frameworks", items: "ASP.NET Core · NestJS · FastAPI · React Native" },
  {
    label: "Data & Infra",
    items: "PostgreSQL · MSSQL ·  Prisma · Redis · Docker · SQLAlchemy ·Azure · gRPC",
  },
  { label: "Tools", items: "Git · Claude Code · Gemini & OpenAI APIs" },
] as const;

// A deliberately short terminal view. Edit this list without changing the
// complete skills specimen above.
export const topSkills = [
  "Backend systems",
  "Payments",
  "C#",
  "F#",
  ".NET",
  "Python",
  "FastAPI",
  "gRPC",
] as const;

export const contests = {
  period: "2019 to present",
  role: "Contestant & Judge",
  standings: [
    {
      rank: "×2",
      event: "ICPC Asia West Continent Final",
      year: "2022, 2023",
      note: "Finalist",
      href: null,
    },
    {
      rank: "9th",
      event: "ICPC Dhaka Regional",
      year: "2023",
      note: "Team RRR, RUET",
      href: "https://bapsoj.org/contests/icpc-dhaka-regional-site-2023/standings",
    },
    {
      rank: "1661",
      event: "Codeforces max rating",
      year: "",
      note: "Expert · rifatrraazz",
      href: "https://codeforces.com/profile/rifatrraazz",
    },
  ],
  authored: [
    { name: "CodeChef", href: "https://www.codechef.com/users/rifatrraazz" },
    { name: "IUT IUPC 2024", href: "https://toph.co/c/iut-11th-national-ict-fest-2024" },
    { name: "IIUC IUPC 2023", href: "https://toph.co/c/15th-iiuc-inter-university-2023" },
    { name: "NGPC 2021", href: "https://toph.co/c/ngpc-2021" },
    { name: "ALNGPC 2021", href: "https://toph.co/c/ada-lovelace-national-girls-2021" },
    { name: "Tough Duo, April 2022", href: "https://toph.co/c/tough-duo-april-2022" },
    { name: "Criterion 2022, Round 17", href: "https://toph.co/c/criterion-2022-round-17" },
  ],
} as const;

export const education = {
  school: "Rajshahi University of Engineering & Technology",
  degree: "B.Sc. in Electrical and Computer Engineering",
  period: "Graduated December 2024",
  location: "Rajshahi, Bangladesh",
  roles: [
    "General Secretary, Astronomy and Science Society of RUET (2023 to 2024)",
    "Class Representative, ECE 18 Series (2019 to 2024)",
  ],
} as const;

export const nav = [
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
] as const;
