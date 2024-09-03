"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Post = {
  id: string;
  title: string;
  slug: string;
  imageUrl?: string;
  description: string;
  likes: number;
  author: string;
  authorAvatar?: string;
};

export function RelatedPosts({ posts }: { posts: Post[] }) {
  return (
    <div className="mt-12 max-w-3xl mx-auto px-4 mb-12">
      <h2 className="text-2xl font-bold mb-6 text-center">Recomendados</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white dark:bg-gray-800 shadow-md rounded-md p-4"
          >
            <Link className="block" href={`/blog/${post.slug}`}>
              {post.imageUrl && (
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
              )}
              <div className="flex items-center">
                <Avatar
                  style={{
                    width: "30px",
                    height: "30px",
                  }}
                >
                  <AvatarImage
                    src={post.authorAvatar || "/me.jpeg"}
                    alt={post.author}
                  />
                  <AvatarFallback>{post.author[0]}</AvatarFallback>
                </Avatar>
                <span className="ml-2 text-gray-700 dark:text-gray-300">
                  {post.author}
                </span>
              </div>
              <h3 className="text-lg font-semibold">{post.title}</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                {post.description}
              </p>
              <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-500 mb-2">
                <span>{post.likes} Likes</span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
