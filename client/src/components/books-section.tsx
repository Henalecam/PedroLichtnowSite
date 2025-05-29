import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Info } from "lucide-react";

export default function BooksSection() {
  const books = [
    {
      id: 1,
      title: "O Caminho da Transformação",
      description: "Uma jornada profunda pelos processos internos que nos levam à verdadeira mudança e ao crescimento pessoal sustentável.",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600",
      purchaseUrl: "https://amazon.com.br"
    },
    {
      id: 2,
      title: "Liderança Autêntica",
      description: "Descobra como liderar com propósito, influenciando positivamente pessoas e organizações através da autenticidade.",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600",
      purchaseUrl: "https://amazon.com.br"
    },
    {
      id: 3,
      title: "Mindset Inovador",
      description: "Desenvolva uma mentalidade que abraça a mudança e transforma desafios em oportunidades de crescimento.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600",
      purchaseUrl: "https://amazon.com.br"
    }
  ];

  return (
    <section id="livros" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="relative font-serif text-4xl md:text-5xl font-bold text-rich-black mb-6 gold-accent inline-block">
            Livros Publicados
          </h2>
          <p className="text-lg text-refined-gray max-w-2xl mx-auto">
            Uma coleção de obras que exploram os caminhos da transformação pessoal e do crescimento humano.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {books.map((book) => (
            <Card key={book.id} className="card-hover bg-white rounded-xl shadow-lg overflow-hidden">
              <img 
                src={book.image}
                alt={`Capa do livro - ${book.title}`}
                className="w-full h-64 object-cover"
              />
              
              <CardContent className="p-6">
                <h3 className="font-serif text-xl font-bold text-rich-black mb-3">{book.title}</h3>
                <p className="text-refined-gray mb-4 text-sm leading-relaxed">
                  {book.description}
                </p>
                <div className="flex space-x-3">
                  <Button 
                    asChild
                    className="flex-1 bg-gold hover:bg-yellow-500 text-rich-black font-medium"
                  >
                    <a href={book.purchaseUrl} target="_blank" rel="noopener noreferrer">
                      Comprar
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
      </div>
    </section>
  );
}
