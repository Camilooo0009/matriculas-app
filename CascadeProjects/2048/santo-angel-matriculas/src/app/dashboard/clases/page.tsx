"use client";

import { useMemo } from "react";

type Slot = { time: string };
type Cell = { subject: string; teacher: string; room?: string; color: string } | null;

export default function ClasesPage() {
  const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
  const slots: Slot[] = [
    { time: "7:00 - 7:50" },
    { time: "7:50 - 8:40" },
    { time: "8:40 - 9:30" },
    { time: "9:30 - 10:00" }, // descanso
    { time: "10:00 - 10:50" },
    { time: "10:50 - 11:40" },
    { time: "11:40 - 12:30" },
  ];

  // Horario demo por día y franja
  const schedule: Record<string, Cell[]> = useMemo(() => ({
    Lunes: [
      { subject: "Matemáticas", teacher: "Profa. Gómez", room: "Aula 3", color: "bg-amber-100 text-amber-800" },
      { subject: "Lengua", teacher: "Prof. Díaz", room: "Aula 2", color: "bg-sky-100 text-sky-800" },
      { subject: "Inglés", teacher: "Miss Clark", room: "Aula 5", color: "bg-emerald-100 text-emerald-800" },
      null, // descanso
      { subject: "Ciencias", teacher: "Prof. Rivas", room: "Lab 1", color: "bg-violet-100 text-violet-800" },
      { subject: "Arte", teacher: "Profa. Ruiz", room: "Sala Arte", color: "bg-pink-100 text-pink-800" },
      { subject: "Educ. Física", teacher: "Prof. León", room: "Cancha", color: "bg-indigo-100 text-indigo-800" },
    ],
    Martes: [
      { subject: "Ciencias", teacher: "Prof. Rivas", room: "Lab 1", color: "bg-violet-100 text-violet-800" },
      { subject: "Matemáticas", teacher: "Profa. Gómez", room: "Aula 3", color: "bg-amber-100 text-amber-800" },
      { subject: "Tecnología", teacher: "Prof. Lara", room: "Sala TIC", color: "bg-cyan-100 text-cyan-800" },
      null,
      { subject: "Sociales", teacher: "Profa. Vera", room: "Aula 4", color: "bg-rose-100 text-rose-800" },
      { subject: "Lengua", teacher: "Prof. Díaz", room: "Aula 2", color: "bg-sky-100 text-sky-800" },
      { subject: "Religión", teacher: "Padre Luis", room: "Aula 1", color: "bg-emerald-100 text-emerald-800" },
    ],
    Miércoles: [
      { subject: "Inglés", teacher: "Miss Clark", room: "Aula 5", color: "bg-emerald-100 text-emerald-800" },
      { subject: "Matemáticas", teacher: "Profa. Gómez", room: "Aula 3", color: "bg-amber-100 text-amber-800" },
      { subject: "Lengua", teacher: "Prof. Díaz", room: "Aula 2", color: "bg-sky-100 text-sky-800" },
      null,
      { subject: "Ciencias", teacher: "Prof. Rivas", room: "Lab 1", color: "bg-violet-100 text-violet-800" },
      { subject: "Educ. Física", teacher: "Prof. León", room: "Cancha", color: "bg-indigo-100 text-indigo-800" },
      { subject: "Arte", teacher: "Profa. Ruiz", room: "Sala Arte", color: "bg-pink-100 text-pink-800" },
    ],
    Jueves: [
      { subject: "Sociales", teacher: "Profa. Vera", room: "Aula 4", color: "bg-rose-100 text-rose-800" },
      { subject: "Inglés", teacher: "Miss Clark", room: "Aula 5", color: "bg-emerald-100 text-emerald-800" },
      { subject: "Tecnología", teacher: "Prof. Lara", room: "Sala TIC", color: "bg-cyan-100 text-cyan-800" },
      null,
      { subject: "Matemáticas", teacher: "Profa. Gómez", room: "Aula 3", color: "bg-amber-100 text-amber-800" },
      { subject: "Lengua", teacher: "Prof. Díaz", room: "Aula 2", color: "bg-sky-100 text-sky-800" },
      { subject: "Religión", teacher: "Padre Luis", room: "Aula 1", color: "bg-emerald-100 text-emerald-800" },
    ],
    Viernes: [
      { subject: "Educ. Física", teacher: "Prof. León", room: "Cancha", color: "bg-indigo-100 text-indigo-800" },
      { subject: "Arte", teacher: "Profa. Ruiz", room: "Sala Arte", color: "bg-pink-100 text-pink-800" },
      { subject: "Sociales", teacher: "Profa. Vera", room: "Aula 4", color: "bg-rose-100 text-rose-800" },
      null,
      { subject: "Ciencias", teacher: "Prof. Rivas", room: "Lab 1", color: "bg-violet-100 text-violet-800" },
      { subject: "Matemáticas", teacher: "Profa. Gómez", room: "Aula 3", color: "bg-amber-100 text-amber-800" },
      { subject: "Lengua", teacher: "Prof. Díaz", room: "Aula 2", color: "bg-sky-100 text-sky-800" },
    ],
  }), []);

  return (
    <div>
      <h1 className="text-xl font-semibold">Mis Clases</h1>

      {/* Horario semanal */}
      <div className="mt-3 rounded-2xl bg-white shadow-md border border-gray-100 overflow-x-auto">
        <div className="min-w-[760px]">
          <div className="grid grid-cols-6">
            <div className="p-3 text-xs font-medium text-gray-500">Franja</div>
            {days.map((d) => (
              <div key={d} className="p-3 text-xs font-medium text-gray-700">{d}</div>
            ))}
          </div>
          {slots.map((s, idx) => (
            <div key={s.time} className="grid grid-cols-6 border-t">
              <div className="p-3 text-xs text-gray-600 flex items-center">{s.time}</div>
              {days.map((d) => {
                const cell = schedule[d][idx];
                if (cell === null) {
                  return <div key={d+idx} className="p-3 text-center text-xs text-gray-500">Descanso ☕</div>;
                }
                return (
                  <div key={d+idx} className="p-2">
                    <div className={`rounded-xl ${cell.color} px-2 py-2 text-xs shadow-sm`}>
                      <div className="font-medium">{cell.subject}</div>
                      <div className="text-[10px] opacity-90">{cell.teacher}{cell.room ? ` • ${cell.room}` : ""}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Leyenda */}
      <div className="mt-3 text-xs text-gray-500">Horario de ejemplo para demostración. Los datos pueden variar.</div>
    </div>
  );
}
