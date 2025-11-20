"use client";

import { useMemo, useState } from "react";

const DOC_TYPES = [
  { id: "TI", name: "Tarjeta de Identidad" },
  { id: "RC", name: "Registro Civil" },
  { id: "CC", name: "Cédula de Ciudadanía" },
  { id: "CE", name: "Cédula de Extranjería" },
];

const GRADES = [
  "Prejardín",
  "Jardín",
  "Transición",
  "Primero",
  "Segundo",
  "Tercero",
  "Cuarto",
  "Quinto",
  "Sexto",
  "Séptimo",
  "Octavo",
  "Noveno",
  "Décimo",
  "Undécimo",
];

export default function StudentQuickEnrollmentPage() {
  const [form, setForm] = useState({
    sFirst: "",
    sLast: "",
    sDocType: "TI",
    sDoc: "",
    grade: "",
    gFirst: "",
    gLast: "",
    gEmail: "",
    gPhone: "",
    password: "",
    confirm: "",
    accept: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState<{ email: string; enrollmentId?: string } | null>(null);

  const valid = useMemo(() => {
    return (
      form.sFirst.trim().length > 1 &&
      form.sLast.trim().length > 1 &&
      form.sDoc.trim().length >= 6 &&
      form.grade !== "" &&
      form.gFirst.trim().length > 1 &&
      form.gLast.trim().length > 1 &&
      /.+@.+\..+/.test(form.gEmail) &&
      (form.gPhone === "" || form.gPhone.trim().length >= 7) &&
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
      const res = await fetch("/api/matriculas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentName: `${form.sFirst} ${form.sLast}`.trim(),
          studentDoc: form.sDoc,
          gradeName: form.grade,
          guardianName: `${form.gFirst} ${form.gLast}`.trim(),
          guardianEmail: form.gEmail,
          guardianPhone: form.gPhone || null,
          comments: `docType=${form.sDocType}`,
          accountPassword: form.password,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.message || "No se pudo registrar la matrícula");
      try { localStorage.setItem("student_demo_name", `${form.sFirst} ${form.sLast}`.trim()); } catch {}
      setOk({ email: data?.account?.email ?? form.gEmail, enrollmentId: data?.enrollmentId });
    } catch (err: any) {
      setError(err?.message || "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  if (ok) {
    return (
      <main className="p-6">
        <div className="max-w-2xl mx-auto rounded-3xl bg-white/95 backdrop-blur p-6 shadow-lg border-2 border-black/70 text-gray-900">
          <h1 className="text-2xl font-semibold">Matrícula enviada</h1>
          <p className="text-sm mt-2">Revisaremos tu solicitud. Ya puedes iniciar sesión con el correo del acudiente y la contraseña creada.</p>
          <div className="mt-3 text-sm">
            <div><span className="font-medium">Correo:</span> {ok.email}</div>
            {ok.enrollmentId ? (<div><span className="font-medium">ID matrícula:</span> {ok.enrollmentId}</div>) : null}
          </div>
          <a href="/login/estudiante" className="mt-4 inline-flex items-center rounded-xl bg-fuchsia-600 px-4 py-2 text-white hover:bg-fuchsia-700">Ir al login de Estudiante</a>
        </div>
      </main>
    );
  }

  return (
    <main className="p-6">
      <div className="max-w-3xl mx-auto rounded-3xl bg-white/95 backdrop-blur p-6 shadow-lg border-2 border-black/70 text-gray-900">
        <h1 className="text-2xl font-semibold">Matricularme</h1>
        <p className="text-gray-800">Completa los datos del estudiante y del acudiente</p>

        <form onSubmit={onSubmit} className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2 text-sm font-semibold">Datos del Estudiante</div>
          <div>
            <label className="block text-sm font-medium text-gray-900">Nombres</label>
            <input className="mt-1 w-full rounded-md border-2 border-black bg-white px-3 py-2 text-gray-900 placeholder-gray-500" placeholder="Nombres del estudiante" value={form.sFirst} onChange={(e) => setForm({ ...form, sFirst: e.target.value })} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900">Apellidos</label>
            <input className="mt-1 w-full rounded-md border-2 border-black bg-white px-3 py-2 text-gray-900 placeholder-gray-500" placeholder="Apellidos del estudiante" value={form.sLast} onChange={(e) => setForm({ ...form, sLast: e.target.value })} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900">Tipo de documento</label>
            <select className="mt-1 w-full rounded-md border-2 border-black bg-white px-3 py-2 text-gray-900" value={form.sDocType} onChange={(e) => setForm({ ...form, sDocType: e.target.value })}>
              {DOC_TYPES.map((t) => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900">Número de documento</label>
            <input className="mt-1 w-full rounded-md border-2 border-black bg-white px-3 py-2 text-gray-900 placeholder-gray-500" placeholder="1234567890" value={form.sDoc} onChange={(e) => setForm({ ...form, sDoc: e.target.value })} required />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-900">Grado al que entra</label>
            <select className="mt-1 w-full rounded-md border-2 border-black bg-white px-3 py-2 text-gray-900" value={form.grade} onChange={(e) => setForm({ ...form, grade: e.target.value })} required>
              <option value="">Selecciona un grado</option>
              {GRADES.map((g) => (<option key={g} value={g}>{g}</option>))}
            </select>
          </div>

          <div className="sm:col-span-2 text-sm font-semibold mt-2">Datos del Acudiente</div>
          <div>
            <label className="block text-sm font-medium text-gray-900">Nombres</label>
            <input className="mt-1 w-full rounded-md border-2 border-black bg-white px-3 py-2 text-gray-900 placeholder-gray-500" placeholder="Nombres del acudiente" value={form.gFirst} onChange={(e) => setForm({ ...form, gFirst: e.target.value })} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900">Apellidos</label>
            <input className="mt-1 w-full rounded-md border-2 border-black bg-white px-3 py-2 text-gray-900 placeholder-gray-500" placeholder="Apellidos del acudiente" value={form.gLast} onChange={(e) => setForm({ ...form, gLast: e.target.value })} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900">Correo</label>
            <input type="email" className="mt-1 w-full rounded-md border-2 border-black bg-white px-3 py-2 text-gray-900 placeholder-gray-500" placeholder="correo@ejemplo.com" value={form.gEmail} onChange={(e) => setForm({ ...form, gEmail: e.target.value })} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900">Teléfono</label>
            <input className="mt-1 w-full rounded-md border-2 border-black bg-white px-3 py-2 text-gray-900 placeholder-gray-500" placeholder="Teléfono de contacto" value={form.gPhone} onChange={(e) => setForm({ ...form, gPhone: e.target.value })} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900">Contraseña de acceso</label>
            <input type="password" className="mt-1 w-full rounded-md border-2 border-black bg-white px-3 py-2 text-gray-900 placeholder-gray-500" placeholder="Mínimo 6 caracteres" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
            <p className="text-xs text-gray-700 mt-1">Úsala para iniciar sesión como estudiante</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900">Confirmar contraseña</label>
            <input type="password" className={`mt-1 w-full rounded-md border-2 bg-white px-3 py-2 text-gray-900 placeholder-gray-500 ${form.confirm && form.confirm !== form.password ? 'border-red-500' : 'border-black'}`} placeholder="Repite tu contraseña" value={form.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.value })} required />
            {form.confirm && form.confirm !== form.password ? <p className="text-xs text-red-700 mt-1">Las contraseñas no coinciden.</p> : null}
          </div>

          {error ? <div className="sm:col-span-2 rounded-md border-2 border-red-500 bg-red-50 p-2 text-sm text-red-700">{error}</div> : null}

          <div className="sm:col-span-2 flex items-center justify-between mt-1">
            <label className="flex items-center gap-2 text-sm text-gray-900">
              <input type="checkbox" checked={form.accept} onChange={(e) => setForm({ ...form, accept: e.target.checked })} />
              Acepto tratamiento de datos personales.
            </label>
            <button type="submit" disabled={!valid || loading} aria-busy={loading} className="inline-flex items-center rounded-xl bg-fuchsia-700 px-4 py-2 text-white hover:bg-fuchsia-800 disabled:opacity-50 border-2 border-black">
              {loading ? "Enviando..." : "Enviar matrícula"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
