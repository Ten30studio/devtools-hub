import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevTools Hub - Free Developer Utilities",
  description:
    "JSON formatter, Base64 encoder, JWT decoder, hash generator, regex tester, UUID generator, lorem ipsum generator, markdown preview, diff checker, and more. Free online developer tools that run entirely in your browser.",
  keywords: [
    "developer tools",
    "json formatter",
    "base64 encoder",
    "jwt decoder",
    "hash generator",
    "regex tester",
    "timestamp converter",
    "color converter",
    "uuid generator",
    "lorem ipsum generator",
    "markdown preview",
    "text diff checker",
    "online dev tools",
    "free developer utilities",
  ],
  openGraph: {
    title: "DevTools Hub - Free Developer Utilities",
    description:
      "Free, fast, client-side developer utilities. No sign-up, no tracking, no data leaves your browser.",
    type: "website",
    url: "https://ten30studio.github.io/devtools-hub/",
    siteName: "DevTools Hub",
  },
  twitter: {
    card: "summary_large_image",
    title: "DevTools Hub - Free Developer Utilities",
    description:
      "Free, fast, client-side developer utilities. No sign-up, no tracking.",
  },
};

const tools = [
  { name: "JSON", href: "/json" },
  { name: "Base64", href: "/base64" },
  { name: "URL", href: "/url" },
  { name: "JWT", href: "/jwt" },
  { name: "Hash", href: "/hash" },
  { name: "Regex", href: "/regex" },
  { name: "Timestamp", href: "/timestamp" },
  { name: "Color", href: "/color" },
  { name: "UUID", href: "/uuid" },
  { name: "Lorem", href: "/lorem" },
  { name: "Markdown", href: "/markdown" },
  { name: "Diff", href: "/diff" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="border-b border-border bg-surface/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 h-14 flex items-center gap-6">
            <Link
              href="/"
              className="font-bold text-lg text-accent tracking-tight"
            >
              DevTools Hub
            </Link>
            <div className="flex gap-1">
              {tools.map((t) => (
                <Link
                  key={t.href}
                  href={t.href}
                  className="px-3 py-1.5 rounded-md text-sm text-muted hover:text-foreground hover:bg-surface-hover transition-colors"
                >
                  {t.name}
                </Link>
              ))}
            </div>
            <div className="ml-auto flex gap-1">
              <Link
                href="/docs"
                className="px-3 py-1.5 rounded-md text-sm text-muted hover:text-foreground hover:bg-surface-hover transition-colors"
              >
                API Docs
              </Link>
              <Link
                href="/pricing"
                className="px-3 py-1.5 rounded-md text-sm font-medium text-accent hover:bg-accent/10 transition-colors"
              >
                Pricing
              </Link>
            </div>
          </div>
        </nav>
        <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
