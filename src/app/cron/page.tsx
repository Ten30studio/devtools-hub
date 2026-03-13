"use client";
import { useState } from "react";

const FIELD_NAMES = ["Minute", "Hour", "Day of Month", "Month", "Day of Week"];
const FIELD_RANGES = ["0-59", "0-23", "1-31", "1-12", "0-6 (Sun=0)"];

const PRESETS: Record<string, string> = {
  "Every minute": "* * * * *",
  "Every hour": "0 * * * *",
  "Every day at midnight": "0 0 * * *",
  "Every Monday at 9am": "0 9 * * 1",
  "Every 5 minutes": "*/5 * * * *",
  "Every 15 minutes": "*/15 * * * *",
  "1st of every month": "0 0 1 * *",
  "Weekdays at 8am": "0 8 * * 1-5",
};

function describeCronField(value: string, fieldIndex: number): string {
  if (value === "*") return `every ${FIELD_NAMES[fieldIndex].toLowerCase()}`;
  if (value.startsWith("*/"))
    return `every ${value.slice(2)} ${FIELD_NAMES[fieldIndex].toLowerCase()}(s)`;
  if (value.includes(",")) return `at ${FIELD_NAMES[fieldIndex].toLowerCase()} ${value}`;
  if (value.includes("-")) {
    const [start, end] = value.split("-");
    return `${FIELD_NAMES[fieldIndex].toLowerCase()} ${start} through ${end}`;
  }
  return `at ${FIELD_NAMES[fieldIndex].toLowerCase()} ${value}`;
}

function describeCron(expr: string): string {
  const parts = expr.trim().split(/\s+/);
  if (parts.length !== 5) return "Invalid cron expression (expected 5 fields)";
  return parts.map((p, i) => describeCronField(p, i)).join(", ");
}

function getNextRuns(expr: string, count: number): string[] {
  const parts = expr.trim().split(/\s+/);
  if (parts.length !== 5) return [];

  const results: string[] = [];
  const now = new Date();
  const check = new Date(now);
  check.setSeconds(0, 0);
  check.setMinutes(check.getMinutes() + 1);

  for (let i = 0; i < 525600 && results.length < count; i++) {
    const min = check.getMinutes();
    const hour = check.getHours();
    const dom = check.getDate();
    const month = check.getMonth() + 1;
    const dow = check.getDay();

    if (
      matchField(parts[0], min, 0, 59) &&
      matchField(parts[1], hour, 0, 23) &&
      matchField(parts[2], dom, 1, 31) &&
      matchField(parts[3], month, 1, 12) &&
      matchField(parts[4], dow, 0, 6)
    ) {
      results.push(check.toLocaleString());
    }
    check.setMinutes(check.getMinutes() + 1);
  }
  return results;
}

function matchField(pattern: string, value: number, min: number, max: number): boolean {
  if (pattern === "*") return true;
  if (pattern.startsWith("*/")) {
    const step = parseInt(pattern.slice(2));
    return step > 0 && value % step === 0;
  }
  if (pattern.includes(",")) {
    return pattern.split(",").some((p) => matchField(p.trim(), value, min, max));
  }
  if (pattern.includes("-")) {
    const [start, end] = pattern.split("-").map(Number);
    return value >= start && value <= end;
  }
  return parseInt(pattern) === value;
}

export default function CronPage() {
  const [expr, setExpr] = useState("*/5 * * * *");
  const parts = expr.trim().split(/\s+/);
  const valid = parts.length === 5;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Cron Expression Parser</h1>
      <input
        type="text"
        value={expr}
        onChange={(e) => setExpr(e.target.value)}
        placeholder="* * * * *"
        className="w-full px-4 py-3 bg-surface border border-border rounded-xl font-mono text-lg mb-4"
      />

      <div className="flex flex-wrap gap-2 mb-6">
        {Object.entries(PRESETS).map(([label, value]) => (
          <button
            key={value}
            onClick={() => setExpr(value)}
            className="px-3 py-1.5 bg-surface hover:bg-surface-hover border border-border rounded-lg text-xs font-medium transition-colors"
          >
            {label}
          </button>
        ))}
      </div>

      {valid && (
        <>
          <div className="bg-surface border border-border rounded-xl p-4 mb-4">
            <h2 className="text-sm font-semibold text-muted mb-2">Description</h2>
            <p className="text-sm">{describeCron(expr)}</p>
          </div>

          <div className="grid grid-cols-5 gap-2 mb-4">
            {parts.map((p, i) => (
              <div key={i} className="bg-surface border border-border rounded-xl p-3 text-center">
                <div className="font-mono text-lg font-bold">{p}</div>
                <div className="text-xs text-muted mt-1">{FIELD_NAMES[i]}</div>
                <div className="text-xs text-muted">{FIELD_RANGES[i]}</div>
              </div>
            ))}
          </div>

          <div className="bg-surface border border-border rounded-xl p-4">
            <h2 className="text-sm font-semibold text-muted mb-2">Next 5 Runs</h2>
            {getNextRuns(expr, 5).map((run, i) => (
              <div key={i} className="text-sm font-mono py-1">
                {run}
              </div>
            ))}
          </div>
        </>
      )}

      {!valid && expr.trim() && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400 text-sm">
          Invalid cron expression. Expected 5 space-separated fields: minute hour day-of-month month day-of-week
        </div>
      )}
    </div>
  );
}
