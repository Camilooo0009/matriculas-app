"use client";

export default function PagosAlumnoPage() {
  const cuotas: Array<{ mes: string; valor: number; estado: string }> = [];
  return (
    <div>
      <h1 className="text-xl font-semibold">Pagos</h1>
      <div className="mt-3 rounded-2xl bg-white shadow-sm overflow-hidden">
        <div className="p-3 border-b bg-gradient-to-r from-sky-600 to-indigo-600 text-white font-medium">Estado de cuenta</div>
        <div className="p-3">
          {cuotas.length === 0 ? (
            <div className="text-sm text-gray-600 py-6 text-center">No hay registros de pagos aún.</div>
          ) : (
            <>
              <ul className="divide-y">
                {cuotas.map((c) => (
                  <li key={c.mes} className="py-2 flex items-center justify-between">
                    <div>
                      <div className="font-medium">{c.mes}</div>
                      <div className="text-xs text-gray-500">$ {c.valor.toLocaleString("es-CO")}</div>
                    </div>
                    <div className={`text-sm ${c.estado === 'Pagado' ? 'text-emerald-600' : 'text-yellow-700'}`}>{c.estado}</div>
                  </li>
                ))}
              </ul>
              <a href="/pagos" className="mt-3 inline-flex items-center rounded-xl border px-3 py-2 text-gray-900 hover:bg-gray-50">Ir a pagar en línea</a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
