"use client";

import { useMemo } from "react";

type EnrollmentRow = {
  folio: string;
  student: string;
  grade: string;
  status: "Pendiente" | "Aprobada" | "Rechazada";
  date: string; // ISO string
};

type PaymentRow = {
  ref: string;
  student: string;
  month: string;
  amount: number;
  method: string;
  status: "Aprobado" | "Pendiente" | "Fallido";
  date: string; // ISO string
};

function toCSV<T extends object>(rows: T[]): string {
  if (!rows.length) return "";
  const headers = Object.keys(rows[0]);
  const lines = [headers.join(",")];
  for (const r of rows) {
    const line = headers
      .map((h) => {
        const v = (r as any)[h];
        const s = typeof v === "string" ? v : String(v);
        // Escape quotes and commas
        return '"' + s.replace(/"/g, '""') + '"';
      })
      .join(",");
    lines.push(line);
  }
  return lines.join("\n");
}

export default function ReportesPage() {
  const enrollments: EnrollmentRow[] = useMemo(
    () => [
      { folio: "MAT-1A2B3C", student: "Juan Pérez", grade: "Quinto", status: "Aprobada", date: "2025-02-05" },
      { folio: "MAT-7D8E9F", student: "María Gómez", grade: "Sexto", status: "Pendiente", date: "2025-02-10" },
      { folio: "MAT-ABC123", student: "Luis Torres", grade: "Décimo", status: "Rechazada", date: "2025-02-11" },
    ],
    []
  );

  const payments: PaymentRow[] = useMemo(
    () => [
      { ref: "PAY-0001", student: "Juan Pérez", month: "Abril", amount: 120000, method: "Simulado", status: "Aprobado", date: "2025-04-02" },
      { ref: "PAY-0002", student: "María Gómez", month: "Mayo", amount: 130000, method: "Simulado", status: "Pendiente", date: "2025-05-10" },
      { ref: "PAY-0003", student: "Luis Torres", month: "Mayo", amount: 120000, method: "Simulado", status: "Aprobado", date: "2025-05-12" },
    ],
    []
  );

  const totals = useMemo(() => {
    const approved = payments.filter((p) => p.status === "Aprobado");
    const amount = approved.reduce((acc, p) => acc + p.amount, 0);
    return { approvedCount: approved.length, amount };
  }, [payments]);

  const downloadCSV = (name: string, text: string) => {
    const blob = new Blob([text], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${name}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold">Reportes</h1>
      <p className="text-gray-600 mt-2">Cartera, matrículas por grado y pagos por periodo (simulados).</p>

      <section className="mt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Matrículas</h2>
          <button
            className="rounded-md bg-gray-100 px-3 py-1.5 text-sm hover:bg-gray-200"
            onClick={() => downloadCSV("matriculas", toCSV(enrollments))}
          >
            Exportar CSV
          </button>
        </div>
        <div className="mt-3 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-left text-gray-600">
              <tr>
                <th className="py-2 pr-4">Folio</th>
                <th className="py-2 pr-4">Estudiante</th>
                <th className="py-2 pr-4">Grado</th>
                <th className="py-2 pr-4">Estado</th>
                <th className="py-2 pr-4">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {enrollments.map((e) => (
                <tr key={e.folio} className="border-t">
                  <td className="py-2 pr-4">{e.folio}</td>
                  <td className="py-2 pr-4">{e.student}</td>
                  <td className="py-2 pr-4">{e.grade}</td>
                  <td className="py-2 pr-4">{e.status}</td>
                  <td className="py-2 pr-4">{e.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Pagos</h2>
          <div className="flex items-center gap-3 text-sm">
            <div>
              Recaudo aprobado: <span className="font-medium">$ {totals.amount.toLocaleString("es-CO")}</span>
            </div>
            <button
              className="rounded-md bg-gray-100 px-3 py-1.5 hover:bg-gray-200"
              onClick={() => downloadCSV("pagos", toCSV(payments))}
            >
              Exportar CSV
            </button>
          </div>
        </div>
        <div className="mt-3 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-left text-gray-600">
              <tr>
                <th className="py-2 pr-4">Referencia</th>
                <th className="py-2 pr-4">Estudiante</th>
                <th className="py-2 pr-4">Mes</th>
                <th className="py-2 pr-4">Valor</th>
                <th className="py-2 pr-4">Método</th>
                <th className="py-2 pr-4">Estado</th>
                <th className="py-2 pr-4">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.ref} className="border-t">
                  <td className="py-2 pr-4">{p.ref}</td>
                  <td className="py-2 pr-4">{p.student}</td>
                  <td className="py-2 pr-4">{p.month}</td>
                  <td className="py-2 pr-4">$ {p.amount.toLocaleString("es-CO")}</td>
                  <td className="py-2 pr-4">{p.method}</td>
                  <td className="py-2 pr-4">{p.status}</td>
                  <td className="py-2 pr-4">{p.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
