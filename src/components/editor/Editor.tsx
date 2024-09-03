"use client";

import React, { useEffect } from "react";
import { useQuill } from "react-quilljs";
import QuillResizeImage from "quill-resize-image";
import axios from "axios";

import "quill/dist/quill.snow.css";

interface EditorProps {
  onContentChange: (content: string) => void;
  content: string;
}

export const Editor: React.FC<EditorProps> = ({ onContentChange, content }) => {
  const { quill, quillRef, Quill } = useQuill({
    theme: "snow",
    modules: {
      // Include syntax module
      toolbar: {
        container: [
          [{ font: [] }],
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ align: [] }],
          [{ color: [] }, { background: [] }],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ indent: "-1" }, { indent: "+1" }],
          ["link", "image", "video"],
          ["clean"], // Botão para remover formatação
        ],
      },
      resize: true,
      table: true,
    },
  });

  // Insert Image(selected by user) to quill
  const insertToEditor = (url: string) => {
    const range = quill?.getSelection();

    if (!range) {
      throw new Error("Range is null or undefined");
    }

    quill?.insertEmbed(range.index, "image", url);
  };

  // Upload Image to Image Server such as AWS S3, Cloudinary, Cloud Storage, etc..
  const saveToServer = async (file: File) => {
    const body = new FormData();
    body.append("file", file);

    try {
      const res = await axios.post<{
        uploadedImageUrl?: string;
        error?: string;
      }>("/api/upload", body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 200 && res.data.uploadedImageUrl) {
        insertToEditor(res.data.uploadedImageUrl);
      } else {
        console.error("Upload failed:", res.data.error);
      }
    } catch (error) {
      console.error("An error occurred while uploading the file:", error);
    }
  };

  // Open Dialog to select Image File
  const selectLocalImage = () => {
    const input = document.createElement("input");
    // input.setAttribute("type", "file");
    // input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = () => {
      if (input.files !== null) {
        const file = input.files[0];
        saveToServer(file);
      }
    };
  };

  if (Quill && !quill) {
    Quill.register("modules/resize", QuillResizeImage);
  }

  useEffect(() => {
    if (quill) {
      quill.clipboard.dangerouslyPasteHTML(content);
    }
  }, [quill]);

  useEffect(() => {
    if (quill) {
      const toolbar = quill.getModule("toolbar") as any;
      toolbar.addHandler("image", selectLocalImage);
      quill.on("text-change", () => {
        const currentContent = quill.root.innerHTML;
        onContentChange(currentContent);
      });
    }
  }, [quill, onContentChange]);

  return (
    <div>
      <div ref={quillRef} />
    </div>
  );
};
