"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkSession = async () => {
      const res = await fetch("/api/session");
      const data = await res.json();

      if (!res.ok) {
        router.push("/login"); // Redirigir si no hay sesión
      } else {
        setUser(data.user);
      }
    };

    checkSession();
  }, [router]);

  if (!user) {
    return <p className="text-center mt-20">Redirigiendo a login...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold">Bienvenido, {user.name} 🎉</h1>
      <button
        onClick={async () => {
          await fetch("/api/logout", { method: "POST" });
          router.push("/login");
        }}
        className="mt-6 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
      >
        Cerrar Sesión
      </button>
    </div>
  );
}
