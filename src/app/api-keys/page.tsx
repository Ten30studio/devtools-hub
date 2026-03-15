"use client";
import { useState } from "react";
import Link from "next/link";

export default function ApiKeysPage() {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  async function generateKey() {
    setLoading(true);
    try {
      const res = await fetch("/api/keys/generate", { method: "POST" });
      const data = await res.json();
      setApiKey(data.apiKey);
    } finally {
      setLoading(false);
    }
  }

  function copyKey() {
    if (apiKey) {
      navigator.clipboard.writeText(apiKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <div className="py-16 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">API Keys</h1>
      <p className="text-muted mb-8">
        Generate an API key to access DevTools Hub programmatically. Perfect for
        AI agents, CI/CD pipelines, and automation workflows.
      </p>

      <div className="space-y-6">
        <div className="rounded-xl border border-border bg-surface p-6">
          <h2 className="text-lg font-semibold mb-2">Free Tier</h2>
          <ul className="text-sm text-muted space-y-1 mb-4">
            <li>100 requests per hour</li>
            <li>All API endpoints included</li>
            <li>No credit card required</li>
          </ul>

          {!apiKey ? (
            <button
              onClick={generateKey}
              disabled={loading}
              className="px-6 py-2.5 bg-accent hover:bg-accent-hover text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
            >
              {loading ? "Generating..." : "Generate Free API Key"}
            </button>
          ) : (
            <div className="space-y-3">
              <div className="bg-background border border-border rounded-lg p-3 flex items-center gap-3">
                <code className="flex-1 text-sm font-mono break-all select-all">
                  {apiKey}
                </code>
                <button
                  onClick={copyKey}
                  className="px-3 py-1.5 bg-surface-hover hover:bg-border rounded-lg text-xs font-medium transition-colors shrink-0"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
              <p className="text-xs text-red-400">
                Save this key now. It cannot be recovered once you leave this
                page.
              </p>
              <button
                onClick={generateKey}
                className="text-sm text-accent hover:underline"
              >
                Generate another key
              </button>
            </div>
          )}
        </div>

        <div className="rounded-xl border border-accent/40 bg-accent/5 p-6">
          <h2 className="text-lg font-semibold mb-2">Pro Tier — $9/mo</h2>
          <ul className="text-sm text-muted space-y-1 mb-4">
            <li>10,000 requests per hour</li>
            <li>Priority support</li>
            <li>Usage analytics</li>
          </ul>
          <Link
            href="/sponsor"
            className="inline-block px-6 py-2.5 bg-accent hover:bg-accent-hover text-white rounded-lg text-sm font-medium transition-colors"
          >
            Upgrade to Pro
          </Link>
        </div>

        <div className="rounded-xl border border-border bg-surface p-6">
          <h2 className="text-lg font-semibold mb-3">Quick Start</h2>
          <p className="text-sm text-muted mb-3">
            Include your API key in the <code className="text-accent">X-API-Key</code> header:
          </p>
          <pre className="bg-background border border-border rounded-lg p-4 text-sm font-mono overflow-x-auto">
{`curl -X POST https://devtools-hub-ten.vercel.app/api/v1/json/format \\
  -H "Content-Type: application/json" \\
  -H "X-API-Key: ${apiKey || "dth_free_your_key_here"}" \\
  -d '{"input": "{\\"hello\\": \\"world\\"}"}'`}
          </pre>
        </div>

        <div className="rounded-xl border border-border bg-surface p-6">
          <h2 className="text-lg font-semibold mb-3">Built for AI Agents</h2>
          <p className="text-sm text-muted mb-3">
            DevTools Hub API is designed for programmatic use by AI agents and
            automation systems. Common agent use cases:
          </p>
          <ul className="text-sm text-muted space-y-2">
            <li><strong>JSON validation</strong> — Validate and format LLM outputs before downstream processing</li>
            <li><strong>Base64 encoding</strong> — Handle file attachments in agent workflows</li>
            <li><strong>JWT decoding</strong> — Inspect auth tokens during debugging flows</li>
            <li><strong>URL encoding</strong> — Build API calls safely in multi-step chains</li>
            <li><strong>Hash generation</strong> — Create content fingerprints for deduplication</li>
            <li><strong>Regex testing</strong> — Validate extraction patterns before deployment</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
