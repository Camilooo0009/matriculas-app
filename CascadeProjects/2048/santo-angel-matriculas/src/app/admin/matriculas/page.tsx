"use client";

export default function AdminEnrollmentsPage() {
  const stats = [
    { title: "Matrículas Aprobadas", value: 3 },
    { title: "Matrículas Pendientes", value: 2 },
    { title: "Total Recaudado", value: "$1.500.000 COP" },
  ];

  const rows = [
    { id: 1, estudiante: "María González", grado: "5to Grado", periodo: "2025-2026", fecha: "2025-08-15", monto: "$500,000 COP", estado: "Aprobada" },
    { id: 2, estudiante: "Juan Pérez", grado: "3er Grado", periodo: "2025-2026", fecha: "2025-08-20", monto: "$500,000 COP", estado: "Aprobada" },
    { id: 3, estudiante: "Pedro Sánchez", grado: "5to Grado", periodo: "2025-2026", fecha: "2025-09-01", monto: "$500,000 COP", estado: "Pendiente" },
    { id: 4, estudiante: "Laura Fernández", grado: "3er Grado", periodo: "2025-2026", fecha: "2025-09-05", monto: "$500,000 COP", estado: "Pendiente" },
    { id: 5, estudiante: "Ana Martínez", grado: "6to Grado", periodo: "2025-2026", fecha: "2025-08-10", monto: "$500,000 COP", estado: "Aprobada" },
  ];

  const badge = (estado: string) => {
    const map: Record<string, string> = {
      Aprobada: "bg-indigo-100 text-indigo-700",
      Pendiente: "bg-amber-100 text-amber-800",
      Rechazada: "bg-rose-100 text-rose-700",
    };
    return <span className={`px-2 py-1 rounded text-xs ${map[estado] ?? "bg-gray-100 text-gray-700"}`}>{estado}</span>;
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-indigo-900">Gestión de Matrículas</h1>
          <p className="text-gray-600">Administra las matrículas de estudiantes</p>
        </div>
        <button className="rounded-full bg-indigo-600 text-white px-4 py-2 text-sm">+ Nueva Matrícula</button>
      </div>

      <section className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
        {stats.map((s) => (
          <div key={s.title} className="rounded-2xl bg-white p-4 shadow-sm">
            <div className="text-sm text-gray-600">{s.title}</div>
            <div className="text-2xl font-semibold text-indigo-800">{s.value}</div>
          </div>
        ))}
      </section>

      <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
        <div className="mb-3">
          <input placeholder="Buscar matrículas por estudiante, grado o estado..." className="w-full rounded-lg border p-2 text-sm" />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-600">
                <th className="py-2">ID</th>
                <th>Estudiante</th>
                <th>Grado</th>
                <th>Periodo</th>
                <th>Fecha</th>
                <th>Monto</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t">
                  <td className="py-2">{r.id}</td>
                  <td>{r.estudiante}</td>
                  <td>{r.grado}</td>
                  <td>{r.periodo}</td>
                  <td>{r.fecha}</td>
                  <td>{r.monto}</td>
                  <td>{badge(r.estado)}</td>
                  <td className="space-x-2">
                    {r.estado === "Pendiente" ? (
                      <>
                        <button className="rounded-md bg-emerald-100 px-2 py-1 text-xs text-emerald-800 hover:bg-emerald-200">Aprobar</button>
                        <button className="rounded-md bg-rose-100 px-2 py-1 text-xs text-rose-800 hover:bg-rose-200">Rechazar</button>
                      </>
                    ) : (
                      <button className="rounded-md bg-gray-100 px-2 py-1 text-xs hover:bg-gray-200">Ver</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
