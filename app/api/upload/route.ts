import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No se encontró archivo." }, { status: 400 });
    }

    // Convertir a ArrayBuffer y luego a Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Definir la ruta de subida
    const uploadDir = path.join(process.cwd(), "public/uploads");
    const filePath = path.join(uploadDir, file.name);

    // Guardar la imagen en la carpeta /public/uploads
    fs.writeFileSync(filePath, buffer);

    return NextResponse.json({ message: "Imagen subida", url: `/uploads/${file.name}` });
  } catch (error) {
    console.error("Error al subir imagen:", error);
    return NextResponse.json({ error: "Error al subir imagen." }, { status: 500 });
  }
}
