"use client";

import { useEffect, useState } from "react";

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  const [teacherName, setTeacherName] = useState<string>("Roberto Vargas");

  useEffect(() => {
    try {
      const n = localStorage.getItem("teacher_demo_user");
      if (n) setTeacherName(n.replace(/\b\w/g, (c) => c.toUpperCase()));
    } catch {}
  }, []);

  const NavItem = ({ href, label, icon }: { href: string; label: string; icon: string }) => (
    <a href={href} className="flex items-center justify-center gap-2 rounded-xl px-1.5 py-2 text-white/90 hover:bg-white/10 w-[50%] mx-auto">
      <span className="text-lg">{icon}</span>
      <span className="text-sm">{label}</span>
    </a>
  );

  return (
    <div className="min-h-screen grid grid-cols-[220px,1fr] gap-1 p-0">
      <aside className="rounded-3xl p-3 bg-gradient-to-b from-emerald-700 via-green-700 to-emerald-800 text-white shadow-lg">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center text-xl">🎓</div>
          <div>
            <div className="font-semibold">Panel Docente</div>
            <div className="text-xs text-white/90 mt-0.5">Docente ({teacherName})</div>
            <div className="text-xs text-white/80">Flandes, Tolima</div>
          </div>
        </div>

        <div className="mt-4 rounded-xl bg-white/10 p-3">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-white/30 flex items-center justify-center">🧑🏻‍🏫</div>
            <div className="text-sm">
              <div className="font-medium">{teacherName}</div>
              <div className="text-[11px] bg-amber-300 text-amber-950 inline-block px-2 py-[2px] rounded-full">Profesor</div>
            </div>
          </div>
        </div>

        <nav className="mt-4 space-y-2 text-sm">
          <NavItem href="/docente" label="Inicio" icon="🏠" />
          <NavItem href="/docente/estudiantes" label="Mis Estudiantes" icon="👥" />
          <NavItem href="/docente/cursos" label="Mis Cursos" icon="📘" />
          <NavItem href="/docente/calificaciones" label="Calificaciones" icon="📝" />
          <NavItem href="/docente/documentos" label="Documentos" icon="📄" />
        </nav>

        <a href="/login" className="mt-4 block w-[45%] mx-auto text-center rounded-2xl bg-gradient-to-r from-red-500 to-rose-500 px-3 py-2 text-white text-sm hover:opacity-95">Cerrar Sesión</a>
      </aside>

      <main className="rounded-none bg-transparent p-0">
        <div className="w-full">{children}</div>
      </main>
    </div>
  );
}
