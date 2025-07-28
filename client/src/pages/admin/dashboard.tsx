import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import { getAllPosts, deletePost, initDatabase } from '@/lib/db';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Plus, Edit, Trash2, LogOut, Eye, EyeOff, FileText, BarChart3, PenTool, Trophy } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import ProtectedRoute from '@/components/ProtectedRoute';

interface BlogPost {
  id?: number;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
  published: boolean;
}

export default function AdminDashboard() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletePostId, setDeletePostId] = useState<number | null>(null);
  const [, setLocation] = useLocation();
  const { logout } = useAuth();

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      await initDatabase();
      const allPosts = await getAllPosts();
      setPosts(allPosts);
    } catch (error) {
      console.error('Error loading posts:', error);
      toast.error('Erro ao carregar posts');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deletePostId) return;

    try {
      await deletePost(deletePostId);
      toast.success('Post excluído com sucesso!');
      await loadPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error('Erro ao excluir post');
    } finally {
      setDeletePostId(null);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50">
        <div className="container mx-auto p-6 max-w-7xl">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Dashboard Administrativo
                </h1>
                <p className="text-gray-600 mt-1">Gerencie o conteúdo do seu site</p>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setLocation('/')}
                  className="border-gray-300 hover:bg-gray-50"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Ver Site
                </Button>
                <Button
                  variant="outline"
                  onClick={logout}
                  className="border-red-200 text-red-600 hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sair
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow duration-300 bg-gradient-to-br from-blue-50 to-blue-100/50">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-blue-900">Total de Posts</CardTitle>
                  <BarChart3 className="w-8 h-8 text-blue-500 opacity-20" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-blue-900">{posts.length}</p>
                <p className="text-sm text-blue-600 mt-1">posts criados</p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow duration-300 bg-gradient-to-br from-green-50 to-green-100/50">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-green-900">Posts Publicados</CardTitle>
                  <Eye className="w-8 h-8 text-green-500 opacity-20" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-green-900">{posts.filter(p => p.published).length}</p>
                <p className="text-sm text-green-600 mt-1">visíveis no site</p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow duration-300 bg-gradient-to-br from-amber-50 to-amber-100/50">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-amber-900">Rascunhos</CardTitle>
                  <PenTool className="w-8 h-8 text-amber-500 opacity-20" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-amber-900">{posts.filter(p => !p.published).length}</p>
                <p className="text-sm text-amber-600 mt-1">em desenvolvimento</p>
              </CardContent>
            </Card>
          </div>

          {/* Campaign Card */}
          <Card 
            className="border-0 shadow-sm hover:shadow-md transition-shadow duration-300 bg-gradient-to-br from-purple-50 to-purple-100/50 mb-8 cursor-pointer"
            onClick={() => setLocation('/admin/campaigns')}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg text-purple-900">Campanhas e Rankings</CardTitle>
                  <CardDescription className="text-purple-700 mt-1">
                    Gerencie campanhas e veja o ranking de compradores
                  </CardDescription>
                </div>
                <Trophy className="w-12 h-12 text-purple-500 opacity-30" />
              </div>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  setLocation('/admin/campaigns');
                }}
              >
                Acessar Campanhas
              </Button>
            </CardContent>
          </Card>

          {/* Posts Table */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-lg">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-xl">Gerenciar Posts</CardTitle>
                  <CardDescription>Todos os posts do blog</CardDescription>
                </div>
                <Button 
                  onClick={() => setLocation('/admin/posts/new')}
                  className="bg-gradient-to-r from-gold to-gold-dark hover:from-gold-dark hover:to-gold text-rich-black font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Post
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {loading ? (
                <div className="text-center py-16">
                  <div className="inline-flex items-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold"></div>
                    <span className="ml-3 text-gray-600">Carregando posts...</span>
                  </div>
                </div>
              ) : posts.length === 0 ? (
                <div className="text-center py-16">
                  <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">Nenhum post encontrado</p>
                  <Button 
                    onClick={() => setLocation('/admin/posts/new')}
                    className="bg-gold hover:bg-gold-dark text-rich-black"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Criar primeiro post
                  </Button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-b border-gray-200 bg-gray-50/50">
                        <TableHead className="font-semibold">Título</TableHead>
                        <TableHead className="font-semibold">Status</TableHead>
                        <TableHead className="font-semibold">Data de Criação</TableHead>
                        <TableHead className="font-semibold">Última Atualização</TableHead>
                        <TableHead className="text-right font-semibold">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {posts.map((post) => (
                        <TableRow key={post.id} className="hover:bg-gray-50/50 transition-colors">
                          <TableCell className="font-medium">{post.title}</TableCell>
                          <TableCell>
                            <Badge 
                              variant={post.published ? 'default' : 'secondary'}
                              className={post.published ? 
                                'bg-green-100 text-green-700 hover:bg-green-200' : 
                                'bg-amber-100 text-amber-700 hover:bg-amber-200'
                              }
                            >
                              {post.published ? (
                                <>
                                  <Eye className="w-3 h-3 mr-1" />
                                  Publicado
                                </>
                              ) : (
                                <>
                                  <EyeOff className="w-3 h-3 mr-1" />
                                  Rascunho
                                </>
                              )}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-gray-600">
                            {format(new Date(post.createdAt), 'dd/MM/yyyy', { locale: ptBR })}
                          </TableCell>
                          <TableCell className="text-gray-600">
                            {format(new Date(post.updatedAt), 'dd/MM/yyyy HH:mm', { locale: ptBR })}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setLocation(`/admin/posts/${post.id}/edit`)}
                                className="hover:bg-blue-50 text-blue-600"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setDeletePostId(post.id!)}
                                className="hover:bg-red-50 text-red-600"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={!!deletePostId} onOpenChange={() => setDeletePostId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
              <AlertDialogDescription>
                Tem certeza que deseja excluir este post? Esta ação não pode ser desfeita.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Excluir
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </ProtectedRoute>
  );
} 