"use client";
import { useState } from "react";

interface JwtParts {
  header: Record<string, unknown>;
  payload: Record<string, unknown>;
  signature: string;
}

function decodeJwt(token: string): JwtParts {
  const parts = token.trim().split(".");
  if (parts.length !== 3) throw new Error("Invalid JWT: expected 3 parts");

  function b64decode(str: string) {
    const padded = str.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(padded));
  }

  return {
    header: b64decode(parts[0]),
    payload: b64decode(parts[1]),
    signature: parts[2],
  };
}

function formatTimestamp(ts: number): string {
  return new Date(ts * 1000).toLocaleString();
}

export default function JwtPage() {
  const [input, setInput] = useState("");
  const [decoded, setDecoded] = useState<JwtParts | null>(null);
  const [error, setError] = useState("");

  function decode() {
    try {
      setDecoded(decodeJwt(input));
      setError("");
    } catch (e) {
      setError((e as Error).message);
      setDecoded(null);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">JWT Decoder</h1>
      <div className="mb-4">
        <label className="block text-sm text-muted mb-2">Paste JWT</label>
        <textarea
          rows={4}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="eyJhbGciOiJIUzI1NiIs..."
          spellCheck={false}
        />
      </div>
      <button onClick={decode} className="px-4 py-2 bg-accent hover:bg-accent-hover text-white rounded-lg text-sm font-medium transition-colors mb-6">Decode</button>
      {error && <p className="mt-3 text-red-400 text-sm font-mono">{error}</p>}
      {decoded && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
          <div>
            <h2 className="text-sm font-semibold text-muted mb-2">Header</h2>
            <pre className="p-4 rounded-lg bg-surface border border-border text-sm font-mono overflow-auto whitespace-pre-wrap">
              {JSON.stringify(decoded.header, null, 2)}
            </pre>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-muted mb-2">Payload</h2>
            <pre className="p-4 rounded-lg bg-surface border border-border text-sm font-mono overflow-auto whitespace-pre-wrap">
              {JSON.stringify(decoded.payload, null, 2)}
            </pre>
            {typeof decoded.payload.iat === "number" && (
              <p className="text-xs text-muted mt-2">Issued: {formatTimestamp(decoded.payload.iat)}</p>
            )}
            {typeof decoded.payload.exp === "number" && (
              <p className="text-xs text-muted">Expires: {formatTimestamp(decoded.payload.exp)}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
