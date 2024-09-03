"use client";

import React, { useState, useEffect } from "react";
import { Editor } from "@/components/editor/Editor";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface Post {
  id: string;
  slug: string;
  title: string;
  author: string;
  created_at: string;
  category: string;
  tags: string[];
  views: number;
  likes: number;
  excerpt: string;
  content: string;
  isPublished: boolean;
  imageUrl: string;
  description: string;
}

interface ContextEditorProps {
  post: Post;
}

const ContextEditor: React.FC<ContextEditorProps> = ({ post }) => {
  const [editorContent, setEditorContent] = useState<string | null>(null);
  const [slug, setSlug] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isPublished, setIsPublished] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const router = useParams();
  const nextRouter = useRouter();
  const { id } = router;

  const handleContentChange = (content: string) => {
    setEditorContent(content);
  };

  const loadContent = async () => {
    setEditorContent(post.content);
    setSlug(post.slug);
    setTitle(post.title);
    setDescription(post.description);
    setIsPublished(post.isPublished);
    if (post.imageUrl) {
      setPreviewImage(post.imageUrl); // Carrega a imagem salva
    }
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setMainImage(file);
      setPreviewImage(URL.createObjectURL(file));

      // Faz o upload da imagem para a API /api/upload
      try {
        const formData = new FormData();
        formData.append("file", file);

        const uploadResponse = await axios.post("/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (uploadResponse.status === 200) {
          setPreviewImage(uploadResponse.data.uploadedImageUrl); // Atualiza a URL após o upload
        } else {
          console.error(
            "Erro ao carregar a imagem:",
            uploadResponse.data.error
          );
        }
      } catch (error) {
        console.error("Erro ao fazer upload da imagem:", error);
      }
    }
  };

  const handleSave = async () => {
    if (!id) return;

    const postData = {
      id,
      slug,
      title,
      description,
      content: editorContent,
      imageUrl: previewImage, // Usando a URL da imagem carregada
    };

    try {
      await axios.post("/api/blog/save", postData);
      console.log("Conteúdo salvo com sucesso");
    } catch (error) {
      console.error("Erro ao salvar o conteúdo:", error);
    }
  };

  const handlePublish = async () => {
    if (!id) return;

    const postData = {
      id,
      slug,
      title,
      description,
      content: editorContent,
      imageUrl: previewImage, // Usando a URL da imagem carregada
    };

    try {
      await axios.post("/api/blog/publish", postData);
      console.log("Conteúdo publicado com sucesso");
      setIsPublished(true); // Atualiza o estado de publicação
    } catch (error) {
      console.error("Erro ao publicar o conteúdo:", error);
    }
  };

  const handleDelete = async () => {
    if (!id) return;

    try {
      await axios.delete(`/api/blog/delete/${id}`);
      console.log("Conteúdo excluído com sucesso");
      setShowDeleteModal(false);
      nextRouter.back(); // Redireciona para a página anterior após exclusão
    } catch (error) {
      console.error("Erro ao excluir o conteúdo:", error);
    }
  };

  useEffect(() => {
    loadContent();
  }, [id]);

  return (
    <>
      {editorContent !== null ? (
        <>
          <div className="flex justify-between mt-4">
            <div className="flex space-x-4">
              <Button disabled onClick={handleSave} variant="default">
                Salvar
              </Button>
              <Button
                disabled
                onClick={handlePublish}
                variant={isPublished ? "default" : "secondary"}
              >
                {isPublished ? "Publicado" : "Publicar"}
              </Button>
            </div>
            <Button
              disabled
              variant="destructive"
              onClick={() => setShowDeleteModal(true)}
            >
              Excluir
            </Button>
          </div>

          <div className="mt-4 space-y-4">
            {/* Input para o Slug */}
            <div>
              <label
                htmlFor="slug"
                className="block text-sm font-medium text-gray-700"
              >
                Slug
              </label>
              <Input
                disabled
                id="slug"
                name="slug"
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="Enter the post slug"
              />
            </div>

            {/* Input para o Título */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Título
              </label>
              <Input
                disabled
                id="title"
                name="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter the post title"
              />
            </div>

            {/* Input para a Descrição */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Descrição
              </label>
              <Input
                disabled
                id="description"
                name="description"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter the post description"
              />
            </div>
          </div>

          {/* Campo de upload de imagem */}
          <div className="mt-4">
            <label
              htmlFor="mainImage"
              className="block text-sm font-medium text-gray-700"
            >
              Imagem Principal
            </label>
            <div className="mt-1 border-2 border-dashed border-gray-300 rounded-md p-4 cursor-pointer flex items-center justify-center relative">
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="object-contain h-48 w-full rounded-md"
                />
              ) : (
                <span className="text-gray-400">
                  Arraste e solte a imagem aqui ou clique para fazer upload
                </span>
              )}
              <input
                id="mainImage"
                name="mainImage"
                disabled
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
              />
            </div>
          </div>

          <Editor
            onContentChange={handleContentChange}
            content={editorContent}
          />
        </>
      ) : (
        <p>Carregando conteúdo...</p>
      )}

      {/* Modal de Confirmação de Exclusão */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmação de Exclusão</DialogTitle>
          </DialogHeader>
          <p>
            Você tem certeza que deseja excluir este post? Esta ação não pode
            ser desfeita.
          </p>
          <DialogFooter>
            <Button disabled variant="destructive" onClick={handleDelete}>
              Excluir
            </Button>
            <Button
              disabled
              variant="secondary"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancelar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ContextEditor;
