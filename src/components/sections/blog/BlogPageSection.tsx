"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import content from "@/app/content.json"; // Importando o JSON

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

export default function BlogPage({ posts }: PostsData) {
  const { postsPerPage, author, sections, socialSites, tags } =
    content.blogPage;
  const [currentPage, setCurrentPage] = useState(1);

  // Calcule o número total de páginas
  const totalPages = Math.ceil(posts.length / postsPerPage);

  // Determine os posts a serem exibidos na página atual
  const currentPosts = posts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const recentPosts = posts.slice(-3).reverse();

  return (
    <section className="relative py-16 md:py-24">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="lg:col-span-8 md:col-span-6">
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-8">
              {currentPosts.map((blog, index) => (
                <div
                  key={index}
                  className="blog relative rounded-md shadow-lg overflow-hidden"
                >
                  <Image
                    src={blog.imageUrl}
                    alt={blog.title}
                    width={500}
                    height={300}
                    className="w-full object-cover"
                  />
                  <div className="content p-6">
                    <Link
                      className="title text-lg font-medium hover:text-indigo-600 transition duration-500 ease-in-out"
                      href={`/blog/${blog.slug}`}
                    >
                      {blog.title}
                    </Link>
                    <p className="text-slate-400 mt-3">{blog.description}</p>
                    <div className="mt-4">
                      <Link
                        className="relative inline-block tracking-wide align-middle text-base text-center border-none font-normal hover:text-indigo-600 transition duration-500 ease-in-out"
                        href={`/blog/${blog.slug}`}
                      >
                        Ler Mais <i className="uil uil-arrow-right"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={() =>
                        handlePageChange(currentPage > 1 ? currentPage - 1 : 1)
                      }
                    />
                  </PaginationItem>

                  {Array.from(Array(totalPages).keys()).map((pageNumber) => (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink
                        href="#"
                        isActive={currentPage === pageNumber + 1}
                        onClick={() => handlePageChange(pageNumber + 1)}
                      >
                        {pageNumber + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  {totalPages > 3 && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}

                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={() =>
                        handlePageChange(
                          currentPage < totalPages
                            ? currentPage + 1
                            : totalPages
                        )
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
          <div className="lg:col-span-4 md:col-span-6">
            <div className="sticky top-20">
              <div className="bg-white dark:bg-slate-800 shadow-lg rounded-md p-6">
                <h5 className="text-lg font-semibold text-center">
                  {sections.author}
                </h5>
                <div className="text-center mt-8">
                  <Image
                    src={author.image}
                    alt={author.name}
                    width={96}
                    height={96}
                    className="mx-auto rounded-full shadow-lg"
                  />
                  <h5 className="text-lg font-semibold mt-4 hover:text-indigo-600 transition duration-500 ease-in-out">
                    {author.name}
                  </h5>
                  <p className="text-slate-400">{author.title}</p>
                </div>

                <h5 className="text-lg font-semibold text-center mt-8">
                  {sections.recentPosts}
                </h5>
                <div className="mt-8 space-y-4">
                  {recentPosts.map((post, index) => (
                    <div key={index} className="flex items-center">
                      <Image
                        src={post.imageUrl}
                        alt={post.title}
                        width={64}
                        height={64}
                        className="h-16 object-cover rounded-md shadow-lg"
                      />
                      <div className="ml-3">
                        <Link
                          className="font-semibold hover:text-indigo-600 transition duration-500 ease-in-out"
                          href={`/blog/${post.slug}`}
                        >
                          {post.title}
                        </Link>
                        <p className="text-sm text-slate-400">
                          {post.created_at}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <h5 className="text-lg font-semibold text-center mt-8">
                  {sections.socialSites}
                </h5>
                <ul className="list-none text-center mt-8 flex justify-center space-x-3">
                  {socialSites.map((site, index) => (
                    <li key={index}>
                      <Link
                        className="inline-flex items-center justify-center w-10 h-10 text-slate-400 hover:text-white bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-800 rounded-md hover:border-indigo-600 dark:hover:border-indigo-600 hover:bg-indigo-600 dark:hover:bg-indigo-600 transition duration-500 ease-in-out"
                        href="#"
                      >
                        <i className={`uil uil-${site} text-lg`}></i>
                      </Link>
                    </li>
                  ))}
                </ul>

                <h5 className="text-lg font-semibold text-center mt-8">
                  {sections.tagsCloud}
                </h5>
                <div className="flex flex-wrap justify-center mt-8 space-x-2 space-y-2">
                  {tags.map((tag, index) => (
                    <Link
                      className="px-3 py-1 text-sm text-slate-400 hover:text-white bg-gray-50 dark:bg-slate-800 rounded-md shadow-lg hover:bg-indigo-600 dark:hover:bg-indigo-600 transition duration-500 ease-in-out"
                      href="#"
                      key={index}
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
