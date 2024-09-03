export type BlogPost = {
  id: string;
  title: string;
  author: string;
  created_at: string;
  category: string;
  tags: string[];
  views: number;
  likes: number;
  excerpt: string;
};
