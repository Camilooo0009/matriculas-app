"use client";

export default function TeacherGradesPage() {
  const destacados = [
    { nombre: "María González", promedio: 4.53 },
    { nombre: "Juan Pérez", promedio: 3.95 },
    { nombre: "Ana Martínez", promedio: 4.9 },
    { nombre: "Carlos López", promedio: 3.5 },
  ];

  const filas = [
    { id: 1, materia: "Matemáticas", periodo: "Primer Periodo", calificacion: 4.5, obs: "Excelente desempeño" },
    { id: 2, materia: "Español", periodo: "Primer Periodo", calificacion: 4.8, obs: "Sobresaliente" },
    { id: 3, materia: "Ciencias", periodo: "Segundo Periodo", calificacion: 4.2, obs: "Buen trabajo" },
    { id: 4, materia: "Sociales", periodo: "Segundo Periodo", calificacion: 4.9, obs: "Muy bien" },
    { id: 5, materia: "Matemáticas", periodo: "Tercer Periodo", calificacion: 3.8, obs: "Puede mejorar" },
    { id: 6, materia: "Matemáticas", periodo: "Cuarto Periodo", calificacion: 4.7, obs: "Excelente" },
    { id: 7, materia: "Matemáticas", periodo: "Cuarto Periodo", calificacion: 4.0, obs: "Buen progreso" },
    { id: 8, materia: "Matemáticas", periodo: "Cuarto Periodo", calificacion: 3.5, obs: "Necesita refuerzo" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-emerald-900">Calificaciones</h1>
        <button className="rounded-full bg-emerald-600 text-white px-4 py-2 text-sm">+ Agregar Nota</button>
      </div>

      <section className="mt-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
        {destacados.map((d) => (
          <div key={d.nombre} className="rounded-2xl bg-white p-4 shadow-sm">
            <div className="text-sm text-gray-600">{d.nombre}</div>
            <div className="text-2xl font-semibold text-emerald-800">{d.promedio.toFixed(2)}</div>
            <div className="text-xs text-gray-500">Promedio General</div>
          </div>
        ))}
      </section>

      <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
        <div className="mb-3">
          <input placeholder="Buscar por estudiante, materia o periodo..." className="w-full rounded-lg border p-2 text-sm" />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-600">
                <th className="py-2">ID</th>
                <th>Materia</th>
                <th>Periodo</th>
                <th>Calificación</th>
                <th>Observaciones</th>
              </tr>
            </thead>
            <tbody>
              {filas.map((f) => (
                <tr key={f.id} className="border-t">
                  <td className="py-2">{f.id}</td>
                  <td>{f.materia}</td>
                  <td>{f.periodo}</td>
                  <td>{f.calificacion}</td>
                  <td>{f.obs}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
