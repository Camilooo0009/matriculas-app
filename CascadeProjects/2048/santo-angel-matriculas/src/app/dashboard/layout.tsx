"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function StudentDashboardLayout({ children }: { children: React.ReactNode }) {
  const [studentName, setStudentName] = useState<string>("María");
  const [studentFullName, setStudentFullName] = useState<string>("Estudiante");
  const pathname = usePathname();
  useEffect(() => {
    try {
      const n = localStorage.getItem("student_demo_name");
      if (n) {
        setStudentFullName(n);
        setStudentName(n.split(" ")[0]);
      }
    } catch {}
  }, []);

  const linkBase = "flex items-center justify-center gap-2 rounded-xl px-1.5 py-2 text-[14px] transition w-[50%] mx-auto";
  const active = "bg-white text-gray-900 shadow";
  const idle = "text-white/90 bg-white/10 hover:bg-white/15";

  return (
    <div className="min-h-screen grid grid-cols-[220px,1fr] gap-1 p-0">

      <aside className="rounded-3xl p-3 bg-gradient-to-b from-blue-600 via-indigo-600 to-purple-600 text-white shadow-lg flex flex-col">
        <div>
          <div className="flex flex-col items-center text-center">
            <div className="h-14 w-14 rounded-2xl bg-white/15 flex items-center justify-center text-3xl">🏫</div>
            <div className="mt-2 font-semibold text-lg">Mi Escuela <span className="align-middle">🎓</span></div>
            <div className="text-xs text-white/90 mt-0.5">Estudiante ({studentFullName})</div>
            <div className="text-xs text-white/85 flex items-center gap-1"><span>📍</span> <span>Flandes, Tolima</span></div>
          </div>
          <div className="my-4 h-px bg-white/20" />

          <div className="rounded-2xl bg-white/15 p-3">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-yellow-400/90 text-yellow-950 flex items-center justify-center">👤</div>
              <div className="text-sm">
                <div className="font-medium">{studentFullName}</div>
                <div className="mt-1 inline-flex items-center text-[10px] bg-yellow-400 text-yellow-900 px-2 py-[2px] rounded-full">
                  <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-yellow-600" />
                  <span>Estudiante</span>
                </div>
              </div>
            </div>
          </div>

          <nav className="mt-4 space-y-3">
            <a href="/dashboard" className={`${linkBase} ${pathname === "/dashboard" ? active : idle}`}>
              <span>🏠</span>
              <span>Inicio</span>
              {pathname === "/dashboard" ? <span>✨</span> : null}
            </a>
            <a href="/dashboard/notas" className={`${linkBase} ${pathname?.startsWith("/dashboard/notas") ? active : idle}`}>
              <span>⭐</span>
              <span>Mis Notas</span>
              {pathname?.startsWith("/dashboard/notas") ? <span>✨</span> : null}
            </a>
            <a href="/dashboard/clases" className={`${linkBase} ${pathname?.startsWith("/dashboard/clases") ? active : idle}`}>
              <span>📚</span>
              <span>Mis Clases</span>
              {pathname?.startsWith("/dashboard/clases") ? <span>✨</span> : null}
            </a>
            <a href="/dashboard/pagos" className={`${linkBase} ${pathname?.startsWith("/dashboard/pagos") ? active : idle}`}>
              <span>💰</span>
              <span>Pagos</span>
              {pathname?.startsWith("/dashboard/pagos") ? <span>✨</span> : null}
            </a>
            <a href="/dashboard/documentos" className={`${linkBase} ${pathname?.startsWith("/dashboard/documentos") ? active : idle}`}>
              <span>📁</span>
              <span>Documentos</span>
              {pathname?.startsWith("/dashboard/documentos") ? <span>✨</span> : null}
            </a>
            <a href="/dashboard/perfil" className={`${linkBase} ${pathname?.startsWith("/dashboard/perfil") ? active : idle}`}>
              <span>👤</span>
              <span>Mi Perfil</span>
              {pathname?.startsWith("/dashboard/perfil") ? <span>✨</span> : null}
            </a>
          </nav>
        </div>

        <div className="mt-auto pt-4">
          <a href="/login" className="block w-[45%] mx-auto text-center rounded-2xl bg-gradient-to-r from-red-500 to-rose-500 px-3 py-2 text-white text-sm font-medium hover:opacity-95">Cerrar Sesión</a>
          <div className="mt-3 text-center text-xs text-white/70">© 2025 Sistema Escolar</div>
        </div>
      </aside>

      <main className="rounded-none bg-transparent p-0 shadow-none">
        <div className="w-full">{children}</div>
      </main>
    </div>
  );
}

