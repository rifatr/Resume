import {
  catalogue,
  composition,
  experience,
  featuredProjects,
  links,
  person,
  topSkills,
} from "@/content/site";
import type { Edition } from "./theme";

export type TerminalLine = {
  text: string;
  tone?: "accent" | "muted" | "error";
};

export type TerminalAction =
  | { type: "clear" }
  | { type: "navigate"; target: string }
  | { type: "open"; href: string }
  | { type: "theme"; edition: Edition };

export type TerminalResult = {
  lines?: TerminalLine[];
  action?: TerminalAction;
};

type Command = {
  usage: string;
  description: string;
  run: (args: string[]) => TerminalResult;
};

const projects = [
  ...featuredProjects.map((project) => ({
    name: project.title,
    description: project.summary.replace(/\s+/g, " ").trim(),
    stack: project.stack.join(" · "),
    href: null,
    status: "Featured",
  })),
  ...catalogue.map((project) => ({
    name: project.name,
    description: project.blurb,
    stack: project.stack,
    href: project.href,
    status: project.status,
  })),
];

const sectionTargets: Record<string, string> = {
  experience: "experience",
  projects: "projects",
  skills: "skills",
  achievements: "achievements",
  education: "education",
  contact: "contact",
  top: "top",
};

const shellDirectories = ["about", "experience", "projects", "skills", "achievements", "education", "contact"];

function lines(texts: string[], tone?: TerminalLine["tone"]): TerminalLine[] {
  return texts.map((text) => ({ text, tone }));
}

function projectList(): TerminalLine[] {
  return [
    { text: "Projects", tone: "accent" },
    ...projects.map((project, index) => ({
      text: `${index + 1}. ${project.name}  [${project.status}]`,
    })),
    { text: "Use `open <number>` for details or a public link.", tone: "muted" },
  ];
}

function openProject(args: string[]): TerminalResult {
  const number = Number(args[0]);
  if (!Number.isInteger(number) || number < 1 || number > projects.length) {
    return {
      lines: lines([`Choose a project from 1 to ${projects.length}. Try \`projects\`.`], "error"),
    };
  }

  const project = projects[number - 1];
  const detail = [
    { text: `${number}. ${project.name}`, tone: "accent" as const },
    { text: project.description },
    { text: project.stack, tone: "muted" as const },
  ];

  if (!project.href) {
    return {
      lines: [
        ...detail,
        {
          text:
            number === 1
              ? "No public link. Use `goto projects` to read the featured case study."
              : "This project does not currently have a public link.",
          tone: "muted",
        },
      ],
    };
  }

  return {
    lines: [...detail, { text: `Opening ${project.name}...`, tone: "muted" }],
    action: { type: "open", href: project.href },
  };
}

const commands: Record<string, Command> = {
  help: {
    usage: "help",
    description: "List available commands",
    run: () => ({
      lines: [
        { text: "Available commands", tone: "accent" },
        ...Object.values(commands).map(({ usage, description }) => ({
          text: `${usage.padEnd(22)} ${description}`,
        })),
      ],
    }),
  },
  about: {
    usage: "about",
    description: "A short introduction",
    run: () => ({
      lines: [
        { text: `${person.name} · ${person.role}`, tone: "accent" },
        { text: person.lede },
        { text: person.location, tone: "muted" },
      ],
    }),
  },
  whoami: {
    usage: "whoami",
    description: "Print the person behind this site",
    run: () => ({
      lines: [
        { text: person.name, tone: "accent" },
        { text: `${person.role} · ${person.location}` },
      ],
    }),
  },
  whoiam: {
    usage: "whoiam",
    description: "Alias for whoami",
    run: () => commands.whoami.run([]),
  },
  pwd: {
    usage: "pwd",
    description: "Print the current directory",
    run: () => ({ lines: [{ text: `/home/rifat/${person.domain}`, tone: "muted" }] }),
  },
  ls: {
    usage: "ls [section]",
    description: "List portfolio sections",
    run: (args) => {
      if (args[0] && !shellDirectories.includes(args[0].toLowerCase())) {
        return { lines: lines([`ls: cannot access '${args[0]}': No such section`], "error") };
      }
      return {
        lines: [
          { text: "about/  experience/  projects/  skills/", tone: "accent" },
          { text: "achievements/  education/  contact/  resume.pdf", tone: "accent" },
        ],
      };
    },
  },
  cd: {
    usage: "cd <section>",
    description: "Navigate to a portfolio section",
    run: (args) => {
      const name = args[0]?.replace(/^#/, "").toLowerCase();
      const target = sectionTargets[name];
      if (!target) {
        return {
          lines: lines(
            [`cd: no such section: ${args[0] ?? ""}`, `Try: ${shellDirectories.join(", ")}`],
            "error",
          ),
        };
      }
      return {
        lines: [{ text: `Opening /${name}...`, tone: "muted" }],
        action: { type: "navigate", target },
      };
    },
  },
  echo: {
    usage: "echo <text>",
    description: "Print text to the terminal",
    run: (args) => ({ lines: [{ text: args.join(" ") }] }),
  },
  cat: {
    usage: "cat <file>",
    description: "Read a portfolio file",
    run: (args) => {
      const file = args[0]?.toLowerCase();
      if (file === "about" || file === "about.txt") {
        return commands.about.run([]);
      }
      if (file === "readme" || file === "readme.md") {
        return {
          lines: [
            { text: `${person.domain} · personal portfolio`, tone: "accent" },
            { text: "A software engineer building payment systems and backend software." },
            { text: "Try: projects, skills --top, experience, contact", tone: "muted" },
          ],
        };
      }
      return { lines: lines([`cat: ${args[0] ?? ""}: No such file`], "error") };
    },
  },
  date: {
    usage: "date",
    description: "Print today’s date",
    run: () => ({
      lines: [{ text: new Intl.DateTimeFormat("en", { dateStyle: "full" }).format(new Date()), tone: "muted" }],
    }),
  },
  uname: {
    usage: "uname [-a]",
    description: "Print system information",
    run: (args) => ({
      lines: [
        {
          text:
            args.includes("-a")
              ? "PortfolioOS rifat.app web 2026 Next.js arm64"
              : "PortfolioOS",
          tone: "muted",
        },
      ],
    }),
  },
  neofetch: {
    usage: "neofetch",
    description: "Show a portfolio system summary",
    run: () => ({
      lines: [
        { text: "        ___         rifat@app", tone: "accent" },
        { text: "       / _ \\        ----------------", tone: "accent" },
        { text: "      | (_) |       OS: PortfolioOS", tone: "accent" },
        { text: "       \\___/", tone: "accent" },
        { text: `                     Host: ${person.domain}` },
        { text: `                     Role: ${person.role}` },
        { text: `                     Projects: ${projects.length}` },
        { text: "                     Stack: TypeScript · React · Next.js", tone: "muted" },
      ],
    }),
  },
  projects: {
    usage: "projects",
    description: "List projects by number",
    run: () => ({ lines: projectList() }),
  },
  open: {
    usage: "open <number>",
    description: "Open or inspect a project",
    run: openProject,
  },
  skills: {
    usage: "skills [--top|--all]",
    description: "Show technical skills",
    run: (args) => {
      const flag = args[0] ?? "--all";
      if (flag === "--top") {
        return {
          lines: [
            { text: "Top skills", tone: "accent" },
            { text: topSkills.join(" · ") },
          ],
        };
      }
      if (flag !== "--all") {
        return { lines: lines(["Usage: skills [--top|--all]"], "error") };
      }
      return {
        lines: [
          { text: "Technical skills", tone: "accent" },
          ...composition.map((row) => ({ text: `${row.label}: ${row.items}` })),
        ],
      };
    },
  },
  experience: {
    usage: "experience",
    description: "Show current experience",
    run: () => ({
      lines: [
        { text: `${experience.title} · ${experience.meta}`, tone: "accent" },
        { text: experience.summary.replace(/\s+/g, " ").trim() },
        ...(experience.groups ?? []).flatMap((group) => [
          { text: group.title, tone: "accent" as const },
          ...group.points.map((point) => ({ text: `  ${point.heading}: ${point.body.replace(/\s+/g, " ").trim()}` })),
        ]),
        { text: experience.stack.join(" · "), tone: "muted" },
      ],
    }),
  },
  goto: {
    usage: "goto <section>",
    description: "Jump to a portfolio section",
    run: (args) => {
      const name = args[0]?.toLowerCase();
      const target = sectionTargets[name];
      if (!target) {
        return {
          lines: lines(
            [`Sections: ${Object.keys(sectionTargets).join(", ")}`],
            "error",
          ),
        };
      }
      return {
        lines: [{ text: `Going to ${name}...`, tone: "muted" }],
        action: { type: "navigate", target },
      };
    },
  },
  contact: {
    usage: "contact",
    description: "Show contact links",
    run: () => ({
      lines: [
        { text: person.email, tone: "accent" },
        { text: links.github },
        { text: links.linkedin },
      ],
    }),
  },
  resume: {
    usage: "resume",
    description: "Open the résumé PDF",
    run: () => ({
      lines: [{ text: "Opening résumé...", tone: "muted" }],
      action: { type: "open", href: links.resume },
    }),
  },
  theme: {
    usage: "theme <light|dark>",
    description: "Change the site edition",
    run: (args) => {
      const edition = args[0]?.toLowerCase();
      if (edition !== "light" && edition !== "dark") {
        return { lines: lines(["Usage: theme <light|dark>"], "error") };
      }
      return {
        lines: [{ text: `Switched to ${edition} edition.`, tone: "muted" }],
        action: { type: "theme", edition },
      };
    },
  },
  clear: {
    usage: "clear",
    description: "Clear terminal output",
    run: () => ({ action: { type: "clear" } }),
  },
};

export const suggestedCommands = ["help", "projects", "skills --top"] as const;

export function runCommand(input: string): TerminalResult {
  const tokens = input.trim().split(/\s+/).filter(Boolean);
  const name = tokens.shift()?.toLowerCase();
  if (!name) return {};

  const command = commands[name];
  if (!command) {
    return {
      lines: lines([`Command not found: ${name}. Type \`help\`.`], "error"),
    };
  }

  return command.run(tokens);
}
