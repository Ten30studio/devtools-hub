"use client";
import { useState } from "react";

const WORDS = [
  "lorem","ipsum","dolor","sit","amet","consectetur","adipiscing","elit",
  "sed","do","eiusmod","tempor","incididunt","ut","labore","et","dolore",
  "magna","aliqua","enim","ad","minim","veniam","quis","nostrud",
  "exercitation","ullamco","laboris","nisi","aliquip","ex","ea","commodo",
  "consequat","duis","aute","irure","in","reprehenderit","voluptate",
  "velit","esse","cillum","fugiat","nulla","pariatur","excepteur","sint",
  "occaecat","cupidatat","non","proident","sunt","culpa","qui","officia",
  "deserunt","mollit","anim","id","est","laborum",
];

function sentence(minWords = 5, maxWords = 15): string {
  const len = minWords + Math.floor(Math.random() * (maxWords - minWords + 1));
  const words = Array.from({ length: len }, () => WORDS[Math.floor(Math.random() * WORDS.length)]);
  words[0] = words[0][0].toUpperCase() + words[0].slice(1);
  return words.join(" ") + ".";
}

function paragraph(minSentences = 3, maxSentences = 7): string {
  const len = minSentences + Math.floor(Math.random() * (maxSentences - minSentences + 1));
  return Array.from({ length: len }, () => sentence()).join(" ");
}

export default function LoremPage() {
  const [count, setCount] = useState(3);
  const [unit, setUnit] = useState<"paragraphs" | "sentences" | "words">("paragraphs");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  function generate() {
    let result = "";
    if (unit === "paragraphs") {
      result = Array.from({ length: count }, () => paragraph()).join("\n\n");
    } else if (unit === "sentences") {
      result = Array.from({ length: count }, () => sentence()).join(" ");
    } else {
      const words = Array.from({ length: count }, () => WORDS[Math.floor(Math.random() * WORDS.length)]);
      words[0] = words[0][0].toUpperCase() + words[0].slice(1);
      result = words.join(" ") + ".";
    }
    setOutput(result);
    setCopied(false);
  }

  function copy() {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Lorem Ipsum Generator</h1>
      <div className="flex gap-3 mb-4 items-center flex-wrap">
        <label className="text-sm text-muted">Generate</label>
        <input
          type="number"
          min={1}
          max={100}
          value={count}
          onChange={(e) => setCount(Math.min(100, Math.max(1, Number(e.target.value))))}
          className="w-20 px-3 py-2 bg-surface border border-border rounded-lg text-sm"
        />
        <select
          value={unit}
          onChange={(e) => setUnit(e.target.value as "paragraphs" | "sentences" | "words")}
          className="px-3 py-2 bg-surface border border-border rounded-lg text-sm"
        >
          <option value="paragraphs">paragraphs</option>
          <option value="sentences">sentences</option>
          <option value="words">words</option>
        </select>
        <button
          onClick={generate}
          className="px-4 py-2 bg-accent hover:bg-accent-hover text-white rounded-lg text-sm font-medium transition-colors"
        >
          Generate
        </button>
        {output && (
          <button
            onClick={copy}
            className="px-4 py-2 bg-surface hover:bg-surface-hover border border-border text-foreground rounded-lg text-sm font-medium transition-colors"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        )}
      </div>
      {output && (
        <textarea rows={16} value={output} readOnly className="whitespace-pre-wrap" />
      )}
    </div>
  );
}
