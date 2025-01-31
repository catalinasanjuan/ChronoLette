"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (!isAuthenticated) {
    return <p className="text-center mt-20">Redirigiendo a login...</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center vintage-paper">
      <h1 className="handwritten text-4xl text-primary mb-6">
        Bienvenido al Dashboard 🎉
      </h1>

      <button
        onClick={() => {
          localStorage.removeItem("user");
          router.push("/login");
        }}
        className="px-6 py-2 bg-destructive text-white rounded-lg hover:bg-destructive/90 transition"
      >
        Cerrar Sesión
      </button>
    </div>
  );
}
