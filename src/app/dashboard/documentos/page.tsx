"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Doc = { nombre: string; fecha: string; size: number; url: string };

export default function DocumentosPage() {
  const [docs, setDocs] = useState<Doc[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const studentFolder = (() => {
    try {
      const n = localStorage.getItem("student_demo_name");
      return (n || "estudiante_demo").replace(/\s+/g, "_").toLowerCase();
    } catch {
      return "estudiante_demo";
    }
  })();

  const fetchList = async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase.storage.from("student-docs").list(studentFolder, { limit: 100, sortBy: { column: "name", order: "desc" } });
    if (error) {
      setError("No se pudieron listar los documentos. Verifica el bucket 'student-docs'.");
      setDocs([]);
      setLoading(false);
      return;
    }
    const mapped: Doc[] = (data || [])
      .filter((it: any) => it?.id)
      .map((it: any) => {
        const { data: pub } = supabase.storage.from("student-docs").getPublicUrl(`${studentFolder}/${it.name}`);
        return { nombre: it.name, fecha: new Date(it.created_at || Date.now()).toLocaleString(), size: it.metadata?.size || 0, url: pub.publicUrl };
      });
    setDocs(mapped);
    setLoading(false);
  };

  useEffect(() => { fetchList(); }, []);

  const onPick = () => inputRef.current?.click();

  const onFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const allowed = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    setLoading(true);
    const optimistic: Doc[] = [];
    for (const f of files) {
      if (!allowed.includes(f.type)) {
        setError("Solo se permiten PDF o Word (.pdf, .doc, .docx)");
        continue;
      }
      const path = `${studentFolder}/${Date.now()}_${f.name}`;
      const { error } = await supabase.storage.from("student-docs").upload(path, f, { cacheControl: "3600", upsert: false });
      if (error) {
        setError(`No se pudo subir ${f.name}: ${error.message}`);
      } else {
        const { data: pub } = supabase.storage.from("student-docs").getPublicUrl(path);
        optimistic.unshift({ nombre: path.split("/").pop() || f.name, fecha: new Date().toLocaleString(), size: f.size, url: pub.publicUrl });
      }
    }
    if (optimistic.length) setDocs((prev) => [...optimistic, ...prev]);
    setLoading(false);
    e.target.value = "";
    // Refrescar desde servidor para validar
    fetchList();
  };

  const onRemove = async (doc: Doc) => {
    setLoading(true);
    const { error } = await supabase.storage.from("student-docs").remove([`${studentFolder}/${doc.nombre}`]);
    if (error) setError("No se pudo eliminar el archivo.");
    await fetchList();
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Documentos</h1>
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            multiple
            hidden
            onChange={onFiles}
          />
          <button disabled={loading} onClick={onPick} className="rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-2 text-white font-medium hover:opacity-95 disabled:opacity-60">
            {loading ? "Subiendo..." : "Subir PDF/Word"}
          </button>
        </div>
      </div>

      <div className="mt-3 rounded-2xl bg-white shadow-sm">
        <div className="p-3 border-b bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-medium">Archivos disponibles</div>
        <div className="p-2">
          {error ? (<div className="mb-2 rounded-md border border-red-200 bg-red-50 p-2 text-sm text-red-700">{error}</div>) : null}
          {docs.length === 0 ? (
            <div className="text-sm text-gray-600 py-6 text-center">Aún no tienes documentos disponibles.</div>
          ) : (
            docs.map((d) => (
              <div key={d.nombre} className="flex items-center justify-between p-2 rounded-xl hover:bg-gray-50">
                <div className="min-w-0">
                  <div className="font-medium truncate max-w-[60ch]">{d.nombre}</div>
                  <div className="text-xs text-gray-500">{d.fecha} • {(d.size/1024).toFixed(1)} KB</div>
                </div>
                <div className="flex items-center gap-2">
                  <a href={d.url} target="_blank" rel="noreferrer" className="rounded-md border px-3 py-1 text-gray-900 hover:bg-gray-50">Ver/Descargar</a>
                  <button disabled={loading} onClick={() => onRemove(d)} className="rounded-md border px-3 py-1 text-red-600 hover:bg-red-50 disabled:opacity-60">Eliminar</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
