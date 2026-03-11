import { NextRequest, NextResponse } from "next/server";
import { withApiAuth } from "@/lib/api-auth";

export const POST = withApiAuth(async (req: NextRequest) => {
  try {
    const { input } = await req.json();
    if (typeof input !== "string") {
      return NextResponse.json({ error: { code: "INVALID_INPUT", message: "input must be a string" } }, { status: 400 });
    }
    return NextResponse.json({ result: decodeURIComponent(input) });
  } catch {
    return NextResponse.json({ error: { code: "INVALID_REQUEST", message: "Invalid request body" } }, { status: 400 });
  }
});
