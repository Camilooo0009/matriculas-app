"use client";

export default function AdminCoursesPage() {
  const grados = [
    { nombre: "1° Primaria", cursos: 6, estudiantes: 180 },
    { nombre: "2° Primaria", cursos: 6, estudiantes: 185 },
    { nombre: "3° Primaria", cursos: 6, estudiantes: 170 },
    { nombre: "4° Primaria", cursos: 6, estudiantes: 175 },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold text-indigo-900">Cursos</h1>
      <p className="text-gray-600">Organización de cursos por grado</p>

      <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
        {grados.map((g) => (
          <details key={g.nombre} className="mb-2 rounded-xl border bg-gray-50/60 p-3">
            <summary className="cursor-pointer font-medium">{g.nombre}</summary>
            <div className="text-sm text-gray-600 mt-1">{g.cursos} materias • {g.estudiantes} estudiantes</div>
          </details>
        ))}
      </div>
    </div>
  );
}
