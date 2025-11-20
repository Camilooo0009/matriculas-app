import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const grades = [
      { name: "Prejardín", tuitionMonthlyCents: 90000, enrollmentFeeCents: 120000 },
      { name: "Jardín", tuitionMonthlyCents: 90000, enrollmentFeeCents: 120000 },
      { name: "Transición", tuitionMonthlyCents: 95000, enrollmentFeeCents: 120000 },
      { name: "Primero", tuitionMonthlyCents: 100000, enrollmentFeeCents: 150000 },
      { name: "Segundo", tuitionMonthlyCents: 100000, enrollmentFeeCents: 150000 },
      { name: "Tercero", tuitionMonthlyCents: 105000, enrollmentFeeCents: 150000 },
      { name: "Cuarto", tuitionMonthlyCents: 105000, enrollmentFeeCents: 150000 },
      { name: "Quinto", tuitionMonthlyCents: 110000, enrollmentFeeCents: 160000 },
      { name: "Sexto", tuitionMonthlyCents: 115000, enrollmentFeeCents: 160000 },
      { name: "Séptimo", tuitionMonthlyCents: 115000, enrollmentFeeCents: 160000 },
      { name: "Octavo", tuitionMonthlyCents: 120000, enrollmentFeeCents: 170000 },
      { name: "Noveno", tuitionMonthlyCents: 120000, enrollmentFeeCents: 170000 },
      { name: "Décimo", tuitionMonthlyCents: 125000, enrollmentFeeCents: 180000 },
      { name: "Undécimo", tuitionMonthlyCents: 130000, enrollmentFeeCents: 190000 },
    ];

    let upserts = 0;
    for (const g of grades) {
      await prisma.grade.upsert({
        where: { name: g.name },
        update: {
          tuitionMonthlyCents: g.tuitionMonthlyCents,
          enrollmentFeeCents: g.enrollmentFeeCents,
        },
        create: {
          name: g.name,
          tuitionMonthlyCents: g.tuitionMonthlyCents,
          enrollmentFeeCents: g.enrollmentFeeCents,
        },
      });
      upserts++;
    }

    return NextResponse.json({ status: "ok", upserts }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { status: "error", message: error?.message || "seed failed" },
      { status: 500 }
    );
  }
}
