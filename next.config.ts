import type { NextConfig } from "next";

const isGitHubPages = process.env.NEXT_PUBLIC_BASE_PATH === "/devtools-hub";

const nextConfig: NextConfig = {
  ...(isGitHubPages
    ? {
        output: "export",
        basePath: "/devtools-hub",
        images: { unoptimized: true },
      }
    : {}),
};

export default nextConfig;
