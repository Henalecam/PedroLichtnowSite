import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight, BookOpen, Users, TrendingUp } from "lucide-react";
import { useRef } from "react";
import useScrollReveal from "@/hooks/useScrollReveal";

export default function BlogSection() {
  const blogPosts = [
    {
      id: 1,
      title: "O Poder da Transformação Pessoal",
      excerpt: "Descubra como a transformação pessoal pode impactar positivamente sua vida e carreira, através de práticas e reflexões profundas.",
      content: "A transformação pessoal é um processo contínuo de autoconhecimento e crescimento. Ela envolve reconhecer nossos padrões, superar limitações e desenvolver novas habilidades...",
      date: "28 de maio, 2024",
      readTime: "8 min",
      category: "Desenvolvimento Pessoal",
      image: "/blog-1.jpg",
      featured: true,
      views: 1250,
      comments: 48
    },
    {
      id: 2,
      title: "Liderança com Propósito",
      excerpt: "Como desenvolver uma liderança que inspira e transforma, baseada em valores e propósito claro.",
      content: "A liderança com propósito vai além de metas e resultados. É sobre criar um impacto positivo e duradouro nas pessoas e na organização...",
      date: "25 de maio, 2024",
      readTime: "6 min",
      category: "Liderança",
      image: "/blog-2.jpg",
      featured: false,
      views: 980,
      comments: 32
    },
    {
      id: 3,
      title: "Superando Limitações",
      excerpt: "Estratégias práticas para identificar e superar as limitações que impedem seu crescimento pessoal e profissional.",
      content: "Todos nós enfrentamos limitações em algum momento da vida. A diferença está em como lidamos com elas...",
      date: "22 de maio, 2024",
      readTime: "5 min",
      category: "Crescimento",
      image: "/blog-3.jpg",
      featured: false,
      views: 850,
      comments: 28
    },
    {
      id: 4,
      title: "Cultura Organizacional Transformadora",
      excerpt: "Como criar e manter uma cultura organizacional que promove o crescimento, a inovação e o bem-estar dos colaboradores.",
      content: "Uma cultura organizacional forte é o alicerce de qualquer empresa que busca crescimento sustentável...",
      date: "20 de maio, 2024",
      readTime: "7 min",
      category: "Cultura",
      image: "/blog-4.jpg",
      featured: false,
      views: 720,
      comments: 25
    },
    {
      id: 5,
      title: "Autoconhecimento: A Base do Sucesso",
      excerpt: "A importância do autoconhecimento para o desenvolvimento pessoal e profissional, e como cultivá-lo diariamente.",
      content: "O autoconhecimento é a base para qualquer tipo de desenvolvimento. É através dele que identificamos nossas forças e fraquezas...",
      date: "18 de maio, 2024",
      readTime: "9 min",
      category: "Autoconhecimento",
      image: "/blog-5.jpg",
      featured: false,
      views: 650,
      comments: 22
    },
    {
      id: 6,
      title: "Comunicação Efetiva",
      excerpt: "Técnicas e práticas para desenvolver uma comunicação mais clara, assertiva e impactante em todos os contextos.",
      content: "A comunicação efetiva é uma habilidade essencial para o sucesso pessoal e profissional...",
      date: "15 de maio, 2024",
      readTime: "6 min",
      category: "Comunicação",
      image: "/blog-6.jpg",
      featured: false,
      views: 580,
      comments: 19
    }
  ];

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

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

        {/* Featured Post */}
        {featuredPost && (
          <div ref={featuredRef} className="mb-16 opacity-0">
            <Card className="group cursor-pointer overflow-hidden bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="relative h-64 lg:h-auto">
                  <img 
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transform group-hover:scale-105 transition-transform duration-300"></div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-gold text-rich-black px-3 py-1 rounded-full text-sm font-semibold">
                      Destaque
                    </span>
                  </div>
                </div>
                <CardContent className="p-8 flex flex-col justify-center">
                  <div className="flex items-center space-x-4 mb-4 text-sm text-refined-gray">
                    <span className="bg-wine/10 text-wine px-3 py-1 rounded-full font-medium">
                      {featuredPost.category}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{featuredPost.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{featuredPost.readTime}</span>
                    </div>
                  </div>
                  <h3 className="font-serif text-2xl lg:text-3xl font-bold text-rich-black mb-4 group-hover:text-gold transition-colors">
                    {featuredPost.title}
                  </h3>
                  <p className="text-refined-gray mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-6 mb-6 text-sm text-refined-gray">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{featuredPost.views} leitores</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      <span>{featuredPost.comments} comentários</span>
                    </div>
                  </div>
                  <Button className="bg-gold hover:bg-yellow-500 text-rich-black font-semibold self-start group">
                    Ler artigo completo
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </div>
            </Card>
          </div>
        )}

        {/* Regular Posts Grid */}
        <div ref={postsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 opacity-0">
          {regularPosts.map((post) => (
            <Card key={post.id} className="group cursor-pointer bg-white rounded-xl shadow-lg overflow-hidden h-full hover:shadow-xl transition-all duration-300">
              <div className="relative h-48">
                <img 
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transform group-hover:scale-105 transition-transform duration-300"></div>
                <div className="absolute top-3 left-3">
                  <span className="bg-white/90 text-rich-black px-2 py-1 rounded-full text-xs font-medium">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex items-center space-x-3 mb-3 text-xs text-refined-gray">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                
                <h3 className="font-serif text-lg font-bold text-rich-black mb-3 line-clamp-2 group-hover:text-gold transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-refined-gray text-sm leading-relaxed mb-4 flex-grow">
                  {post.excerpt}
                </p>

                <div className="flex items-center gap-4 mb-4 text-xs text-refined-gray">
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    <span>{post.views} leitores</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    <span>{post.comments} comentários</span>
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  className="border-gold text-gold hover:bg-gold hover:text-rich-black self-start group text-sm"
                >
                  Ler mais
                  <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Newsletter Subscription */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
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
          >
            Ver todos os artigos
          </Button>
        </div>
      </div>
    </section>
  );
}
