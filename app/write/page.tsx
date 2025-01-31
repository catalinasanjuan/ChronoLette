"use client";

import { useState } from "react";

export default function WriteLetter() {
  const [letter, setLetter] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!letter) {
      setMessage("Por favor, escribe una carta.");
      return;
    }

    let imageUrl = null;

    if (image) {
      const formData = new FormData();
      formData.append("file", image);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        imageUrl = data.imageUrl;
      } else {
        setMessage("Error al subir la imagen.");
        return;
      }
    }

    // Enviar la carta y la imagen
    const res = await fetch("/api/letters", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: letter, image: imageUrl }),
    });

    if (res.ok) {
      setMessage("Carta guardada exitosamente.");
      setLetter("");
      setImage(null);
      setPreview(null);
    } else {
      setMessage("Error al guardar la carta.");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center vintage-paper">
      <div className="bg-card shadow-lg p-8 rounded-lg max-w-lg w-full border border-primary/20">
        <h2 className="handwritten text-3xl text-primary text-center mb-6">
          Escribe una Carta
        </h2>

        {message && <p className="text-center text-red-500">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            className="w-full border rounded-lg p-2"
            placeholder="Escribe tu carta aquí..."
            value={letter}
            onChange={(e) => setLetter(e.target.value)}
          />

          <input type="file" accept="image/*" onChange={handleImageChange} />

          {preview && (
            <div className="mt-4 flex justify-center">
              <img src={preview} alt="Vista previa" className="max-w-xs rounded-lg shadow-md" />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground py-2 rounded-lg hover:bg-primary/90 transition"
          >
            Guardar Carta
          </button>
        </form>
      </div>
    </div>
  );
}
