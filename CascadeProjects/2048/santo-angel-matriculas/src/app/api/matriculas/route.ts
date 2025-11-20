import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      studentName,
      studentDoc,
      gradeName,
      guardianName,
      guardianEmail,
      guardianPhone,
      comments,
      accountPassword,
    } = body ?? {};

    if (!studentName || !studentDoc || !gradeName || !guardianName || !guardianEmail) {
      return NextResponse.json({ status: "error", message: "Datos incompletos" }, { status: 400 });
    }

    const grade = await prisma.grade.findUnique({ where: { name: gradeName } });
    if (!grade) {
      return NextResponse.json({ status: "error", message: "Grado no encontrado" }, { status: 404 });
    }

    const guardian = await prisma.guardian.upsert({
      where: { email: guardianEmail },
      update: {
        fullName: guardianName,
        phone: guardianPhone ?? undefined,
      },
      create: {
        fullName: guardianName,
        email: guardianEmail,
        phone: guardianPhone ?? undefined,
      },
    });

    const student = await prisma.student.upsert({
      where: { documentNumber: studentDoc },
      update: {
        firstName: studentName,
        lastName: "",
        guardianId: guardian.id,
        gradeId: grade.id,
      },
      create: {
        documentNumber: studentDoc,
        firstName: studentName,
        lastName: "",
        guardianId: guardian.id,
        gradeId: grade.id,
      },
    });

    const currentYear = new Date().getFullYear();
    const enrollment = await prisma.enrollment.create({
      data: {
        studentId: student.id,
        gradeId: grade.id,
        year: currentYear,
        status: "PENDING",
      },
    });

    // Generate tuition charges for pending months in academic year (Feb-Nov)
    const now = new Date();
    const academicMonths = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    const monthsToCreate = academicMonths.filter((m) => m >= now.getMonth() + 1);

    let createdCharges = 0;
    if (monthsToCreate.length > 0) {
      const data = monthsToCreate.map((m) => {
        const dueDate = new Date(currentYear, m - 1, 10, 12, 0, 0);
        return {
          studentId: student.id,
          month: m,
          year: currentYear,
          amountCents: grade.tuitionMonthlyCents,
          discountCents: 0,
          lateFeeCents: 0,
          dueDate,
          paid: false,
          paidAt: null as Date | null,
        };
      });
      const res = await prisma.tuitionCharge.createMany({ data, skipDuplicates: true });
      createdCharges = res.count;
    }

    // Crear cuenta en Supabase Auth con la contraseña elegida
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string | undefined;
    let loginEmail: string | null = guardianEmail ?? null;
    let userCreated = false;

    if (supabaseUrl && serviceKey && guardianEmail && typeof accountPassword === "string" && accountPassword.length >= 6) {
      const admin = createClient(supabaseUrl, serviceKey, {
        auth: { autoRefreshToken: false, persistSession: false },
      });
      try {
        const { data: created, error: cErr } = await admin.auth.admin.createUser({
          email: guardianEmail,
          password: accountPassword,
          email_confirm: true,
          user_metadata: {
            role: "ESTUDIANTE",
            studentId: student.id,
            guardianId: guardian.id,
            gradeId: grade.id,
          },
        });
        if (cErr) {
          // Usuario ya existe: no cambiamos la contraseña aquí.
        } else if (created?.user) {
          userCreated = true;
        }
      } catch {
        // ignore
      }
    }

    return NextResponse.json(
      {
        status: "ok",
        enrollmentId: enrollment.id,
        studentId: student.id,
        guardianId: guardian.id,
        grade: { id: grade.id, name: grade.name },
        createdCharges,
        comments: comments ?? null,
        account: {
          email: loginEmail,
          userCreated,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { status: "error", message: error?.message || "Error creando matrícula" },
      { status: 500 }
    );
  }
}
