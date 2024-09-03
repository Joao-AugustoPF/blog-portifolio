import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const dataDir = path.join(process.cwd(), "/data");
    const postsPath = path.join(dataDir, "posts.json");

    if (!fs.existsSync(postsPath)) {
      return NextResponse.json({ posts: [] }, { status: 200 });
    }

    const rawData = fs.readFileSync(postsPath, "utf-8");
    const savedData = JSON.parse(rawData);

    const posts = Object.keys(savedData.posts || {}).map((key) => ({
      id: key,
      ...savedData.posts[key],
    }));

    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to load posts." },
      { status: 500 }
    );
  }
}
