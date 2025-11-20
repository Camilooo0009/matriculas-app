"use client";

export default function AdminDashboardPage() {
  const kpis = [
    { title: "Total Estudiantes", value: "0", note: "Sin datos" },
    { title: "Matrículas Activas", value: "0", note: "Sin datos" },
    { title: "Pagos del Mes", value: "COP $0", note: "Sin datos" },
    { title: "Profesores", value: "0", note: "Sin datos" },
  ];

  const pagosRecientes: Array<{ nombre: string; fecha: string; monto: string; estado: string }> = [];

  const matriculasPendientes: Array<{ nombre: string; grado: string; estado: string }> = [];

  return (
    <div>
      <h1 className="text-2xl font-semibold text-indigo-900">Panel de Control</h1>
      <p className="text-gray-600">Resumen general del sistema escolar</p>

      <section className="mt-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
        {kpis.map((k) => (
          <div key={k.title} className="rounded-2xl bg-white p-4 shadow-sm">
            <div className="text-sm text-gray-600">{k.title}</div>
            <div className="text-2xl font-semibold text-indigo-800">{k.value}</div>
            <div className="text-xs text-gray-500">{k.note}</div>
          </div>
        ))}
      </section>

      <section className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-2xl bg-white shadow-sm">
          <div className="rounded-t-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 p-3 text-white font-medium">Pagos Recientes</div>
          <div className="p-3">
            {pagosRecientes.length === 0 ? (
              <div className="text-sm text-gray-600 py-6 text-center">No hay pagos registrados.</div>
            ) : (
              <ul className="space-y-2 text-sm">
                {pagosRecientes.map((p, i) => (
                  <li key={i} className="rounded-xl border p-3 flex justify-between">
                    <span>{p.nombre} — <span className="text-gray-500">{p.fecha}</span></span>
                    <span className="font-medium">{p.monto}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="rounded-2xl bg-white shadow-sm">
          <div className="rounded-t-2xl bg-gradient-to-r from-orange-600 to-red-600 p-3 text-white font-medium">Matrículas Pendientes</div>
          <div className="p-3">
            {matriculasPendientes.length === 0 ? (
              <div className="text-sm text-gray-600 py-6 text-center">No hay matrículas pendientes.</div>
            ) : (
              <ul className="space-y-2 text-sm">
                {matriculasPendientes.map((m, i) => (
                  <li key={i} className="rounded-xl border p-3 flex justify-between">
                    <span>{m.nombre} — <span className="text-gray-500">{m.grado}</span></span>
                    <span className="text-xs rounded-full bg-indigo-100 text-indigo-700 px-2 py-1">{m.estado}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      <div className="mt-4 rounded-2xl bg-white p-0 shadow-sm">
        <div className="rounded-t-2xl bg-gradient-to-r from-emerald-600 to-green-600 p-3 text-white font-medium">Progreso de Cobro Mensual</div>
        <div className="p-4">
          <div className="h-3 rounded-full bg-gray-200">
            <div className="h-3 rounded-full bg-indigo-500" style={{ width: "0%" }} />
          </div>
          <div className="mt-2 text-xs text-gray-600">Sin datos — 0%</div>
        </div>
      </div>
    </div>
  );
}
