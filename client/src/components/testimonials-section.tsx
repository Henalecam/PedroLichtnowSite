import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      text: "A palestra do Pedro transformou nossa visão sobre liderança. Conteúdo profundo e aplicável, com resultados visíveis em nossa equipe.",
      author: "Ana Carolina Silva",
      role: "Diretora de RH, TechCorp"
    },
    {
      id: 2,
      text: "Seus livros me acompanham há anos. Cada leitura traz novos insights e ferramentas práticas para o crescimento pessoal.",
      author: "Roberto Mendes",
      role: "Empresário"
    },
    {
      id: 3,
      text: "Evento excepcional! Pedro conseguiu engajar uma plateia de 500 pessoas do início ao fim. Conteúdo inspirador e transformador.",
      author: "Mariana Costa",
      role: "Organizadora de Eventos"
    }
  ];

  return (
    <section id="depoimentos" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="relative font-serif text-4xl md:text-5xl font-bold text-rich-black mb-6 gold-accent inline-block">
            Depoimentos
          </h2>
          <p className="text-lg text-refined-gray max-w-2xl mx-auto">
            Veja o que leitores e organizadores de eventos falam sobre o impacto do trabalho de Pedro.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-white p-6 rounded-xl shadow-lg card-hover">
              <CardContent className="p-0">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-gold fill-current" />
                  ))}
                </div>
                <p className="text-refined-gray mb-4 italic leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center">
                  <div>
                    <div className="font-semibold text-rich-black">{testimonial.author}</div>
                    <div className="text-sm text-refined-gray">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
