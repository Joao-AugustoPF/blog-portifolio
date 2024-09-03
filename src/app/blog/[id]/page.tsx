import BlogPostPage from "@/components/layout/BlogPostPage";
import { RelatedPosts } from "@/components/layout/RelatedPosts";
import axios from "axios";
import { getServerSession } from "next-auth";

export default async function Page({
  params,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await getServerSession();

  const id = params.id;

  const { data: post } = await axios.get(
    `${process.env.NEXTAUTH_URL}/api/blog/post`,
    {
      params: { id },
    }
  );

  const { data } = await axios.get(
    `${process.env.NEXTAUTH_URL}/api/blog/posts`
  );

  const relatedPosts = Object.keys(data.posts)
    .filter((key) => {
      return data.posts[key].slug !== id; // Exclui o post atual baseado no slug
    })
    .map((key) => ({ id: key, ...data.posts[key] }));

  return (
    <div>
      <BlogPostPage postr={post} session={session} />
      <RelatedPosts posts={relatedPosts} />
    </div>
  );
}
