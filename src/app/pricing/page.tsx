"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    features: [
      "All web-based tools",
      "100 API requests / hour",
      "Community support",
    ],
    cta: "Get Started",
    ctaHref: "/docs",
    highlighted: false,
    checkout: false,
  },
  {
    name: "Pro",
    price: "$9",
    period: "/ month",
    features: [
      "Everything in Free",
      "10,000 API requests / hour",
      "Priority support",
      "API key management",
      "Usage analytics",
    ],
    cta: "Get Pro API Key",
    ctaHref: "#",
    highlighted: true,
    checkout: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    features: [
      "Everything in Pro",
      "Unlimited API requests",
      "Dedicated support",
      "SLA guarantee",
      "Custom tools & integrations",
    ],
    cta: "Contact Us",
    ctaHref: "mailto:sales@devtoolshub.com?subject=Enterprise",
    highlighted: false,
    checkout: false,
  },
];

function PricingContent() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const success = searchParams.get("success");
  const cancelled = searchParams.get("cancelled");

  async function handleCheckout() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Checkout unavailable");
      }
    } catch {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="py-16">
      {success && (
        <div className="mb-8 p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-center text-green-400">
          Payment successful. Your Pro API key will be emailed shortly.
        </div>
      )}
      {cancelled && (
        <div className="mb-8 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30 text-center text-yellow-400">
          Checkout cancelled. No charge was made.
        </div>
      )}
      <div className="text-center mb-16">
        <h1 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h1>
        <p className="text-muted text-lg max-w-xl mx-auto">
          Free tools for everyone. Pay only when you need high-volume API access.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-xl border p-8 flex flex-col ${
              plan.highlighted
                ? "border-accent bg-accent/5 ring-1 ring-accent/20"
                : "border-border bg-surface"
            }`}
          >
            <h2 className="text-xl font-bold mb-1">{plan.name}</h2>
            <div className="mb-6">
              <span className="text-3xl font-bold">{plan.price}</span>
              {plan.period && (
                <span className="text-muted text-sm ml-1">{plan.period}</span>
              )}
            </div>
            <ul className="space-y-3 mb-8 flex-1">
              {plan.features.map((f) => (
                <li key={f} className="text-sm flex items-start gap-2">
                  <span className="text-accent mt-0.5">&#10003;</span>
                  {f}
                </li>
              ))}
            </ul>
            {plan.checkout ? (
              <button
                onClick={handleCheckout}
                disabled={loading}
                className="block text-center py-2.5 rounded-lg text-sm font-medium transition-colors bg-accent hover:bg-accent-hover text-white disabled:opacity-50"
              >
                {loading ? "Redirecting..." : plan.cta}
              </button>
            ) : (
              <Link
                href={plan.ctaHref}
                className={`block text-center py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  plan.highlighted
                    ? "bg-accent hover:bg-accent-hover text-white"
                    : "bg-surface-hover hover:bg-border text-foreground"
                }`}
              >
                {plan.cta}
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PricingPage() {
  return (
    <Suspense>
      <PricingContent />
    </Suspense>
  );
}
