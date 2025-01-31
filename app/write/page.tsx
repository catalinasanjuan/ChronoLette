"use client";

import { useState } from "react";

export default function WriteLetter() {
  const [letter, setLetter] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const response = await fetch("/api/letters", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: letter }),
    });

    if (response.ok) {
      setMessage("✅ Carta guardada exitosamente.");
      setLetter("");
    } else {
      setMessage("❌ Error al guardar la carta.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center vintage-paper">
      <div className="bg-card shadow-lg p-8 rounded-lg max-w-md w-full border border-primary/20">
        <h2 className="handwritten text-3xl text-primary text-center mb-6">
          Escribe una Carta
        </h2>

        {message && <p className="text-center text-muted-foreground">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <textarea
            className="w-full border rounded-lg p-2"
            placeholder="Escribe tu carta aquí..."
            value={letter}
            onChange={(e) => setLetter(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground py-2 rounded-lg hover:bg-primary/90 transition"
            disabled={loading}
          >
            {loading ? "Guardando..." : "Guardar Carta"}
          </button>
        </form>
      </div>
    </div>
  );
}
