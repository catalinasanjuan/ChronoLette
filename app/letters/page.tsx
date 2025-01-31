"use client";

import { useEffect, useState } from "react";

export default function LettersPage() {
  const [letters, setLetters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLetters = async () => {
      const res = await fetch("/api/letters");
      const data = await res.json();

      if (res.ok) {
        setLetters(data.letters);
      } else {
        console.error("Error al cargar las cartas:", data.error);
      }

      setLoading(false);
    };

    fetchLetters();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center vintage-paper">
      <div className="bg-card shadow-lg p-8 rounded-lg max-w-2xl w-full border border-primary/20">
        <h2 className="handwritten text-3xl text-primary text-center mb-6">
          Tus Cartas
        </h2>

        {loading ? (
          <p className="text-center">Cargando cartas...</p>
        ) : letters.length === 0 ? (
          <p className="text-center text-muted-foreground">No hay cartas guardadas.</p>
        ) : (
          <ul className="space-y-4">
            {letters.map((letter: { id: number; content: string; image?: string }) => (
              <li key={letter.id} className="p-4 border rounded-lg shadow-sm bg-background">
                <p className="text-muted-foreground">{letter.content}</p>
                {letter.image && (
                  <img
                    src={letter.image}
                    alt="Carta adjunta"
                    className="mt-2 rounded-lg shadow-md max-w-full"
                  />
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
