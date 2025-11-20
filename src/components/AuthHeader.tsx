"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AuthHeader() {
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data } = await supabase.auth.getUser();
      if (!mounted) return;
      setEmail(data.user?.email ?? null);
      setLoading(false);
    })();
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setEmail(session?.user?.email ?? null);
    });
    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  if (loading) return null;

  return (
    <div className="ml-auto flex items-center gap-3 text-sm">
      {email ? (
        <>
          <span className="text-gray-700 hidden sm:inline">{email}</span>
          <a href="/perfil" className="text-gray-700 hover:text-black">Mi perfil</a>
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              // force refresh
              window.location.href = "/";
            }}
            className="rounded-md bg-gray-100 px-3 py-1.5 hover:bg-gray-200"
          >
            Cerrar sesión
          </button>
        </>
      ) : (
        <a href="/login" className="text-blue-600 hover:underline">Ingresar</a>
      )}
    </div>
  );
}
