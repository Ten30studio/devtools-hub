"use client";
import { useState } from "react";

export default function ColorPage() {
  const [hex, setHex] = useState("#3b82f6");
  const [rgb, setRgb] = useState("59, 130, 246");
  const [hsl, setHsl] = useState("217, 91%, 60%");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState("");

  function hexToRgb(h: string): [number, number, number] | null {
    const clean = h.replace("#", "");
    if (!/^[0-9a-fA-F]{6}$/.test(clean)) return null;
    return [parseInt(clean.slice(0, 2), 16), parseInt(clean.slice(2, 4), 16), parseInt(clean.slice(4, 6), 16)];
  }

  function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    const l = (max + min) / 2;
    if (max === min) return [0, 0, Math.round(l * 100)];
    const d = max - min;
    const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    let h = 0;
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;
    return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
  }

  function hslToRgb(h: number, s: number, l: number): [number, number, number] {
    h /= 360; s /= 100; l /= 100;
    if (s === 0) { const v = Math.round(l * 255); return [v, v, v]; }
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1; if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    return [Math.round(hue2rgb(p, q, h + 1 / 3) * 255), Math.round(hue2rgb(p, q, h) * 255), Math.round(hue2rgb(p, q, h - 1 / 3) * 255)];
  }

  function fromHex() {
    try {
      const result = hexToRgb(hex);
      if (!result) throw new Error("Invalid HEX color");
      const [r, g, b] = result;
      setRgb(`${r}, ${g}, ${b}`);
      const [h, s, l] = rgbToHsl(r, g, b);
      setHsl(`${h}, ${s}%, ${l}%`);
      setError("");
    } catch (e) {
      setError((e as Error).message);
    }
  }

  function fromRgb() {
    try {
      const parts = rgb.split(",").map((s) => parseInt(s.trim()));
      if (parts.length !== 3 || parts.some((v) => isNaN(v) || v < 0 || v > 255)) throw new Error("Invalid RGB value");
      const [r, g, b] = parts;
      setHex("#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join(""));
      const [h, s, l] = rgbToHsl(r, g, b);
      setHsl(`${h}, ${s}%, ${l}%`);
      setError("");
    } catch (e) {
      setError((e as Error).message);
    }
  }

  function fromHsl() {
    try {
      const parts = hsl.replace(/%/g, "").split(",").map((s) => parseFloat(s.trim()));
      if (parts.length !== 3 || parts.some((v) => isNaN(v))) throw new Error("Invalid HSL value");
      const [h, s, l] = parts;
      if (h < 0 || h > 360 || s < 0 || s > 100 || l < 0 || l > 100) throw new Error("HSL values out of range");
      const [r, g, b] = hslToRgb(h, s, l);
      setRgb(`${r}, ${g}, ${b}`);
      setHex("#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join(""));
      setError("");
    } catch (e) {
      setError((e as Error).message);
    }
  }

  function copyToClipboard(text: string, label: string) {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(""), 1500);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Color Converter</h1>
      <div className="flex gap-3 mb-4">
        <button onClick={fromHex} className="px-4 py-2 bg-accent hover:bg-accent-hover text-white rounded-lg text-sm font-medium transition-colors">From HEX</button>
        <button onClick={fromRgb} className="px-4 py-2 bg-surface hover:bg-surface-hover border border-border text-foreground rounded-lg text-sm font-medium transition-colors">From RGB</button>
        <button onClick={fromHsl} className="px-4 py-2 bg-surface hover:bg-surface-hover border border-border text-foreground rounded-lg text-sm font-medium transition-colors">From HSL</button>
      </div>
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 rounded-lg border border-border" style={{ backgroundColor: hex }} />
        <span className="text-sm text-muted">Preview</span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm text-muted mb-2">HEX</label>
          <textarea rows={2} value={hex} onChange={(e) => setHex(e.target.value)} placeholder="#3b82f6" spellCheck={false} />
          <button onClick={() => copyToClipboard(hex, "hex")} className="mt-2 px-3 py-1 bg-surface hover:bg-surface-hover border border-border text-foreground rounded-lg text-xs font-medium transition-colors">
            {copied === "hex" ? "Copied!" : "Copy"}
          </button>
        </div>
        <div>
          <label className="block text-sm text-muted mb-2">RGB</label>
          <textarea rows={2} value={rgb} onChange={(e) => setRgb(e.target.value)} placeholder="59, 130, 246" spellCheck={false} />
          <button onClick={() => copyToClipboard(`rgb(${rgb})`, "rgb")} className="mt-2 px-3 py-1 bg-surface hover:bg-surface-hover border border-border text-foreground rounded-lg text-xs font-medium transition-colors">
            {copied === "rgb" ? "Copied!" : "Copy"}
          </button>
        </div>
        <div>
          <label className="block text-sm text-muted mb-2">HSL</label>
          <textarea rows={2} value={hsl} onChange={(e) => setHsl(e.target.value)} placeholder="217, 91%, 60%" spellCheck={false} />
          <button onClick={() => copyToClipboard(`hsl(${hsl})`, "hsl")} className="mt-2 px-3 py-1 bg-surface hover:bg-surface-hover border border-border text-foreground rounded-lg text-xs font-medium transition-colors">
            {copied === "hsl" ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>
      {error && <p className="mt-3 text-red-400 text-sm font-mono">{error}</p>}
    </div>
  );
}
