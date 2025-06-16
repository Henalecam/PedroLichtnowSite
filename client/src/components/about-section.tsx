import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">Sobre Pedro Lichtnow</h2>
            <p className="text-lg text-gray-600 mb-6">
              Pedro Lichtnow une alma e estratégia, ciência e espiritualidade, palavras e transformação. Especialista em Consciência e Desenvolvimento Humano, é também neurocomunicador, formado em Física Quântica Aplicada, Leitura de Campo Sutil e Comunicação Vibracional.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              Como escritor, já publicou três livros e prepara o lançamento de Som da Sacada – Memórias de uma guerra invisível, um romance histórico-filosófico sobre a pandemia e o mundo contemporâneo.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              Ao longo de sua jornada, impactou milhares de pessoas com palestras, mentorias e conteúdos que unem propósito, inovação e narrativa de valor.
            </p>
            <Button className="group">
              Conheça mais sobre meu trabalho
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          <div className="relative">
            <img
              src="/pedro-lichtnow.jpg"
              alt="Pedro Lichtnow"
              className="w-full h-[600px] object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
