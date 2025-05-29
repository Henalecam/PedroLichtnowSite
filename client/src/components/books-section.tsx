import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Info, Star, BookOpen } from "lucide-react";

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

  return (
    <section id="livros" className="py-24 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5"></div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <span className="text-gold font-medium tracking-wider uppercase text-sm mb-4 block">Bibliografia</span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-rich-black mb-6">
            Livros que Transformam Vidas
          </h2>
          <p className="text-lg text-refined-gray max-w-2xl mx-auto">
            Uma coleção de obras que exploram os caminhos da transformação pessoal e do crescimento humano, 
            escritas com o propósito de inspirar mudanças significativas.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {books.map((book) => (
            <Card key={book.id} className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="relative">
              <img 
                src={book.image}
                alt={`Capa do livro - ${book.title}`}
                  className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
                {book.bestseller && (
                  <div className="absolute top-4 left-4 bg-gold text-rich-black px-3 py-1 rounded-full text-sm font-medium">
                    Bestseller
                  </div>
                )}
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(book.rating) ? "text-gold fill-gold" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-refined-gray">
                    {book.rating} ({book.reviews} avaliações)
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-rich-black mb-3 group-hover:text-gold transition-colors">
                  {book.title}
                </h3>
                
                <p className="text-refined-gray mb-4 text-sm leading-relaxed">
                  {book.description}
                </p>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center text-sm text-refined-gray">
                    <BookOpen className="w-4 h-4 mr-1" />
                    <span>Disponível em eBook e Físico</span>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button 
                    asChild
                    className="flex-1 bg-gold hover:bg-yellow-500 text-rich-black font-medium"
                  >
                    <a href={book.purchaseUrl} target="_blank" rel="noopener noreferrer">
                      Comprar Agora
                    </a>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    className="border-gold text-gold hover:bg-gold hover:text-rich-black"
                  >
                    <Info className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button
            variant="outline"
            className="border-2 border-gold text-gold hover:bg-gold hover:text-rich-black font-medium px-8 py-3"
          >
            Ver Todos os Livros
          </Button>
        </div>
      </div>
    </section>
  );
}
