import { NextRequest, NextResponse } from "next/server";
import { withApiAuth } from "@/lib/api-auth";

export const POST = withApiAuth(async (req: NextRequest) => {
  try {
    const { input } = await req.json();
    if (typeof input !== "string") {
      return NextResponse.json({ error: { code: "INVALID_INPUT", message: "input must be a string" } }, { status: 400 });
    }
    const encoded = Buffer.from(input, "utf-8").toString("base64");
    return NextResponse.json({ result: encoded });
  } catch {
    return NextResponse.json({ error: { code: "INVALID_REQUEST", message: "Invalid request body" } }, { status: 400 });
  }
});
