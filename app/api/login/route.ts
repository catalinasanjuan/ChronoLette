import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Verificar si el usuario existe en la base de datos
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return new Response(JSON.stringify({ error: "Usuario no encontrado" }), {
        status: 404,
      });
    }

    // Comparar la contraseña ingresada con la almacenada en la base de datos
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return new Response(JSON.stringify({ error: "Contraseña incorrecta" }), {
        status: 401,
      });
    }

    return new Response(
      JSON.stringify({
        message: "Inicio de sesión exitoso",
        user: { id: user.id, name: user.name, email: user.email },
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Error al iniciar sesión" }),
      { status: 500 }
    );
  }
}
