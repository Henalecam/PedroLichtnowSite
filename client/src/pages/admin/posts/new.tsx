import { useState } from 'react';
import { useLocation } from 'wouter';
import { createPost, generateSlug } from '@/lib/db';
import { getAvailableImages, getImageUrl } from '@/lib/images';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { ArrowLeft, Save, Eye } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function NewPost() {
  const [, setLocation] = useLocation();
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    slug: '',
    image: '',
    published: false
  });

  const availableImages = getAvailableImages();

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: generateSlug(title)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.content) {
      toast.error('Por favor, preencha o título e o conteúdo');
      return;
    }

    setLoading(true);
    
    try {
      const postId = await createPost({
        ...formData,
        slug: formData.slug || generateSlug(formData.title)
      });
      
      toast.success('Post criado com sucesso!');
      setLocation(`/admin/posts/${postId}/edit`);
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error('Erro ao criar post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto p-6 max-w-6xl">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => setLocation('/admin/dashboard')}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
              <h1 className="text-3xl font-bold text-gray-900">Novo Post</h1>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowPreview(!showPreview)}
              >
                <Eye className="w-4 h-4 mr-2" />
                {showPreview ? 'Editar' : 'Preview'}
              </Button>
              <Button onClick={handleSubmit} disabled={loading}>
                <Save className="w-4 h-4 mr-2" />
                {loading ? 'Salvando...' : 'Salvar'}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Form */}
            <Card className={showPreview ? 'lg:col-span-1' : 'lg:col-span-2'}>
              <CardHeader>
                <CardTitle>Informações do Post</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Título</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      placeholder="Digite o título do post"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="slug">Slug (URL)</Label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      placeholder="slug-do-post"
                    />
                    <p className="text-sm text-gray-500">
                      URL: /blog/{formData.slug || 'slug-do-post'}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="excerpt">Resumo</Label>
                    <Textarea
                      id="excerpt"
                      value={formData.excerpt}
                      onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                      placeholder="Breve descrição do post"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="image">Imagem de Capa</Label>
                    <Select
                      value={formData.image}
                      onValueChange={(value) => setFormData({ ...formData, image: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma imagem" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Nenhuma imagem</SelectItem>
                        {availableImages.map((img) => (
                          <SelectItem key={img} value={img}>
                            {img}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {formData.image && (
                      <div className="mt-2">
                        <img
                          src={getImageUrl(formData.image)}
                          alt="Preview"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content">Conteúdo (Markdown)</Label>
                    <Textarea
                      id="content"
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      placeholder="Escreva o conteúdo do post em Markdown..."
                      rows={15}
                      className="font-mono"
                      required
                    />
                    <p className="text-sm text-gray-500">
                      Você pode usar Markdown para formatar o texto
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="published"
                      checked={formData.published}
                      onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
                    />
                    <Label htmlFor="published">Publicar imediatamente</Label>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Preview */}
            {showPreview && (
              <Card>
                <CardHeader>
                  <CardTitle>Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <article className="prose prose-gray max-w-none">
                    <h1>{formData.title || 'Título do Post'}</h1>
                    {formData.image && (
                      <img
                        src={getImageUrl(formData.image)}
                        alt={formData.title}
                        className="w-full h-64 object-cover rounded-lg mb-6"
                      />
                    )}
                    {formData.excerpt && (
                      <p className="text-lg text-gray-600 mb-6">{formData.excerpt}</p>
                    )}
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {formData.content || '*Digite o conteúdo para ver o preview*'}
                    </ReactMarkdown>
                  </article>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
} 