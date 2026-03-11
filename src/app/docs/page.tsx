export default function DocsPage() {
  const endpoints = [
    { method: "POST", path: "/api/v1/json/format", body: '{ "input": "{...}" }' },
    { method: "POST", path: "/api/v1/json/validate", body: '{ "input": "{...}" }' },
    { method: "POST", path: "/api/v1/base64/encode", body: '{ "input": "text" }' },
    { method: "POST", path: "/api/v1/base64/decode", body: '{ "input": "dGV4dA==" }' },
    { method: "POST", path: "/api/v1/url/encode", body: '{ "input": "hello world" }' },
    { method: "POST", path: "/api/v1/url/decode", body: '{ "input": "hello%20world" }' },
    { method: "POST", path: "/api/v1/jwt/decode", body: '{ "input": "eyJ..." }' },
    { method: "POST", path: "/api/v1/hash", body: '{ "input": "text", "algorithm": "SHA-256" }' },
    { method: "POST", path: "/api/v1/regex/test", body: '{ "pattern": "[a-z]+", "flags": "g", "input": "test 123" }' },
  ];

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold mb-2">API Documentation</h1>
      <p className="text-muted mb-8">
        All endpoints accept and return JSON. Include your API key via the{" "}
        <code className="text-accent">x-api-key</code> header.
      </p>

      <div className="mb-6 p-4 rounded-lg bg-surface border border-border">
        <h2 className="text-sm font-semibold mb-2">Rate Limits</h2>
        <ul className="text-sm text-muted space-y-1">
          <li>Free tier: 100 requests / hour</li>
          <li>Paid tier: 10,000 requests / hour</li>
        </ul>
      </div>

      <div className="space-y-4">
        {endpoints.map((ep) => (
          <div
            key={ep.path}
            className="p-4 rounded-lg bg-surface border border-border"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold px-2 py-0.5 bg-accent/20 text-accent rounded">
                {ep.method}
              </span>
              <code className="text-sm">{ep.path}</code>
            </div>
            <pre className="text-xs text-muted font-mono">{ep.body}</pre>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 rounded-lg bg-surface border border-border">
        <h2 className="text-sm font-semibold mb-2">Error Format</h2>
        <pre className="text-xs text-muted font-mono">
{`{
  "error": {
    "code": "INVALID_INPUT",
    "message": "Description of what went wrong"
  }
}`}
        </pre>
      </div>
    </div>
  );
}
