import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Simple connectivity check
    const result = await prisma.$queryRaw<Array<{ ok: number }>>`SELECT 1 as ok`;
    return NextResponse.json({ status: "ok", result }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      {
        status: "error",
        message: error?.message || "DB connection failed",
      },
      { status: 500 }
    );
  }
}
