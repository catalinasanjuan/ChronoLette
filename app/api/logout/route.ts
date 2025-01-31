import { serialize } from "cookie";

export async function POST() {
  const serializedCookie = serialize("authToken", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0, // Expirar inmediatamente
  });

  return new Response(
    JSON.stringify({ message: "Sesión cerrada correctamente" }),
    {
      status: 200,
      headers: { "Set-Cookie": serializedCookie },
    }
  );
}
