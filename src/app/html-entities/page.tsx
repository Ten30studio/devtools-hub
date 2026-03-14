"use client";

import { useState } from "react";

const commonEntities = [
  { char: "&", entity: "&amp;", name: "Ampersand" },
  { char: "<", entity: "&lt;", name: "Less than" },
  { char: ">", entity: "&gt;", name: "Greater than" },
  { char: '"', entity: "&quot;", name: "Double quote" },
  { char: "'", entity: "&#39;", name: "Single quote" },
  { char: "\u00a9", entity: "&copy;", name: "Copyright" },
  { char: "\u00ae", entity: "&reg;", name: "Registered" },
  { char: "\u2122", entity: "&trade;", name: "Trademark" },
  { char: "\u00a0", entity: "&nbsp;", name: "Non-breaking space" },
  { char: "\u2014", entity: "&mdash;", name: "Em dash" },
  { char: "\u2013", entity: "&ndash;", name: "En dash" },
  { char: "\u2026", entity: "&hellip;", name: "Ellipsis" },
];

function encodeEntities(str: string): string {
  return str.replace(/[\u00A0-\u9999<>&'"]/g, (c) => `&#${c.charCodeAt(0)};`);
}

function decodeEntities(str: string): string {
  const textarea = typeof document !== "undefined" ? document.createElement("textarea") : null;
  if (!textarea) return str;
  textarea.innerHTML = str;
  return textarea.value;
}

export default function HtmlEntitiesPage() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [copied, setCopied] = useState(false);

  const output = mode === "encode" ? encodeEntities(input) : decodeEntities(input);

  const copy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="py-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">HTML Entity Encoder / Decoder</h1>
      <p className="text-muted text-sm mb-8">
        Encode special characters to HTML entities or decode entities back to characters.
      </p>

      <div className="flex gap-2 mb-6">
        {(["encode", "decode"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              mode === m
                ? "bg-accent text-white"
                : "bg-surface-hover text-muted hover:text-foreground"
            }`}
          >
            {m === "encode" ? "Encode" : "Decode"}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div>
          <label className="block text-sm font-medium mb-2">Input</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              mode === "encode"
                ? 'Enter text with special characters, e.g. <div class="test">'
                : "Enter HTML entities, e.g. &lt;div&gt;"
            }
            className="w-full h-48 p-4 bg-surface border border-border rounded-xl font-mono text-sm resize-none focus:outline-none focus:border-accent"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">Output</label>
            <button
              onClick={copy}
              className="text-xs text-accent hover:underline"
            >
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <textarea
            readOnly
            value={output}
            className="w-full h-48 p-4 bg-surface border border-border rounded-xl font-mono text-sm resize-none text-muted"
          />
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-3">Common HTML Entities</h2>
        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface-hover">
                <th className="px-4 py-2 text-left font-medium">Character</th>
                <th className="px-4 py-2 text-left font-medium">Entity</th>
                <th className="px-4 py-2 text-left font-medium">Name</th>
              </tr>
            </thead>
            <tbody>
              {commonEntities.map((e) => (
                <tr key={e.entity} className="border-t border-border">
                  <td className="px-4 py-2 font-mono">{e.char}</td>
                  <td className="px-4 py-2 font-mono text-accent">{e.entity}</td>
                  <td className="px-4 py-2 text-muted">{e.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
