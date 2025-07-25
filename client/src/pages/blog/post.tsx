import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'wouter';
import { getPostBySlug, initDatabase } from '@/lib/db';
import { getImageUrl } from '@/lib/images';
import { Button } from '@/components/ui/button';
import { CalendarDays, ArrowLeft, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import BlogNavigation from '@/components/blog-navigation';

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

export default function BlogPost() {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [, setLocation] = useLocation();
  const { slug } = useParams();

  useEffect(() => {
    loadPost();
  }, [slug]);

  const loadPost = async () => {
    if (!slug) return;
    
    try {
      setLoading(true);
      await initDatabase();
      const foundPost = await getPostBySlug(slug);
      
      if (!foundPost || !foundPost.published) {
        setLocation('/blog');
        return;
      }
      
      setPost(foundPost);
    } catch (error) {
      console.error('Error loading post:', error);
      setLocation('/blog');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <BlogNavigation />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-20">
          <div className="text-center">
            <p className="text-gray-600">Carregando post...</p>
          </div>
        </div>
      </>
    );
  }

  if (!post) {
    return null;
  }

  // Estimate reading time (200 words per minute)
  const wordCount = post.content.split(/\s+/).length;
  const readingTime = Math.max(1, Math.round(wordCount / 200));

  return (
    <>
      <BlogNavigation />
      <div className="min-h-screen bg-gray-50 pt-20">
        <article className="container mx-auto p-6 max-w-4xl">
          {/* Back button */}
          <Button
            variant="ghost"
            onClick={() => setLocation('/blog')}
            className="mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao Blog
          </Button>

          {/* Post header */}
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
            
            <div className="flex items-center gap-4 text-gray-600 text-sm">
              <div className="flex items-center gap-1">
                <CalendarDays className="w-4 h-4" />
                <span>{format(new Date(post.createdAt), 'dd/MM/yyyy', { locale: ptBR })}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{readingTime} min de leitura</span>
              </div>
            </div>

            {post.excerpt && (
              <p className="text-xl text-gray-600 mt-4">{post.excerpt}</p>
            )}
          </header>

          {/* Featured image */}
          {post.image && (
            <div className="mb-8 -mx-6 md:mx-0">
              <img
                src={getImageUrl(post.image)}
                alt={post.title}
                className="w-full h-auto max-h-96 object-cover rounded-lg"
              />
            </div>
          )}

          {/* Post content */}
          <div className="prose prose-gray prose-lg max-w-none">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                // Custom renderers for better styling
                h1: ({children}) => <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>,
                h2: ({children}) => <h2 className="text-2xl font-bold mt-6 mb-3">{children}</h2>,
                h3: ({children}) => <h3 className="text-xl font-bold mt-5 mb-2">{children}</h3>,
                p: ({children}) => <p className="mb-4 leading-relaxed">{children}</p>,
                ul: ({children}) => <ul className="list-disc pl-6 mb-4">{children}</ul>,
                ol: ({children}) => <ol className="list-decimal pl-6 mb-4">{children}</ol>,
                li: ({children}) => <li className="mb-2">{children}</li>,
                blockquote: ({children}) => (
                  <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4 text-gray-700">
                    {children}
                  </blockquote>
                ),
                code: ({inline, children}) => 
                  inline ? (
                    <code className="bg-gray-100 px-1 py-0.5 rounded text-sm">{children}</code>
                  ) : (
                    <code className="block bg-gray-100 p-4 rounded-lg overflow-x-auto my-4">{children}</code>
                  ),
                img: ({src, alt}) => (
                  <img src={src} alt={alt} className="w-full h-auto rounded-lg my-6" />
                ),
                a: ({href, children}) => (
                  <a href={href} className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">
                    {children}
                  </a>
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          {/* Post footer */}
          <footer className="mt-12 pt-8 border-t border-gray-200">
            <div className="text-sm text-gray-500">
              {post.updatedAt !== post.createdAt && (
                <p>Última atualização: {format(new Date(post.updatedAt), 'dd/MM/yyyy HH:mm', { locale: ptBR })}</p>
              )}
            </div>
            
            <div className="mt-6">
              <Button
                variant="outline"
                onClick={() => setLocation('/blog')}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar ao Blog
              </Button>
            </div>
          </footer>
        </article>
      </div>
    </>
  );
}