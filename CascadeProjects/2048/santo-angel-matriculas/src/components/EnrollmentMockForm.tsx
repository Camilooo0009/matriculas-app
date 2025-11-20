"use client";

import { useMemo, useState } from "react";

const GRADES = [
  { id: "prejardin", name: "Prejardín" },
  { id: "jardin", name: "Jardín" },
  { id: "transicion", name: "Transición" },
  { id: "primero", name: "Primero" },
  { id: "segundo", name: "Segundo" },
  { id: "tercero", name: "Tercero" },
  { id: "cuarto", name: "Cuarto" },
  { id: "quinto", name: "Quinto" },
  { id: "sexto", name: "Sexto" },
  { id: "septimo", name: "Séptimo" },
  { id: "octavo", name: "Octavo" },
  { id: "noveno", name: "Noveno" },
  { id: "decimo", name: "Décimo" },
  { id: "undecimo", name: "Undécimo" },
];


export default function EnrollmentMockForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [folio] = useState(() => Math.random().toString(36).slice(2, 8).toUpperCase());
  const [error, setError] = useState<string | null>(null);
  const [enrollmentId, setEnrollmentId] = useState<string | null>(null);
  const [account, setAccount] = useState<{ email: string | null; tempPassword: string | null; userCreated: boolean } | null>(null);
  const [form, setForm] = useState({
    studentName: "",
    studentDoc: "",
    studentPassword: "",
    studentPasswordConfirm: "",
    gradeId: "",
    guardianName: "",
    guardianEmail: "",
    guardianPhone: "",
    comments: "",
    acceptPolicy: false,
  });

  const valid = useMemo(() => {
    return (
      form.studentName.trim().length > 3 &&
      form.studentDoc.trim().length >= 6 &&
      form.studentPassword.trim().length >= 6 &&
      form.studentPassword === form.studentPasswordConfirm &&
      form.gradeId !== "" &&
      form.guardianName.trim().length > 3 &&
      /.+@.+\..+/.test(form.guardianEmail) &&
      form.acceptPolicy
    );
  }, [form]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) {
      if (form.studentPassword !== form.studentPasswordConfirm) {
        setError("Las contraseñas no coinciden.");
      }
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const gradeName = GRADES.find((g) => g.id === form.gradeId)?.name;
      const res = await fetch("/api/matriculas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentName: form.studentName,
          studentDoc: form.studentDoc,
          accountPassword: form.studentPassword,
          gradeName,
          guardianName: form.guardianName,
          guardianEmail: form.guardianEmail,
          guardianPhone: form.guardianPhone,
          comments: form.comments,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message || "No se pudo registrar la matrícula");
      }
      const data = await res.json();
      setEnrollmentId(data?.enrollmentId ?? null);
      setAccount(data?.account ?? null);
      setSubmitted(true);
    } catch (err: any) {
      setError(err?.message || "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="mt-4 rounded-md border p-4 bg-emerald-50">
        <h3 className="text-lg font-semibold">Matrícula registrada (simulada)</h3>
        <p className="text-sm text-gray-700 mt-2">
          Tu solicitud ha sido recibida para revisión por Secretaría. No genera ningún cobro ni registro real.
        </p>
        <div className="mt-3 space-y-1 text-sm">
          <div><span className="font-medium">Folio:</span> {folio}</div>
          {enrollmentId ? (
            <div><span className="font-medium">ID de matrícula:</span> {enrollmentId}</div>
          ) : null}
          <div><span className="font-medium">Estudiante:</span> {form.studentName} ({form.studentDoc})</div>
          <div><span className="font-medium">Grado:</span> {GRADES.find(g => g.id === form.gradeId)?.name}</div>
          <div><span className="font-medium">Acudiente:</span> {form.guardianName}</div>
          <div><span className="font-medium">Correo:</span> {form.guardianEmail}</div>
          {form.comments ? (
            <div><span className="font-medium">Observaciones:</span> {form.comments}</div>
          ) : null}
        </div>

        {account?.email ? (
          <div className="mt-4 rounded-xl border border-blue-200 bg-blue-50 p-3 text-blue-900">
            <div className="font-medium">Credenciales de acceso</div>
            <div className="text-sm mt-1">Correo: <span className="font-medium">{account.email}</span></div>
            <div className="text-sm">Usa la contraseña que acabas de crear para ingresar.</div>
            <a href="/login" className="mt-2 inline-flex items-center rounded-md border px-3 py-1.5 text-gray-900 hover:bg-gray-100">Ir al login</a>
          </div>
        ) : null}
        <button
          className="mt-4 inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          onClick={() => setSubmitted(false)}
        >
          Registrar otra matrícula
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-4 grid grid-cols-1 gap-4 max-w-2xl">
      <div>
        <h3 className="text-lg font-semibold">Datos del estudiante</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Nombre completo</label>
          <input
            className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900"
            value={form.studentName}
            onChange={(e) => setForm({ ...form, studentName: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Documento</label>
          <input
            className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900"
            value={form.studentDoc}
            onChange={(e) => setForm({ ...form, studentDoc: e.target.value })}
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium">Crea tu contraseña de acceso</label>
        <input
          type="password"
          className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900"
          placeholder="********"
          value={form.studentPassword}
          onChange={(e) => setForm({ ...form, studentPassword: e.target.value })}
          required
        />
        <p className="text-xs text-gray-500 mt-1">Mínimo 6 caracteres. Úsala para ingresar en el login con tu correo del acudiente.</p>
      </div>
      <div>
        <label className="block text-sm font-medium">Confirma tu contraseña</label>
        <input
          type="password"
          className={`mt-1 w-full rounded-md border bg-white px-3 py-2 text-gray-900 ${form.studentPasswordConfirm && form.studentPassword !== form.studentPasswordConfirm ? 'border-red-400' : 'border-gray-300'}`}
          placeholder="********"
          value={form.studentPasswordConfirm}
          onChange={(e) => setForm({ ...form, studentPasswordConfirm: e.target.value })}
          required
          aria-invalid={form.studentPasswordConfirm && form.studentPassword !== form.studentPasswordConfirm ? 'true' : 'false'}
        />
        {form.studentPasswordConfirm && form.studentPassword !== form.studentPasswordConfirm ? (
          <p className="text-xs text-red-600 mt-1">Las contraseñas no coinciden.</p>
        ) : null}
      </div>
      <div>
        <label className="block text-sm font-medium">Grado</label>
        <select
          className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900"
          value={form.gradeId}
          onChange={(e) => setForm({ ...form, gradeId: e.target.value })}
          required
        >
          <option value="">Selecciona un grado</option>
          {GRADES.map((g) => (
            <option key={g.id} value={g.id}>{g.name}</option>
          ))}
        </select>
      </div>

      <div className="mt-2">
        <h3 className="text-lg font-semibold">Datos del acudiente</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Nombre completo</label>
          <input
            className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900"
            value={form.guardianName}
            onChange={(e) => setForm({ ...form, guardianName: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Correo</label>
          <input
            type="email"
            className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900"
            value={form.guardianEmail}
            onChange={(e) => setForm({ ...form, guardianEmail: e.target.value })}
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium">Teléfono</label>
        <input
          className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900"
          value={form.guardianPhone}
          onChange={(e) => setForm({ ...form, guardianPhone: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Observaciones (opcional)</label>
        <textarea
          className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900"
          rows={3}
          value={form.comments}
          onChange={(e) => setForm({ ...form, comments: e.target.value })}
        />
      </div>

      {error ? (
        <div className="rounded-md border border-red-200 bg-red-50 p-2 text-sm text-red-700">{error}</div>
      ) : null}
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.acceptPolicy}
            onChange={(e) => setForm({ ...form, acceptPolicy: e.target.checked })}
          />
          Acepto el tratamiento de datos personales (Habeas Data) y términos.
        </label>
        <button
          type="submit"
          disabled={!valid || loading}
          aria-busy={loading}
          className="inline-flex items-center rounded-md bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700 disabled:opacity-50"
        >
          {loading ? "Enviando..." : "Registrar matrícula"}
        </button>
      </div>
    </form>
  );
}
