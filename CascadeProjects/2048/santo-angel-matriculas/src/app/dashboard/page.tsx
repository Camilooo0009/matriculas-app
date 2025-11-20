"use client";

import { useEffect, useMemo, useState } from "react";

type Activity = { title: string; sub?: string; date?: string };

export default function DashboardPage() {
  const [studentName, setStudentName] = useState<string>("María");
  const [query, setQuery] = useState("");
  const [docs, setDocs] = useState<Array<{ name: string; type: string; size: number }>>([]);
  const [grades, setGrades] = useState<Array<{ subject: string; score: number }>>([]);
  const [gSubject, setGSubject] = useState("Matemáticas");
  const [gScore, setGScore] = useState("");
  const [payments, setPayments] = useState<Array<{ concept: string; amount: number; date: string; status: "Pagado" | "Pendiente" }>>([]);
  const [pConcept, setPConcept] = useState("");
  const [pAmount, setPAmount] = useState("");
  const [pDate, setPDate] = useState<string>(new Date().toISOString().slice(0,10));
  const [pStatus, setPStatus] = useState<"Pagado" | "Pendiente">("Pendiente");

  useEffect(() => {
    try {
      const n = localStorage.getItem("student_demo_name");
      if (n) setStudentName(n.split(" ")[0]);
    } catch {}
  }, []);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("student_documents");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setDocs(parsed);
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("student_grades");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setGrades(parsed);
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("student_payments");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setPayments(parsed);
      }
    } catch {}
  }, []);

  const kpis = useMemo(
    () => ([
      { title: "Promedio General", value: "0.0", note: "Sin datos", color: "from-amber-400 to-yellow-300", text: "text-amber-600" },
      { title: "Asistencia", value: "0%", note: "Sin datos", color: "from-emerald-400 to-green-300", text: "text-emerald-600" },
      { title: "Tareas Entregadas", value: "0/0", note: "Sin datos", color: "from-sky-400 to-cyan-300", text: "text-sky-700" },
      { title: "Logros", value: "0", note: "Sin datos", color: "from-indigo-400 to-violet-300", text: "text-indigo-700" },
    ]),
    []
  );

  const activities = useMemo<Activity[]>(() => [], []);
  const filteredDocs = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return docs;
    return docs.filter((d) => d.name.toLowerCase().includes(q));
  }, [docs, query]);
  const showGrades = useMemo(() => /(nota|calific)/i.test(query), [query]);
  const showPayments = useMemo(() => /(pago|pensi[oó]n|mensualidad)/i.test(query), [query]);
  const SUBJECTS = useMemo(() => [
    "Matemáticas",
    "Lengua Castellana",
    "Ciencias Naturales",
    "Ciencias Sociales",
    "Inglés",
    "Educación Física",
    "Arte",
    "Tecnología",
    "Religión"
  ], []);

  function handleFiles(files: FileList | File[]) {
    const arr = Array.from(files);
    if (!arr.length) return;
    const added = arr.map((f) => ({ name: f.name, type: f.type || "", size: f.size }));
    const next = [...docs, ...added];
    setDocs(next);
    try { localStorage.setItem("student_documents", JSON.stringify(next)); } catch {}
  }

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    handleFiles(e.target.files);
    e.target.value = "";
  }

  function addGrade(e: React.FormEvent) {
    e.preventDefault();
    const subj = gSubject.trim();
    const val = Number(gScore);
    if (!subj || isNaN(val) || val < 0 || val > 5) return;
    const next = [...grades, { subject: subj, score: Math.round(val * 100) / 100 }];
    setGrades(next);
    try { localStorage.setItem("student_grades", JSON.stringify(next)); } catch {}
    setGSubject("");
    setGScore("");
  }

  function addPayment(e: React.FormEvent) {
    e.preventDefault();
    const concept = pConcept.trim();
    const amount = Number(pAmount);
    if (!concept || isNaN(amount) || amount <= 0) return;
    const next = [...payments, { concept, amount: Math.round(amount * 100) / 100, date: pDate, status: pStatus }];
    setPayments(next);
    try { localStorage.setItem("student_payments", JSON.stringify(next)); } catch {}
    setPConcept("");
    setPAmount("");
  }

  function payOnline(idx: number) {
    setPayments((prev) => {
      const next = prev.map((p, i) => i === idx ? { ...p, status: "Pagado", date: p.date || new Date().toISOString().slice(0,10) } : p);
      try { localStorage.setItem("student_payments", JSON.stringify(next)); } catch {}
      return next;
    });
  }

  return (
    <div>
      {/* Topbar */}
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-white/80 backdrop-blur px-4 py-2 shadow border text-gray-800 text-sm font-semibold flex items-center gap-2">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-pink-100">👋</span>
          <span>¡Hola, {studentName}!</span>
          <span>✨</span>
        </div>
        <div className="flex-1">
          <div className="rounded-full bg-white/80 backdrop-blur px-2 py-2 shadow border flex items-center gap-2 text-gray-600">
            <span className="ml-2">🔍</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar documentos por nombre"
              className="w-full bg-transparent outline-none text-sm text-gray-700"
            />
            <label className="shrink-0 mr-1">
              <span className="cursor-pointer inline-flex items-center rounded-xl bg-indigo-600 text-white text-xs px-3 py-1 hover:opacity-95">Subir</span>
              <input type="file" onChange={handleUpload} className="hidden" multiple />
            </label>
          </div>
        </div>
        <div className="rounded-2xl bg-white/80 backdrop-blur px-3 py-2 shadow border text-sm text-gray-800 flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-indigo-100">🧑🏻‍🎓</span>
          <span className="font-medium">{studentName}</span>
        </div>
      </div>

      {/* Panel de subida al escribir 'documentos' */}
      {query.trim().toLowerCase().includes("documento") && (
        <section
          className="mt-3 rounded-2xl bg-white shadow-md border border-dashed border-indigo-300"
          onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
          onDrop={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (e.dataTransfer?.files?.length) {
              handleFiles(e.dataTransfer.files);
            }
          }}
        >
          <div className="rounded-t-2xl bg-gradient-to-r from-indigo-600 to-fuchsia-600 p-3 text-white font-medium flex items-center gap-2">
            <span>📤</span> <span>Subir documentos</span>
          </div>
          <div className="p-4 text-sm text-gray-700 flex items-center justify-between gap-3">
            <div>
              Arrastra y suelta aquí tus archivos o usa el botón para seleccionarlos.
            </div>
            <label className="shrink-0">
              <span className="cursor-pointer inline-flex items-center rounded-xl bg-indigo-600 text-white text-xs px-3 py-2 hover:opacity-95">Elegir archivos</span>
              <input type="file" onChange={handleUpload} className="hidden" multiple />
            </label>
          </div>
        </section>

      )}

      {/* Panel de pagos al escribir 'pago', 'pensión' o 'mensualidad' */}
      {showPayments && (
        <section className="mt-3 rounded-2xl bg-white shadow-md border border-sky-200">
          <div className="rounded-t-2xl bg-gradient-to-r from-sky-600 to-cyan-600 p-3 text-white font-medium flex items-center gap-2">
            <span>💳</span> <span>Registrar pago (demo)</span>
          </div>
          <form onSubmit={addPayment} className="p-4 grid grid-cols-1 sm:grid-cols-5 gap-3 text-sm">
            <div className="sm:col-span-2">
              <label className="block text-gray-700 mb-1">Concepto</label>
              <input value={pConcept} onChange={(e) => setPConcept(e.target.value)} className="w-full rounded-2xl border px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-500" placeholder="Pensión Febrero" />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Monto</label>
              <input value={pAmount} onChange={(e) => setPAmount(e.target.value)} type="number" min="0" step="0.01" className="w-full rounded-2xl border px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-500" placeholder="150000" />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Fecha</label>
              <input type="date" value={pDate} onChange={(e) => setPDate(e.target.value)} className="w-full rounded-2xl border px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-500" />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Estado</label>
              <select value={pStatus} onChange={(e) => setPStatus(e.target.value as any)} className="w-full rounded-2xl border px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-500">
                <option>Pagado</option>
                <option>Pendiente</option>
              </select>
            </div>
            <div className="sm:col-span-5 flex justify-end">
              <button type="submit" className="rounded-xl bg-sky-600 text-white px-4 py-2 hover:opacity-95">Agregar</button>
            </div>
          </form>
        </section>
      )}

      {/* Listado de pagos */}
      <section className="mt-3 rounded-2xl bg-white shadow-md border border-gray-100">
        <div className="rounded-t-2xl bg-gradient-to-r from-sky-600 to-cyan-600 p-3 text-white font-medium flex items-center gap-2">
          <span>🧾</span> <span>Mis Pagos</span>
        </div>
        <div className="p-3 text-sm">
          {payments.length === 0 ? (
            <div className="text-gray-600 py-4">Aún no tienes pagos registrados.</div>
          ) : (
            <>
              <ul className="divide-y">
                {payments.map((p, i) => (
                  <li key={i} className="py-2 grid grid-cols-2 sm:grid-cols-6 gap-2 items-center">
                    <span className="text-gray-800 col-span-2 sm:col-span-2">{p.concept}</span>
                    <span className="font-semibold text-sky-700">${p.amount.toLocaleString()}</span>
                    <span className="text-gray-600">{p.date}</span>
                    <span className={`inline-flex items-center justify-center rounded-full text-xs px-2 py-[2px] ${p.status === 'Pagado' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{p.status}</span>
                    <button
                      disabled={p.status === 'Pagado'}
                      onClick={() => payOnline(i)}
                      className={`justify-self-end rounded-xl px-3 py-1 text-xs ${p.status === 'Pagado' ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-sky-600 text-white hover:opacity-95'}`}
                    >
                      {p.status === 'Pagado' ? 'Pagado' : 'Pagar en línea'}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="mt-3 flex flex-wrap items-center justify-end gap-4">
                <div className="text-gray-600">Total pagado: <span className="font-semibold text-emerald-700">${payments.filter(p=>p.status==='Pagado').reduce((a,b)=>a+b.amount,0).toLocaleString()}</span></div>
                <div className="text-gray-600">Pendiente: <span className="font-semibold text-amber-700">${payments.filter(p=>p.status==='Pendiente').reduce((a,b)=>a+b.amount,0).toLocaleString()}</span></div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Panel de calificaciones al escribir 'notas' o 'calificaciones' */}
      {showGrades && (
        <section className="mt-3 rounded-2xl bg-white shadow-md border border-emerald-200">
          <div className="rounded-t-2xl bg-gradient-to-r from-emerald-600 to-green-600 p-3 text-white font-medium flex items-center gap-2">
            <span>📝</span> <span>Registrar calificación (demo)</span>
          </div>
          <form onSubmit={addGrade} className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
            <div className="sm:col-span-2">
              <label className="block text-gray-700 mb-1">Materia</label>
              <select value={gSubject} onChange={(e) => setGSubject(e.target.value)} className="w-full rounded-2xl border px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500">
                {SUBJECTS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Nota (0 a 5)</label>
              <input value={gScore} onChange={(e) => setGScore(e.target.value)} type="number" min="0" max="5" step="0.1" className="w-full rounded-2xl border px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Ej: 4.5" />
            </div>
            <div className="sm:col-span-3 flex justify-end">
              <button type="submit" className="rounded-xl bg-emerald-600 text-white px-4 py-2 hover:opacity-95">Agregar</button>
            </div>
          </form>
        </section>
      )}

      {/* Listado de calificaciones */}
      <section className="mt-3 rounded-2xl bg-white shadow-md border border-gray-100">
        <div className="rounded-t-2xl bg-gradient-to-r from-emerald-600 to-green-600 p-3 text-white font-medium flex items-center gap-2">
          <span>📊</span> <span>Mis Calificaciones</span>
        </div>
        <div className="p-3 text-sm">
          <>
            <ul className="divide-y">
              {SUBJECTS.map((s, i) => {
                const arr = grades.filter((g) => g.subject === s);
                const avg = arr.length ? (arr.reduce((a, b) => a + b.score, 0) / arr.length) : null;
                return (
                  <li key={s} className="py-2 flex items-center justify-between">
                    <span className="text-gray-800">{s}</span>
                    <span className={`font-semibold ${avg !== null ? 'text-emerald-700' : 'text-gray-400'}`}>{avg !== null ? avg.toFixed(2) : '—'}</span>
                  </li>
                );
              })}
            </ul>
            <div className="mt-3 flex items-center justify-end gap-2">
              <span className="text-gray-600">Promedio:</span>
              <span className="font-semibold text-emerald-700">{
                (grades.length ? (grades.reduce((a, b) => a + b.score, 0) / grades.length) : 0).toFixed(2)
              }</span>
            </div>
          </>
        </div>
      </section>

      {/* Documentos subidos y resultados (demo) */}
      <section className="mt-3 rounded-2xl bg-white shadow-md border border-gray-100">
        <div className="rounded-t-2xl bg-gradient-to-r from-indigo-600 to-fuchsia-600 p-3 text-white font-medium flex items-center gap-2">
          <span>🔎</span> <span>{query.trim() ? "Resultados de búsqueda" : "Tus documentos"}</span>
        </div>
        <div className="p-3">
          {docs.length === 0 ? (
            <div className="text-sm text-gray-600 py-4">Aún no has subido documentos. Usa el botón "Subir" en la barra de búsqueda.</div>
          ) : filteredDocs.length === 0 ? (
            <div className="text-sm text-gray-600 py-4">No se encontraron documentos que coincidan.</div>
          ) : (
            <ul className="divide-y">
              {filteredDocs.map((d, i) => (
                <li key={i} className="py-2 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <span>📄</span>
                    <span className="font-medium text-gray-800">{d.name}</span>
                    <span className="text-gray-500">{d.type || "archivo"}</span>
                  </div>
                  <span className="text-xs text-gray-500">{Math.max(1, Math.round(d.size / 1024))} KB</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* KPIs (misma fila, scroll horizontal en pantallas pequeñas) */}
      <section className="mt-3 flex gap-4 overflow-x-auto no-scrollbar">
        {kpis.map((k) => (
          <div key={k.title} className="rounded-2xl bg-white p-4 shadow-md border border-gray-100 flex-none min-w-[220px] md:min-w-0 md:flex-1">
            <div className="flex items-start gap-3">
              <div className={`h-9 w-9 rounded-lg bg-gradient-to-r ${k.color}`} />
              <div className="ml-auto text-xl">{k.title === 'Asistencia' ? '✅' : k.title === 'Logros' ? '🏆' : '⭐'}</div>
            </div>
            <div className="mt-2 text-xs text-gray-500">{k.title}</div>
            <div className={`text-2xl font-semibold ${k.text}`}>{k.value}</div>
            <div className="text-xs text-gray-500">{k.note}</div>
          </div>
        ))}
      </section>

      <section className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Actividades Recientes */}
        <div className="rounded-2xl bg-white shadow-md border border-gray-100">
          <div className="rounded-t-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 p-3 text-white font-medium flex items-center gap-2">
            <span>📘</span> <span>Actividades Recientes</span>
          </div>
          <div className="p-3">
            {activities.length === 0 ? (
              <div className="text-sm text-gray-600 py-6 text-center">No hay actividades recientes.</div>
            ) : (
              <ul className="space-y-2">
                {activities.map((a, i) => (
                  <li key={i} className="rounded-xl border p-3 hover:bg-gray-50 flex items-center justify-between">
                    <div>
                      <div className="font-medium">{a.title}{a.sub ? ` — ${a.sub}` : ''}</div>
                      <div className="text-xs text-gray-500">{a.date || ""}</div>
                    </div>
                    <div className="text-lg">📅</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Progreso visual + badges */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-2xl bg-white shadow-md border border-gray-100 p-4 flex flex-col items-center justify-center">
            <div className="text-sm font-medium text-gray-700 self-start mb-2">Tu Progreso Visual</div>
            <div className="relative h-40 w-40">
              <div className="absolute inset-0 rounded-full" style={{ background: `conic-gradient(#22c55e 0% 0%, #e5e7eb 0% 100%)` }} />
              <div className="absolute inset-3 rounded-full bg-white flex items-center justify-center shadow-inner">
                <div className="text-center">
                  <div className="text-2xl font-semibold text-emerald-600">0%</div>
                  <div className="text-xs text-gray-500">Completo</div>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white shadow-md border border-gray-100 p-4">
            <div className="text-sm font-medium text-gray-700 mb-2">Mis Insignias</div>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="rounded-xl border p-3">
                <div className="text-2xl">⭐</div>
                <div className="text-xs mt-1">Estudiante del Mes</div>
              </div>
              <div className="rounded-xl border p-3">
                <div className="text-2xl">📖</div>
                <div className="text-xs mt-1">Lector Incansable</div>
              </div>
              <div className="rounded-xl border p-3">
                <div className="text-2xl">💡</div>
                <div className="text-xs mt-1">Mente Curiosa</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Consejo del día */}
      <div className="mt-4 rounded-2xl bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-pink-500 p-4 text-white shadow-md">
        <div className="font-semibold flex items-center gap-2"><span>📣</span> <span>Consejo del Día</span></div>
        <div className="text-sm opacity-95">Recuerda repasar tus apuntes todos los días, aunque sean 15 minutos. ¡La constancia es clave para el éxito!</div>
      </div>
    </div>
  );
}

function Progress({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="mb-3">
      <div className="flex items-center justify-between text-gray-700">
        <span>{label}</span>
        <span className="text-gray-500">{value}%</span>
      </div>
      <div className="mt-1 h-2 rounded-full bg-gray-100">
        <div className={`h-2 rounded-full ${color}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
