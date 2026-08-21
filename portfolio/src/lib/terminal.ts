import {
  catalogue,
  composition,
  experience,
  featuredProject,
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
  {
    name: featuredProject.title,
    description: featuredProject.summary.replace(/\s+/g, " ").trim(),
    stack: featuredProject.stack.join(" · "),
    href: null,
    status: "Featured",
  },
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
