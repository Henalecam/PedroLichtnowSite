import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Info, Star, BookOpen } from "lucide-react";
import { useRef } from "react";
import useScrollReveal from "@/hooks/useScrollReveal";

export default function BooksSection() {
  const books = [
    {
      id: 1,
      title: "O Caminho da Transformação",
      description: "Uma jornada profunda pelos processos internos que nos levam à verdadeira mudança e ao crescimento pessoal sustentável.",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600",
      purchaseUrl: "https://amazon.com.br",
      rating: 4.9,
      reviews: 128,
      bestseller: true
    },
    {
      id: 2,
      title: "Liderança Autêntica",
      description: "Descobra como liderar com propósito, influenciando positivamente pessoas e organizações através da autenticidade.",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600",
      purchaseUrl: "https://amazon.com.br",
      rating: 4.8,
      reviews: 95,
      bestseller: true
    },
    {
      id: 3,
      title: "Mindset Inovador",
      description: "Desenvolva uma mentalidade que abraça a mudança e transforma desafios em oportunidades de crescimento.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600",
      purchaseUrl: "https://amazon.com.br",
      rating: 4.7,
      reviews: 76,
      bestseller: false
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
    <section id="livros" className="py-24 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5"></div>
      
      <div ref={sectionRef} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <span ref={subtitleRef} className="text-gold font-medium tracking-wider uppercase text-sm mb-4 block opacity-0">Bibliografia</span>
          <h2 ref={titleRef} className="font-serif text-4xl md:text-5xl font-bold text-rich-black mb-6 opacity-0">
            Livros que Transformam Vidas
          </h2>
          <p ref={descRef} className="text-lg text-refined-gray max-w-2xl mx-auto opacity-0">
            Uma coleção de obras que exploram os caminhos da transformação pessoal e do crescimento humano, 
            escritas com o propósito de inspirar mudanças significativas.
          </p>
        </div>
        
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-8 opacity-0">
          {books.map((book) => (
            <Card key={book.id} className="group overflow-hidden bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 card-hover">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="relative mb-4">
                  <img src={book.image} alt={book.title} className="w-full h-64 object-cover rounded-xl mb-2" />
                  {book.bestseller && (
                    <span className="absolute top-2 left-2 bg-gold text-rich-black px-3 py-1 rounded-full text-xs font-semibold shadow">Bestseller</span>
                  )}
                </div>
                <h3 className="font-serif text-xl font-bold text-rich-black mb-2">{book.title}</h3>
                <p className="text-refined-gray text-sm mb-4 flex-1">{book.description}</p>
                <div className="flex items-center mb-4">
                  <Star className="w-4 h-4 text-gold mr-1" />
                  <span className="text-gold font-semibold mr-2">{book.rating}</span>
                  <span className="text-refined-gray text-xs">({book.reviews} avaliações)</span>
                </div>
                <Button asChild className="bg-gold hover:bg-yellow-500 text-rich-black font-semibold w-full mt-auto">
                  <a href={book.purchaseUrl} target="_blank" rel="noopener noreferrer">Comprar Agora</a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" className="border-gold text-gold hover:bg-gold hover:text-white px-8 py-3 font-semibold">
            Ver Todos os Livros
          </Button>
        </div>
      </div>
    </section>
  );
}
