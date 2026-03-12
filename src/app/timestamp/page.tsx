"use client";
import { useState, useEffect } from "react";

export default function TimestampPage() {
  const [timestamp, setTimestamp] = useState("");
  const [dateString, setDateString] = useState("");
  const [mode, setMode] = useState<"seconds" | "milliseconds">("seconds");
  const [now, setNow] = useState(Math.floor(Date.now() / 1000));
  const [error, setError] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  function toDate() {
    try {
      const ts = Number(timestamp);
      if (isNaN(ts)) throw new Error("Invalid timestamp");
      const ms = mode === "seconds" ? ts * 1000 : ts;
      const date = new Date(ms);
      if (isNaN(date.getTime())) throw new Error("Invalid timestamp");
      setDateString(date.toISOString() + "\n" + date.toLocaleString());
      setError("");
    } catch (e) {
      setError((e as Error).message);
      setDateString("");
    }
  }

  function toTimestamp() {
    try {
      const date = new Date(dateString.split("\n")[0]);
      if (isNaN(date.getTime())) throw new Error("Invalid date string");
      const result = mode === "seconds" ? Math.floor(date.getTime() / 1000) : date.getTime();
      setTimestamp(String(result));
      setError("");
    } catch (e) {
      setError((e as Error).message);
      setTimestamp("");
    }
  }

  function setNowTimestamp() {
    const current = mode === "seconds" ? Math.floor(Date.now() / 1000) : Date.now();
    setTimestamp(String(current));
    const date = new Date();
    setDateString(date.toISOString() + "\n" + date.toLocaleString());
    setError("");
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Timestamp Converter</h1>
      <div className="flex gap-3 mb-4 items-center">
        <button onClick={toDate} className="px-4 py-2 bg-accent hover:bg-accent-hover text-white rounded-lg text-sm font-medium transition-colors">To Date</button>
        <button onClick={toTimestamp} className="px-4 py-2 bg-surface hover:bg-surface-hover border border-border text-foreground rounded-lg text-sm font-medium transition-colors">To Timestamp</button>
        <button onClick={setNowTimestamp} className="px-4 py-2 bg-surface hover:bg-surface-hover border border-border text-foreground rounded-lg text-sm font-medium transition-colors">Now</button>
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value as "seconds" | "milliseconds")}
          className="px-3 py-2 bg-surface border border-border text-foreground rounded-lg text-sm font-medium"
        >
          <option value="seconds">Seconds</option>
          <option value="milliseconds">Milliseconds</option>
        </select>
      </div>
      <p className="text-sm text-muted mb-4">Current Unix timestamp: <span className="font-mono text-foreground">{now}</span></p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-muted mb-2">Unix Timestamp</label>
          <textarea
            rows={6}
            value={timestamp}
            onChange={(e) => setTimestamp(e.target.value)}
            placeholder="1700000000"
            spellCheck={false}
          />
        </div>
        <div>
          <label className="block text-sm text-muted mb-2">Date String</label>
          <textarea
            rows={6}
            value={dateString}
            onChange={(e) => setDateString(e.target.value)}
            placeholder="2024-01-01T00:00:00.000Z"
            spellCheck={false}
          />
        </div>
      </div>
      {error && <p className="mt-3 text-red-400 text-sm font-mono">{error}</p>}
    </div>
  );
}
