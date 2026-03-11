import { NextRequest, NextResponse } from "next/server";
import { withApiAuth } from "@/lib/api-auth";

export const POST = withApiAuth(async (req: NextRequest) => {
  try {
    const { input } = await req.json();
    if (typeof input !== "string") {
      return NextResponse.json({ error: { code: "INVALID_INPUT", message: "input must be a string" } }, { status: 400 });
    }
    const formatted = JSON.stringify(JSON.parse(input), null, 2);
    return NextResponse.json({ result: formatted });
  } catch {
    return NextResponse.json({ error: { code: "INVALID_JSON", message: "Invalid JSON input" } }, { status: 400 });
  }
});
