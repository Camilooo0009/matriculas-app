"use client";

import React, { useState } from "react";

export default function StudentLoginPage() {
  const [entering, setEntering] = useState(false);
  const [showEnroll, setShowEnroll] = useState(false);
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [docType, setDocType] = useState("TI");
  const [docNumber, setDocNumber] = useState("");
  const [gFirst, setGFirst] = useState("");
  const [gLast, setGLast] = useState("");
  const [gEmail, setGEmail] = useState("");
  const [gPhone, setGPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [loginName, setLoginName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [logging, setLogging] = useState(false);

  function readUsers(): Record<string, { fullName: string; password: string }> {
    try {
      const raw = localStorage.getItem("student_users");
      if (!raw) return {};
      const parsed = JSON.parse(raw);
      return typeof parsed === "object" && parsed ? parsed : {};
    } catch {
      return {};
    }
  }

  function writeUsers(users: Record<string, { fullName: string; password: string }>) {
    try { localStorage.setItem("student_users", JSON.stringify(users)); } catch {}
  }

  return (
    <main className="p-6">
      <div className="max-w-xl mx-auto bg-white/70 backdrop-blur rounded-3xl p-6 shadow-sm border">
        <div className="flex flex-col items-center text-center">
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-fuchsia-500 to-pink-500 flex items-center justify-center text-white text-2xl">🏫</div>
          <h1 className="mt-3 text-2xl font-bold text-pink-700">Acceso de Estudiante</h1>
        </div>

        <div className="mt-6">
          <button
            type="button"
            onClick={() => setShowEnroll((s) => !s)}
            className="mt-3 w-full rounded-2xl border border-pink-600 text-pink-700 py-3 font-semibold hover:bg-pink-50"
          >
            {showEnroll ? "Ocultar formulario" : "Matricularme"}
          </button>

          {showEnroll && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setError(null);
                if (fullName.trim().length < 3) { setError("Escribe tu nombre completo."); return; }
                if (!docNumber || docNumber.trim().length < 6) { setError("Número de documento inválido."); return; }
                if (gFirst.trim().length < 2 || gLast.trim().length < 2) { setError("Completa los nombres del acudiente."); return; }
                if (!/.+@.+\..+/.test(gEmail)) { setError("Correo del acudiente inválido."); return; }
                if (gPhone && gPhone.trim().length < 7) { setError("Teléfono del acudiente inválido."); return; }
                if (password.length < 6) { setError("La contraseña debe tener al menos 6 caracteres."); return; }
                if (password !== confirm) { setError("Las contraseñas no coinciden."); return; }
                setSaving(true);
                try {
                  const key = fullName.trim().toLowerCase();
                  const users = readUsers();
                  users[key] = { fullName: fullName.trim(), password };
                  writeUsers(users);
                  localStorage.setItem("student_demo_name", fullName.trim());
                  localStorage.setItem("student_doc", JSON.stringify({ type: docType, number: docNumber.trim() }));
                  localStorage.setItem("student_guardian", JSON.stringify({ first: gFirst.trim(), last: gLast.trim(), email: gEmail.trim(), phone: gPhone.trim() }));
                  window.location.href = "/dashboard";
                } catch {
                  setError("No se pudo guardar el usuario en este navegador.");
                } finally {
                  setSaving(false);
                }
              }}
              className="mt-4 space-y-3 border rounded-2xl p-4"
            >
              {error && <div className="rounded-xl border border-red-200 bg-red-50 text-red-700 px-3 py-2 text-sm">{error}</div>}
              <div>
                <label className="block text-sm text-gray-700 mb-1">Nombre completo</label>
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full rounded-2xl border px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Tu nombre y apellidos"
                  required
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Tipo de documento</label>
                  <select value={docType} onChange={(e) => setDocType(e.target.value)} className="w-full rounded-2xl border px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-500">
                    <option value="TI">Tarjeta de Identidad</option>
                    <option value="RC">Registro Civil</option>
                    <option value="CC">Cédula de Ciudadanía</option>
                    <option value="CE">Cédula de Extranjería</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm text-gray-700 mb-1">Número de documento</label>
                  <input value={docNumber} onChange={(e) => setDocNumber(e.target.value)} className="w-full rounded-2xl border px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-500" placeholder="1234567890" required />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Nombres del acudiente</label>
                  <input value={gFirst} onChange={(e) => setGFirst(e.target.value)} className="w-full rounded-2xl border px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-500" placeholder="Nombres" required />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Apellidos del acudiente</label>
                  <input value={gLast} onChange={(e) => setGLast(e.target.value)} className="w-full rounded-2xl border px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-500" placeholder="Apellidos" required />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Correo del acudiente</label>
                  <input type="email" value={gEmail} onChange={(e) => setGEmail(e.target.value)} className="w-full rounded-2xl border px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-500" placeholder="correo@ejemplo.com" required />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Teléfono del acudiente (opcional)</label>
                  <input value={gPhone} onChange={(e) => setGPhone(e.target.value)} className="w-full rounded-2xl border px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-500" placeholder="Ej: 3123456789" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Contraseña</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-2xl border px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Mínimo 6 caracteres"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Confirmar contraseña</label>
                <input
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className="w-full rounded-2xl border px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Repite tu contraseña"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={saving}
                className="w-full rounded-2xl bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white py-3 font-semibold hover:opacity-95 disabled:opacity-60"
              >
                {saving ? "Guardando..." : "Crear acceso e ingresar"}
              </button>
            </form>
          )}

          <button
            type="button"
            onClick={() => setShowLogin((s) => !s)}
            className="mt-3 w-full rounded-2xl border border-gray-300 text-gray-800 py-3 font-semibold hover:bg-gray-50"
          >
            {showLogin ? "Ocultar login" : "Ya tengo cuenta"}
          </button>

          {showLogin && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setLoginError(null);
                setLogging(true);
                try {
                  const users = readUsers();
                  const key = loginName.trim().toLowerCase();
                  const u = users[key];
                  if (!u || u.password !== loginPassword) {
                    setLoginError("Nombre o contraseña incorrectos.");
                    return;
                  }
                  localStorage.setItem("student_demo_name", u.fullName);
                  window.location.href = "/dashboard";
                } catch {
                  setLoginError("No se pudo leer la cuenta en este navegador.");
                } finally {
                  setLogging(false);
                }
              }}
              className="mt-3 space-y-3 border rounded-2xl p-4"
            >
              {loginError && <div className="rounded-xl border border-red-200 bg-red-50 text-red-700 px-3 py-2 text-sm">{loginError}</div>}
              <div>
                <label className="block text-sm text-gray-700 mb-1">Nombre completo</label>
                <input
                  value={loginName}
                  onChange={(e) => setLoginName(e.target.value)}
                  className="w-full rounded-2xl border px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Tu nombre y apellidos"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Contraseña</label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full rounded-2xl border px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Tu contraseña"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={logging}
                className="w-full rounded-2xl bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white py-3 font-semibold hover:opacity-95 disabled:opacity-60"
              >
                {logging ? "Ingresando..." : "Iniciar sesión"}
              </button>
            </form>
          )}

          <a href="/login" className="mt-3 block text-center rounded-2xl border px-4 py-2 text-gray-700 hover:bg-gray-50">← Volver</a>
        </div>
      </div>
    </main>
  );
}

