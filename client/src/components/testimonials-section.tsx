import { Star } from "lucide-react";
import { useRef } from "react";
import useScrollReveal from "@/hooks/useScrollReveal";

export default function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null);
  useScrollReveal(ref, "animate-fade-in");

  const testimonials = [
    {
      text: "A palestra sobre Consciência e Propósito na Era do Caos foi transformadora. Pedro consegue unir profundidade filosófica com aplicabilidade prática de uma forma única.",
      author: "Maria Silva",
      role: "CEO, Empresa de Tecnologia",
      image: "/testimonial-1.jpg",
      rating: 5
    },
    {
      text: "A mentoria de Comunicação Quântica mudou completamente minha forma de me relacionar com as pessoas. Pedro é um mestre em transmitir conhecimento complexo de forma acessível.",
      author: "João Santos",
      role: "Líder de Equipe",
      image: "/testimonial-2.jpg",
      rating: 5
    },
    {
      text: "O workshop de Escrita Existencial me ajudou a encontrar minha voz autêntica. Pedro tem uma capacidade incrível de guiar as pessoas em suas jornadas de autoconhecimento.",
      author: "Ana Costa",
      role: "Escritora",
      image: "/testimonial-3.jpg",
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div ref={ref} className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Depoimentos</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            O que dizem as pessoas que participaram de palestras, mentorias e workshops.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-lg">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic">"{testimonial.text}"</p>
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold">{testimonial.author}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
