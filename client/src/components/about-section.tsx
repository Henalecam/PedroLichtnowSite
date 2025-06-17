import { useRef } from "react";
import useScrollReveal from "@/hooks/useScrollReveal";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  useScrollReveal(ref, "animate-fade-in");

  return (
    <section id="sobre" className="py-20 bg-white">
      <div ref={ref} className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">Sobre Pedro Lichtnow</h2>
            <p className="text-lg text-gray-600 mb-6">
              Escritor, palestrante existencialista e mentor de transformação. Com uma trajetória dedicada à consciência, à comunicação autêntica e ao desenvolvimento humano, atua como ponte entre conhecimento profundo e impacto real no mundo.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              Autor de obras que exploram os dilemas humanos, a inteligência emocional e os ciclos da existência, Pedro é também CEO da Editora Personalidade e do Instituto Personalidade – Evolução Humana. Seus trabalhos integram saberes da neurociência, física quântica, filosofia, narrativa e espiritualidade aplicada.
            </p>
            <Button className="bg-gold hover:bg-yellow-500 text-rich-black font-semibold">
              Conheça mais
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
          <div className="relative">
            <img
              src="/pedro-lichtnow.jpg"
              alt="Pedro Lichtnow"
              className="w-full h-[600px] object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
