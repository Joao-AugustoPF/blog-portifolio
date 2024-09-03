"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import LabeledInput from "@/components/commons/LabeledInput"; // Importa o novo componente
import axios from "axios";

const CreatePostButton: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleCreatePost = async () => {
    try {
      const response = await axios.post("/api/blog/create", {
        slug,
        title,
        description,
      });
      setShowModal(false);
      // Aqui você pode redirecionar ou atualizar a lista de posts
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Criar nova Postagem</Button>
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Criar nova Postagem</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <LabeledInput
              label="Slug"
              placeholder="Slug da Postagem"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            />
            <LabeledInput
              label="Título"
              placeholder="Digite o Título da Postagem"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <LabeledInput
              label="Descrição"
              placeholder="Digite a Descrição da Postagem"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button disabled variant="default" onClick={handleCreatePost}>
              Criar
            </Button>
            <Button
              disabled
              variant="secondary"
              onClick={() => setShowModal(false)}
            >
              Cancelar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreatePostButton;
