import Link from "next/link";

const tools = [
  {
    name: "JSON Formatter",
    desc: "Format, minify, and validate JSON data",
    href: "/json",
  },
  {
    name: "Base64 Encode/Decode",
    desc: "Encode and decode Base64 strings",
    href: "/base64",
  },
  {
    name: "URL Encode/Decode",
    desc: "Encode and decode URL components",
    href: "/url",
  },
  {
    name: "JWT Decoder",
    desc: "Decode and inspect JSON Web Tokens",
    href: "/jwt",
  },
  {
    name: "Hash Generator",
    desc: "Generate SHA-1, SHA-256, SHA-384, SHA-512 hashes",
    href: "/hash",
  },
  {
    name: "Regex Tester",
    desc: "Test regular expressions with real-time matching",
    href: "/regex",
  },
  {
    name: "Timestamp Converter",
    desc: "Convert Unix timestamps to dates and back",
    href: "/timestamp",
  },
  {
    name: "Color Converter",
    desc: "Convert between HEX, RGB, and HSL color formats",
    href: "/color",
  },
  {
    name: "UUID Generator",
    desc: "Generate random UUIDs (v4) in bulk",
    href: "/uuid",
  },
  {
    name: "Lorem Ipsum Generator",
    desc: "Generate placeholder text for designs and layouts",
    href: "/lorem",
  },
  {
    name: "Markdown Preview",
    desc: "Write markdown and see a live rendered preview",
    href: "/markdown",
  },
  {
    name: "Text Diff Checker",
    desc: "Compare two texts and see line-by-line differences",
    href: "/diff",
  },
  {
    name: "Cron Expression Parser",
    desc: "Parse cron expressions with descriptions and next run times",
    href: "/cron",
  },
  {
    name: "Password Generator",
    desc: "Generate strong, cryptographically random passwords",
    href: "/password",
  },
  {
    name: "QR Code Generator",
    desc: "Generate QR codes from text or URLs with custom sizes",
    href: "/qrcode",
  },
  {
    name: "YAML ↔ JSON Converter",
    desc: "Convert between YAML and JSON formats instantly",
    href: "/yaml",
  },
];

export default function Home() {
  return (
    <div className="py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">
          Developer Tools,{" "}
          <span className="text-accent">Instantly</span>
        </h1>
        <p className="text-muted text-lg max-w-xl mx-auto">
          Free, fast, client-side developer utilities. No sign-up, no tracking,
          no data leaves your browser.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="block p-6 rounded-xl border border-border bg-surface hover:bg-surface-hover hover:border-accent/40 transition-all group"
          >
            <h2 className="text-lg font-semibold mb-2 group-hover:text-accent transition-colors">
              {tool.name}
            </h2>
            <p className="text-muted text-sm">{tool.desc}</p>
          </Link>
        ))}
      </div>
      <div className="mt-16 text-center border-t border-border pt-8">
        <h2 className="text-xl font-semibold mb-3">Need these tools via API?</h2>
        <p className="text-muted text-sm mb-4">
          Access all tools programmatically. 100 free requests/hour.
        </p>
        <Link
          href="/docs"
          className="inline-block px-6 py-2.5 bg-accent hover:bg-accent-hover text-white rounded-lg text-sm font-medium transition-colors"
        >
          View API Docs
        </Link>
      </div>
    </div>
  );
}
