import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Buscar el usuario en la base de datos
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

    // Generar JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      process.env.JWT_SECRET as string, // Clave secreta del .env
      { expiresIn: "7d" }
    );

    // Guardar el token en una cookie
    const serializedCookie = serialize("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 días
    });

    return new Response(
      JSON.stringify({ message: "Inicio de sesión exitoso", user }),
      {
        status: 200,
        headers: { "Set-Cookie": serializedCookie },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Error al iniciar sesión" }),
      { status: 500 }
    );
  }
}
