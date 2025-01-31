"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("user", JSON.stringify(data.user));
      router.push("/home");
    } else {
      setError(data.error || "Error al iniciar sesión");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center vintage-paper">
      <div className="bg-card shadow-lg p-8 rounded-lg max-w-md w-full border border-primary/20">
        <h2 className="handwritten text-3xl text-primary text-center mb-6">
          Iniciar Sesión
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-muted-foreground">
              Correo Electrónico
            </label>
            <input
              type="email"
              className="mt-1 w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring focus:ring-primary/40"
              placeholder="correo@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground">
              Contraseña
            </label>
            <input
              type="password"
              className="mt-1 w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring focus:ring-primary/40"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground py-2 rounded-lg hover:bg-primary/90 transition"
          >
            Iniciar Sesión
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          ¿No tienes cuenta?{" "}
          <a href="/register" className="text-primary hover:underline">
            Regístrate
          </a>
        </p>
      </div>
    </div>
  );
}