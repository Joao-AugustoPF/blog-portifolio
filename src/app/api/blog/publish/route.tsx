import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

// Definição da interface para os dados do post
interface Post {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  isPublished: boolean;
  created_at: string;
  updatedAt?: string;
  views: number;
  likes: number;
  excerpt: string;
  author: string;
  category: string;
  tags: string[];
  imageUrl: string;
}

interface PostsData {
  posts: Post[];
}

export async function POST(req: NextRequest) {
  const session = await getServerSession();

  if (!session) {
    // Usuário não autenticado
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const { body } = await req.json();
    const { id, content, imageUrl } = body;

    if (!id || !content) {
      return NextResponse.json(
        { error: "Content or ID not provided" },
        { status: 400 }
      );
    }

    const dataDir = path.join(process.cwd(), "data");
    const postsPath = path.join(dataDir, "posts.json");

    // Certifique-se de que o diretório de dados existe
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    let postsData: PostsData = { posts: [] };

    // Se o arquivo posts.json já existir, carrega os dados atuais
    if (fs.existsSync(postsPath)) {
      const rawData = fs.readFileSync(postsPath, "utf-8");
      postsData = JSON.parse(rawData);
    }

    // Procura pelo post com o id fornecido
    const postIndex = postsData.posts.findIndex((post) => post.id === id);

    if (postIndex > -1) {
      // Atualiza o post existente
      postsData.posts[postIndex] = {
        ...postsData.posts[postIndex], // Mantém os dados existentes do post
        content, // Atualiza o conteúdo
        isPublished: true, // Marca o post como publicado
        updatedAt: new Date().toISOString(), // Atualiza a data de modificação
        imageUrl: imageUrl || postsData.posts[postIndex].imageUrl || "", // Adiciona ou mantém a URL da imagem
      };
    } else {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Salva os dados atualizados de volta no arquivo
    fs.writeFileSync(postsPath, JSON.stringify(postsData, null, 2));

    return NextResponse.json(
      { message: "Content published successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "An error occurred while publishing the content",
      },
      { status: 500 }
    );
  }
}
