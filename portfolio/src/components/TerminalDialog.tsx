"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent, KeyboardEvent } from "react";
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

  useEffect(() => {
    function closeOnEscape(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape" && dialogRef.current?.open) closeDialog();
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  function openDialog() {
    if (dialogRef.current?.open) {
      closeDialog();
      return;
    }

    dialogRef.current?.show();
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
        className="terminal-panel p-0"
      >
        <div className="terminal-panel-shell">
          <div className="terminal-panel-divider" aria-hidden="true" />
          <header className="terminal-panel-header">
            <div className="terminal-panel-tabs" role="tablist" aria-label="Panel">
              <button type="button" role="tab" aria-selected="false">PROBLEMS <small>0</small></button>
              <button type="button" role="tab" aria-selected="false">OUTPUT</button>
              <button type="button" role="tab" aria-selected="false">DEBUG CONSOLE</button>
              <button id="terminal-title" type="button" role="tab" aria-selected="true" className="is-active">TERMINAL</button>
              <button type="button" role="tab" aria-selected="false">PORTS</button>
            </div>
            <div className="terminal-panel-actions">
              <span className="terminal-session"><span className="terminal-session-icon" aria-hidden="true">›_</span> zsh</span>
              <button type="button" onClick={() => inputRef.current?.focus()} title="New Terminal" aria-label="New terminal">＋</button>
              <button type="button" onClick={() => setTranscript([])} title="Clear Terminal" aria-label="Clear terminal">⌫</button>
              <button type="button" onClick={closeDialog} title="Close Panel" aria-label="Close terminal panel">×</button>
            </div>
          </header>

          <div
            ref={outputRef}
            className="terminal-output"
            aria-live="polite"
            onClick={() => inputRef.current?.focus()}
          >
            {transcript.map((entry) => (
              <div key={entry.id} className="terminal-entry">
                {entry.command ? (
                  <p><span className="terminal-prompt">rifat@portfolio</span> <span className="terminal-path">~</span> <span className="terminal-percent">%</span> {entry.command}</p>
                ) : null}
                {entry.lines.map((line, index) => (
                  <p key={`${entry.id}-${index}`} className={`terminal-line terminal-line--${line.tone ?? "normal"}`}>{line.text}</p>
                ))}
              </div>
            ))}
            <form onSubmit={submit} className="terminal-command-line">
              <label htmlFor="terminal-command"><span className="terminal-prompt">rifat@portfolio</span> <span className="terminal-path">~</span> <span className="terminal-percent">%</span></label>
              <input ref={inputRef} id="terminal-command" value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={navigateHistory} autoComplete="off" autoCapitalize="none" spellCheck={false} className="terminal-input" aria-label="Terminal command" />
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
