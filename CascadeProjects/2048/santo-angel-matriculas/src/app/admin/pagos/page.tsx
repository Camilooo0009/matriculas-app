"use client";

export default function AdminPaymentsPage() {
  const kpis = [
    { title: "Total Cobrado", value: "$750,000 COP" },
    { title: "Pendiente de Cobro", value: "$500,000 COP" },
    { title: "Pagos Vencidos", value: "$250,000 COP" },
  ];

  const pagos = [
    { id: 1, estudiante: "María González", concepto: "Pensión Octubre", monto: "$250,000 COP", fechaLimite: "2025-10-05", fechaPago: "2025-10-05", metodo: "Transferencia", estado: "Pagado" },
    { id: 2, estudiante: "Juan Pérez", concepto: "Pensión Octubre", monto: "$250,000 COP", fechaLimite: "2025-10-05", fechaPago: "2025-10-04", metodo: "Efectivo", estado: "Pagado" },
    { id: 3, estudiante: "Ana Martínez", concepto: "Pensión Octubre", monto: "$250,000 COP", fechaLimite: "2025-10-05", fechaPago: "-", metodo: "-", estado: "Pendiente" },
    { id: 4, estudiante: "Carlos López", concepto: "Pensión Septiembre", monto: "$250,000 COP", fechaLimite: "2025-10-05", fechaPago: "2025-10-03", metodo: "Tarjeta", estado: "Pagado" },
    { id: 5, estudiante: "Laura Fernández", concepto: "Pensión Septiembre", monto: "$250,000 COP", fechaLimite: "2025-10-05", fechaPago: "-", metodo: "-", estado: "Vencido" },
    { id: 6, estudiante: "Pedro Sánchez", concepto: "Pensión Septiembre", monto: "$250,000 COP", fechaLimite: "2025-10-05", fechaPago: "-", metodo: "-", estado: "Pendiente" },
  ];

  const badge = (estado: string) => {
    const map: Record<string, string> = {
      Pagado: "bg-emerald-100 text-emerald-700",
      Pendiente: "bg-amber-100 text-amber-800",
      Vencido: "bg-rose-100 text-rose-700",
    };
    return <span className={`px-2 py-1 rounded text-xs ${map[estado] ?? "bg-gray-100 text-gray-700"}`}>{estado}</span>;
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-indigo-900">Gestión de Pagos y Pensiones</h1>
        <div className="space-x-2">
          <button className="rounded-full bg-gray-100 px-4 py-2 text-sm hover:bg-gray-200">Exportar</button>
          <button className="rounded-full bg-indigo-600 text-white px-4 py-2 text-sm">+ Registrar Pago</button>
        </div>
      </div>

      <section className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
        {kpis.map((k) => (
          <div key={k.title} className="rounded-2xl bg-white p-4 shadow-sm">
            <div className="text-sm text-gray-600">{k.title}</div>
            <div className="text-2xl font-semibold text-indigo-800">{k.value}</div>
          </div>
        ))}
      </section>

      <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
        <div className="mb-3 flex flex-wrap gap-2 text-sm">
          <button className="rounded-full bg-indigo-600 text-white px-3 py-1">Todos</button>
          <button className="rounded-full bg-gray-100 px-3 py-1">Pagados</button>
          <button className="rounded-full bg-gray-100 px-3 py-1">Pendientes</button>
          <button className="rounded-full bg-gray-100 px-3 py-1">Vencidos</button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-600">
                <th className="py-2">ID</th>
                <th>Estudiante</th>
                <th>Concepto</th>
                <th>Monto</th>
                <th>Fecha Límite</th>
                <th>Fecha de Pago</th>
                <th>Método</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {pagos.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="py-2">{p.id}</td>
                  <td>{p.estudiante}</td>
                  <td>{p.concepto}</td>
                  <td>{p.monto}</td>
                  <td>{p.fechaLimite}</td>
                  <td>{p.fechaPago}</td>
                  <td>{p.metodo}</td>
                  <td>{badge(p.estado)}</td>
                  <td>
                    {p.estado === "Pagado" ? (
                      <button className="rounded-md bg-gray-100 px-2 py-1 text-xs hover:bg-gray-200">Recibo</button>
                    ) : (
                      <button className="rounded-md bg-indigo-600 text-white px-2 py-1 text-xs">Registrar</button>
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
