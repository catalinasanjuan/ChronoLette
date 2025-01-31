"use client";

import { Feather } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen vintage-paper">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <Feather className="h-12 w-12 text-primary animate-pulse" />
          </div>
          <h1 className="font-sans text-5xl md:text-7xl mb-6 text-primary">
            Querido yo futuro...
          </h1>


          <p className="font-serif italic text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            "El tiempo es un río que me arrebata, pero yo soy el río; es un tigre que me destroza, pero yo soy el tigre..."
            <span className="crete-round mt-2">- Jorge Luis Borges</span>
          </p>
          <div className="flex gap-6 justify-center">
            <Button size="lg" className="text-lg px-8" asChild>
              <Link href="/write">Escribir una Carta</Link>
            </Button>

          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-card/80 backdrop-blur-sm p-8 rounded-lg shadow-md border border-primary/10">
            <div className="ont-sans text-3xl text-primary mb-4">Escribe</div>
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
      </div>

      {/* Inspiration Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="font-sans text-4xl text-primary mb-12">Momentos para capturar</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="aspect-square relative rounded-lg overflow-hidden">
            <Image
              src="https://i.pinimg.com/736x/f5/02/fc/f502fc9ebc186391507b0668bee9a38f.jpg"
              alt="Graduación"
              fill
              className="object-cover hover:scale-110 transition-transform duration-300"
            />
          </div>
          <div className="aspect-square relative rounded-lg overflow-hidden">
            <Image
              src="https://i.pinimg.com/736x/81/88/cc/8188cc6c71f121ebfb6a9d3e19428c1b.jpg"
              alt="Viajes"
              fill
              className="object-cover hover:scale-110 transition-transform duration-300"
            />
          </div>
          <div className="aspect-square relative rounded-lg overflow-hidden">
            <Image
              src="https://i.pinimg.com/736x/84/03/c8/8403c851b5342ec161036468aa67a543.jpg"
              alt="Sueños"
              fill
              className="object-cover hover:scale-110 transition-transform duration-300"
            />
          </div>
          <div className="aspect-square relative rounded-lg overflow-hidden">
            <Image
              src="https://i.pinimg.com/736x/5b/30/4a/5b304a37b5ce11e4a66da2aad2abd198.jpg"
              alt="Memorias"
              fill
              className="object-cover hover:scale-110 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </main>
  );
}