"use client";

export default function TeacherCoursesPage() {
  const stats = [
    { title: "Total Grados", value: "11" },
    { title: "Total Cursos", value: "66" },
    { title: "Total Estudiantes", value: "1656" },
  ];

  const grados = [
    { nombre: "1° Primaria", resumen: "6 materias • 28 estudiantes" },
    { nombre: "2° Primaria", resumen: "6 materias • 30 estudiantes" },
    { nombre: "3° Primaria", resumen: "6 materias • 27 estudiantes" },
    { nombre: "4° Primaria", resumen: "6 materias • 29 estudiantes" },
    { nombre: "5° Primaria", resumen: "6 materias • 25 estudiantes" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold text-emerald-900">Cursos por Grado</h1>
      <p className="text-gray-600">Organización de cursos desde 1° de Primaria hasta 11° de Bachillerato</p>

      <section className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
        {stats.map((s) => (
          <div key={s.title} className="rounded-2xl bg-white p-4 shadow-sm">
            <div className="text-sm text-gray-600">{s.title}</div>
            <div className="text-2xl font-semibold text-emerald-800">{s.value}</div>
          </div>
        ))}
      </section>

      <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
        <div className="flex gap-2 text-sm">
          <button className="rounded-full bg-emerald-600 text-white px-3 py-1">Primaria</button>
          <button className="rounded-full bg-gray-100 px-3 py-1">Bachillerato</button>
        </div>
        <div className="mt-3">
          {grados.map((g) => (
            <details key={g.nombre} className="mb-2 rounded-xl border bg-gray-50/60 p-3">
              <summary className="cursor-pointer font-medium">{g.nombre}</summary>
              <div className="text-sm text-gray-600 mt-1">{g.resumen}</div>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
