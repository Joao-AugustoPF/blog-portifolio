import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get("postId");

    if (!postId) {
      return NextResponse.json(
        { error: "Post ID is required" },
        { status: 400 }
      );
    }

    const filePath = path.join(process.cwd(), "data", "comments.json");
    const fileContents = fs.readFileSync(filePath, "utf-8");
    const comments = JSON.parse(fileContents).comments;

    const postComments = comments[postId] || [];

    return NextResponse.json(postComments, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
