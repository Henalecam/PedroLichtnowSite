import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight, BookOpen, Users, TrendingUp } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { useLocation } from "wouter";
import useScrollReveal from "@/hooks/useScrollReveal";
import { getAllPosts, initDatabase } from "@/lib/db";
import { getImageUrl } from "@/lib/images";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

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

export default function BlogSection() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [, setLocation] = useLocation();

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      await initDatabase();
      const allPosts = await getAllPosts(true); // Only published posts
      setPosts(allPosts.slice(0, 6)); // Show only first 6 posts
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const postsRef = useRef<HTMLDivElement>(null);

  useScrollReveal(sectionRef, "animate-fade-in");
  useScrollReveal(titleRef, "animate-fade-in");
  useScrollReveal(subtitleRef, "animate-slide-up");
  useScrollReveal(descRef, "animate-slide-up");
  useScrollReveal(featuredRef, "animate-fade-in");
  useScrollReveal(postsRef, "animate-fade-in");

  // Fallback articles if no posts in database
  const fallbackArticles = [
    {
      title: "Alma e Destino",
      excerpt: "A alma humana incide sobre a verdade e compromisso, antes de tudo, com ela mesma. O mundo, reforçou ainda o destino, passa em um piscar de olhos, como um sorriso instantâneo.",
      createdAt: new Date().toISOString(),
      image: "/placeholder-1.svg",
      slug: "alma-e-destino"
    },
    {
      title: "Fogo e Realização",
      excerpt: "De onde vem o fogo da realização? Certamente, da chama interna e do mais profundo desejo subjetivo. Quando há chama, clama-se e tudo flameja na mente e no coração.",
      createdAt: new Date().toISOString(),
      image: "/placeholder-2.svg",
      slug: "fogo-e-realizacao"
    },
    {
      title: "Medos, Egos e o Caminho",
      excerpt: "Na vida, duas grandes verdades, quase sempre certas, fazem qualquer um de nós perder-se no caminho: nossos medos ou nosso ego.",
      createdAt: new Date().toISOString(),
      image: "/placeholder-3.svg",
      slug: "medos-egos-e-o-caminho"
    }
  ];

  const displayPosts = posts.length > 0 ? posts : fallbackArticles.map((article, index) => ({
    ...article,
    id: index,
    content: article.excerpt,
    updatedAt: article.createdAt,
    published: true
  }));

  return (
    <section id="blog" className="py-24 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5"></div>
      
      <div ref={sectionRef} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <span ref={subtitleRef} className="text-gold font-medium tracking-wider uppercase text-sm mb-4 block opacity-0">Blog</span>
          <h2 ref={titleRef} className="font-serif text-4xl md:text-5xl font-bold text-rich-black mb-6 opacity-0">
            Insights e Reflexões
          </h2>
          <p ref={descRef} className="text-lg text-refined-gray max-w-2xl mx-auto opacity-0">
            Artigos profundos sobre desenvolvimento pessoal, liderança e transformação, 
            escritos para inspirar mudanças significativas em sua vida e carreira.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Carregando artigos...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-lg overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition-shadow">
                <img
                  src={getImageUrl(post.image)}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                  onClick={() => setLocation(`/blog/${post.slug}`)}
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt || post.content.substring(0, 150) + '...'}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {format(new Date(post.createdAt), 'dd/MM/yyyy', { locale: ptBR })}
                    </span>
                    <Button 
                      variant="ghost" 
                      className="group"
                      onClick={() => setLocation(`/blog/${post.slug}`)}
                    >
                      Ler mais
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Newsletter Subscription */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 mt-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-serif text-2xl font-bold text-rich-black mb-3">
                Receba Novos Artigos
              </h3>
              <p className="text-refined-gray">
                Inscreva-se para receber artigos exclusivos sobre desenvolvimento pessoal e liderança diretamente em seu e-mail.
              </p>
            </div>
            <div className="flex gap-4">
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                className="flex-1 px-4 py-3 rounded-lg bg-rich-black/60 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-gold"
              />
              <Button className="bg-gold hover:bg-yellow-500 text-rich-black font-semibold px-6">
                Inscrever-se
              </Button>
            </div>
          </div>
        </div>

        {/* View All Posts Button */}
        <div className="text-center">
          <Button 
            variant="outline"
            className="border-rich-black text-rich-black hover:bg-rich-black hover:text-white px-8 py-3 font-semibold"
            onClick={() => setLocation('/blog')}
          >
            Ver todos os artigos
          </Button>
        </div>
      </div>
    </section>
  );
}
