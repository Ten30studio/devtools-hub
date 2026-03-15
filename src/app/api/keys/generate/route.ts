import { NextResponse } from "next/server";
import { generateApiKey } from "@/lib/api-keys";

export async function POST() {
  const key = generateApiKey("free");
  return NextResponse.json({
    apiKey: key,
    tier: "free",
    rateLimit: 100,
    message:
      "Save this key — it cannot be recovered. Include it as X-API-Key header in your requests.",
  });
}
