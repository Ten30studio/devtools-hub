import { NextRequest, NextResponse } from "next/server";

const RATE_LIMITS = {
  free: { requests: 100, windowMs: 60 * 60 * 1000 },
  paid: { requests: 10000, windowMs: 60 * 60 * 1000 },
};

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function getRateLimitKey(req: NextRequest, apiKey: string | null): string {
  if (apiKey) return `key:${apiKey}`;
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "unknown";
  return `ip:${ip}`;
}

function checkRateLimit(
  key: string,
  tier: "free" | "paid"
): { allowed: boolean; remaining: number; resetAt: number } {
  const limit = RATE_LIMITS[tier];
  const now = Date.now();
  const entry = rateLimitStore.get(key);

  if (!entry || now >= entry.resetAt) {
    const resetAt = now + limit.windowMs;
    rateLimitStore.set(key, { count: 1, resetAt });
    return { allowed: true, remaining: limit.requests - 1, resetAt };
  }

  if (entry.count >= limit.requests) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt };
  }

  entry.count++;
  return {
    allowed: true,
    remaining: limit.requests - entry.count,
    resetAt: entry.resetAt,
  };
}

function validateApiKey(key: string): boolean {
  const validKeys = process.env.API_KEYS?.split(",").map((k) => k.trim()) || [];
  return validKeys.includes(key);
}

export function withApiAuth(
  handler: (req: NextRequest) => Promise<NextResponse>
) {
  return async (req: NextRequest): Promise<NextResponse> => {
    const apiKey = req.headers.get("x-api-key");
    const tier = apiKey && validateApiKey(apiKey) ? "paid" : "free";

    if (apiKey && tier === "free") {
      return NextResponse.json(
        { error: { code: "INVALID_API_KEY", message: "Invalid API key" } },
        { status: 401 }
      );
    }

    const rateLimitKey = getRateLimitKey(req, tier === "paid" ? apiKey : null);
    const { allowed, remaining, resetAt } = checkRateLimit(rateLimitKey, tier);

    if (!allowed) {
      const res = NextResponse.json(
        {
          error: {
            code: "RATE_LIMITED",
            message: `Rate limit exceeded. Resets at ${new Date(resetAt).toISOString()}`,
          },
        },
        { status: 429 }
      );
      res.headers.set("X-RateLimit-Remaining", "0");
      res.headers.set("X-RateLimit-Reset", String(Math.ceil(resetAt / 1000)));
      res.headers.set("Retry-After", String(Math.ceil((resetAt - Date.now()) / 1000)));
      return res;
    }

    const response = await handler(req);
    response.headers.set("X-RateLimit-Remaining", String(remaining));
    response.headers.set("X-RateLimit-Reset", String(Math.ceil(resetAt / 1000)));
    response.headers.set("X-RateLimit-Tier", tier);
    return response;
  };
}
