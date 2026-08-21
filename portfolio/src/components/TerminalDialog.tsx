"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent, KeyboardEvent, MouseEvent } from "react";
import { runCommand } from "@/lib/terminal";
import type { TerminalLine } from "@/lib/terminal";
import { setEdition } from "@/lib/theme";

type TranscriptEntry = {
  id: number;
  command?: string;
  lines: TerminalLine[];
};

const welcome: TranscriptEntry = {
  id: 0,
  lines: [
    { text: "Last login: portfolio", tone: "muted" },
    { text: "Welcome to rifat.app", tone: "accent" },
    { text: "Type `help` to see available commands.", tone: "muted" },
  ],
};

export default function TerminalDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(1);
  const historyIndex = useRef(0);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([welcome]);

  useEffect(() => {
    const output = outputRef.current;
    if (output) output.scrollTop = output.scrollHeight;
  }, [transcript]);

  function openDialog() {
    dialogRef.current?.showModal();
    requestAnimationFrame(() => inputRef.current?.focus());
  }

  function closeDialog() {
    dialogRef.current?.close();
  }

  function execute(rawInput: string) {
    const command = rawInput.trim();
    if (!command) return;

    const result = runCommand(command);
    setInput("");
    setHistory((current) => {
      const next = [...current, command];
      historyIndex.current = next.length;
      return next;
    });

    if (result.action?.type === "clear") {
      setTranscript([]);
      return;
    }

    setTranscript((current) => [
      ...current,
      { id: nextId.current++, command, lines: result.lines ?? [] },
    ]);

    if (result.action?.type === "open") {
      window.open(result.action.href, "_blank", "noopener,noreferrer");
    } else if (result.action?.type === "navigate") {
      const target = result.action.target;
      closeDialog();
      requestAnimationFrame(() => {
        document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
      });
    } else if (result.action?.type === "theme") {
      setEdition(result.action.edition);
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    execute(input);
  }

  function navigateHistory(event: KeyboardEvent<HTMLInputElement>) {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "l") {
      event.preventDefault();
      setTranscript([]);
      return;
    }

    if (event.key !== "ArrowUp" && event.key !== "ArrowDown") return;
    event.preventDefault();

    const direction = event.key === "ArrowUp" ? -1 : 1;
    const next = Math.min(
      history.length,
      Math.max(0, historyIndex.current + direction),
    );
    historyIndex.current = next;
    setInput(next === history.length ? "" : history[next]);
  }

  function closeFromBackdrop(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) closeDialog();
  }

  return (
    <>
      <button
        type="button"
        onClick={openDialog}
        className="smallcaps text-[0.9rem] sm:text-[0.95rem] text-ink-faded hover:text-oxblood transition-colors min-h-[44px] cursor-pointer"
        aria-haspopup="dialog"
      >
        Terminal
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby="terminal-title"
        className="terminal-dialog m-auto h-[min(42rem,calc(100dvh-2rem))] w-[min(52rem,calc(100%-2rem))] p-0 shadow-2xl"
        onMouseDown={closeFromBackdrop}
      >
        <div className="flex h-full min-h-0 flex-col" onMouseDown={(event) => event.stopPropagation()}>
          <div className="terminal-titlebar flex items-center justify-between gap-4 px-4 sm:px-5 py-3">
            <div className="terminal-lights flex items-center gap-2" aria-hidden="true">
              <span className="terminal-light terminal-light--red" />
              <span className="terminal-light terminal-light--yellow" />
              <span className="terminal-light terminal-light--green" />
            </div>
            <h2 id="terminal-title" className="terminal-window-title font-mono text-[0.78rem]">
              rifat@app ~ zsh
            </h2>
            <button
              type="button"
              onClick={closeDialog}
              className="terminal-close font-mono text-[0.82rem] min-h-11 px-2 cursor-pointer"
              aria-label="Close terminal"
            >
              [esc]
            </button>
          </div>

          <div
            ref={outputRef}
            className="terminal-output min-h-0 flex-1 overflow-y-auto px-4 sm:px-6 py-5 font-mono text-[0.82rem] sm:text-[0.9rem] leading-relaxed"
            aria-live="polite"
            onClick={() => inputRef.current?.focus()}
          >
            {transcript.map((entry) => (
              <div key={entry.id} className="mb-3 last:mb-3">
                {entry.command ? (
                  <p className="break-words">
                    <><span className="terminal-prompt">rifat@portfolio</span> <span className="terminal-path">~</span> <span className="terminal-percent">%</span> {entry.command}</>
                  </p>
                ) : null}
                {entry.lines.map((line, index) => (
                  <p
                    key={`${entry.id}-${index}`}
                    className={`whitespace-pre-wrap break-words ${
                      line.tone === "accent"
                        ? "text-oxblood"
                        : line.tone === "muted"
                          ? "text-ink-faded"
                          : line.tone === "error"
                            ? "text-oxblood"
                            : "text-ink"
                    }`}
                  >
                    {line.text}
                  </p>
                ))}
              </div>
            ))}
            <form onSubmit={submit} className="terminal-command-line flex items-center gap-2 font-mono text-[0.82rem] sm:text-[0.9rem]">
              <label htmlFor="terminal-command" className="shrink-0" aria-label="Command">
                <span className="terminal-prompt">rifat@portfolio</span> <span className="terminal-path">~</span> <span className="terminal-percent">%</span>
              </label>
              <input
                ref={inputRef}
                id="terminal-command"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={navigateHistory}
                autoComplete="off"
                autoCapitalize="none"
                spellCheck={false}
                className="terminal-input min-w-0 flex-1 bg-transparent outline-none"
                aria-label="Terminal command"
              />
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
