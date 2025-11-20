"use client";

import React, { useState } from "react";

export default function TeacherLoginPage() {
  const [entering, setEntering] = useState(false);
  const [showEnroll, setShowEnroll] = useState(false);
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [docType, setDocType] = useState("CC");
  const [docNumber, setDocNumber] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [degree, setDegree] = useState("Licenciado");
  const [specialty, setSpecialty] = useState("");
  const [expYears, setExpYears] = useState<string>("0");
  const [subjects, setSubjects] = useState("");
  const [availability, setAvailability] = useState("Jornada completa");
  const [address, setAddress] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [emgName, setEmgName] = useState("");
  const [emgPhone, setEmgPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [loginName, setLoginName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [logging, setLogging] = useState(false);

  function readUsers(): Record<string, { fullName: string; password: string }> {
    try {
      const raw = localStorage.getItem("teacher_users");
      if (!raw) return {};
      const parsed = JSON.parse(raw);
      return typeof parsed === "object" && parsed ? parsed : {};
    } catch {
      return {};
    }
  }

  function writeUsers(users: Record<string, { fullName: string; password: string }>) {
    try { localStorage.setItem("teacher_users", JSON.stringify(users)); } catch {}
  }

  return (
    <main className="p-6">
      <div className="max-w-xl mx-auto bg-white/70 backdrop-blur rounded-3xl p-6 shadow-sm border">
        <div className="flex flex-col items-center text-center">
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white text-2xl">🎓</div>
          <h1 className="mt-3 text-2xl font-bold text-emerald-700">Acceso de Docente</h1>
        </div>

        <div className="mt-6">
          <button
            type="button"
            onClick={() => setShowEnroll((s) => !s)}
            className="mt-3 w-full rounded-2xl border border-emerald-600 text-emerald-700 py-3 font-semibold hover:bg-emerald-50"
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
                if (!/.+@.+\..+/.test(email)) { setError("Correo electrónico inválido."); return; }
                if (phone.trim().length < 7) { setError("Teléfono inválido."); return; }
                const years = Number(expYears);
                if (isNaN(years) || years < 0 || years > 60) { setError("Años de experiencia inválidos."); return; }
                if (specialty.trim().length < 3) { setError("Especifica tu especialidad o área."); return; }
                if (subjects.trim().length < 3) { setError("Indica las asignaturas que puedes dictar."); return; }
                if (password.length < 6) { setError("La contraseña debe tener al menos 6 caracteres."); return; }
                if (password !== confirm) { setError("Las contraseñas no coinciden."); return; }
                setSaving(true);
                try {
                  const key = fullName.trim().toLowerCase();
                  const users = readUsers();
                  users[key] = { fullName: fullName.trim(), password };
                  writeUsers(users);
                  localStorage.setItem("teacher_demo_user", fullName.trim());
                  localStorage.setItem("teacher_doc", JSON.stringify({ type: docType, number: docNumber.trim() }));
                  localStorage.setItem("teacher_profile", JSON.stringify({ email: email.trim(), phone: phone.trim(), degree, specialty: specialty.trim(), expYears: years, subjects: subjects.trim(), availability, address: address.trim(), birthdate, emergency: { name: emgName.trim(), phone: emgPhone.trim() } }));
                  window.location.href = "/docente";
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
                  className="w-full rounded-2xl border px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Tu nombre y apellidos"
                  required
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Tipo de documento</label>
                  <select value={docType} onChange={(e) => setDocType(e.target.value)} className="w-full rounded-2xl border px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500">
                    <option value="CC">Cédula de Ciudadanía</option>
                    <option value="CE">Cédula de Extranjería</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm text-gray-700 mb-1">Número de documento</label>
                  <input value={docNumber} onChange={(e) => setDocNumber(e.target.value)} className="w-full rounded-2xl border px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="1234567890" required />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Correo electrónico</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-2xl border px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="correo@ejemplo.com" required />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Teléfono</label>
                  <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full rounded-2xl border px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Ej: 3123456789" required />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Formación</label>
                  <select value={degree} onChange={(e) => setDegree(e.target.value)} className="w-full rounded-2xl border px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500">
                    <option>Normalista</option>
                    <option>Licenciado</option>
                    <option>Especialista</option>
                    <option>Magíster</option>
                    <option>Doctor</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm text-gray-700 mb-1">Especialidad/Área</label>
                  <input value={specialty} onChange={(e) => setSpecialty(e.target.value)} className="w-full rounded-2xl border px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Ej: Matemáticas, Lengua Castellana" required />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Años de experiencia</label>
                  <input type="number" min="0" max="60" value={expYears} onChange={(e) => setExpYears(e.target.value)} className="w-full rounded-2xl border px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500" required />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm text-gray-700 mb-1">Asignaturas que puede dictar</label>
                  <input value={subjects} onChange={(e) => setSubjects(e.target.value)} className="w-full rounded-2xl border px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Ej: Matemáticas, Física" required />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Disponibilidad</label>
                  <select value={availability} onChange={(e) => setAvailability(e.target.value)} className="w-full rounded-2xl border px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500">
                    <option>Mañana</option>
                    <option>Tarde</option>
                    <option>Jornada completa</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Dirección (opcional)</label>
                  <input value={address} onChange={(e) => setAddress(e.target.value)} className="w-full rounded-2xl border px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Calle 123 #45-67" />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Fecha de nacimiento (opcional)</label>
                  <input type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} className="w-full rounded-2xl border px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Contacto de emergencia (nombre, opcional)</label>
                  <input value={emgName} onChange={(e) => setEmgName(e.target.value)} className="w-full rounded-2xl border px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Nombre completo" />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Teléfono de emergencia (opcional)</label>
                  <input value={emgPhone} onChange={(e) => setEmgPhone(e.target.value)} className="w-full rounded-2xl border px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Ej: 3001234567" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Contraseña</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-2xl border px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
                  className="w-full rounded-2xl border px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Repite tu contraseña"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={saving}
                className="w-full rounded-2xl bg-gradient-to-r from-emerald-600 to-green-600 text-white py-3 font-semibold hover:opacity-95 disabled:opacity-60"
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
                  localStorage.setItem("teacher_demo_user", u.fullName);
                  window.location.href = "/docente";
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
                  className="w-full rounded-2xl border px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
                  className="w-full rounded-2xl border px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Tu contraseña"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={logging}
                className="w-full rounded-2xl bg-gradient-to-r from-emerald-600 to-green-600 text-white py-3 font-semibold hover:opacity-95 disabled:opacity-60"
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
