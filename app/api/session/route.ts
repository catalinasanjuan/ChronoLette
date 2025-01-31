import jwt from "jsonwebtoken";
import { parse } from "cookie";

export async function GET(req: Request) {
  try {
    // Obtener las cookies
    const cookies = parse(req.headers.get("cookie") || "");

    if (!cookies.authToken) {
      return new Response(JSON.stringify({ error: "No autenticado" }), {
        status: 401,
      });
    }

    // Verificar JWT
    const user = jwt.verify(cookies.authToken, process.env.JWT_SECRET as string);

    return new Response(JSON.stringify({ user }), { status: 200 });
  } catch (error) {
    console.error("Error al verificar sesión:", error);
    return new Response(JSON.stringify({ error: "Token inválido o expirado" }), {
      status: 401,
    });
  }
}
