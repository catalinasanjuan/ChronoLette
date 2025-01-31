import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { content } = await req.json();

    if (!content) {
      return new Response(JSON.stringify({ error: "El contenido no puede estar vacío." }), {
        status: 400,
      });
    }

    const newLetter = await prisma.letter.create({
      data: { content },
    });

    return new Response(JSON.stringify({ message: "Carta guardada.", letter: newLetter }), {
      status: 201,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Error al guardar la carta." }),
      { status: 500 }
    );
  }
}
export async function GET() {
  try {
    const letters = await prisma.letter.findMany({
      orderBy: { id: "desc" }, // Ordenar por más recientes primero
    });

    return new Response(JSON.stringify({ letters }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error al obtener las cartas." }), {
      status: 500,
    });
  }
}
