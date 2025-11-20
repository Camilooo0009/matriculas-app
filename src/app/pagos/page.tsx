"use client";

import { useMemo, useState } from "react";
import PaymentMockForm from "../../components/PaymentMockForm";

export default function PagosPage() {
  const [showForm, setShowForm] = useState(false);
  const [amount, setAmount] = useState<number>(120000);

  const charges = useMemo(
    () => [
      { month: "Febrero", amount: 120000, discount: 0, lateFee: 0, paid: true },
      { month: "Marzo", amount: 120000, discount: 0, lateFee: 0, paid: true },
      { month: "Abril", amount: 120000, discount: 0, lateFee: 0, paid: false },
      { month: "Mayo", amount: 120000, discount: 0, lateFee: 10000, paid: false },
    ],
    []
  );

  const totals = useMemo(() => {
    const pending = charges.filter((c) => !c.paid);
    const total = pending.reduce(
      (acc, c) => acc + (c.amount - c.discount + c.lateFee),
      0
    );
    return { pendingCount: pending.length, total };
  }, [charges]);
  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold">Pagos</h1>
      <p className="text-gray-600 mt-2">
        Liquidación de pensiones e integración con pasarela (modo simulado).
      </p>

      <section className="mt-6">
        <h2 className="text-lg font-semibold">Estado de cuenta (simulado)</h2>
        <div className="mt-3 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-left text-gray-600">
              <tr>
                <th className="py-2 pr-4">Mes</th>
                <th className="py-2 pr-4">Valor</th>
                <th className="py-2 pr-4">Descuento</th>
                <th className="py-2 pr-4">Mora</th>
                <th className="py-2 pr-4">Estado</th>
                <th className="py-2 pr-4"></th>
              </tr>
            </thead>
            <tbody>
              {charges.map((c) => {
                const due = c.amount - c.discount + c.lateFee;
                return (
                  <tr key={c.month} className="border-t">
                    <td className="py-2 pr-4">{c.month}</td>
                    <td className="py-2 pr-4">$ {c.amount.toLocaleString("es-CO")}</td>
                    <td className="py-2 pr-4">$ {c.discount.toLocaleString("es-CO")}</td>
                    <td className="py-2 pr-4">$ {c.lateFee.toLocaleString("es-CO")}</td>
                    <td className="py-2 pr-4">
                      {c.paid ? (
                        <span className="text-emerald-700">Pagado</span>
                      ) : (
                        <span className="text-amber-700">Pendiente</span>
                      )}
                    </td>
                    <td className="py-2 pr-4">
                      {!c.paid ? (
                        <button
                          className="rounded-md bg-blue-600 px-3 py-1.5 text-white hover:bg-blue-700"
                          onClick={() => {
                            setAmount(due);
                            setShowForm(true);
                          }}
                        >
                          Pagar $ {due.toLocaleString("es-CO")}
                        </button>
                      ) : null}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="mt-3 flex items-center justify-between text-sm">
          <div>
            Cuotas pendientes: <span className="font-medium">{totals.pendingCount}</span>
          </div>
          <div>
            Total a pagar: <span className="font-medium">$ {totals.total.toLocaleString("es-CO")}</span>
          </div>
        </div>
        {!showForm && totals.pendingCount > 0 ? (
          <div className="mt-4">
            <button
              className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              onClick={() => {
                setAmount(totals.total);
                setShowForm(true);
              }}
            >
              Pagar en línea
            </button>
          </div>
        ) : null}
      </section>

      {showForm ? <PaymentMockForm defaultAmount={amount} /> : null}
    </main>
  );
}
