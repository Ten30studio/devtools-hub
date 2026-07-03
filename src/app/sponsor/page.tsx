"use client";

import Link from "next/link";

export default function SponsorPage() {
  return (
    <div className="py-16 max-w-2xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Support DevTools Hub</h1>
        <p className="text-muted text-lg">
          DevTools Hub is free. Your support keeps it running
          and funds new tool development.
        </p>
      </div>

      <div className="space-y-6">
        <div className="rounded-xl border border-accent/40 bg-accent/5 p-8">
          <h2 className="text-xl font-bold mb-2">Pro Supporter ($9/mo)</h2>
          <ul className="text-muted text-sm space-y-2 mb-6">
            <li>&#10003; 10,000 API requests per hour, up from 100 on the free tier</li>
            <li>&#10003; Priority on feature requests</li>
            <li>&#10003; Support ongoing development</li>
          </ul>
          <a
            href="https://buymeacoffee.com/ten30studio"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center py-3 rounded-lg text-sm font-medium bg-accent hover:bg-accent-hover text-white transition-colors"
          >
            Become a Pro Supporter
          </a>
        </div>

        <div className="rounded-xl border border-border bg-surface p-8">
          <h2 className="text-xl font-bold mb-2">One-Time Tip</h2>
          <p className="text-muted text-sm mb-6">
            Buy us a coffee to say thanks. Every dollar helps.
          </p>
          <a
            href="https://buymeacoffee.com/ten30studio"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center py-3 rounded-lg text-sm font-medium bg-surface-hover hover:bg-border text-foreground transition-colors"
          >
            Buy Me a Coffee
          </a>
        </div>

        <div className="rounded-xl border border-border bg-surface p-8">
          <h2 className="text-xl font-bold mb-2">The Code</h2>
          <p className="text-muted text-sm mb-6">
            DevTools Hub is on GitHub. Star it, file an issue, or send a pull request; that helps as much as money does.
          </p>
          <a
            href="https://github.com/Ten30studio/devtools-hub"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center py-3 rounded-lg text-sm font-medium bg-surface-hover hover:bg-border text-foreground transition-colors"
          >
            View on GitHub
          </a>
        </div>
      </div>

      <div className="mt-12 text-center text-muted text-sm">
        <p>
          DevTools Hub is built and maintained by{" "}
          <a
            href="https://github.com/Ten30studio"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            Ten30 Studio
          </a>
          .
        </p>
        <p className="mt-2">
          <Link href="/" className="text-accent hover:underline">
            Back to tools
          </Link>
        </p>
      </div>
    </div>
  );
}
