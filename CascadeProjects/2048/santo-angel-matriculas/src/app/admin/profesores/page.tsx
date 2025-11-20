"use client";

export default function AdminTeachersPage() {
  const stats = [
    { title: "Total Profesores", value: 6, note: "Personal docente registrado" },
    { title: "Profesores Activos", value: 5, note: "Actualmente trabajando" },
    { title: "Materias Cubiertas", value: 6, note: "Diferentes especialidades" },
  ];

  const rows = [
    { id: 1, nombre: "Dr. Roberto Vargas", materia: "Matemáticas", contacto: "rvargas@colegio.com", experiencia: "15 años", estado: "Activo" },
    { id: 2, nombre: "Prof. Carmen Silva", materia: "Español", contacto: "csilva@colegio.com", experiencia: "10 años", estado: "Activo" },
    { id: 3, nombre: "Lic. Miguel Torres", materia: "Ciencias", contacto: "mtorres@colegio.com", experiencia: "8 años", estado: "Activo" },
    { id: 4, nombre: "Prof. Ana Ruiz", materia: "Historia", contacto: "aruiz@colegio.com", experiencia: "12 años", estado: "Activo" },
    { id: 5, nombre: "Lic. Carlos Mendoza", materia: "Educación Física", contacto: "cmendoza@colegio.com", experiencia: "6 años", estado: "Activo" },
    { id: 6, nombre: "Prof. Elena Castro", materia: "Inglés", contacto: "ecastro@colegio.com", experiencia: "9 años", estado: "Inactivo" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-indigo-900">Gestión de Profesores</h1>
          <p className="text-gray-600">Administra el personal docente del colegio</p>
        </div>
        <button className="rounded-full bg-indigo-600 text-white px-4 py-2 text-sm">+ Nuevo Profesor</button>
      </div>

      <section className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
        {stats.map((s) => (
          <div key={s.title} className="rounded-2xl bg-white p-4 shadow-sm">
            <div className="text-sm text-gray-600">{s.title}</div>
            <div className="text-2xl font-semibold text-indigo-800">{s.value}</div>
            <div className="text-xs text-gray-500">{s.note}</div>
          </div>
        ))}
      </section>

      <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
        <div className="mb-3">
          <input placeholder="Buscar profesores por nombre, materia o correo..." className="w-full rounded-lg border p-2 text-sm" />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-600">
                <th className="py-2">ID</th>
                <th>Nombre</th>
                <th>Materia</th>
                <th>Contacto</th>
                <th>Experiencia</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t">
                  <td className="py-2">{r.id}</td>
                  <td>{r.nombre}</td>
                  <td>{r.materia}</td>
                  <td className="text-indigo-700 underline cursor-pointer">{r.contacto}</td>
                  <td>{r.experiencia}</td>
                  <td>
                    <span className={`px-2 py-1 rounded text-xs ${r.estado === "Activo" ? "bg-indigo-100 text-indigo-700" : "bg-gray-200 text-gray-700"}`}>{r.estado}</span>
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
