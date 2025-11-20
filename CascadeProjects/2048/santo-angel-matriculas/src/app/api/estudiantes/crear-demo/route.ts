import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const DEFAULT_EMAIL = "estudiante.demo@santoangel.edu";
const DEFAULT_PASSWORD = "Demo1234!";

async function createDemoUser(email: string, password: string) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string | undefined;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string | undefined;
  if (!supabaseUrl || !serviceKey) {
    throw new Error("Faltan credenciales del servidor Supabase");
  }

  const admin = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data, error } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: {
      role: "ESTUDIANTE",
      fullName: "Estudiante Demo",
    },
  });

  if (error) {
    const msg = error.message || "No se pudo crear el usuario demo";
    // Hacer idempotente: si el usuario ya existe, considerar éxito
    if (msg.toLowerCase().includes("already") || msg.toLowerCase().includes("exists")) {
      return email;
    }
    throw new Error(msg);
  }

  return data?.user?.email ?? email;
}

export async function GET() {
  try {
    const email = await createDemoUser(DEFAULT_EMAIL, DEFAULT_PASSWORD);
    return NextResponse.json({ status: "ok", email }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ status: "error", message: err?.message || "Error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const email = body?.email || DEFAULT_EMAIL;
    const password = body?.password || DEFAULT_PASSWORD;
    const resultEmail = await createDemoUser(email, password);
    return NextResponse.json({ status: "ok", email: resultEmail }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ status: "error", message: err?.message || "Error" }, { status: 500 });
  }
}

