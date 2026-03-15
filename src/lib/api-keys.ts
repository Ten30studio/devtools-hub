import { createHmac, randomBytes } from "crypto";

const TIERS = ["free", "pro"] as const;
type Tier = (typeof TIERS)[number];

const RATE_LIMITS: Record<Tier, number> = {
  free: 100,
  pro: 10000,
};

function getSecret(): string {
  return process.env.API_KEY_SECRET || "dev-secret-not-for-production";
}

function sign(data: string): string {
  return createHmac("sha256", getSecret()).update(data).digest("hex").slice(0, 16);
}

export function generateApiKey(tier: Tier = "free"): string {
  const id = randomBytes(12).toString("hex");
  const payload = `${tier}:${id}`;
  const sig = sign(payload);
  return `dth_${tier}_${id}_${sig}`;
}

export function validateApiKey(key: string): {
  valid: boolean;
  tier: Tier;
  rateLimit: number;
} {
  const parts = key.split("_");
  if (parts.length !== 4 || parts[0] !== "dth") {
    return { valid: false, tier: "free", rateLimit: RATE_LIMITS.free };
  }

  const tier = parts[1] as Tier;
  if (!TIERS.includes(tier)) {
    return { valid: false, tier: "free", rateLimit: RATE_LIMITS.free };
  }

  const id = parts[2];
  const sig = parts[3];
  const expectedSig = sign(`${tier}:${id}`);

  if (sig !== expectedSig) {
    return { valid: false, tier: "free", rateLimit: RATE_LIMITS.free };
  }

  return { valid: true, tier, rateLimit: RATE_LIMITS[tier] };
}

export function getRateLimit(tier: Tier): number {
  return RATE_LIMITS[tier];
}
