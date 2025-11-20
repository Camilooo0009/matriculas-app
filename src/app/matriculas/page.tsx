"use client";

import EnrollmentMockForm from "../../components/EnrollmentMockForm";

export default function MatriculasPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold">Matrículas</h1>
      <p className="text-gray-600 mt-2">
        Diligencia el formulario para registrar la matrícula en el sistema. Al finalizar se generará tu cuenta de acceso (correo del acudiente) con la contraseña que definas.
      </p>
      <EnrollmentMockForm />
    </main>
  );
}
