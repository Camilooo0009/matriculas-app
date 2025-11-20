"use client";

export default function AdminGradesPage() {
  const rows = [
    { id: 1, estudiante: "María González", materia: "Matemáticas", periodo: "1", calificacion: 4.5 },
    { id: 2, estudiante: "Juan Pérez", materia: "Español", periodo: "1", calificacion: 4.8 },
    { id: 3, estudiante: "Ana Martínez", materia: "Ciencias", periodo: "2", calificacion: 4.2 },
    { id: 4, estudiante: "Carlos López", materia: "Sociales", periodo: "2", calificacion: 4.9 },
  ];

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-indigo-900">Notas</h1>
        <button className="rounded-full bg-indigo-600 text-white px-4 py-2 text-sm">+ Crear Reporte</button>
      </div>

      <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
        <div className="mb-3">
          <input placeholder="Buscar por estudiante, materia o periodo..." className="w-full rounded-lg border p-2 text-sm" />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-600">
                <th className="py-2">ID</th>
                <th>Estudiante</th>
                <th>Materia</th>
                <th>Periodo</th>
                <th>Calificación</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t">
                  <td className="py-2">{r.id}</td>
                  <td>{r.estudiante}</td>
                  <td>{r.materia}</td>
                  <td>{r.periodo}</td>
                  <td>{r.calificacion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
