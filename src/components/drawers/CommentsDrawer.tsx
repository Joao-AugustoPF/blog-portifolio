import React, { useEffect, useState } from "react";
import { Session } from "next-auth";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/commons/Icons";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";

type Comment = {
  id: number;
  author: string;
  authorAvatar?: string;
  content: string;
  created_at: string;
};

type CommentsDrawerProps = {
  postId: string;
  session: Session | null;
  initialLikes: number;
  onLike: () => void;
};

export function CommentsDrawer({
  postId,
  session,
  initialLikes,
  onLike,
}: CommentsDrawerProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [likes, setLikes] = useState(initialLikes);
  const [isOpen, setIsOpen] = useState(false);

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/comments?postId=${postId}`);
      if (response.ok) {
        const data = await response.json();
        setComments(data);
      }
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    }
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const newCommentObj: Comment = {
        id: comments.length + 1,
        author: session?.user?.name || "Anonymous",
        content: newComment,
        created_at: new Date().toISOString(),
        authorAvatar: session?.user?.image || "/path/to/default-avatar.jpg",
      };
      setComments((prevComments) => [...prevComments, newCommentObj]);
      setNewComment("");
    }
  };

  const handleLike = () => {
    setLikes((prevLikes) => prevLikes + 1);
    onLike();
  };

  // Fetch comments when drawer is opened
  useEffect(() => {
    if (isOpen) {
      fetchComments();
    }
  }, [isOpen]);

  return (
    <div>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" onClick={handleLike}>
          <Icons.heart className="h-6 w-6" />
          <span className="ml-2">{likes}</span>
        </Button>
        <Drawer direction="right" onOpenChange={(open) => setIsOpen(open)}>
          <DrawerTrigger asChild>
            <Button variant="ghost">
              <Icons.chat className="h-6 w-6" />
            </Button>
          </DrawerTrigger>
          <DrawerContent
            aria-describedby="comments"
            aria-description="Comments Section"
            className="h-auto top-0 right-0 left-auto mt-0 w-[500px] p-6"
          >
            <div className="space-y-6">
              <DrawerHeader>
                <DrawerTitle>Comentários</DrawerTitle>
              </DrawerHeader>
              <div className="space-y-4">
                {comments.length > 0 ? (
                  comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="flex items-start space-x-4"
                    >
                      <Avatar>
                        <AvatarImage
                          src={comment.authorAvatar}
                          alt={comment.author}
                        />
                        <AvatarFallback>{comment.author[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-gray-800">
                          {comment.author}
                        </p>
                        <p className="text-gray-600 text-sm mb-1">
                          {new Date(comment.created_at).toLocaleDateString()}
                        </p>
                        <p className="text-gray-700">{comment.content}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No comments yet.</p>
                )}
              </div>
              <div className="mt-6">
                <Textarea
                  placeholder="Adicione um comentário..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <Button onClick={handleAddComment} className="mt-2">
                  Enviar
                </Button>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}
