"use client";

import { useState, useCallback } from "react";

interface ColorStop {
  color: string;
  position: number;
}

export default function GradientPage() {
  const [type, setType] = useState<"linear" | "radial">("linear");
  const [angle, setAngle] = useState(135);
  const [stops, setStops] = useState<ColorStop[]>([
    { color: "#6366f1", position: 0 },
    { color: "#ec4899", position: 100 },
  ]);

  const updateStop = useCallback(
    (index: number, field: keyof ColorStop, value: string | number) => {
      setStops((prev) =>
        prev.map((s, i) => (i === index ? { ...s, [field]: value } : s))
      );
    },
    []
  );

  const addStop = () => {
    setStops((prev) => [...prev, { color: "#10b981", position: 50 }]);
  };

  const removeStop = (index: number) => {
    if (stops.length > 2) {
      setStops((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const stopsStr = stops
    .map((s) => `${s.color} ${s.position}%`)
    .join(", ");

  const cssValue =
    type === "linear"
      ? `linear-gradient(${angle}deg, ${stopsStr})`
      : `radial-gradient(circle, ${stopsStr})`;

  const cssRule = `background: ${cssValue};`;

  const tailwind = `bg-gradient-to-r from-[${stops[0]?.color}] to-[${stops[stops.length - 1]?.color}]`;

  const [copied, setCopied] = useState<string | null>(null);
  const copy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="py-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">CSS Gradient Generator</h1>
      <p className="text-muted text-sm mb-8">
        Create beautiful CSS gradients with a visual editor. Copy the CSS or Tailwind code.
      </p>

      <div
        className="w-full h-48 rounded-xl border border-border mb-8"
        style={{ background: cssValue }}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium mb-2">Type</label>
          <div className="flex gap-2">
            {(["linear", "radial"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  type === t
                    ? "bg-accent text-white"
                    : "bg-surface-hover text-muted hover:text-foreground"
                }`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {type === "linear" && (
          <div>
            <label className="block text-sm font-medium mb-2">
              Angle: {angle}°
            </label>
            <input
              type="range"
              min="0"
              max="360"
              value={angle}
              onChange={(e) => setAngle(Number(e.target.value))}
              className="w-full"
            />
          </div>
        )}
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium">Color Stops</label>
          <button
            onClick={addStop}
            className="text-sm text-accent hover:underline"
          >
            + Add Stop
          </button>
        </div>
        <div className="space-y-3">
          {stops.map((stop, i) => (
            <div key={i} className="flex items-center gap-3">
              <input
                type="color"
                value={stop.color}
                onChange={(e) => updateStop(i, "color", e.target.value)}
                className="w-10 h-10 rounded cursor-pointer border-0"
              />
              <input
                type="text"
                value={stop.color}
                onChange={(e) => updateStop(i, "color", e.target.value)}
                className="w-24 px-3 py-2 bg-surface border border-border rounded-lg text-sm font-mono"
              />
              <input
                type="range"
                min="0"
                max="100"
                value={stop.position}
                onChange={(e) =>
                  updateStop(i, "position", Number(e.target.value))
                }
                className="flex-1"
              />
              <span className="text-sm text-muted w-10">{stop.position}%</span>
              {stops.length > 2 && (
                <button
                  onClick={() => removeStop(i)}
                  className="text-sm text-red-400 hover:text-red-300"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="rounded-xl border border-border bg-surface p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">CSS</span>
            <button
              onClick={() => copy(cssRule, "css")}
              className="text-xs text-accent hover:underline"
            >
              {copied === "css" ? "Copied" : "Copy"}
            </button>
          </div>
          <pre className="text-sm font-mono text-muted overflow-x-auto">
            {cssRule}
          </pre>
        </div>

        <div className="rounded-xl border border-border bg-surface p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Tailwind (approx)</span>
            <button
              onClick={() => copy(tailwind, "tw")}
              className="text-xs text-accent hover:underline"
            >
              {copied === "tw" ? "Copied" : "Copy"}
            </button>
          </div>
          <pre className="text-sm font-mono text-muted overflow-x-auto">
            {tailwind}
          </pre>
        </div>
      </div>
    </div>
  );
}
