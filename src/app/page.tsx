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
  {
    name: "CSS Gradient Generator",
    desc: "Create beautiful CSS gradients with a visual editor",
    href: "/gradient",
  },
  {
    name: "HTML Entity Encoder",
    desc: "Encode and decode HTML entities and special characters",
    href: "/html-entities",
  },
  {
    name: "JSON to TypeScript",
    desc: "Convert JSON objects to TypeScript interfaces instantly",
    href: "/json-to-ts",
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
      <div className="mt-16 border-t border-border pt-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-3">Built for AI Agents &amp; Automation</h2>
          <p className="text-muted text-sm max-w-xl mx-auto">
            Every tool available as a REST API. Generate a free API key and integrate
            into your agent workflows, CI/CD pipelines, or automation systems.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-8">
          <div className="text-center p-4">
            <div className="text-2xl font-bold text-accent">19+</div>
            <div className="text-sm text-muted">API Endpoints</div>
          </div>
          <div className="text-center p-4">
            <div className="text-2xl font-bold text-accent">100/hr</div>
            <div className="text-sm text-muted">Free Requests</div>
          </div>
          <div className="text-center p-4">
            <div className="text-2xl font-bold text-accent">&lt;50ms</div>
            <div className="text-sm text-muted">Avg Response</div>
          </div>
        </div>
        <div className="flex justify-center gap-3">
          <Link
            href="/api-keys"
            className="inline-block px-6 py-2.5 bg-accent hover:bg-accent-hover text-white rounded-lg text-sm font-medium transition-colors"
          >
            Get API Key
          </Link>
          <Link
            href="/docs"
            className="inline-block px-6 py-2.5 bg-surface hover:bg-surface-hover border border-border rounded-lg text-sm font-medium transition-colors"
          >
            View API Docs
          </Link>
        </div>
      </div>
    </div>
  );
}
