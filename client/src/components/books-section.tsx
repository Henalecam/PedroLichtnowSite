import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function BooksSection() {
  const books = [
    {
      title: "Som da Sacada",
      subtitle: "Memórias de uma guerra invisível",
      description: "Um romance histórico-filosófico sobre a pandemia e o mundo contemporâneo.",
      image: "/livro-1.jpg",
      status: "Em breve"
    },
    {
      title: "Livro 2",
      subtitle: "Em desenvolvimento",
      description: "Em breve mais informações sobre o próximo lançamento.",
      image: "/livro-2.jpg",
      status: "Em desenvolvimento"
    },
    {
      title: "Livro 3",
      subtitle: "Em desenvolvimento",
      description: "Em breve mais informações sobre o próximo lançamento.",
      image: "/livro-3.jpg",
      status: "Em desenvolvimento"
    }
  ];

  return (
    <section id="books" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Livros</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Obras que exploram os dilemas humanos, a inteligência emocional e os ciclos da existência.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {books.map((book, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg">
              <div className="relative">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-primary text-white px-3 py-1 rounded-full text-sm">
                    {book.status}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2">{book.title}</h3>
                <p className="text-lg text-gray-600 mb-2">{book.subtitle}</p>
                <p className="text-gray-600 mb-6">{book.description}</p>
                <Button variant="outline" className="w-full group">
                  Saiba mais
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
