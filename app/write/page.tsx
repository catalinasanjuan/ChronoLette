"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function WriteLetter() {
  const router = useRouter();
  const [letter, setLetter] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/login"); // Si no está autenticado, redirige a login
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const response = await fetch("/api/letters", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: letter }),
    });

    if (response.ok) {
      setMessage("Carta guardada exitosamente.");
      setLetter("");
    } else {
      setMessage("Error al guardar la carta.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-xl font-semibold mb-4">Escribe una Carta</h2>
        <textarea
          className="w-full border rounded-lg p-2"
          placeholder="Escribe tu carta aquí..."
          value={letter}
          onChange={(e) => setLetter(e.target.value)}
        />
        <button
          onClick={handleSubmit}
          className="w-full mt-4 bg-brown-700 text-white py-2 rounded-lg"
          disabled={loading}
        >
          {loading ? "Guardando..." : "Guardar Carta"}
        </button>
        {message && <p className="mt-2 text-center">{message}</p>}
      </div>
    </div>
  );
}
