export default function Home() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Fondo degradado colorido */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-200 via-pink-300 to-purple-400" />
      {/* Partículas simples decorativas */}
      <DecorShapes />

      {/* Tarjeta central */}
      <main className="relative z-10 w-full max-w-3xl rounded-[28px] bg-white/80 backdrop-blur-md p-8 shadow-lg border-2" style={{ borderColor: "rgba(135, 206, 235, 0.8)", boxShadow: "0 0 0 6px rgba(135,206,235,0.25) inset" }}>
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-fuchsia-600 via-pink-600 to-purple-700 bg-clip-text text-transparent">
            Institución Educativa Santo Ángel — Flandes Tolima
          </h1>
          <p className="mt-2 text-gray-700">Portal de matrículas, pensiones y gestión académica</p>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <HomeButton href="/login" icon="🔑" text="Ingresar" />
          <HomeButton href="/matriculas" icon="🎓" text="Matrículas" />
          <HomeButton href="/pagos" icon="🐷" text="Pagos" />
          <HomeButton href="/reportes" icon="📈" text="Reportes" />
        </div>
      </main>

      {/* Slogan inferior */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
        <div className="rounded-full bg-white/90 px-4 py-2 text-sm text-gray-800 shadow">¡Educación con alas para alcanzar tus sueños!</div>
      </div>
    </div>
  );
}

function HomeButton({ href, icon, text }: { href: string; icon: string; text: string }) {
  return (
    <a
      href={href}
      className="flex items-center justify-between gap-3 rounded-2xl border bg-white/90 px-4 py-3 text-gray-900 hover:bg-white shadow-sm"
    >
      <span className="inline-flex items-center gap-3">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white text-sm">
          {icon}
        </span>
        <span className="font-medium">{text}</span>
      </span>
      <span className="text-purple-600">›</span>
    </a>
  );
}

function DecorShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <span className="absolute left-10 top-16 h-3 w-3 bg-pink-500 rounded-full opacity-70" />
      <span className="absolute right-12 top-24 h-4 w-4 bg-emerald-400 rounded-sm rotate-12 opacity-70" />
      <span className="absolute left-1/2 top-8 h-3 w-10 bg-purple-500/60 rounded-full blur-sm -translate-x-1/2" />
      <span className="absolute left-16 bottom-24 h-3 w-3 rounded-full bg-yellow-400 opacity-80" />
      <span className="absolute right-20 bottom-16 h-3 w-3 rounded-full bg-cyan-400 opacity-80" />
    </div>
  );
}
