"use client";
import { useState } from "react";

const algorithms = ["SHA-1", "SHA-256", "SHA-384", "SHA-512"] as const;

export default function HashPage() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<Record<string, string>>({});

  async function generate() {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashes: Record<string, string> = {};

    for (const algo of algorithms) {
      const hashBuffer = await crypto.subtle.digest(algo, data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      hashes[algo] = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    }
    setResults(hashes);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Hash Generator</h1>
      <div className="mb-4">
        <label className="block text-sm text-muted mb-2">Input</label>
        <textarea
          rows={6}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to hash"
          spellCheck={false}
        />
      </div>
      <button onClick={generate} className="px-4 py-2 bg-accent hover:bg-accent-hover text-white rounded-lg text-sm font-medium transition-colors mb-6">Generate Hashes</button>
      {Object.keys(results).length > 0 && (
        <div className="space-y-3 mt-4">
          {algorithms.map((algo) => (
            <div key={algo}>
              <label className="block text-xs font-semibold text-muted mb-1">{algo}</label>
              <input type="text" value={results[algo] || ""} readOnly className="text-xs" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
