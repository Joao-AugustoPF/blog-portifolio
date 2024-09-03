import React from "react";
import { Button } from "@/components/ui/button";

interface ImageButtonProps {
  onClick: (url: string) => void;
}

export const ImageButton: React.FC<ImageButtonProps> = ({ onClick }) => {
  const handleInsertImage = () => {
    const url = prompt("Enter the image URL");
    if (url) {
      onClick(url);
    }
  };

  return <Button onClick={handleInsertImage}>Insert Image</Button>;
};
