import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service - DevTools Hub",
  description: "Terms that apply when you use DevTools Hub free tools, API, or Pro subscription.",
  robots: { index: false, follow: false },
};

export default function TermsPage() {
  return (
    <article className="max-w-3xl mx-auto py-8 space-y-6">
      <header className="space-y-2 pb-6 border-b border-border">
        <p className="text-sm text-accent font-medium uppercase tracking-wider">Legal</p>
        <h1 className="text-4xl font-bold text-foreground">Terms of Service</h1>
        <p className="text-sm text-muted">Last updated: 24 May 2026 · Ten30 LLC, Arlington, Texas</p>
      </header>

      <p className="text-foreground leading-relaxed">
        These terms apply when you use <strong>tools.ten30studio.com</strong> ("DevTools Hub", "we", "us"). By using the site, the free tools, the API, or the Pro subscription, you agree to them. DevTools Hub is operated by Ten30 LLC; the parent Ten30 Studio Terms at{" "}
        <a href="https://ten30studio.com/terms" className="text-accent hover:underline">ten30studio.com/terms</a>{" "}
        cover the main site.
      </p>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-foreground">What we offer</h2>
        <ul className="list-disc pl-6 space-y-1 text-foreground">
          <li><strong>Free in-browser tools</strong>: 19 developer utilities (JSON, Base64, JWT, etc.) that run entirely client-side</li>
          <li><strong>Free API tier</strong>: 100 requests / hour for casual automation</li>
          <li><strong>Pro subscription</strong>: $9 / month for 10,000 requests / hour plus API key management and priority support</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-foreground">Free tier: "as is", no SLA</h2>
        <p className="text-foreground leading-relaxed">
          Free tools and the free API tier are provided "as is" and "as available", without warranties of any kind and without any uptime, availability, or performance guarantee. We may rate-limit, suspend, or remove free-tier access at any time for any reason, including operational, security, or abuse-prevention reasons.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-foreground">Pro subscription: billing &amp; cancellation</h2>
        <ul className="list-disc pl-6 space-y-1 text-foreground">
          <li><strong>Billing</strong>: $9 USD per month, billed in advance at the start of each cycle via Stripe</li>
          <li><strong>Auto-renewal</strong>: subscriptions auto-renew until cancelled</li>
          <li><strong>Cancellation</strong>: cancel any time from your account (or by emailing <a href="mailto:admin@ten30studio.com" className="text-accent hover:underline">admin@ten30studio.com</a>); cancellation takes effect at the end of the current billing cycle, and you retain Pro access until then</li>
          <li><strong>Refunds</strong>: partial-month refunds are not provided as standard. If you cancel within 7 days of your first Pro charge and have not made meaningful use of the Pro quota, we will refund the first month on request</li>
          <li><strong>Failed payments</strong>: Stripe will retry. After 14 days of failed retries, the subscription is cancelled and the account is downgraded to free tier</li>
          <li><strong>Price changes</strong>: at least 30 days' email notice before any price change; you may cancel before the new price takes effect</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-foreground">Pro SLA (best-effort, not contractual)</h2>
        <p className="text-foreground leading-relaxed">
          We aim for 99% monthly API availability for Pro subscribers, measured over each calendar month, but we do not currently offer a contractual SLA or service credit. If you require a contractual SLA, contact us at <a href="mailto:admin@ten30studio.com?subject=DevTools%20Hub%20-%20Enterprise" className="text-accent hover:underline">admin@ten30studio.com</a> for Enterprise terms.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-foreground">Acceptable use</h2>
        <p className="text-foreground leading-relaxed">When using DevTools Hub, you agree not to:</p>
        <ul className="list-disc pl-6 space-y-1 text-foreground">
          <li>Exceed rate limits, attempt to circumvent rate limiting, or use multiple accounts to bypass quota</li>
          <li>Use the API for sustained high-volume automation beyond your tier without contacting us first</li>
          <li>Attempt to disrupt, overload, scrape, reverse-engineer, or interfere with the service or its infrastructure</li>
          <li>Use the service to process unlawful content or to violate the rights of others</li>
          <li>Resell, sublicense, or repackage the API service as a competing offering</li>
          <li>Use the service in jurisdictions or for purposes prohibited by US export controls or sanctions</li>
        </ul>
        <p className="text-foreground leading-relaxed">We may suspend or terminate access for material breach. We will notify you by email if practical.</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-foreground">API keys</h2>
        <p className="text-foreground leading-relaxed">
          You are responsible for keeping your API keys secret. Activity authenticated by your API key is treated as your activity for billing, rate-limiting, and abuse purposes. Rotate or revoke compromised keys immediately via your account dashboard. We may suspend keys we believe to be compromised or abused.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-foreground">Intellectual property</h2>
        <p className="text-foreground leading-relaxed">
          DevTools Hub, its source code (where not open-sourced), brand marks, and user-facing copy are owned by Ten30 LLC. Pro subscription grants you a personal or business-use licence to access the Pro tier of the service, not ownership of the software or any related IP. Source code published on our GitHub is licensed under the licence stated in the repository.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-foreground">No warranty &amp; limitation of liability</h2>
        <p className="text-foreground leading-relaxed">
          The service is provided "as is" and "as available", without warranties of any kind, express or implied. We do not warrant the service will be uninterrupted, error-free, or fit for any particular purpose. To the fullest extent permitted by law, our total liability for any claim relating to DevTools Hub is limited to the amount you paid us in the 12 months preceding the claim. We are not liable for indirect, incidental, consequential, or special damages, including loss of data, revenue, or business.
        </p>
        <p className="text-foreground leading-relaxed">
          Nothing in these terms excludes or limits liability that cannot be excluded under applicable law.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-foreground">Third-party tools</h2>
        <p className="text-foreground leading-relaxed">
          The free in-browser tools process data you provide. We are not responsible for the accuracy or completeness of the tools' output. For any tool involving security or cryptographic operations (JWT decode, Hash, Password, Base64), verify with authoritative sources for production use.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-foreground">Indemnification</h2>
        <p className="text-foreground leading-relaxed">
          You agree to indemnify and hold harmless Ten30 LLC from any claim or demand arising out of your breach of these terms, your misuse of the service, or your use of the service to violate the rights of others.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-foreground">Changes</h2>
        <p className="text-foreground leading-relaxed">We may update these terms. The "last updated" date above shows when they last changed. Material changes will be flagged on this page or by email to active Pro subscribers.</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-foreground">Governing law &amp; venue</h2>
        <p className="text-foreground leading-relaxed">These terms are governed by the laws of the State of Texas, USA. The exclusive venue for any dispute is the state or federal courts located in Tarrant County, Texas, except where a consumer-protection law in your jurisdiction grants you a non-waivable right to sue locally.</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-foreground">Severability &amp; assignment</h2>
        <p className="text-foreground leading-relaxed">If any provision is held unenforceable, the remaining provisions stay in effect. We may assign these terms to a successor in interest; you may not assign your rights without our consent.</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-foreground">Contact</h2>
        <p className="text-foreground leading-relaxed">
          Questions about these terms: <a href="mailto:admin@ten30studio.com" className="text-accent hover:underline">admin@ten30studio.com</a>. Mail: Ten30 LLC, Arlington, Texas, USA.
        </p>
      </section>

      <div className="bg-surface border border-border p-4 text-sm text-muted">
        <strong className="text-foreground">Draft notice:</strong> these terms are drafted by Ten30 to reflect how DevTools Hub currently operates. They are a starting point, not legal advice. Have them reviewed by a qualified attorney before relying on them.
      </div>

      <p className="text-sm text-muted pt-4">
        <Link href="/privacy" className="text-accent hover:underline">Privacy Policy</Link> · <a href="https://ten30studio.com/terms" className="text-accent hover:underline">Parent Ten30 Studio terms</a>
      </p>
    </article>
  );
}
