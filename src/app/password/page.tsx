"use client";
import { useState, useCallback } from "react";

const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()_+-=[]{}|;:,.<>?";

function generatePassword(
  length: number,
  useLower: boolean,
  useUpper: boolean,
  useNumbers: boolean,
  useSymbols: boolean
): string {
  let chars = "";
  if (useLower) chars += LOWERCASE;
  if (useUpper) chars += UPPERCASE;
  if (useNumbers) chars += NUMBERS;
  if (useSymbols) chars += SYMBOLS;
  if (!chars) chars = LOWERCASE + UPPERCASE + NUMBERS;

  const array = new Uint32Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, (n) => chars[n % chars.length]).join("");
}

function getStrength(pw: string): { label: string; color: string; width: string } {
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (pw.length >= 16) score++;
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^a-zA-Z0-9]/.test(pw)) score++;

  if (score <= 2) return { label: "Weak", color: "text-red-400", width: "w-1/4" };
  if (score <= 3) return { label: "Fair", color: "text-yellow-400", width: "w-1/2" };
  if (score <= 4) return { label: "Good", color: "text-blue-400", width: "w-3/4" };
  return { label: "Strong", color: "text-green-400", width: "w-full" };
}

export default function PasswordPage() {
  const [length, setLength] = useState(16);
  const [useLower, setUseLower] = useState(true);
  const [useUpper, setUseUpper] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [count, setCount] = useState(1);
  const [passwords, setPasswords] = useState<string[]>([]);
  const [copied, setCopied] = useState<number | null>(null);

  const generate = useCallback(() => {
    const results = Array.from({ length: count }, () =>
      generatePassword(length, useLower, useUpper, useNumbers, useSymbols)
    );
    setPasswords(results);
    setCopied(null);
  }, [length, useLower, useUpper, useNumbers, useSymbols, count]);

  function copy(pw: string, idx: number) {
    navigator.clipboard.writeText(pw);
    setCopied(idx);
    setTimeout(() => setCopied(null), 2000);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Password Generator</h1>

      <div className="bg-surface border border-border rounded-xl p-4 mb-4 space-y-4">
        <div className="flex items-center gap-4">
          <label className="text-sm text-muted w-20">Length:</label>
          <input
            type="range"
            min={4}
            max={64}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="flex-1"
          />
          <span className="font-mono text-sm w-8 text-right">{length}</span>
        </div>

        <div className="flex items-center gap-4">
          <label className="text-sm text-muted w-20">Count:</label>
          <input
            type="number"
            min={1}
            max={20}
            value={count}
            onChange={(e) => setCount(Math.min(20, Math.max(1, Number(e.target.value))))}
            className="w-20 px-3 py-2 bg-background border border-border rounded-lg text-sm"
          />
        </div>

        <div className="flex flex-wrap gap-4">
          {[
            { label: "Lowercase (a-z)", value: useLower, set: setUseLower },
            { label: "Uppercase (A-Z)", value: useUpper, set: setUseUpper },
            { label: "Numbers (0-9)", value: useNumbers, set: setUseNumbers },
            { label: "Symbols (!@#$)", value: useSymbols, set: setUseSymbols },
          ].map((opt) => (
            <label key={opt.label} className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={opt.value}
                onChange={(e) => opt.set(e.target.checked)}
                className="rounded"
              />
              {opt.label}
            </label>
          ))}
        </div>

        <button
          onClick={generate}
          className="px-6 py-2.5 bg-accent hover:bg-accent-hover text-white rounded-lg text-sm font-medium transition-colors"
        >
          Generate
        </button>
      </div>

      {passwords.map((pw, i) => {
        const strength = getStrength(pw);
        return (
          <div key={i} className="bg-surface border border-border rounded-xl p-4 mb-2">
            <div className="flex items-center gap-3">
              <code className="flex-1 font-mono text-sm break-all select-all">{pw}</code>
              <button
                onClick={() => copy(pw, i)}
                className="px-3 py-1.5 bg-background hover:bg-surface-hover border border-border rounded-lg text-xs font-medium transition-colors shrink-0"
              >
                {copied === i ? "Copied!" : "Copy"}
              </button>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-background rounded-full overflow-hidden">
                <div className={`h-full ${strength.width} bg-current ${strength.color} rounded-full transition-all`} />
              </div>
              <span className={`text-xs font-medium ${strength.color}`}>{strength.label}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
