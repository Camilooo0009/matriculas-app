"use client";

export default function AdminStudentsPage() {
  const students = [
    { id: 1, nombre: "María González", grado: "5to Grado", seccion: "A", edad: 10, tutor: "Roberto González", telefono: "355-0101", estado: "Activo" },
    { id: 2, nombre: "Juan Pérez", grado: "3er Grado", seccion: "B", edad: 9, tutor: "Ana Pérez", telefono: "555-0102", estado: "Activo" },
    { id: 3, nombre: "Ana Martínez", grado: "6to Grado", seccion: "B", edad: 11, tutor: "Luis Martínez", telefono: "355-0103", estado: "Activo" },
    { id: 4, nombre: "Carlos López", grado: "4to Grado", seccion: "C", edad: 9, tutor: "Carmen López", telefono: "655-0104", estado: "Activo" },
    { id: 5, nombre: "Laura Fernández", grado: "2do Grado", seccion: "A", edad: 8, tutor: "Miguel Fernández", telefono: "355-0105", estado: "Activo" },
    { id: 6, nombre: "Pedro Sánchez", grado: "5to Grado", seccion: "B", edad: 10, tutor: "Sofía Sánchez", telefono: "555-0106", estado: "Inactivo" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-indigo-900">Gestión de Estudiantes</h1>
          <p className="text-gray-600">Administra la información de todos los estudiantes</p>
        </div>
        <button className="rounded-full bg-indigo-600 text-white px-4 py-2 text-sm">+ Nuevo Estudiante</button>
      </div>

      <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
        <div className="mb-3">
          <input placeholder="Buscar estudiantes por nombre, grado o padre..." className="w-full rounded-lg border p-2 text-sm" />
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
                <th>Acciones</th>
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
                  <td>
                    <div className="flex gap-2 text-gray-600">
                      <button title="Ver" className="hover:text-indigo-700">👁️</button>
                      <button title="Editar" className="hover:text-amber-700">✏️</button>
                      <button title="Eliminar" className="hover:text-rose-700">🗑️</button>
                    </div>
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
