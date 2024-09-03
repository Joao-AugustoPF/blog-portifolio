import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

// Definição da interface para os dados do post
interface Post {
  id: string;
  slug: string;
  title: string;
  author: string;
  created_at: string;
  category: string;
  tags: string[];
  views: number;
  likes: number;
  excerpt: string;
  content: string;
  isPublished: boolean;
  imageUrl: string;
  description: string;
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

  const { body } = await req.json();

  try {
    const {
      id,
      slug,
      title,
      author,
      created_at,
      category,
      tags,
      views,
      likes,
      excerpt,
      content,
      isPublished,
      imageUrl,
      description,
    }: Partial<Post> = body; // Define os tipos como parciais, pois nem todos os campos são obrigatórios

    if (!id || !content) {
      return NextResponse.json(
        { error: "Content or postId not provided" },
        { status: 400 }
      );
    }

    const saveDir = path.join(process.cwd(), "/data");
    const savePath = path.join(saveDir, "posts.json");

    // Certifique-se de que o diretório de dados existe
    if (!fs.existsSync(saveDir)) {
      fs.mkdirSync(saveDir, { recursive: true });
    }

    let savedData: PostsData = { posts: [] };

    // Se o arquivo já existe, carrega os dados atuais
    if (fs.existsSync(savePath)) {
      const rawData = fs.readFileSync(savePath, "utf-8");
      savedData = JSON.parse(rawData);
    }

    // Procura pelo post com o id fornecido
    const postIndex = savedData.posts.findIndex((post) => post.id === id);

    const newPost: Post = {
      id,
      slug: slug || savedData.posts[postIndex]?.slug || "untitled-slug",
      title: title || savedData.posts[postIndex]?.title || "Untitled",
      author: author || savedData.posts[postIndex]?.author || "Unknown",
      created_at:
        created_at ||
        savedData.posts[postIndex]?.created_at ||
        new Date().toISOString(),
      category:
        category || savedData.posts[postIndex]?.category || "Uncategorized",
      tags: tags || savedData.posts[postIndex]?.tags || [],
      views:
        views !== undefined ? views : savedData.posts[postIndex]?.views || 0,
      likes:
        likes !== undefined ? likes : savedData.posts[postIndex]?.likes || 0,
      excerpt: excerpt || savedData.posts[postIndex]?.excerpt || "",
      description: description || savedData.posts[postIndex]?.description || "",
      content,
      isPublished:
        isPublished !== undefined
          ? isPublished
          : savedData.posts[postIndex]?.isPublished || false,
      imageUrl: imageUrl || savedData.posts[postIndex]?.imageUrl || "",
    };

    if (postIndex > -1) {
      // Atualiza o post existente
      savedData.posts[postIndex] = newPost;
    } else {
      // Adiciona um novo post
      savedData.posts.push(newPost);
    }

    // Salva os dados atualizados de volta no arquivo
    fs.writeFileSync(savePath, JSON.stringify(savedData, null, 2));

    return NextResponse.json(
      { message: "Content saved successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while saving the content" },
      { status: 500 }
    );
  }
}
