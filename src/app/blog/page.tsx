import BlogPage from "@/components/sections/blog/BlogPageSection";
import axios from "axios";

export default async function Page() {
  const response = await axios.get(
    `${process.env.NEXTAUTH_URL}/api/blog/posts`
  );

  return <BlogPage posts={response.data.posts} />;
}
