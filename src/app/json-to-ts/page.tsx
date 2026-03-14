"use client";

import { useState } from "react";

function inferType(value: unknown): string {
  if (value === null) return "null";
  if (Array.isArray(value)) {
    if (value.length === 0) return "unknown[]";
    const types = [...new Set(value.map(inferType))];
    if (types.length === 1) return `${types[0]}[]`;
    return `(${types.join(" | ")})[]`;
  }
  if (typeof value === "object") return "object";
  return typeof value;
}

function jsonToInterface(
  obj: Record<string, unknown>,
  name: string,
  interfaces: string[]
): string {
  const lines: string[] = [];
  lines.push(`interface ${name} {`);

  for (const [key, value] of Object.entries(obj)) {
    const safeKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key)
      ? key
      : `"${key}"`;

    if (value === null) {
      lines.push(`  ${safeKey}: null;`);
    } else if (Array.isArray(value)) {
      if (value.length > 0 && typeof value[0] === "object" && value[0] !== null) {
        const childName = capitalize(key) + "Item";
        jsonToInterface(value[0] as Record<string, unknown>, childName, interfaces);
        lines.push(`  ${safeKey}: ${childName}[];`);
      } else {
        lines.push(`  ${safeKey}: ${inferType(value)};`);
      }
    } else if (typeof value === "object") {
      const childName = capitalize(key);
      jsonToInterface(value as Record<string, unknown>, childName, interfaces);
      lines.push(`  ${safeKey}: ${childName};`);
    } else {
      lines.push(`  ${safeKey}: ${typeof value};`);
    }
  }

  lines.push("}");
  interfaces.push(lines.join("\n"));
  return lines.join("\n");
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function convert(json: string, rootName: string): string {
  const parsed = JSON.parse(json);
  const interfaces: string[] = [];

  if (Array.isArray(parsed)) {
    if (parsed.length > 0 && typeof parsed[0] === "object" && parsed[0] !== null) {
      jsonToInterface(parsed[0] as Record<string, unknown>, rootName, interfaces);
      return interfaces.reverse().join("\n\n") + `\n\ntype ${rootName}List = ${rootName}[];`;
    }
    return `type ${rootName} = ${inferType(parsed)};`;
  }

  if (typeof parsed === "object" && parsed !== null) {
    jsonToInterface(parsed as Record<string, unknown>, rootName, interfaces);
    return interfaces.reverse().join("\n\n");
  }

  return `type ${rootName} = ${typeof parsed};`;
}

export default function JsonToTsPage() {
  const [input, setInput] = useState(`{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "address": {
    "street": "123 Main St",
    "city": "Springfield",
    "zip": "62704"
  },
  "tags": ["developer", "designer"],
  "projects": [
    {
      "name": "Website",
      "status": "active",
      "stars": 42
    }
  ]
}`);
  const [rootName, setRootName] = useState("Root");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  let output = "";
  try {
    output = convert(input, rootName);
    if (error) setError("");
  } catch (e) {
    if (!error) setError((e as Error).message);
  }

  const copy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="py-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">JSON to TypeScript</h1>
      <p className="text-muted text-sm mb-8">
        Convert JSON objects to TypeScript interfaces instantly. Handles nested objects and arrays.
      </p>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Root Interface Name</label>
        <input
          type="text"
          value={rootName}
          onChange={(e) => setRootName(e.target.value || "Root")}
          className="w-48 px-3 py-2 bg-surface border border-border rounded-lg text-sm font-mono focus:outline-none focus:border-accent"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">JSON Input</label>
          <textarea
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setError("");
            }}
            className="w-full h-96 p-4 bg-surface border border-border rounded-xl font-mono text-sm resize-none focus:outline-none focus:border-accent"
            spellCheck={false}
          />
          {error && (
            <p className="mt-2 text-sm text-red-400">
              Invalid JSON: {error}
            </p>
          )}
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">TypeScript Output</label>
            <button
              onClick={copy}
              className="text-xs text-accent hover:underline"
            >
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <pre className="w-full h-96 p-4 bg-surface border border-border rounded-xl font-mono text-sm overflow-auto text-accent">
            {output}
          </pre>
        </div>
      </div>
    </div>
  );
}
