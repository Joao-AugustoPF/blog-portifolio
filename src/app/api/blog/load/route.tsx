import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Id not provided" }, { status: 400 });
    }

    const dataDir = path.join(process.cwd(), "/data");
    const postsPath = path.join(dataDir, "posts.json");

    if (!fs.existsSync(postsPath)) {
      return NextResponse.json({ error: "No posts found" }, { status: 404 });
    }

    const rawData = fs.readFileSync(postsPath, "utf-8");
    const savedData = JSON.parse(rawData);

    const post = Object.values(savedData.posts || {}).find(
      (p: any) => p.id === id
    );

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while fetching the post" },
      { status: 500 }
    );
  }
}
