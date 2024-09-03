import fs from "fs";
import path from "path";
import { NextResponse, NextRequest } from "next/server";
import { randomUUID } from "crypto";
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
    const { slug, title, description } = body;

    if (!slug || !title || !description) {
      return NextResponse.json(
        { error: "All fields are required" },
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

    // Gera um ID aleatório para o novo post
    const id = randomUUID();

    // Adiciona o novo post ao array de posts
    const newPost: Post = {
      id, // Inclui o ID dentro dos dados do post para referência
      slug, // Inclui o slug dentro dos dados do post
      title,
      description,
      content: "", // Conteúdo padrão
      isPublished: false, // O post não é publicado por padrão
      created_at: new Date().toISOString(), // Data de criação
      views: 0, // Inicializa com 0 visualizações
      likes: 0, // Inicializa com 0 curtidas
      excerpt: "", // Inicializa com um excerto vazio
      author: "Unknown", // Autor padrão
      category: "Uncategorized", // Categoria padrão
      tags: [], // Tags vazias por padrão
      imageUrl: "", // URL padrão da imagem
    };

    postsData.posts.push(newPost);

    // Salva os dados atualizados de volta no arquivo
    fs.writeFileSync(postsPath, JSON.stringify(postsData, null, 2));

    return NextResponse.json(
      { message: "Post created successfully", id },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "An error occurred while creating the post",
      },
      { status: 500 }
    );
  }
}
