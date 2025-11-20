"use client";

import { useEffect, useState } from "react";

export default function PerfilPage() {
  const [name, setName] = useState("");
  useEffect(() => {
    try {
      const n = localStorage.getItem("student_demo_name") || "María González";
      setName(n);
    } catch {}
  }, []);

  const onSave = (e: React.FormEvent) => {
    e.preventDefault();
    try { localStorage.setItem("student_demo_name", name); } catch {}
    alert("Perfil actualizado (simulado)");
  };

  return (
    <div>
      <h1 className="text-xl font-semibold">Mi Perfil</h1>
      <form onSubmit={onSave} className="mt-3 max-w-md grid gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre</label>
          <input className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <button className="rounded-xl bg-indigo-600 text-white px-4 py-2 hover:bg-indigo-700" type="submit">Guardar cambios</button>
      </form>
    </div>
  );
}
