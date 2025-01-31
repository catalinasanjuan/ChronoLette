import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return new Response(JSON.stringify({ error: "El correo ya está registrado" }), { status: 400 });
    }

    // Encriptar la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10);

    // Guardar usuario en la base de datos
    const newUser = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    return new Response(JSON.stringify({ message: "Usuario registrado con éxito" }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error al registrar usuario" }), { status: 500 });
  }
}
