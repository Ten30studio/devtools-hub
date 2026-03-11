"use client";
import { useState } from "react";

export default function Base64Page() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function encode() {
    try {
      setOutput(btoa(unescape(encodeURIComponent(input))));
      setError("");
    } catch (e) {
      setError((e as Error).message);
    }
  }

  function decode() {
    try {
      setOutput(decodeURIComponent(escape(atob(input))));
      setError("");
    } catch (e) {
      setError((e as Error).message);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Base64 Encode / Decode</h1>
      <div className="flex gap-3 mb-4">
        <button onClick={encode} className="px-4 py-2 bg-accent hover:bg-accent-hover text-white rounded-lg text-sm font-medium transition-colors">Encode</button>
        <button onClick={decode} className="px-4 py-2 bg-surface hover:bg-surface-hover border border-border text-foreground rounded-lg text-sm font-medium transition-colors">Decode</button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-muted mb-2">Input</label>
          <textarea rows={14} value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter text or Base64 string" spellCheck={false} />
        </div>
        <div>
          <label className="block text-sm text-muted mb-2">Output</label>
          <textarea rows={14} value={output} readOnly spellCheck={false} />
        </div>
      </div>
      {error && <p className="mt-3 text-red-400 text-sm font-mono">{error}</p>}
    </div>
  );
}
