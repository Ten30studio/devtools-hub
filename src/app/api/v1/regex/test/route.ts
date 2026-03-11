import { NextRequest, NextResponse } from "next/server";
import { withApiAuth } from "@/lib/api-auth";

export const POST = withApiAuth(async (req: NextRequest) => {
  try {
    const { pattern, flags, input } = await req.json();
    if (typeof pattern !== "string" || typeof input !== "string") {
      return NextResponse.json({ error: { code: "INVALID_INPUT", message: "pattern and input must be strings" } }, { status: 400 });
    }
    const re = new RegExp(pattern, typeof flags === "string" ? flags : "g");
    const matches: { match: string; index: number; groups: string[] }[] = [];
    let m;
    if ((typeof flags === "string" ? flags : "g").includes("g")) {
      while ((m = re.exec(input)) !== null) {
        matches.push({ match: m[0], index: m.index, groups: m.slice(1) });
        if (!m[0]) re.lastIndex++;
      }
    } else {
      m = re.exec(input);
      if (m) matches.push({ match: m[0], index: m.index, groups: m.slice(1) });
    }
    return NextResponse.json({ result: { matches, count: matches.length } });
  } catch (e) {
    return NextResponse.json({ error: { code: "INVALID_REGEX", message: (e as Error).message } }, { status: 400 });
  }
});
