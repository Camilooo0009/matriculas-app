"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type FileRow = { estudiante: string; archivo: string; fecha: string; size: number; url: string };

export default function AdminDocumentsPage() {
  const [folder, setFolder] = useState("");
  const [rows, setRows] = useState<FileRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadFolder = async (target: string) => {
    const clean = target.trim().replace(/\s+/g, "_").toLowerCase();
    if (!clean) { setRows([]); return; }
    setLoading(true); setError(null);
    const { data, error } = await supabase.storage.from("student-docs").list(clean, { limit: 200, sortBy: { column: "created_at", order: "desc" } });
    if (error) { setError("No se pudo listar esa carpeta. Verifica el bucket 'student-docs'."); setRows([]); setLoading(false); return; }
    const mapped: FileRow[] = (data || []).map((it: any) => {
      const { data: pub } = supabase.storage.from("student-docs").getPublicUrl(`${clean}/${it.name}`);
      return { estudiante: clean, archivo: it.name, fecha: new Date(it.created_at || Date.now()).toLocaleString(), size: it.metadata?.size || 0, url: pub.publicUrl };
    });
    setRows(mapped); setLoading(false);
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-indigo-900">Documentos</h1>
      <p className="text-gray-600">Ver archivos subidos por estudiantes (bucket: student-docs)</p>

      <div className="mt-3 flex items-center gap-2">
        <input value={folder} onChange={(e) => setFolder(e.target.value)} placeholder="Nombre del estudiante (carpeta), ej: estudiante_demo" className="rounded-xl border px-3 py-2 text-sm w-full max-w-md" />
        <button onClick={() => loadFolder(folder)} disabled={loading || !folder.trim()} className="rounded-xl bg-indigo-600 text-white px-4 py-2 text-sm disabled:opacity-60">{loading ? "Cargando..." : "Ver carpeta"}</button>
      </div>

      <div className="mt-4 rounded-2xl bg-white p-3 shadow-sm">
        {error ? (<div className="mb-2 rounded-md border border-red-200 bg-red-50 p-2 text-sm text-red-700">{error}</div>) : null}
        {rows.length === 0 ? (
          <div className="text-sm text-gray-600 py-6 text-center">No hay archivos para mostrar.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-gray-600">
                  <th className="py-2">Estudiante</th>
                  <th>Archivo</th>
                  <th>Tamaño</th>
                  <th>Fecha</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={`${r.estudiante}/${r.archivo}`} className="border-t">
                    <td className="py-2 font-mono text-xs">{r.estudiante}</td>
                    <td className="font-mono text-xs">{r.archivo}</td>
                    <td>{(r.size/1024).toFixed(1)} KB</td>
                    <td>{r.fecha}</td>
                    <td className="space-x-2">
                      <a href={r.url} target="_blank" rel="noreferrer" className="rounded-md bg-gray-100 px-2 py-1 text-xs hover:bg-gray-200">Ver/Descargar</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
