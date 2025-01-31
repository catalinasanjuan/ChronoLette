import { NextRequest, NextResponse } from "next/server";
import multer from "multer";
import path from "path";
import fs from "fs";

// Configurar multer para guardar imágenes en /public/uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(process.cwd(), "public/uploads");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

export const POST = async (req: NextRequest) => {
  return new Promise((resolve, reject) => {
    upload.single("file")(req as any, {} as any, async (err) => {
      if (err) {
        reject(new NextResponse(JSON.stringify({ error: err.message }), { status: 500 }));
        return;
      }

      const file = (req as any).file;
      if (!file) {
        reject(new NextResponse(JSON.stringify({ error: "No se subió ningún archivo." }), { status: 400 }));
        return;
      }

      const imageUrl = `/uploads/${file.filename}`;
      resolve(new NextResponse(JSON.stringify({ imageUrl }), { status: 200 }));
    });
  });
};
