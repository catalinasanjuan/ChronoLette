"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verificar si hay una sesión almacenada
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/login"); // Si no hay sesión, redirige a login
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (!isAuthenticated) {
    return <p className="text-center mt-20">Redirigiendo a login...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold">Bienvenido al Dashboard 🎉</h1>

      {/* Botón de Cerrar Sesión */}
      <button
        onClick={() => {
          localStorage.removeItem("user"); // Eliminar sesión
          router.push("/login");
        }}
        className="mt-6 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
      >
        Cerrar Sesión
      </button>
    </div>
  );
}
