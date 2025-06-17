import { useRef } from "react";
import useScrollReveal from "@/hooks/useScrollReveal";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Brain, Sparkles } from "lucide-react";

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  useScrollReveal(ref, "animate-fade-in");

  return (
    <section id="sobre" className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div ref={ref} className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-gold font-medium mb-4 block">Sobre</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Unindo Alma e Estratégia</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Especialista em Consciência e Desenvolvimento Humano, neurocomunicador e formado em Física Quântica Aplicada
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                Pedro Lichtnow une alma e estratégia, ciência e espiritualidade, palavras e transformação. Como escritor, já publicou três livros e prepara o lançamento de Som da Sacada – Memórias de uma guerra invisível, um romance histórico-filosófico sobre a pandemia e o mundo contemporâneo.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Ao longo de sua jornada, impactou milhares de pessoas com palestras, mentorias e conteúdos que unem propósito, inovação e narrativa de valor.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <BookOpen className="w-8 h-8 text-gold mb-4" />
                <h3 className="font-semibold mb-2">Escritor</h3>
                <p className="text-sm text-gray-600">Autor de obras que exploram os dilemas humanos e a inteligência emocional</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <Brain className="w-8 h-8 text-gold mb-4" />
                <h3 className="font-semibold mb-2">Neurocomunicador</h3>
                <p className="text-sm text-gray-600">Especialista em comunicação autêntica e desenvolvimento humano</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <Sparkles className="w-8 h-8 text-gold mb-4" />
                <h3 className="font-semibold mb-2">Mentor</h3>
                <p className="text-sm text-gray-600">Guia em jornadas de transformação e autoconhecimento</p>
              </div>
            </div>

            <Button className="bg-gold hover:bg-yellow-500 text-rich-black font-semibold px-8 py-6 text-lg rounded-lg transition-all duration-300">
              Conheça meus livros
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-gold/20 to-transparent rounded-2xl transform rotate-3"></div>
            <img
              src="/pedro-lichtnow.jpg"
              alt="Pedro Lichtnow"
              className="w-full h-[600px] object-cover rounded-xl relative z-10 shadow-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl z-20"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
