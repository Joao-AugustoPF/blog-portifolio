"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import content from "@/app/content.json"; // Usando o caminho especificado

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

export default function RecentPostsSection({ posts }: PostsData) {
  const { heading, description, noPostsMessage } = content.recentPostsSection;

  return (
    <div className="container mx-auto py-16">
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <h3 className="text-2xl md:text-3xl font-semibold mb-4">{heading}</h3>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          {description}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.length > 0 ? (
          posts.slice(0, 9).map((post, index) => (
            <motion.div
              key={index}
              className="flex items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.6,
                ease: "easeInOut",
                delay: index * 0.1,
              }}
            >
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-16 h-16 lg:h-20 lg:w-20 rounded-md shadow-md dark:shadow-gray-800 object-cover"
              />
              <div className="ml-4">
                <Link
                  href={`/blog/${post.slug}`}
                  className={cn(
                    "font-semibold text-gray-900 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400",
                    "transition-colors"
                  )}
                >
                  {post.title}
                </Link>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  {new Date(post.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </motion.div>
          ))
        ) : (
          <motion.p
            className="text-center text-slate-500 dark:text-slate-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            {noPostsMessage}
          </motion.p>
        )}
      </div>
    </div>
  );
}
