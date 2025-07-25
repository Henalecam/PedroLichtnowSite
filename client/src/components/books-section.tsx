import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Star } from "lucide-react";
import { useRef } from "react";
import useScrollReveal from "@/hooks/useScrollReveal";
import { handleImageError } from "@/lib/utils";

export default function BooksSection() {
  const ref = useRef<HTMLDivElement>(null);
  useScrollReveal(ref, "animate-fade-in");

  const books = [
    {
      title: "Som da Sacada",
      subtitle: "Memórias de uma guerra invisível",
      description: "Um romance histórico-filosófico que navega pelos mares turbulentos da pandemia, explorando as profundezas da alma humana em tempos de isolamento e transformação.",
      image: "/livro-1.jpg",
      status: "Em breve",
      featured: true
    },
    {
      title: "Entre o Ser e o Tempo",
      subtitle: "Reflexões sobre a existência",
      description: "Uma jornada filosófica através das questões fundamentais da vida, explorando a natureza da consciência e nosso lugar no universo.",
      image: "/livro-2.jpg",
      status: "Em desenvolvimento"
    },
    {
      title: "Alquimia da Alma",
      subtitle: "Transformação e consciência",
      description: "Uma exploração profunda dos processos de transformação pessoal, unindo ciência, espiritualidade e sabedoria ancestral.",
      image: "/livro-3.jpg",
      status: "Em desenvolvimento"
    }
  ];

  return (
    <section id="livros" className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div ref={ref} className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <BookOpen className="w-12 h-12 text-gold" />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-gray-900">
            Obras Literárias
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Livros que exploram os dilemas humanos, a inteligência emocional e os ciclos da existência, 
            oferecendo reflexões profundas sobre nossa jornada coletiva e individual.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {books.map((book, index) => (
            <div 
              key={index} 
              className={`group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
                book.featured ? 'ring-2 ring-gold ring-offset-4' : ''
              }`}
            >
              <div className="relative h-[400px] overflow-hidden">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => handleImageError(e, `https://via.placeholder.com/400x600/1a1a1a/d4af37?text=${encodeURIComponent(book.title)}`)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-4 right-4">
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold shadow-lg ${
                    book.featured 
                      ? 'bg-gradient-to-r from-gold to-gold-dark text-rich-black' 
                      : 'bg-white/90 backdrop-blur-sm text-gray-700'
                  }`}>
                    {book.status}
                  </span>
                </div>
                {book.featured && (
                  <div className="absolute top-4 left-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                      <Star className="w-5 h-5 text-gold fill-gold" />
                    </div>
                  </div>
                )}
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-serif font-bold mb-2 text-gray-900 group-hover:text-gold transition-colors">
                  {book.title}
                </h3>
                <p className="text-lg text-gold mb-4 font-medium">{book.subtitle}</p>
                <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">{book.description}</p>
                <Button 
                  className="w-full bg-gradient-to-r from-gold to-gold-dark hover:from-gold-dark hover:to-gold text-rich-black font-semibold py-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                  disabled={book.status !== "Em breve"}
                >
                  {book.status === "Em breve" ? (
                    <>
                      Saiba mais
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </>
                  ) : (
                    'Em desenvolvimento'
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-6">
            Interessado em acompanhar os lançamentos e novidades?
          </p>
          <Button 
            variant="outline" 
            className="border-2 border-gold text-gold hover:bg-gold hover:text-rich-black font-semibold px-8 py-6 text-lg rounded-lg transition-all duration-300"
          >
            Receber atualizações
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
