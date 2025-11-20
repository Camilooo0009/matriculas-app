"use client";

export default function TeacherHomePage() {
  const kpis = [
    { title: "Mis Estudiantes", value: "0", color: "from-emerald-400 to-green-300", text: "text-emerald-700" },
    { title: "Cursos que dicto", value: "0", color: "from-sky-400 to-cyan-300", text: "text-sky-700" },
    { title: "Notas pendientes", value: "0", color: "from-orange-400 to-amber-300", text: "text-orange-700" },
    { title: "Promedio General", value: "0.0", color: "from-violet-400 to-fuchsia-300", text: "text-violet-700" },
  ];

  const clases: Array<{ curso: string; sub: string; horario: string }> = [];

  const tareas: string[] = [];

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold text-emerald-800">¡Hola, Profesor! 👋</h1>
        <p className="text-gray-600">Bienvenido a tu panel docente</p>
      </div>

      <section className="mt-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
        {kpis.map((k) => (
          <div key={k.title} className="rounded-2xl bg-white p-4 shadow-sm">
            <div className={`h-8 w-8 rounded-lg bg-gradient-to-r ${k.color} mb-2`} />
            <div className="text-sm text-gray-600">{k.title}</div>
            <div className={`text-2xl font-semibold ${k.text}`}>{k.value}</div>
          </div>
        ))}
      </section>

      <section className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-2xl bg-white shadow-sm">
          <div className="rounded-t-2xl bg-gradient-to-r from-emerald-600 to-green-600 p-3 text-white font-medium">Mis Clases</div>
          <div className="p-3 space-y-3">
            {clases.length === 0 ? (
              <div className="text-sm text-gray-600 py-6 text-center">Aún no hay clases registradas.</div>
            ) : (
              clases.map((c) => (
                <div key={c.curso} className="rounded-xl border p-3 bg-emerald-50/40">
                  <div className="font-medium text-emerald-900">{c.curso}</div>
                  <div className="text-sm text-gray-600">{c.sub}</div>
                  <div className="mt-1 inline-block text-xs bg-sky-100 text-sky-800 px-2 py-1 rounded">{c.horario}</div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="rounded-2xl bg-white shadow-sm">
          <div className="rounded-t-2xl bg-gradient-to-r from-rose-500 to-orange-500 p-3 text-white font-medium">Tareas Pendientes</div>
          <div className="p-3">
            {tareas.length === 0 ? (
              <div className="text-sm text-gray-600 py-6 text-center">No hay tareas pendientes.</div>
            ) : (
              <ul className="space-y-2">
                {tareas.map((t, i) => (
                  <li key={i} className="rounded-xl border p-3 hover:bg-gray-50 text-sm">{t}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      <div className="mt-4 rounded-2xl bg-emerald-600/80 p-4 text-white shadow-sm">
        <div className="font-semibold">📣 Recordatorio</div>
        <div className="text-sm opacity-95">Aún no hay datos. Cuando registres estudiantes y cursos, verás tu información aquí.</div>
      </div>
    </div>
  );
}
