"use client";
import { useState } from "react";

// Minimal YAML parser for common cases (objects, arrays, strings, numbers, booleans)
function parseYaml(yaml: string): unknown {
  const lines = yaml.split("\n");
  return parseLines(lines, 0, 0).value;
}

function getIndent(line: string): number {
  const match = line.match(/^(\s*)/);
  return match ? match[1].length : 0;
}

function parseLines(
  lines: string[],
  start: number,
  baseIndent: number
): { value: unknown; nextLine: number } {
  const result: Record<string, unknown> = {};
  let i = start;
  let isArray = false;
  const arr: unknown[] = [];

  while (i < lines.length) {
    const line = lines[i];
    if (line.trim() === "" || line.trim().startsWith("#")) {
      i++;
      continue;
    }

    const indent = getIndent(line);
    if (indent < baseIndent) break;
    if (indent > baseIndent && i > start) break;

    const trimmed = line.trim();

    // Array item
    if (trimmed.startsWith("- ")) {
      isArray = true;
      const val = trimmed.slice(2).trim();
      if (val.includes(": ")) {
        // Inline object in array
        const obj: Record<string, unknown> = {};
        const parts = val.split(": ");
        obj[parts[0].trim()] = parseValue(parts.slice(1).join(": ").trim());
        // Check for continuation lines
        let j = i + 1;
        while (j < lines.length) {
          const nextLine = lines[j];
          if (nextLine.trim() === "" || nextLine.trim().startsWith("#")) { j++; continue; }
          const nextIndent = getIndent(nextLine);
          if (nextIndent <= indent) break;
          const nextTrimmed = nextLine.trim();
          if (nextTrimmed.includes(": ")) {
            const np = nextTrimmed.split(": ");
            obj[np[0].trim()] = parseValue(np.slice(1).join(": ").trim());
          }
          j++;
        }
        arr.push(obj);
        i = j;
      } else {
        arr.push(parseValue(val));
        i++;
      }
      continue;
    }

    // Key-value
    const colonIdx = trimmed.indexOf(": ");
    if (colonIdx > 0) {
      const key = trimmed.slice(0, colonIdx).trim();
      const val = trimmed.slice(colonIdx + 2).trim();
      if (val === "" || val === "|" || val === ">") {
        // Nested object or multiline string
        const nextNonEmpty = findNextNonEmpty(lines, i + 1);
        if (nextNonEmpty < lines.length && getIndent(lines[nextNonEmpty]) > indent) {
          const nested = parseLines(lines, nextNonEmpty, getIndent(lines[nextNonEmpty]));
          result[key] = nested.value;
          i = nested.nextLine;
        } else {
          result[key] = "";
          i++;
        }
      } else {
        result[key] = parseValue(val);
        i++;
      }
      continue;
    }

    i++;
  }

  return { value: isArray ? arr : result, nextLine: i };
}

function findNextNonEmpty(lines: string[], start: number): number {
  for (let i = start; i < lines.length; i++) {
    if (lines[i].trim() !== "" && !lines[i].trim().startsWith("#")) return i;
  }
  return lines.length;
}

function parseValue(val: string): unknown {
  if (val === "true" || val === "True" || val === "TRUE") return true;
  if (val === "false" || val === "False" || val === "FALSE") return false;
  if (val === "null" || val === "Null" || val === "NULL" || val === "~") return null;
  if (/^-?\d+$/.test(val)) return parseInt(val, 10);
  if (/^-?\d+\.\d+$/.test(val)) return parseFloat(val);
  // Strip quotes
  if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'")))
    return val.slice(1, -1);
  // Inline array [a, b, c]
  if (val.startsWith("[") && val.endsWith("]")) {
    return val
      .slice(1, -1)
      .split(",")
      .map((s) => parseValue(s.trim()));
  }
  return val;
}

// JSON to YAML converter
function jsonToYaml(obj: unknown, indent: number = 0): string {
  const pad = "  ".repeat(indent);
  if (obj === null) return "null";
  if (typeof obj === "boolean") return obj ? "true" : "false";
  if (typeof obj === "number") return String(obj);
  if (typeof obj === "string") {
    if (obj.includes("\n") || obj.includes(": ") || obj.includes("#") || obj === "")
      return `"${obj.replace(/"/g, '\\"')}"`;
    return obj;
  }
  if (Array.isArray(obj)) {
    if (obj.length === 0) return "[]";
    return obj
      .map((item) => {
        const val = jsonToYaml(item, indent + 1);
        if (typeof item === "object" && item !== null) {
          return `${pad}- ${val.trim().split("\n").join("\n" + pad + "  ")}`;
        }
        return `${pad}- ${val}`;
      })
      .join("\n");
  }
  if (typeof obj === "object") {
    const entries = Object.entries(obj as Record<string, unknown>);
    if (entries.length === 0) return "{}";
    return entries
      .map(([key, val]) => {
        if (typeof val === "object" && val !== null && !Array.isArray(val)) {
          return `${pad}${key}:\n${jsonToYaml(val, indent + 1)}`;
        }
        if (Array.isArray(val)) {
          return `${pad}${key}:\n${jsonToYaml(val, indent + 1)}`;
        }
        return `${pad}${key}: ${jsonToYaml(val, indent)}`;
      })
      .join("\n");
  }
  return String(obj);
}

export default function YamlPage() {
  const [left, setLeft] = useState(
    `name: DevTools Hub\nversion: 1.0.0\nfeatures:\n  - json formatter\n  - base64 encoder\n  - yaml converter\nconfig:\n  theme: dark\n  port: 3000\n  debug: false`
  );
  const [right, setRight] = useState("");
  const [mode, setMode] = useState<"yaml-to-json" | "json-to-yaml">("yaml-to-json");
  const [error, setError] = useState("");

  function convert() {
    setError("");
    try {
      if (mode === "yaml-to-json") {
        const parsed = parseYaml(left);
        setRight(JSON.stringify(parsed, null, 2));
      } else {
        const parsed = JSON.parse(left);
        setRight(jsonToYaml(parsed));
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Conversion failed");
    }
  }

  function swap() {
    setLeft(right);
    setRight("");
    setMode(mode === "yaml-to-json" ? "json-to-yaml" : "yaml-to-json");
    setError("");
  }

  function copyOutput() {
    navigator.clipboard.writeText(right);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">YAML ↔ JSON Converter</h1>
      <div className="flex gap-3 mb-4 items-center">
        <select
          value={mode}
          onChange={(e) => {
            setMode(e.target.value as "yaml-to-json" | "json-to-yaml");
            setRight("");
            setError("");
          }}
          className="px-3 py-2 bg-surface border border-border rounded-lg text-sm"
        >
          <option value="yaml-to-json">YAML → JSON</option>
          <option value="json-to-yaml">JSON → YAML</option>
        </select>
        <button
          onClick={convert}
          className="px-4 py-2 bg-accent hover:bg-accent-hover text-white rounded-lg text-sm font-medium transition-colors"
        >
          Convert
        </button>
        <button
          onClick={swap}
          disabled={!right}
          className="px-4 py-2 bg-surface hover:bg-surface-hover border border-border text-foreground rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
        >
          Swap
        </button>
        {right && (
          <button
            onClick={copyOutput}
            className="px-4 py-2 bg-surface hover:bg-surface-hover border border-border text-foreground rounded-lg text-sm font-medium transition-colors"
          >
            Copy Output
          </button>
        )}
      </div>
      {error && (
        <div className="mb-4 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-muted mb-2">
            {mode === "yaml-to-json" ? "YAML Input" : "JSON Input"}
          </label>
          <textarea
            value={left}
            onChange={(e) => setLeft(e.target.value)}
            placeholder={mode === "yaml-to-json" ? "Paste YAML here..." : "Paste JSON here..."}
            className="w-full h-96 px-4 py-3 bg-surface border border-border rounded-xl font-mono text-sm resize-none focus:border-accent focus:outline-none"
            spellCheck={false}
          />
        </div>
        <div>
          <label className="block text-sm text-muted mb-2">
            {mode === "yaml-to-json" ? "JSON Output" : "YAML Output"}
          </label>
          <textarea
            value={right}
            readOnly
            placeholder="Output will appear here..."
            className="w-full h-96 px-4 py-3 bg-surface border border-border rounded-xl font-mono text-sm resize-none"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}
