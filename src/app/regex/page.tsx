"use client";
import { useState, useMemo } from "react";

export default function RegexPage() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [testString, setTestString] = useState("");

  const matches = useMemo(() => {
    if (!pattern) return [];
    try {
      const re = new RegExp(pattern, flags);
      const results: { match: string; index: number; groups: string[] }[] = [];
      let m;
      if (flags.includes("g")) {
        while ((m = re.exec(testString)) !== null) {
          results.push({
            match: m[0],
            index: m.index,
            groups: m.slice(1),
          });
          if (!m[0]) re.lastIndex++;
        }
      } else {
        m = re.exec(testString);
        if (m) {
          results.push({
            match: m[0],
            index: m.index,
            groups: m.slice(1),
          });
        }
      }
      return results;
    } catch {
      return [];
    }
  }, [pattern, flags, testString]);

  const regexError = useMemo(() => {
    if (!pattern) return "";
    try {
      new RegExp(pattern, flags);
      return "";
    } catch (e) {
      return (e as Error).message;
    }
  }, [pattern, flags]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Regex Tester</h1>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-3 mb-4">
        <div>
          <label className="block text-sm text-muted mb-2">Pattern</label>
          <input
            type="text"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            placeholder="[a-z]+"
            spellCheck={false}
          />
        </div>
        <div>
          <label className="block text-sm text-muted mb-2">Flags</label>
          <input
            type="text"
            value={flags}
            onChange={(e) => setFlags(e.target.value)}
            placeholder="g"
            className="w-20"
            spellCheck={false}
          />
        </div>
      </div>
      {regexError && <p className="text-red-400 text-sm font-mono mb-3">{regexError}</p>}
      <div className="mb-4">
        <label className="block text-sm text-muted mb-2">Test String</label>
        <textarea
          rows={8}
          value={testString}
          onChange={(e) => setTestString(e.target.value)}
          placeholder="Enter text to test against"
          spellCheck={false}
        />
      </div>
      <div>
        <h2 className="text-sm font-semibold text-muted mb-3">
          Matches ({matches.length})
        </h2>
        {matches.length === 0 && pattern && !regexError && (
          <p className="text-muted text-sm">No matches found.</p>
        )}
        {matches.length > 0 && (
          <div className="space-y-2">
            {matches.map((m, i) => (
              <div
                key={i}
                className="p-3 rounded-lg bg-surface border border-border text-sm font-mono"
              >
                <span className="text-accent">&quot;{m.match}&quot;</span>
                <span className="text-muted ml-2">at index {m.index}</span>
                {m.groups.length > 0 && (
                  <span className="text-muted ml-2">
                    groups: [{m.groups.map((g) => `"${g}"`).join(", ")}]
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
