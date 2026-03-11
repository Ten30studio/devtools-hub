import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { withApiAuth } from "@/lib/api-auth";

const ALGOS: Record<string, string> = {
  "SHA-1": "sha1",
  "SHA-256": "sha256",
  "SHA-384": "sha384",
  "SHA-512": "sha512",
  "MD5": "md5",
};

export const POST = withApiAuth(async (req: NextRequest) => {
  try {
    const { input, algorithm } = await req.json();
    if (typeof input !== "string") {
      return NextResponse.json({ error: { code: "INVALID_INPUT", message: "input must be a string" } }, { status: 400 });
    }
    const algo = algorithm || "SHA-256";
    const nodeAlgo = ALGOS[algo];
    if (!nodeAlgo) {
      return NextResponse.json({ error: { code: "INVALID_ALGORITHM", message: `Supported: ${Object.keys(ALGOS).join(", ")}` } }, { status: 400 });
    }
    const hash = createHash(nodeAlgo).update(input).digest("hex");
    return NextResponse.json({ result: { algorithm: algo, hash } });
  } catch {
    return NextResponse.json({ error: { code: "INVALID_REQUEST", message: "Invalid request body" } }, { status: 400 });
  }
});
