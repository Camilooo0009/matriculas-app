"use client";

export default function TeacherStudentsPage() {
  const students = [
    { id: 1, nombre: "María González", grado: "5to Grado", seccion: "A", edad: 10, tutor: "Roberto González", telefono: "320-0101", estado: "Activo" },
    { id: 2, nombre: "Ana Martínez", grado: "6to Grado", seccion: "B", edad: 11, tutor: "Luis Martínez", telefono: "555-0100", estado: "Activo" },
    { id: 6, nombre: "Pedro Sánchez", grado: "5to Grado", seccion: "B", edad: 10, tutor: "Sofía Sánchez", telefono: "555-0106", estado: "Inactivo" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold text-emerald-900">Mis Estudiantes</h1>
      <p className="text-gray-600">Consulta la información de tus estudiantes</p>

      <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
        <div className="mb-3">
          <input placeholder="Buscar por nombre, grado o padre..." className="w-full rounded-lg border p-2 text-sm" />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-600">
                <th className="py-2">ID</th>
                <th>Nombre</th>
                <th>Grado</th>
                <th>Sección</th>
                <th>Edad</th>
                <th>Padre/Tutor</th>
                <th>Teléfono</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s.id} className="border-t">
                  <td className="py-2">{s.id}</td>
                  <td>{s.nombre}</td>
                  <td>{s.grado}</td>
                  <td>{s.seccion}</td>
                  <td>{s.edad}</td>
                  <td>{s.tutor}</td>
                  <td>{s.telefono}</td>
                  <td>
                    <span className={`px-2 py-1 rounded text-xs ${s.estado === "Activo" ? "bg-indigo-100 text-indigo-700" : "bg-gray-200 text-gray-700"}`}>{s.estado}</span>
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
