"use client";

export default function NotasPage() {
  const rows: Array<{ asignatura: string; periodo: string; nota: number }> = [];
  return (
    <div>
      <h1 className="text-xl font-semibold">Mis Notas</h1>
      <div className="mt-3 rounded-2xl bg-white shadow-sm overflow-hidden">
        <div className="p-3 border-b bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white font-medium">Notas por asignatura</div>
        <div className="p-3 overflow-x-auto">
          {rows.length === 0 ? (
            <div className="text-sm text-gray-600 py-6 text-center">No hay calificaciones aún.</div>
          ) : (
            <table className="min-w-full text-sm">
              <thead className="text-left text-gray-600">
                <tr>
                  <th className="py-2 pr-4">Asignatura</th>
                  <th className="py-2 pr-4">Período</th>
                  <th className="py-2 pr-4">Calificación</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.asignatura} className="border-t">
                    <td className="py-2 pr-4">{r.asignatura}</td>
                    <td className="py-2 pr-4">{r.periodo}</td>
                    <td className="py-2 pr-4 font-medium">{r.nota.toFixed(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
