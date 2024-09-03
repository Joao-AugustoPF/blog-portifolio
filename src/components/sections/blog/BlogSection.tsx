"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import content from "@/app/content.json"; // Supondo que você tenha esse JSON
import Link from "next/link";

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
  blogPosts: Post[];
}

export default function BlogSection({ blogPosts }: PostsData) {
  const [activeGroup, setActiveGroup] = useState("all");

  const filteredPosts =
    activeGroup === "all"
      ? blogPosts
      : blogPosts.filter((post) => post.tags.includes(activeGroup));

  const getLayout = (index: number) => {
    if (index % 3 === 0) {
      return "lg:col-span-2"; // Grande
    } else {
      return "lg:col-span-1"; // Pequeno
    }
  };

  const getOrderClass = (index: number) => {
    if (index % 6 === 0 || index % 6 === 4) {
      return "lg:order-1"; // Grande à esquerda
    } else if (index % 6 === 1 || index % 6 === 5) {
      return "lg:order-2"; // Grande à direita
    } else {
      return "lg:order-1"; // Pequeno
    }
  };

  return (
    <div className="container mx-auto py-12">
      <div className="text-center mb-12">
        <ul className="inline-flex flex-wrap justify-center space-x-6 sm:space-x-4 md:space-x-6">
          {content.blogSection.categories.map((category) => (
            <li
              key={category.group}
              className={`cursor-pointer ${
                activeGroup === category.group
                  ? "border-b-2 border-indigo-600"
                  : "text-gray-500"
              } hover:text-indigo-600 transition duration-200 ease-in-out`}
              onClick={() => setActiveGroup(category.group)}
            >
              {category.label}
            </li>
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {filteredPosts.slice(0, 6).map((post, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`${getLayout(index)} ${getOrderClass(index)}`}
          >
            <Link
              href={`/blog/${post.slug}`}
              className="relative inline-block mt-4 text-base font-medium text-indigo-600 hover:text-indigo-400"
            >
              <div className="rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  width={1200}
                  height={675}
                  className={`w-full ${index % 3 === 0 ? "h-96" : "h-48"} object-cover`}
                />
                <div className="p-6 bg-white dark:bg-gray-800">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {post.title}
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 mt-2">
                    {post.description}
                  </p>
                  {content.blogSection.readMoreText}{" "}
                  <i className={content.blogSection.readMoreIcon}></i>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
