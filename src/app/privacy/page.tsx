import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy - DevTools Hub",
  description: "How DevTools Hub collects, uses, and protects your information. Most free tools run entirely in your browser, no data leaves your device.",
  robots: { index: false, follow: false },
};

export default function PrivacyPage() {
  return (
    <article className="max-w-3xl mx-auto py-8 space-y-6">
      <header className="space-y-2 pb-6 border-b border-border">
        <p className="text-sm text-accent font-medium uppercase tracking-wider">Legal</p>
        <h1 className="text-4xl font-bold text-foreground">Privacy Policy</h1>
        <p className="text-sm text-muted">Last updated: 24 May 2026 · Ten30 LLC, Arlington, Texas</p>
      </header>

      <p className="text-foreground leading-relaxed">
        This policy explains what information DevTools Hub ("we", "us") collects when you use <strong>tools.ten30studio.com</strong>, why we collect it, and the choices you have. We keep this short and plain. DevTools Hub is operated by Ten30 LLC; the parent Ten30 Studio privacy policy at{" "}
        <a href="https://ten30studio.com/privacy" className="text-accent hover:underline">ten30studio.com/privacy</a>{" "}
        covers data flows on the main site.
      </p>

      <div className="bg-surface border-l-4 border-accent p-4">
        <p className="text-sm text-foreground">
          <strong>Data controller.</strong> Ten30 LLC, Arlington, Texas, USA. Contact:{" "}
          <a href="mailto:admin@ten30studio.com" className="text-accent hover:underline">admin@ten30studio.com</a>.
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-foreground">Free tools, no data leaves your browser</h2>
        <p className="text-foreground leading-relaxed">
          All 19 utilities (JSON, Base64, JWT, Hash, Regex, Timestamp, Color, UUID, Lorem, Markdown, Diff, Cron, Password, QR Code, YAML, Gradient, HTML Entities, JSON→TS, URL) run entirely client-side in your browser. Whatever you paste, JWTs, JSON payloads, passwords, URLs, stays on your device. We do not collect, transmit, store, or analyse the content you put into the tools.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-foreground">When you create an API key (Pro tier)</h2>
        <p className="text-foreground leading-relaxed">
          To use the DevTools Hub API for high-volume automation, you create an account and an HMAC-signed API key. We collect:
        </p>
        <ul className="list-disc pl-6 space-y-1 text-foreground">
          <li><strong>Email address</strong>: for account identification, billing receipts, and security alerts</li>
          <li><strong>API key metadata</strong>: key prefix, creation date, last-used timestamp, rate-limit usage (we never store the full key plaintext after creation, only a hash for verification)</li>
          <li><strong>API request metadata</strong>: timestamps, endpoint called, response status, originating IP (for rate-limiting and abuse detection; not the request body)</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-foreground">Payments (Pro subscription)</h2>
        <p className="text-foreground leading-relaxed">
          DevTools Hub Pro is $9/month, billed via Stripe. Stripe collects your name, email, billing address, and payment-card details to process the subscription. Stripe shares with us: your email, the subscription status, billing amount, and renewal/cancellation events. We do not see or store your card details. Stripe's privacy policy: <a href="https://stripe.com/privacy" className="text-accent hover:underline" target="_blank" rel="noopener">stripe.com/privacy</a>.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-foreground">Hosting logs</h2>
        <p className="text-foreground leading-relaxed">
          Vercel (our hosting provider) records standard request metadata, IP address, user agent, request path, response status, timestamp, for security and operational reasons. Logs are retained per Vercel's defaults.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-foreground">What we don't do</h2>
        <ul className="list-disc pl-6 space-y-1 text-foreground">
          <li>No Google Analytics, no Google Ads, no Facebook Pixel, no behavioural tracking</li>
          <li>No cookies for advertising or third-party tracking</li>
          <li>No selling or sharing of personal information for cross-context behavioural advertising</li>
          <li>No reading or storing of tool inputs (the content you paste in)</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-foreground">Who we share data with</h2>
        <p className="text-foreground leading-relaxed">Only service providers that help us run DevTools Hub:</p>
        <ul className="list-disc pl-6 space-y-1 text-foreground">
          <li><strong>Stripe, Inc.</strong>: Pro subscription payment processing</li>
          <li><strong>Vercel Inc.</strong>: hosting and request logs</li>
          <li><strong>Google LLC</strong>: Google Workspace mailbox (admin@ten30studio.com) for support email</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-foreground">International transfers</h2>
        <p className="text-foreground leading-relaxed">
          DevTools Hub is operated from the United States, and our service providers (Stripe, Vercel, Google) process data in the US. If you are in the UK or EU, your data may be transferred to and processed in the US under the recipient providers' Standard Contractual Clauses or Data Privacy Framework participation.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-foreground">Retention</h2>
        <ul className="list-disc pl-6 space-y-1 text-foreground">
          <li><strong>Account data</strong>: kept while your account is active; deleted within 30 days of account closure (except records required for tax/accounting up to 7 years)</li>
          <li><strong>API request logs</strong>: 90 days, then deleted</li>
          <li><strong>Subscription records</strong>: at least 7 years (tax / accounting)</li>
          <li><strong>Hosting logs</strong>: per Vercel's defaults</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-foreground">Your rights (UK / EU GDPR)</h2>
        <p className="text-foreground leading-relaxed">If you are in the UK or EU, you have rights of access, rectification, erasure, restriction, portability, objection, and the right to lodge a complaint with your supervisory authority (UK: <a href="https://ico.org.uk" className="text-accent hover:underline" target="_blank" rel="noopener">Information Commissioner's Office</a>). Lawful basis: contract (Pro subscription), legitimate interest (running the site, security), legal obligation (tax records). To exercise any right, email <a href="mailto:admin@ten30studio.com" className="text-accent hover:underline">admin@ten30studio.com</a>. We respond within 30 days.</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-foreground">Your rights (California, CCPA / CPRA)</h2>
        <p className="text-foreground leading-relaxed">California residents have the right to know, delete, correct, and opt-out of sale or sharing. <strong>We do not sell or share personal information for cross-context behavioural advertising.</strong> Categories of personal information collected in the past 12 months: identifiers (email, IP), commercial information (subscription records), internet activity (API request metadata). To exercise a California right, email <a href="mailto:admin@ten30studio.com" className="text-accent hover:underline">admin@ten30studio.com</a>.</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-foreground">Security</h2>
        <p className="text-foreground leading-relaxed">HTTPS in transit. API keys are stored as cryptographic hashes (not plaintext). Account passwords (if applicable) are stored using bcrypt or equivalent. No method of internet transmission or storage is completely secure.</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-foreground">Children</h2>
        <p className="text-foreground leading-relaxed">DevTools Hub is not directed to children under 16, and we do not knowingly collect their information.</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-foreground">Changes</h2>
        <p className="text-foreground leading-relaxed">We may update this policy. The "last updated" date above shows when it last changed. Material changes will be flagged on this page.</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-foreground">Contact</h2>
        <p className="text-foreground leading-relaxed">
          Questions about privacy, or to exercise any right above: <a href="mailto:admin@ten30studio.com" className="text-accent hover:underline">admin@ten30studio.com</a>. Mail: Ten30 LLC, Arlington, Texas, USA.
        </p>
      </section>

      <div className="bg-surface border border-border p-4 text-sm text-muted">
        <strong className="text-foreground">Draft notice:</strong> this policy is drafted by Ten30 to reflect how DevTools Hub currently operates and addresses common UK GDPR and California CCPA disclosure requirements. It is a starting point, not legal advice. Have it reviewed by a qualified attorney before relying on it for compliance in your specific jurisdiction.
      </div>

      <p className="text-sm text-muted pt-4">
        <Link href="/terms" className="text-accent hover:underline">Terms of Service</Link> · <a href="https://ten30studio.com/privacy" className="text-accent hover:underline">Parent Ten30 Studio privacy policy</a>
      </p>
    </article>
  );
}
