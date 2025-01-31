"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      router.push("/login");
    } else {
      setError(data.error || "Error al registrar");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center vintage-paper">
      <div className="bg-card shadow-lg p-8 rounded-lg max-w-md w-full border border-primary/20">
        <h2 className="handwritten text-3xl text-primary text-center mb-6">
          Regístrate
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-muted-foreground">
              Nombre
            </label>
            <input
              type="text"
              className="mt-1 w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring focus:ring-primary/40"
              placeholder="Tu nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

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
            disabled={loading}
          >
            {loading ? "Registrando..." : "Registrarse"}
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          ¿Ya tienes cuenta?{" "}
          <a href="/login" className="text-primary hover:underline">
            Inicia Sesión
          </a>
        </p>
      </div>
    </div>
  );
}
