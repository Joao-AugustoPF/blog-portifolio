import { AboutSection } from "@/components/sections/about/AboutSection";
import BlogSection from "@/components/sections/blog/BlogSection";
import HeroSection from "@/components/sections/hero/HeroSection";
import LatestPostsSection from "@/components/sections/posts/LatestPostGridSection";
import NewsletterSection from "@/components/sections/newsletter/NewsletterSection";
import TestimonialsSection from "@/components/sections/testimonials/TestimonialsSection";
import axios from "axios";

export default async function Home() {
  const response = await axios.get(
    `${process.env.NEXTAUTH_URL}/api/blog/posts`
  );

  return (
    <main>
      <HeroSection />
      <BlogSection blogPosts={response.data.posts} />
      <AboutSection />
      <TestimonialsSection />
      <NewsletterSection />
      <LatestPostsSection posts={response.data.posts} />
    </main>
  );
}
