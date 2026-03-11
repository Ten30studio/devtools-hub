import { NextRequest, NextResponse } from "next/server";
import { withApiAuth } from "@/lib/api-auth";

export const POST = withApiAuth(async (req: NextRequest) => {
  try {
    const { input } = await req.json();
    if (typeof input !== "string") {
      return NextResponse.json({ error: { code: "INVALID_INPUT", message: "input must be a string" } }, { status: 400 });
    }
    const parts = input.trim().split(".");
    if (parts.length !== 3) {
      return NextResponse.json({ error: { code: "INVALID_JWT", message: "JWT must have 3 parts" } }, { status: 400 });
    }
    const header = JSON.parse(Buffer.from(parts[0], "base64url").toString());
    const payload = JSON.parse(Buffer.from(parts[1], "base64url").toString());
    return NextResponse.json({ result: { header, payload, signature: parts[2] } });
  } catch {
    return NextResponse.json({ error: { code: "INVALID_JWT", message: "Could not decode JWT" } }, { status: 400 });
  }
});
