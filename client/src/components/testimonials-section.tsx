import { Star, Quote } from "lucide-react";
import { useRef } from "react";
import useScrollReveal from "@/hooks/useScrollReveal";
import { handleImageError } from "@/lib/utils";

export default function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null);
  useScrollReveal(ref, "animate-fade-in");

  const testimonials = [
    {
      text: "A palestra sobre Consciência e Propósito na Era do Caos foi transformadora. Pedro consegue unir profundidade filosófica com aplicabilidade prática de uma forma única. Sua abordagem mudou completamente minha perspectiva sobre liderança.",
      author: "Maria Silva",
      role: "CEO, TechVision",
      company: "Empresa de Tecnologia",
      image: "/testimonial-1.jpg",
      rating: 5,
      highlight: "transformadora"
    },
    {
      text: "A mentoria de Comunicação Quântica mudou completamente minha forma de me relacionar com as pessoas. Pedro é um mestre em transmitir conhecimento complexo de forma acessível e prática. Resultados imediatos na minha equipe.",
      author: "João Santos",
      role: "Diretor de Inovação",
      company: "StartupHub Brasil",
      image: "/testimonial-2.jpg",
      rating: 5,
      highlight: "mudou completamente"
    },
    {
      text: "O workshop de Escrita Existencial me ajudou a encontrar minha voz autêntica. Pedro tem uma capacidade incrível de guiar as pessoas em suas jornadas de autoconhecimento. Uma experiência profunda e reveladora.",
      author: "Ana Costa",
      role: "Escritora e Coach",
      company: "Palavras que Transformam",
      image: "/testimonial-3.jpg",
      rating: 5,
      highlight: "voz autêntica"
    }
  ];

  return (
    <section id="testimonials" className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full filter blur-3xl"></div>

      <div ref={ref} className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <Quote className="w-12 h-12 text-gold" />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-gray-900">
            Vozes da Transformação
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Depoimentos de pessoas que vivenciaram jornadas de expansão e transformação 
            através de palestras, mentorias e workshops
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden"
            >
              {/* Card gradient border effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold/20 via-transparent to-gold/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              
              <div className="relative z-10">
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-gold fill-gold" />
                  ))}
                </div>
                
                <blockquote className="mb-8">
                  <Quote className="w-8 h-8 text-gold/20 mb-4" />
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {testimonial.text.split(testimonial.highlight).map((part, i, arr) => (
                      <span key={i}>
                        {part}
                        {i < arr.length - 1 && (
                          <span className="text-gold font-semibold">{testimonial.highlight}</span>
                        )}
                      </span>
                    ))}
                  </p>
                </blockquote>
                
                <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                  <div className="relative">
                    <img
                      src={testimonial.image}
                      alt={testimonial.author}
                      className="w-16 h-16 rounded-full object-cover ring-4 ring-gold/20"
                      onError={(e) => handleImageError(e, `https://via.placeholder.com/150/d4af37/1a1a1a?text=${testimonial.author.charAt(0)}`)}
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gold rounded-full flex items-center justify-center">
                      <Star className="w-3 h-3 text-rich-black fill-rich-black" />
                    </div>
                  </div>
                  <div>
                    <div className="font-serif font-bold text-gray-900">{testimonial.author}</div>
                    <div className="text-sm text-gold font-medium">{testimonial.role}</div>
                    <div className="text-xs text-gray-500">{testimonial.company}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-6 text-lg">
            Junte-se a centenas de pessoas que já transformaram suas vidas
          </p>
          <div className="flex justify-center gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-gold">500+</div>
              <div className="text-sm text-gray-600">Palestras realizadas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gold">10k+</div>
              <div className="text-sm text-gray-600">Vidas impactadas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gold">98%</div>
              <div className="text-sm text-gray-600">Satisfação</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
