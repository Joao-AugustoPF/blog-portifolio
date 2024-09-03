"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import "quill/dist/quill.snow.css";
import { CommentsDrawer } from "@/components/drawers/CommentsDrawer";
import { Session } from "next-auth";

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

export default function BlogPostPage({
  session,
  postr,
}: {
  session: Session | null;
  postr: Post;
}) {
  const [post, setPost] = useState<Post | null>(postr);

  const handleLikeUpdate = () => {
    setPost(
      (prevPost) => prevPost && { ...prevPost, likes: prevPost.likes + 1 }
    );
  };

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex justify-center py-8 tailwind-viewer">
      <article className="max-w-3xl w-full px-4">
        {post.imageUrl && (
          <div className="mb-8">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-96 rounded-md object-cover"
            />
          </div>
        )}
        <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Avatar>
              <AvatarImage src={"/me.jpeg"} alt={post.author} />
              <AvatarFallback>{post.author[0]}</AvatarFallback>
            </Avatar>
            <div className="ml-4 text-center">
              <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                {post.author}
              </p>
              <p className="text-xs text-gray-500">
                {new Date(post.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
          <CommentsDrawer
            postId={post.id}
            session={session}
            initialLikes={post.likes}
            onLike={handleLikeUpdate}
          />
        </div>
        <div
          className="prose prose-lg mx-auto ql-editor"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  );
}
