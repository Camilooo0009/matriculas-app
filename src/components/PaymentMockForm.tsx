"use client";

import { useMemo, useState } from "react";

type Props = {
  defaultAmount?: number;
};

export default function PaymentMockForm({ defaultAmount = 0 }: Props) {
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reference] = useState(() =>
    Math.random().toString(36).slice(2, 10).toUpperCase()
  );
  const [form, setForm] = useState({
    fullName: "",
    document: "",
    email: "",
    phone: "",
    description: "Pensión mensual",
    amount: defaultAmount || 0,
  });

  const valid = useMemo(() => {
    return (
      form.fullName.trim().length > 3 &&
      form.document.trim().length >= 6 &&
      /.+@.+\..+/.test(form.email) &&
      form.amount > 0
    );
  }, [form]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    setLoading(true);
    setTimeout(() => {
      setShowResult(true);
      setLoading(false);
    }, 900);
  };

  if (showResult) {
    return (
      <div className="mt-4 rounded-md border p-4 bg-green-50">
        <h3 className="text-lg font-semibold">Pago simulado</h3>
        <p className="text-sm text-gray-700 mt-2">
          Este es un flujo de prueba. No se realizó ningún cobro real.
        </p>
        <div className="mt-3 space-y-1 text-sm">
          <div><span className="font-medium">Referencia:</span> {reference}</div>
          <div><span className="font-medium">Nombre:</span> {form.fullName}</div>
          <div><span className="font-medium">Documento:</span> {form.document}</div>
          <div><span className="font-medium">Correo:</span> {form.email}</div>
          <div><span className="font-medium">Descripción:</span> {form.description}</div>
          <div><span className="font-medium">Valor:</span> ${" "}{form.amount.toLocaleString("es-CO")}</div>
          <div><span className="font-medium">Estado:</span> Aprobado (simulado)</div>
        </div>
        <button
          className="mt-4 inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          onClick={() => setShowResult(false)}
        >
          Hacer otro pago
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-4 grid grid-cols-1 gap-4 max-w-xl">
      <div>
        <label className="block text-sm font-medium">Nombre completo</label>
        <input
          className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900"
          value={form.fullName}
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          required
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Documento</label>
          <input
            className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900"
            value={form.document}
            onChange={(e) => setForm({ ...form, document: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Teléfono</label>
          <input
            className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium">Correo electrónico</label>
        <input
          type="email"
          className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Descripción</label>
          <input
            className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Valor (COP)</label>
          <input
            type="number"
            min={1}
            className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900"
            value={form.amount}
            onChange={(e) =>
              setForm({ ...form, amount: Number(e.target.value || 0) })
            }
            required
          />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-500">
          Al continuar, aceptas que este es un pago de prueba (no real).
        </p>
        <button
          type="submit"
          disabled={!valid || loading}
          aria-busy={loading}
          className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Procesando..." : "Pagar en línea"}
        </button>
      </div>
    </form>
  );
}
