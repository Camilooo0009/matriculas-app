"use client";

export default function TeacherDocumentsPage() {
  const rows = [
    { id: 1, tipo: "Documento de Identidad del Estudiante (Frente)", archivo: "cedula_maria_frente.pdf", fecha: "2025-09-13", estado: "Aprobado" },
    { id: 2, tipo: "Documento de Identidad (Reverso)", archivo: "cedula_maria_reverso.pdf", fecha: "2025-09-15", estado: "Aprobado" },
    { id: 3, tipo: "Documento de Identidad del Acudiente (Frente)", archivo: "cc_acudiente_frente.pdf", fecha: "2025-09-15", estado: "Aprobado" },
    { id: 4, tipo: "Registro Civil de Nacimiento", archivo: "registro_civil_maria.pdf", fecha: "2025-09-16", estado: "Aprobado" },
    { id: 5, tipo: "Documento del Estudiante (Frente)", archivo: "cedula_juan_frente.pdf", fecha: "2025-09-20", estado: "Pendiente" },
    { id: 6, tipo: "Registro Civil de Nacimiento", archivo: "registro_civil_juan.pdf", fecha: "2025-09-20", estado: "Pendiente" },
    { id: 7, tipo: "Documento del Estudiante (Frente)", archivo: "cedula_ana_frente.pdf", fecha: "2025-09-18", estado: "Rechazado" },
  ];

  const badge = (estado: string) => {
    const map: Record<string, string> = {
      Aprobado: "bg-indigo-100 text-indigo-700",
      Pendiente: "bg-amber-100 text-amber-800",
      Rechazado: "bg-rose-100 text-rose-700",
    };
    return <span className={`px-2 py-1 rounded text-xs ${map[estado] ?? "bg-gray-100 text-gray-700"}`}>{estado}</span>;
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-emerald-900">Mis Documentos</h1>
      <p className="text-gray-600">Sube los documentos requeridos para la matrícula</p>

      <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-600">
                <th className="py-2">ID</th>
                <th>Tipo de Documento</th>
                <th>Archivo</th>
                <th>Fecha de Carga</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t">
                  <td className="py-2">{r.id}</td>
                  <td>{r.tipo}</td>
                  <td className="font-mono text-xs">{r.archivo}</td>
                  <td>{r.fecha}</td>
                  <td>{badge(r.estado)}</td>
                  <td>
                    <button className="rounded-md bg-gray-100 px-2 py-1 text-xs hover:bg-gray-200">Ver</button>
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
