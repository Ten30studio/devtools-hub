"use client";
import { useState, useMemo } from "react";

function parseMarkdown(md: string): string {
  let html = md
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Code blocks
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, '<pre class="bg-surface-hover p-4 rounded-lg overflow-x-auto my-3"><code>$2</code></pre>');
  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code class="bg-surface-hover px-1.5 py-0.5 rounded text-sm">$1</code>');
  // Headers
  html = html.replace(/^### (.+)$/gm, '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2 class="text-xl font-semibold mt-5 mb-2">$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold mt-6 mb-3">$1</h1>');
  // Bold and italic
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");
  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-accent underline">$1</a>');
  // Unordered lists
  html = html.replace(/^- (.+)$/gm, '<li class="ml-4 list-disc">$1</li>');
  // Ordered lists
  html = html.replace(/^\d+\. (.+)$/gm, '<li class="ml-4 list-decimal">$1</li>');
  // Blockquotes
  html = html.replace(/^&gt; (.+)$/gm, '<blockquote class="border-l-4 border-accent pl-4 py-1 text-muted my-2">$1</blockquote>');
  // Horizontal rules
  html = html.replace(/^---$/gm, '<hr class="border-border my-4" />');
  // Paragraphs (double newline)
  html = html.replace(/\n\n/g, '</p><p class="my-2">');
  html = '<p class="my-2">' + html + "</p>";

  return html;
}

export default function MarkdownPage() {
  const [input, setInput] = useState(`# Hello World

This is a **Markdown** preview tool. Type on the left, see the result on the right.

## Features

- **Bold** and *italic* text
- [Links](https://example.com)
- Code blocks and \`inline code\`
- Lists, blockquotes, and more

> This is a blockquote

\`\`\`js
console.log("Hello from DevTools Hub!");
\`\`\`

---

1. First item
2. Second item
3. Third item
`);

  const rendered = useMemo(() => parseMarkdown(input), [input]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Markdown Preview</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-muted mb-2">Markdown Input</label>
          <textarea
            rows={24}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your markdown here..."
            spellCheck={false}
          />
        </div>
        <div>
          <label className="block text-sm text-muted mb-2">Preview</label>
          <div
            className="p-4 bg-surface border border-border rounded-xl min-h-[28rem] prose-invert"
            dangerouslySetInnerHTML={{ __html: rendered }}
          />
        </div>
      </div>
    </div>
  );
}
