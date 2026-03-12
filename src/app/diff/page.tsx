"use client";
import { useState } from "react";

interface DiffLine {
  type: "same" | "added" | "removed";
  text: string;
  leftNum: number | null;
  rightNum: number | null;
}

function computeDiff(a: string, b: string): DiffLine[] {
  const linesA = a.split("\n");
  const linesB = b.split("\n");
  const m = linesA.length;
  const n = linesB.length;

  // Simple LCS-based diff
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = linesA[i - 1] === linesB[j - 1]
        ? dp[i - 1][j - 1] + 1
        : Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }

  const result: DiffLine[] = [];
  let i = m, j = n;
  const stack: DiffLine[] = [];

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && linesA[i - 1] === linesB[j - 1]) {
      stack.push({ type: "same", text: linesA[i - 1], leftNum: i, rightNum: j });
      i--; j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      stack.push({ type: "added", text: linesB[j - 1], leftNum: null, rightNum: j });
      j--;
    } else {
      stack.push({ type: "removed", text: linesA[i - 1], leftNum: i, rightNum: null });
      i--;
    }
  }

  while (stack.length) result.push(stack.pop()!);
  return result;
}

export default function DiffPage() {
  const [left, setLeft] = useState("");
  const [right, setRight] = useState("");
  const [diff, setDiff] = useState<DiffLine[] | null>(null);

  function compare() {
    setDiff(computeDiff(left, right));
  }

  const colors = {
    same: "",
    added: "bg-green-900/30 text-green-300",
    removed: "bg-red-900/30 text-red-300",
  };
  const prefixes = { same: " ", added: "+", removed: "-" };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Text Diff Checker</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm text-muted mb-2">Original</label>
          <textarea
            rows={14}
            value={left}
            onChange={(e) => setLeft(e.target.value)}
            placeholder="Paste original text here..."
            spellCheck={false}
          />
        </div>
        <div>
          <label className="block text-sm text-muted mb-2">Modified</label>
          <textarea
            rows={14}
            value={right}
            onChange={(e) => setRight(e.target.value)}
            placeholder="Paste modified text here..."
            spellCheck={false}
          />
        </div>
      </div>
      <button
        onClick={compare}
        className="px-4 py-2 bg-accent hover:bg-accent-hover text-white rounded-lg text-sm font-medium transition-colors mb-4"
      >
        Compare
      </button>
      {diff && (
        <div className="bg-surface border border-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            {diff.map((line, i) => (
              <div key={i} className={`flex font-mono text-sm ${colors[line.type]}`}>
                <span className="w-10 text-right px-2 text-muted/50 select-none shrink-0 border-r border-border">
                  {line.leftNum ?? ""}
                </span>
                <span className="w-10 text-right px-2 text-muted/50 select-none shrink-0 border-r border-border">
                  {line.rightNum ?? ""}
                </span>
                <span className="w-6 text-center select-none shrink-0">{prefixes[line.type]}</span>
                <span className="whitespace-pre px-2">{line.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
