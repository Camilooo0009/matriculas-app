"use client";

import { useMemo, useState } from "react";

export default function TeacherRegisterPage() {
  const [form, setForm] = useState({
    fullName: "",
    document: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
    accept: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState<{ email: string } | null>(null);

  const valid = useMemo(() => {
    return (
      form.fullName.trim().length > 3 &&
      form.document.trim().length >= 6 &&
      /.+@.+\..+/.test(form.email) &&
      (form.phone === "" || form.phone.trim().length >= 7) &&
      form.password.length >= 6 &&
      form.password === form.confirm &&
      form.accept
    );
  }, [form]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) {
      if (form.password !== form.confirm) setError("Las contraseñas no coinciden.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/docentes/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName,
          document: form.document,
          email: form.email,
          phone: form.phone || null,
          password: form.password,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message || "No se pudo registrar el docente");
      }
      const data = await res.json();
      try { localStorage.setItem("teacher_demo_user", form.fullName.trim()); } catch {}
      setOk({ email: data?.email });
    } catch (err: any) {
      setError(err?.message || "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  if (ok) {
    return (
      <main className="p-6">
        <div className="max-w-xl mx-auto rounded-3xl bg-white/95 backdrop-blur p-6 shadow-lg border-2 border-black/70 text-gray-900">
          <h1 className="text-2xl font-semibold text-gray-900">Registro exitoso</h1>
          <p className="text-sm text-gray-800 mt-2">La cuenta del docente fue creada correctamente.</p>
          <div className="mt-3 text-sm">
            Correo de acceso: <span className="font-medium">{ok.email}</span>
          </div>
          <a href="/login/docente" className="mt-4 inline-flex items-center rounded-xl bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700">Ir al login de Docente</a>
        </div>
      </main>
    );
  }

  return (
    <main className="p-6">
      <div className="max-w-2xl mx-auto rounded-3xl bg-white/95 backdrop-blur p-6 shadow-lg border-2 border-black/70 text-gray-900">
        <h1 className="text-2xl font-semibold text-gray-900">Registro de Docente</h1>
        <p className="text-gray-800">Crea tu cuenta para acceder al panel de Docente</p>

        <form onSubmit={onSubmit} className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-900">Nombre completo</label>
            <input className="mt-1 w-full rounded-md border-2 border-black bg-white px-3 py-2 text-gray-900 placeholder-gray-500" placeholder="Escribe tu nombre y apellidos" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900">Documento</label>
            <input className="mt-1 w-full rounded-md border-2 border-black bg-white px-3 py-2 text-gray-900 placeholder-gray-500" placeholder="Número de documento" value={form.document} onChange={(e) => setForm({ ...form, document: e.target.value })} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900">Teléfono (opcional)</label>
            <input className="mt-1 w-full rounded-md border-2 border-black bg-white px-3 py-2 text-gray-900 placeholder-gray-500" placeholder="Número de contacto" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Correo</label>
            <input type="email" className="mt-1 w-full rounded-md border-2 border-black bg-white px-3 py-2 text-gray-900 placeholder-gray-500" placeholder="tucorreo@colegio.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input type="password" className="mt-1 w-full rounded-md border-2 border-black bg-white px-3 py-2 text-gray-900 placeholder-gray-500" placeholder="Mínimo 6 caracteres" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
            <p className="text-xs text-gray-700 mt-1">Mínimo 6 caracteres.</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Confirmar contraseña</label>
            <input type="password" className={`mt-1 w-full rounded-md border-2 bg-white px-3 py-2 text-gray-900 placeholder-gray-500 ${form.confirm && form.confirm !== form.password ? 'border-red-500' : 'border-black'}`} placeholder="Repite tu contraseña" value={form.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.value })} required />
            {form.confirm && form.confirm !== form.password ? <p className="text-xs text-red-700 mt-1">Las contraseñas no coinciden.</p> : null}
          </div>

          {error ? <div className="sm:col-span-2 rounded-md border-2 border-red-500 bg-red-50 p-2 text-sm text-red-700">{error}</div> : null}

          <div className="sm:col-span-2 flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input type="checkbox" checked={form.accept} onChange={(e) => setForm({ ...form, accept: e.target.checked })} />
              Acepto tratamiento de datos personales.
            </label>
            <button type="submit" disabled={!valid || loading} aria-busy={loading} className="inline-flex items-center rounded-xl bg-indigo-700 px-4 py-2 text-white hover:bg-indigo-800 disabled:opacity-50 border-2 border-black">
              {loading ? "Registrando..." : "Registrar Docente"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
