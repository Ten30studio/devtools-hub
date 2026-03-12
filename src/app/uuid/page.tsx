"use client";
import { useState } from "react";

export default function UuidPage() {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(1);
  const [copied, setCopied] = useState(false);

  function generate() {
    const results: string[] = [];
    for (let i = 0; i < count; i++) {
      results.push(crypto.randomUUID());
    }
    setUuids(results);
    setCopied(false);
  }

  function copyAll() {
    navigator.clipboard.writeText(uuids.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">UUID Generator</h1>
      <div className="flex gap-3 mb-4 items-center">
        <label className="text-sm text-muted">Count:</label>
        <input
          type="number"
          min={1}
          max={100}
          value={count}
          onChange={(e) => setCount(Math.min(100, Math.max(1, Number(e.target.value))))}
          className="w-20 px-3 py-2 bg-surface border border-border rounded-lg text-sm"
        />
        <button
          onClick={generate}
          className="px-4 py-2 bg-accent hover:bg-accent-hover text-white rounded-lg text-sm font-medium transition-colors"
        >
          Generate
        </button>
        {uuids.length > 0 && (
          <button
            onClick={copyAll}
            className="px-4 py-2 bg-surface hover:bg-surface-hover border border-border text-foreground rounded-lg text-sm font-medium transition-colors"
          >
            {copied ? "Copied!" : "Copy All"}
          </button>
        )}
      </div>
      {uuids.length > 0 && (
        <div className="bg-surface border border-border rounded-xl p-4">
          {uuids.map((uuid, i) => (
            <div key={i} className="font-mono text-sm py-1 select-all">
              {uuid}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
