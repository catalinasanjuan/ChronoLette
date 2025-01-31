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
