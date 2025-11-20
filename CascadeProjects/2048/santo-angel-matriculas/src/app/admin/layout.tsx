"use client";

import { useEffect, useState } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [adminName, setAdminName] = useState<string>("Director Admin");
  const [hideBanner, setHideBanner] = useState<boolean>(false);

  useEffect(() => {
    try {
      const n = localStorage.getItem("admin_demo_user");
      if (n) setAdminName(n.replace(/\b\w/g, (c) => c.toUpperCase()));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      const v = localStorage.getItem("admin_banner_dismissed");
      if (v === "1") setHideBanner(true);
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
      <aside className="rounded-3xl p-3 bg-gradient-to-b from-indigo-700 via-violet-700 to-fuchsia-700 text-white shadow-lg">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center text-xl">🏫</div>
          <div>
            <div className="font-semibold">{adminName}</div>
            <div className="text-[11px] bg-indigo-300 text-indigo-950 inline-block px-2 py-[2px] rounded-full mt-0.5">Administrador</div>
            <div className="text-xs text-white/80">Flandes, Tolima</div>
          </div>
        </div>

        <div className="mt-4 rounded-xl bg-white/10 p-3">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-white/30 flex items-center justify-center">🧑🏻‍💼</div>
            <div className="text-sm">
              <div className="font-medium">{adminName}</div>
              <div className="text-[11px] bg-indigo-300 text-indigo-950 inline-block px-2 py-[2px] rounded-full">Administrador</div>
            </div>
          </div>
        </div>

        <nav className="mt-4 space-y-2 text-sm">
          <NavItem href="/admin" label="Dashboard" icon="📊" />
          <NavItem href="/admin/estudiantes" label="Estudiantes" icon="👥" />
          <NavItem href="/admin/matriculas" label="Matrículas" icon="📝" />
          <NavItem href="/admin/pagos" label="Pagos/Pensiones" icon="💳" />
          <NavItem href="/admin/profesores" label="Profesores" icon="🎓" />
          <NavItem href="/admin/cursos" label="Cursos" icon="📚" />
          <NavItem href="/admin/notas" label="Notas" icon="⭐" />
          <NavItem href="/admin/documentos" label="Documentos" icon="📄" />
        </nav>

        <a href="/login" className="mt-4 block w-[45%] mx-auto text-center rounded-2xl bg-gradient-to-r from-red-500 to-rose-500 px-3 py-2 text-white text-sm hover:opacity-95">Cerrar Sesión</a>
      </aside>

      <main className="rounded-none bg-transparent p-0">
        {!hideBanner && (
          <div className="flex items-center justify-between px-4 py-2 text-sm bg-amber-500/90 text-amber-950">
            <div>
              <strong className="mr-1">Aviso:</strong>
              Estás viendo algo que ha creado otro usuario de Figma. Ten cuidado al adicionar cualquier información personal.
            </div>
            <button
              aria-label="Cerrar aviso"
              className="rounded-md bg-amber-600/30 hover:bg-amber-600/40 px-2 py-1"
              onClick={() => {
                setHideBanner(true);
                try { localStorage.setItem("admin_banner_dismissed", "1"); } catch {}
              }}
            >✕</button>
          </div>
        )}
        <div className="w-full">{children}</div>
      </main>
    </div>
  );
}
