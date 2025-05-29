import { Card, CardContent } from "@/components/ui/card";

export default function BlogSection() {
  const articles = [
    {
      id: 1,
      title: "O Poder da Autenticidade",
      excerpt: "Ser autêntico não é mostrar todas as suas vulnerabilidades, mas sim agir em consonância com seus valores mais profundos...",
      date: "15 de dezembro, 2024",
      gradient: "from-wine to-rich-black",
      textColor: "text-white"
    },
    {
      id: 2,
      title: "Liderança em Tempos de Mudança",
      excerpt: "Os verdadeiros líderes não temem a incerteza; eles a abraçam como uma oportunidade de crescimento e inovação...",
      date: "10 de dezembro, 2024",
      gradient: "from-gold to-yellow-600",
      textColor: "text-rich-black"
    },
    {
      id: 3,
      title: "A Arte de Recomeçar",
      excerpt: "Cada fim é também um novo começo. A sabedoria está em reconhecer quando é hora de deixar ir e quando é hora de persistir...",
      date: "5 de dezembro, 2024",
      gradient: "from-gray-700 to-rich-black",
      textColor: "text-white"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="relative font-serif text-4xl md:text-5xl font-bold text-rich-black mb-6 gold-accent inline-block">
            Reflexões
          </h2>
          <p className="text-lg text-refined-gray max-w-2xl mx-auto">
            Pensamentos, insights e trechos que inspiram a transformação pessoal e profissional.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Card key={article.id} className="card-hover cursor-pointer h-full">
              <CardContent className={`bg-gradient-to-br ${article.gradient} rounded-xl p-6 ${article.textColor} h-full flex flex-col`}>
                <h3 className="font-serif text-xl font-bold mb-4">{article.title}</h3>
                <p className={`mb-4 leading-relaxed flex-grow ${article.textColor === 'text-white' ? 'text-white/80' : 'text-rich-black/80'}`}>
                  "{article.excerpt}"
                </p>
                <div className={`text-sm ${article.textColor === 'text-white' ? 'text-white/60' : 'text-rich-black/60'}`}>
                  {article.date}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
