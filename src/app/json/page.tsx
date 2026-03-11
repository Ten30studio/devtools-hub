"use client";
import { useState } from "react";

export default function JsonPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function format() {
    try {
      setOutput(JSON.stringify(JSON.parse(input), null, 2));
      setError("");
    } catch (e) {
      setError((e as Error).message);
      setOutput("");
    }
  }

  function minify() {
    try {
      setOutput(JSON.stringify(JSON.parse(input)));
      setError("");
    } catch (e) {
      setError((e as Error).message);
      setOutput("");
    }
  }

  function validate() {
    try {
      JSON.parse(input);
      setError("");
      setOutput("Valid JSON");
    } catch (e) {
      setError((e as Error).message);
      setOutput("");
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">JSON Formatter & Validator</h1>
      <div className="flex gap-3 mb-4">
        <button onClick={format} className="px-4 py-2 bg-accent hover:bg-accent-hover text-white rounded-lg text-sm font-medium transition-colors">Format</button>
        <button onClick={minify} className="px-4 py-2 bg-surface hover:bg-surface-hover border border-border text-foreground rounded-lg text-sm font-medium transition-colors">Minify</button>
        <button onClick={validate} className="px-4 py-2 bg-surface hover:bg-surface-hover border border-border text-foreground rounded-lg text-sm font-medium transition-colors">Validate</button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-muted mb-2">Input</label>
          <textarea
            rows={20}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{"key": "value"}'
            spellCheck={false}
          />
        </div>
        <div>
          <label className="block text-sm text-muted mb-2">Output</label>
          <textarea rows={20} value={output} readOnly spellCheck={false} />
        </div>
      </div>
      {error && <p className="mt-3 text-red-400 text-sm font-mono">{error}</p>}
    </div>
  );
}
