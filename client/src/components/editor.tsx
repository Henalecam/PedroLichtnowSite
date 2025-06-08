import { useEffect, useRef } from "react";
import { Editor as TinyMCEEditor } from "tinymce";

declare global {
  interface Window {
    tinymce: any;
  }
}

interface EditorProps {
  value: string;
  onChange: (content: string) => void;
  onImageUpload: (file: File) => Promise<void>;
}

export default function Editor({ value, onChange, onImageUpload }: EditorProps) {
  const editorRef = useRef<TinyMCEEditor | null>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.tiny.cloud/1/no-api-key/tinymce/6/tinymce.min.js";
    script.referrerPolicy = "origin";
    script.async = true;
    script.onload = () => {
      if (window.tinymce) {
        window.tinymce.init({
          target: "editor",
          plugins: "image code table lists link",
          toolbar: "undo redo | blocks | bold italic | alignleft aligncenter alignright | indent outdent | bullist numlist | image | code",
          height: 500,
          setup: (editor: TinyMCEEditor) => {
            editorRef.current = editor;
            editor.on("change", () => {
              onChange(editor.getContent());
            });
          },
          images_upload_handler: async (blobInfo: { blob: () => File }) => {
            try {
              const file = blobInfo.blob();
              await onImageUpload(file);
              return "Imagem enviada com sucesso";
            } catch (error) {
              console.error("Erro ao fazer upload da imagem:", error);
              throw new Error("Erro ao fazer upload da imagem");
            }
          },
        });
      }
    };
    document.head.appendChild(script);

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
      }
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.getContent()) {
      editorRef.current.setContent(value);
    }
  }, [value]);

  return <textarea id="editor" value={value} style={{ display: "none" }} />;
} 