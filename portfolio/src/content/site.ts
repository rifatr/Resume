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
  index: string;
  section: string;
  title: string;
  meta: string;
  period: string;
  summary: string;
  stack: readonly string[];
  points: readonly { heading: string; body: string }[];
};

export const experience: WorkEntry = {
  index: "01",
  section: "Experience",
  title: "ChaldalPay",
  meta: "Chaldal Engineering",
  period: "Since June 2024",
  summary: `A mobile financial service operating under Bangladesh Bank
    supervision. I work across its payment surface, from the wallet binding a
    customer touches to the gRPC contracts merchants integrate against.`,
  stack: [
    "C#",
    "F#",
    ".NET Core",
    "gRPC",
    "Protobuf",
    "React Native",
    "Azure DevOps",
  ],
  points: [
    {
      heading: "Multi-account wallet binding",
      body: `Built the secure bKash binding system that lets a customer attach
        several wallets to one account and pay with a single tap. It carries
        upwards of a thousand transactions a day.`,
    },
    {
      heading: "Identity, verified twice",
      body: `Integrated Amazon Rekognition and DeepFace for face verification,
        and the Election Commission API for national ID checks, so e-KYC clears
        against a government record rather than a photograph alone.`,
    },
    {
      heading: "Audit and compliance",
      body: `Contributed to passing the Bangladesh Bank audit for the MFS app,
        and closed VAPT findings for PCI-DSS: domain whitelisting, and blocking
        a man-in-the-middle path.`,
    },
    {
      heading: "Payment gateway",
      body: `Currently building a merchant-facing payment gateway under
        ChaldalPay on gRPC services with protobuf contracts. Alongside it: QR
        payments, dispute flows, and the admin tooling behind them, covering
        dispute resolution, bulk QR generation and wallet control.`,
    },
  ],
};

export const featuredProject: WorkEntry = {
  index: "02",
  section: "Projects",
  title: "Porua AI",
  meta: "Personal project",
  period: "Since 2026",
  summary: `The backend for an AI study tutor. A student opens a room per topic
    and uploads class notes as .pdf, .docx or .pptx; the tutor answers from them
    and cites what it used. The interesting part was not the model. It was
    refusing to trust it.`,
  stack: [
    "Python",
    "FastAPI",
    "SQLAlchemy 2 (async)",
    "Alembic",
    "PostgreSQL",
    "Gemini",
    "Pytest",
    "Docker",
  ],
  points: [
    {
      heading: "The model asks; it never acts",
      body: `Tool calls go through a fixed registry with Pydantic-validated
        arguments. No tool takes a student id, so there is no argument the model
        could produce that reaches another student's data.`,
    },
    {
      heading: "Nothing reaches the student unchecked",
      body: `Every answer is validated first, and a rejected one goes back to the
        model with the exact failure named. Attempts are stored as rows, failures
        included, so any answer traces back to the prompt version and the retries
        behind it.`,
    },
    {
      heading: "Maths without eval",
      body: `The maths tool walks each expression node by node against a
        syntax-tree allow-list rather than calling eval, which is escapable from
        something as small as an integer literal. SymPy then verifies worked
        solutions line by line.`,
    },
  ],
};

export const catalogue = [
  {
    name: "GhuriAI",
    blurb:
      "AI travel planner that builds day-by-day itineraries with real places and travel times",
    stack: "NestJS · Gemini · OpenAI · Google Places & Routes · Prisma",
    status: "Private",
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
  { label: "Languages", items: "Python · F# · C# · TypeScript · C++" },
  { label: "Frameworks", items: "FastAPI · ASP.NET Core · NestJS · React Native" },
  {
    label: "Data & Infra",
    items: "PostgreSQL · MSSQL · SQLAlchemy · Prisma · Redis · Docker · Azure · gRPC",
  },
  { label: "Tools", items: "Git · Claude Code · Gemini & GPT APIs" },
] as const;

// A deliberately short terminal view. Edit this list without changing the
// complete skills specimen above.
export const topSkills = [
  "Backend systems",
  "Payments",
  "Python",
  "C#",
  "F#",
  ".NET",
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
