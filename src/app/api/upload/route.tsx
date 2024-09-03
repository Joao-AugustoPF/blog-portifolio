import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export async function POST(req: NextRequest) {
  const session = await getServerSession();

  if (!session) {
    // User is not authenticated
    return new Response(null, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const uploadDir = path.join(process.cwd(), "/public/uploads");

    // Certifique-se de que o diretório de upload existe
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Criando o caminho completo onde o arquivo será salvo
    const filePath = path.join(uploadDir, file.name);

    // Gravação do arquivo no disco
    const arrayBuffer = await file.arrayBuffer();
    fs.writeFileSync(filePath, Buffer.from(arrayBuffer));

    // Retorne o caminho da imagem para ser usada no editor
    const imageUrl = `/uploads/${file.name}`;
    return NextResponse.json({ uploadedImageUrl: imageUrl });
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred during the upload" },
      { status: 500 }
    );
  }
}
