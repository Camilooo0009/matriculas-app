import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, document, email, phone, password } = body ?? {};

    if (!fullName || !document || !email || !password) {
      return NextResponse.json({ status: "error", message: "Datos incompletos" }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string | undefined;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string | undefined;
    if (!supabaseUrl || !serviceKey) {
      return NextResponse.json({ status: "error", message: "Faltan credenciales del servidor" }, { status: 500 });
    }

    const admin = createClient(supabaseUrl, serviceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const { data, error } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        role: "DOCENTE",
        fullName,
        document,
        phone: phone ?? null,
      },
    });

    if (error) {
      // Si ya existe el usuario, responder con conflicto para que use "olvidé mi contraseña".
      const msg = error.message || "No se pudo crear el usuario";
      return NextResponse.json({ status: "error", message: msg }, { status: 409 });
    }

    return NextResponse.json({ status: "ok", email: data?.user?.email ?? email }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ status: "error", message: err?.message || "Error inesperado" }, { status: 500 });
  }
}
