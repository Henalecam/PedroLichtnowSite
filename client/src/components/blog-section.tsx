import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight } from "lucide-react";

export default function BlogSection() {
  const blogPosts = [
    {
      id: 1,
      title: "5 Pilares da Liderança Transformacional",
      excerpt: "Descubra os fundamentos essenciais que todo líder precisa dominar para inspirar verdadeiras mudanças em suas equipes e organizações.",
      content: "A liderança transformacional vai além de simplesmente gerenciar pessoas. Ela envolve inspirar, motivar e capacitar indivíduos a alcançarem seu potencial máximo...",
      date: "28 de maio, 2025",
      readTime: "8 min",
      category: "Liderança",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      featured: true
    },
    {
      id: 2,
      title: "O Mindset do Crescimento Pessoal",
      excerpt: "Como desenvolver uma mentalidade que abraça desafios e transforma obstáculos em oportunidades de evolução.",
      content: "O crescimento pessoal não acontece por acaso. Requer uma mudança fundamental na forma como vemos os desafios e as dificuldades...",
      date: "25 de maio, 2025",
      readTime: "6 min",
      category: "Desenvolvimento Pessoal",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      featured: false
    },
    {
      id: 3,
      title: "Comunicação Autêntica: A Arte de Se Conectar",
      excerpt: "Aprenda técnicas para desenvolver uma comunicação mais genuína e impactante em suas relações pessoais e profissionais.",
      content: "A comunicação autêntica é a base de relacionamentos sólidos e liderança eficaz. Ela vai além das palavras...",
      date: "22 de maio, 2025",
      readTime: "5 min",
      category: "Comunicação",
      image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      featured: false
    },
    {
      id: 4,
      title: "Resiliência: Transformando Adversidades em Força",
      excerpt: "Estratégias práticas para desenvolver resiliência emocional e mental diante dos desafios da vida moderna.",
      content: "A resiliência não é uma característica fixa, mas uma habilidade que pode ser desenvolvida e fortalecida ao longo do tempo...",
      date: "20 de maio, 2025",
      readTime: "7 min",
      category: "Resiliência",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      featured: false
    },
    {
      id: 5,
      title: "Propósito de Vida: Encontrando Seu Norte",
      excerpt: "Uma jornada reflexiva para descobrir seu propósito único e alinhar suas ações com seus valores mais profundos.",
      content: "Encontrar um propósito de vida é uma das questões mais fundamentais da existência humana...",
      date: "18 de maio, 2025",
      readTime: "9 min",
      category: "Propósito",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      featured: false
    },
    {
      id: 6,
      title: "Inteligência Emocional no Ambiente de Trabalho",
      excerpt: "Como aplicar os princípios da inteligência emocional para criar um ambiente de trabalho mais harmonioso e produtivo.",
      content: "A inteligência emocional tem se tornado uma das competências mais valorizadas no mercado de trabalho...",
      date: "15 de maio, 2025",
      readTime: "6 min",
      category: "Inteligência Emocional",
      image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      featured: false
    }
  ];

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <section id="blog" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="relative font-serif text-4xl md:text-5xl font-bold text-rich-black mb-6 gold-accent inline-block">
            Blog
          </h2>
          <p className="text-lg text-refined-gray max-w-2xl mx-auto">
            Reflexões, insights e conhecimentos sobre desenvolvimento pessoal, liderança e transformação.
          </p>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <div className="mb-16">
            <Card className="card-hover cursor-pointer overflow-hidden bg-white rounded-2xl shadow-xl">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="relative h-64 lg:h-auto">
                  <img 
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover"
                  />
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
                  <h3 className="font-serif text-2xl lg:text-3xl font-bold text-rich-black mb-4">
                    {featuredPost.title}
                  </h3>
                  <p className="text-refined-gray mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {regularPosts.map((post) => (
            <Card key={post.id} className="card-hover cursor-pointer bg-white rounded-xl shadow-lg overflow-hidden h-full">
              <div className="relative h-48">
                <img 
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
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
                
                <h3 className="font-serif text-lg font-bold text-rich-black mb-3 line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-refined-gray text-sm leading-relaxed mb-4 flex-grow">
                  {post.excerpt}
                </p>
                
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
