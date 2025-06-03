import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { useRef } from "react";
import useScrollReveal from "@/hooks/useScrollReveal";

export default function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      text: "A palestra do Pedro transformou nossa visão sobre liderança. Conteúdo profundo e aplicável, com resultados visíveis em nossa equipe. A metodologia apresentada foi fundamental para o desenvolvimento dos nossos líderes.",
      author: "Ana Carolina Silva",
      role: "Diretora de RH, TechCorp",
      image: "https://i.pravatar.cc/150?img=1",
      rating: 5
    },
    {
      id: 2,
      text: "Seus livros me acompanham há anos. Cada leitura traz novos insights e ferramentas práticas para o crescimento pessoal. A forma como ele conecta teoria e prática é verdadeiramente inspiradora.",
      author: "Roberto Mendes",
      role: "Empresário",
      image: "https://i.pravatar.cc/150?img=2",
      rating: 5
    },
    {
      id: 3,
      text: "Evento excepcional! Pedro conseguiu engajar uma plateia de 500 pessoas do início ao fim. Conteúdo inspirador e transformador que continua gerando resultados positivos em nossa organização.",
      author: "Mariana Costa",
      role: "Organizadora de Eventos",
      image: "https://i.pravatar.cc/150?img=3",
      rating: 5
    }
  ];

  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useScrollReveal(sectionRef, "animate-fade-in");
  useScrollReveal(titleRef, "animate-fade-in");
  useScrollReveal(subtitleRef, "animate-slide-up");
  useScrollReveal(descRef, "animate-slide-up");
  useScrollReveal(cardsRef, "animate-fade-in");

  return (
    <section id="depoimentos" data-theme="dark" className="py-24 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5"></div>
      
      <div ref={sectionRef} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <span ref={subtitleRef} className="text-gold font-medium tracking-wider uppercase text-sm mb-4 block opacity-0">Depoimentos</span>
          <h2 ref={titleRef} className="font-serif text-4xl md:text-5xl font-bold text-rich-black mb-6 opacity-0">
            Histórias de Transformação
          </h2>
          <p ref={descRef} className="text-lg text-refined-gray max-w-2xl mx-auto opacity-0">
            Veja o que leitores e organizadores de eventos falam sobre o impacto do trabalho de Pedro em suas vidas e organizações.
          </p>
        </div>
        
        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 opacity-0">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="group bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="flex items-start gap-4 mb-6">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.author}
                    className="w-16 h-16 rounded-full object-cover border-2 border-gold/20"
                  />
                  <div>
                    <div className="font-semibold text-rich-black">{testimonial.author}</div>
                    <div className="text-sm text-refined-gray">{testimonial.role}</div>
                    <div className="flex mt-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-gold fill-current" />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <Quote className="w-8 h-8 text-gold/20 absolute -top-2 -left-2" />
                  <p className="text-refined-gray mb-4 italic leading-relaxed pl-6">
                    {testimonial.text}
                  </p>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-refined-gray">
                      <span className="font-medium text-rich-black">Resultado:</span> Transformação significativa
                    </div>
                    <div className="text-sm text-gold font-medium">
                      Verificado ✓
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 bg-gold/10 px-6 py-3 rounded-full">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <img
                  key={i}
                  src={`https://i.pravatar.cc/150?img=${i + 20}`}
                  alt={`Cliente ${i}`}
                  className="w-8 h-8 rounded-full border-2 border-white"
                />
              ))}
            </div>
            <span className="text-sm text-refined-gray">
              <span className="font-semibold text-rich-black">+1000 avaliações</span> com média de 4.9/5
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
