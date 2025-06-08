import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import dynamic from "next/dynamic";

// Importando o editor de forma dinâmica para evitar problemas de SSR
const Editor = dynamic(() => import("@/components/editor"), { ssr: false });

interface Post {
  id?: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  status: "draft" | "published";
  featuredImage?: string;
}

export default function PostEditor() {
  const [post, setPost] = useState<Post>({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    status: "draft",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [location, setLocation] = useLocation();
  const { toast } = useToast();

  const isEditing = location.includes("/edit/");
  const postId = isEditing ? location.split("/").pop() : null;

  useEffect(() => {
    if (isEditing && postId) {
      fetchPost();
    }
  }, [postId]);

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });

      if (!response.ok) throw new Error("Erro ao carregar post");

      const data = await response.json();
      setPost(data);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível carregar o post.",
        variant: "destructive",
      });
      setLocation("/admin/dashboard");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const url = isEditing ? `/api/posts/${postId}` : "/api/posts";
      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: JSON.stringify(post),
      });

      if (!response.ok) throw new Error("Erro ao salvar post");

      toast({
        title: "Sucesso",
        description: `Post ${isEditing ? "atualizado" : "criado"} com sucesso.`,
      });

      setLocation("/admin/dashboard");
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível salvar o post.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: formData,
      });

      if (!response.ok) throw new Error("Erro ao fazer upload da imagem");

      const data = await response.json();
      setPost((prev) => ({ ...prev, featuredImage: data.url }));
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível fazer upload da imagem.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] bg-[url('/texture.svg')] bg-repeat p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">
            {isEditing ? "Editar Post" : "Novo Post"}
          </h1>
          <Button variant="outline" onClick={() => setLocation("/admin/dashboard")}>
            Cancelar
          </Button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Conteúdo</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Título</Label>
                    <Input
                      id="title"
                      value={post.title}
                      onChange={(e) => setPost((prev) => ({ ...prev, title: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="slug">Slug</Label>
                    <Input
                      id="slug"
                      value={post.slug}
                      onChange={(e) => setPost((prev) => ({ ...prev, slug: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="content">Conteúdo</Label>
                    <Editor
                      value={post.content}
                      onChange={(content) => setPost((prev) => ({ ...prev, content }))}
                      onImageUpload={handleImageUpload}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Configurações</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <select
                      id="status"
                      className="w-full rounded-md border border-input bg-background px-3 py-2"
                      value={post.status}
                      onChange={(e) => setPost((prev) => ({ ...prev, status: e.target.value as "draft" | "published" }))}
                    >
                      <option value="draft">Rascunho</option>
                      <option value="published">Publicado</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="excerpt">Resumo</Label>
                    <Textarea
                      id="excerpt"
                      value={post.excerpt}
                      onChange={(e) => setPost((prev) => ({ ...prev, excerpt: e.target.value }))}
                      rows={4}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Imagem de Destaque</Label>
                    {post.featuredImage ? (
                      <div className="relative aspect-video">
                        <img
                          src={post.featuredImage}
                          alt="Imagem de destaque"
                          className="rounded-md object-cover w-full h-full"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() => setPost((prev) => ({ ...prev, featuredImage: undefined }))}
                        >
                          Remover
                        </Button>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed rounded-md p-4 text-center">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleImageUpload(file);
                          }}
                          className="hidden"
                          id="featured-image"
                        />
                        <label
                          htmlFor="featured-image"
                          className="cursor-pointer text-sm text-muted-foreground"
                        >
                          Clique para fazer upload de uma imagem
                        </label>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Button type="submit" className="w-full" disabled={isSaving}>
                {isSaving ? "Salvando..." : isEditing ? "Atualizar Post" : "Criar Post"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
} 