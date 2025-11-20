"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionEmail, setSessionEmail] = useState<string | null>(null);
  const [role, setRole] = useState<"ESTUDIANTE" | "DOCENTE" | "ADMIN" | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data } = await supabase.auth.getUser();
      if (!mounted) return;
      setSessionEmail(data.user?.email ?? null);
    })();
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setSessionEmail(session?.user?.email ?? null);
    });
    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const onSendLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSending(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: window.location.origin,
        },
      });
      if (error) throw error;
      setSent(true);
    } catch (err: any) {
      setError(err?.message || "No se pudo enviar el enlace. Intenta de nuevo.");
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="mx-auto h-14 w-14 rounded-2xl bg-gradient-to-br from-fuchsia-500 to-pink-500 flex items-center justify-center text-white text-2xl">🏫</div>
          <h1 className="mt-4 text-3xl font-bold bg-gradient-to-r from-fuchsia-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">Portal Educativo</h1>
          <p className="text-gray-600">Institución Santo Ángel del Municipio de Flandes Tolima</p>
        </div>

        {sessionEmail ? (
          <div className="max-w-xl mx-auto rounded-md border border-emerald-200 bg-emerald-50 p-4 text-emerald-800">
            Ya has iniciado sesión como <span className="font-medium">{sessionEmail}</span>.
            <div className="mt-3 flex gap-2 justify-center">
              <a href="/dashboard" className="rounded-md bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700">Ir al panel</a>
              <button
                onClick={async () => { await supabase.auth.signOut(); window.location.reload(); }}
                className="rounded-md bg-gray-100 px-4 py-2 hover:bg-gray-200"
              >Cerrar sesión</button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Estudiante */}
            <div className="rounded-2xl p-6 text-white shadow-sm bg-gradient-to-br from-fuchsia-500 to-pink-500">
              <div className="h-12 w-12 rounded-xl bg-white/20 flex items-center justify-center text-2xl mb-3">✨</div>
              <h2 className="text-xl font-semibold">Soy Estudiante</h2>
              <p className="text-white/90 text-sm mt-1">Accede a tus notas, tareas y materiales.</p>
              <ul className="mt-3 text-sm space-y-1 text-white/95">
                <li>⭐ Ver mis calificaciones</li>
                <li>📚 Mis clases</li>
                <li>📄 Subir documentos</li>
                <li>💳 Consultar pagos</li>
              </ul>
              <div className="mt-5">
                <a href="/login/estudiante" className="block w-full text-center rounded-full bg-white text-gray-900 font-medium py-2 hover:bg-white/90">Estudiante 🔒</a>
              </div>
            </div>

            {/* Docente */}
            <div className="rounded-2xl p-6 text-white shadow-sm bg-gradient-to-br from-emerald-500 to-green-600">
              <div className="h-12 w-12 rounded-xl bg-white/20 flex items-center justify-center text-2xl mb-3">🎓</div>
              <h2 className="text-xl font-semibold">Soy Docente</h2>
              <p className="text-white/90 text-sm mt-1">Gestiona tus clases y calificaciones.</p>
              <ul className="mt-3 text-sm space-y-1 text-white/95">
                <li>👥 Ver mis estudiantes</li>
                <li>⬆️ Subir calificaciones</li>
                <li>🗂️ Gestionar cursos</li>
                <li>✏️ Editar notas</li>
              </ul>
              <div className="mt-5">
                <a href="/login/docente" className="block w-full text-center rounded-full bg-white text-gray-900 font-medium py-2 hover:bg-white/90">Docente 🔒</a>
              </div>
            </div>

            {/* Administrador */}
            <div className="rounded-2xl p-6 text-white shadow-sm bg-gradient-to-br from-blue-600 to-indigo-600">
              <div className="h-12 w-12 rounded-xl bg-white/20 flex items-center justify-center text-2xl mb-3">👤</div>
              <h2 className="text-xl font-semibold">Soy Administrador</h2>
              <p className="text-white/90 text-sm mt-1">Gestión completa del colegio.</p>
              <ul className="mt-3 text-sm space-y-1 text-white/95">
                <li>👥 Gestión estudiantes</li>
                <li>🛡️ Control total</li>
                <li>💳 Administrar pagos</li>
                <li>📝 Matrículas</li>
              </ul>
              <div className="mt-5">
                <a href="/login/administrador" className="block w-full text-center rounded-full bg-white text-gray-900 font-medium py-2 hover:bg-white/90">Administrador 🔒</a>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

type CardFormProps = {
  email: string;
  setEmail: (v: string) => void;
  sending: boolean;
  sent: boolean;
  error: string | null;
  onSubmit: (e: React.FormEvent) => Promise<void> | void;
  labelButton: string;
};

function CardForm({ email, setEmail, sending, sent, error, onSubmit, labelButton }: CardFormProps) {
  return (
    <div className="rounded-xl bg-white/15 backdrop-blur p-4">
      {sent ? (
        <div className="rounded-md border border-white/30 bg-white/20 p-3 text-white">
          Te enviamos un enlace a <span className="font-medium">{email}</span>. Revisa tu correo.
        </div>
      ) : (
        <form onSubmit={onSubmit} className="grid gap-3">
          {error ? (
            <div className="rounded-md border border-red-200 bg-red-50 p-2 text-sm text-red-700">{error}</div>
          ) : null}
          <input
            type="email"
            className="mt-1 w-full rounded-md border px-3 py-2 text-gray-900"
            placeholder="tucorreo@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={sending || !/.+@.+\..+/.test(email)}
            aria-busy={sending}
            className="inline-flex items-center justify-center rounded-full bg-white text-gray-900 px-4 py-2 font-medium hover:bg-gray-100 disabled:opacity-60"
          >
            {sending ? "Enviando enlace..." : labelButton}
          </button>
          <p className="text-xs text-white/80">Acceso sin contraseña con enlace mágico.</p>
        </form>
      )}
    </div>
  );
}
