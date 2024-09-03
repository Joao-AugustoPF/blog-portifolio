import fs from "fs";
import path from "path";
import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession();

  if (!session) {
    // User is not authenticated
    return new Response(null, { status: 401 });
  }

  try {
    const postId = params.id;

    if (!postId) {
      return NextResponse.json(
        { error: "postId not provided" },
        { status: 400 }
      );
    }

    const savePath = path.join(process.cwd(), "/data/posts.json");

    if (!fs.existsSync(savePath)) {
      return NextResponse.json({ error: "No posts found" }, { status: 404 });
    }

    const rawData = fs.readFileSync(savePath, "utf-8");
    const savedData = JSON.parse(rawData);

    // Verifica se o post existe no array
    const postIndex = savedData.posts.findIndex(
      (post: { id: string }) => post.id === postId
    );

    if (postIndex === -1) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Remove o post do array
    savedData.posts.splice(postIndex, 1);

    // Salva os dados atualizados de volta no arquivo
    fs.writeFileSync(savePath, JSON.stringify(savedData, null, 2));

    return NextResponse.json({ message: "Post deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while deleting the post" },
      { status: 500 }
    );
  }
}
