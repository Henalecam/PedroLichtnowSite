import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight, BookOpen, Users, TrendingUp } from "lucide-react";
import { useRef } from "react";
import useScrollReveal from "@/hooks/useScrollReveal";

export default function BlogSection() {
  const articles = [
    {
      title: "Alma e Destino",
      excerpt: "A alma humana incide sobre a verdade e compromisso, antes de tudo, com ela mesma. O mundo, reforçou ainda o destino, passa em um piscar de olhos, como um sorriso instantâneo.",
      date: "15 de Março, 2024",
      image: "/blog-1.jpg",
      tags: ["destino", "existencialismo", "verdadesdaalma"]
    },
    {
      title: "Fogo e Realização",
      excerpt: "De onde vem o fogo da realização? Certamente, da chama interna e do mais profundo desejo subjetivo. Quando há chama, clama-se e tudo flameja na mente e no coração.",
      date: "10 de Março, 2024",
      image: "/blog-2.jpg",
      tags: ["chamadarealização", "existencialismo", "fogoeinspiração"]
    },
    {
      title: "Medos, Egos e o Caminho",
      excerpt: "Na vida, duas grandes verdades, quase sempre certas, fazem qualquer um de nós perder-se no caminho: nossos medos ou nosso ego.",
      date: "5 de Março, 2024",
      image: "/blog-3.jpg",
      tags: ["verdadesdavida", "existencialismo", "poderdaconsciência"]
    },
    {
      title: "Consciência Artificial",
      excerpt: "Se tudo é frequência, conforme os princípios da física quântica, a Inteligência Artificial também é um nível ou padrão de frequência.",
      date: "1 de Março, 2024",
      image: "/blog-4.jpg",
      tags: ["inteligênciaartificial", "consciênciauniversal", "futurodahumanidade"]
    },
    {
      title: "Diálogo com a Solidão",
      excerpt: "Quando o homem aprende a conversar com a solidão dele, nada mais parece intransponível. Quando não existe nada envolta, apenas o silêncio da alma e o eco da razão.",
      date: "25 de Fevereiro, 2024",
      image: "/blog-5.jpg",
      tags: ["resilienciahumana", "existencialismo", "poderdaconsciência"]
    },
    {
      title: "Tempos Apagados",
      excerpt: "Não existem ainda explicações lógicas ou confirmadas sobre o apagão internacional na Europa, em Portugal e na Espanha.",
      date: "20 de Fevereiro, 2024",
      image: "/blog-6.jpg",
      tags: ["temposdemudança", "existencialismo", "apagãoeuropa"]
    }
  ];

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <article key={index} className="bg-white rounded-lg overflow-hidden shadow-lg">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex gap-2 mb-4">
                  {article.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="text-sm text-primary bg-primary/10 px-2 py-1 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                <p className="text-gray-600 mb-4">{article.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{article.date}</span>
                  <Button variant="ghost" className="group">
                    Ler mais
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </article>
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
