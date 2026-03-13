"use client";
import { useState, useRef, useCallback } from "react";

function generateQR(text: string, size: number): string {
  // Simple QR code generation using a canvas-based approach
  // We'll use the QR code algorithm via a lightweight inline implementation
  // For production, you'd use a library, but this works client-side with no deps
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  // Use the browser's built-in encoding to create a QR-like pattern
  // Actually, let's use a proper approach with a Google Charts API URL
  // But that requires network. Instead, let's generate a data URL placeholder
  // and use a real QR encoding approach.

  // We'll encode using the alphanumeric QR approach
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}`;
}

export default function QRCodePage() {
  const [text, setText] = useState("https://ten30studio.github.io/devtools-hub/");
  const [size, setSize] = useState(256);
  const [copied, setCopied] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const qrUrl = text.trim()
    ? `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text.trim())}&format=png`
    : "";

  const download = useCallback(() => {
    if (!qrUrl) return;
    const a = document.createElement("a");
    a.href = qrUrl;
    a.download = "qrcode.png";
    a.target = "_blank";
    a.click();
  }, [qrUrl]);

  const copyUrl = useCallback(() => {
    if (!qrUrl) return;
    navigator.clipboard.writeText(qrUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [qrUrl]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">QR Code Generator</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm text-muted mb-2">Text or URL</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text or URL to encode..."
            className="w-full h-32 px-4 py-3 bg-surface border border-border rounded-xl font-mono text-sm resize-none focus:border-accent focus:outline-none"
          />
          <div className="flex gap-3 mt-3 items-center">
            <label className="text-sm text-muted">Size:</label>
            <select
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="px-3 py-2 bg-surface border border-border rounded-lg text-sm"
            >
              <option value={128}>128x128</option>
              <option value={256}>256x256</option>
              <option value={512}>512x512</option>
              <option value={1024}>1024x1024</option>
            </select>
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={download}
              disabled={!text.trim()}
              className="px-4 py-2 bg-accent hover:bg-accent-hover text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
            >
              Download PNG
            </button>
            <button
              onClick={copyUrl}
              disabled={!text.trim()}
              className="px-4 py-2 bg-surface hover:bg-surface-hover border border-border text-foreground rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
            >
              {copied ? "Copied!" : "Copy Image URL"}
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center">
          {text.trim() ? (
            <div className="bg-white p-4 rounded-xl">
              <img
                ref={imgRef}
                src={qrUrl}
                alt="QR Code"
                width={Math.min(size, 300)}
                height={Math.min(size, 300)}
                className="block"
              />
            </div>
          ) : (
            <div className="text-muted text-sm">Enter text to generate a QR code</div>
          )}
        </div>
      </div>
      <p className="text-muted text-xs mt-6">
        QR codes generated via goqr.me API. Your data is sent to their server for rendering.
      </p>
    </div>
  );
}
