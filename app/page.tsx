"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { parse } from "cookie";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Verificar si hay un token de sesión en las cookies
    const cookies = parse(document.cookie);
    if (cookies.authToken) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <main className="min-h-screen vintage-paper">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-sans text-5xl md:text-7xl mb-6 text-primary">
            Querido yo futuro...
          </h1>

          <p className="font-serif italic text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            "El tiempo es un río que me arrebata, pero yo soy el río; es un tigre que me destroza, pero yo soy el tigre..."
            <span className="crete-round mt-2">- Jorge Luis Borges</span>
          </p>

          {!isAuthenticated ? (
            // Si no está autenticado, mostrar solo el botón de iniciar sesión
            <Button size="lg" variant="outline" className="text-lg px-8" asChild>
              <Link href="/login">Iniciar Sesión</Link>
            </Button>
          ) : (
            // Si está autenticado, ocultar los botones y solo mostrar las tarjetas
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-8">
              <div className="bg-card/80 backdrop-blur-sm p-8 rounded-lg shadow-md border border-primary/10">
                <div className="font-sans text-3xl text-primary mb-4">Escribe</div>
                <p className="text-muted-foreground leading-relaxed">
                  Plasma tus pensamientos, sueños y esperanzas en cartas que atravesarán el tiempo.
                </p>
              </div>
              <div className="bg-card/80 backdrop-blur-sm p-8 rounded-lg shadow-md border border-primary/10">
                <div className="font-sans text-3xl text-primary mb-4">Guarda</div>
                <p className="text-muted-foreground leading-relaxed">
                  Añade fotografías y recuerdos que capturen la esencia del momento presente.
                </p>
              </div>
              <div className="bg-card/80 backdrop-blur-sm p-8 rounded-lg shadow-md border border-primary/10">
                <div className="font-sans text-3xl text-primary mb-4">Recuerda</div>
                <p className="text-muted-foreground leading-relaxed">
                  Recibe mensajes de tu pasado cuando más los necesites.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
