import { useRef } from "react";
import useScrollReveal from "@/hooks/useScrollReveal";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Globe, Flame, Bot, Sparkles, Mic, Users, Clock } from "lucide-react";

export default function SpeakingSection() {
  const ref = useRef<HTMLDivElement>(null);
  useScrollReveal(ref, "animate-fade-in");

  const talks = [
    {
      title: "O Poder da Consciência",
      subtitle: "Inteligência vibracional e despertar existencial",
      description: "A consciência como campo criador. Uma jornada sobre como acessar, expandir e direcionar nosso poder interno com intenção, clareza e presença.",
      icon: <Star className="w-8 h-8" />,
      tags: ["Consciência", "Despertar", "Poder Interno"],
      duration: "90 min",
      audience: "100-500"
    },
    {
      title: "Consciência e Propósito na Era do Caos",
      subtitle: "Inteligência existencial e escolhas profundas",
      description: "Uma provocação necessária sobre o papel da consciência em tempos de crise. Como encontrar sentido, foco e presença diante da instabilidade global?",
      icon: <Globe className="w-8 h-8" />,
      tags: ["Propósito", "Crise", "Sentido"],
      duration: "60 min",
      audience: "50-300"
    },
    {
      title: "Liderança com Alma",
      subtitle: "Comunicação autêntica e coerência energética",
      description: "Mais que técnicas: uma liderança que pulsa com verdade. Mergulhe na inteligência vibracional, no magnetismo da presença e no poder da coerência.",
      icon: <Flame className="w-8 h-8" />,
      tags: ["Liderança", "Autenticidade", "Presença"],
      duration: "120 min",
      audience: "30-150"
    },
    {
      title: "Entre Humanos e Máquinas",
      subtitle: "Consciência, IA e o futuro da sensibilidade",
      description: "Como permanecer humano em um mundo automatizado? A consciência como diferencial competitivo, criativo e espiritual diante da Inteligência Artificial.",
      icon: <Bot className="w-8 h-8" />,
      tags: ["Tecnologia", "Humanidade", "Futuro"],
      duration: "90 min",
      audience: "100-1000"
    },
    {
      title: "Comunicação Quântica e Realidade",
      subtitle: "Palavra, intenção e frequência",
      description: "Tudo comunica. Esta palestra revela como a frequência da palavra e da presença molda realidades, conecta consciências e ativa potenciais ocultos.",
      icon: <Sparkles className="w-8 h-8" />,
      tags: ["Comunicação", "Quântica", "Realidade"],
      duration: "75 min",
      audience: "50-200"
    }
  ];

  const handleContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="palestras" className="py-24 bg-gradient-to-b from-gray-900 via-black to-gray-900 relative overflow-hidden" data-theme="dark">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gold rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold rounded-full filter blur-3xl"></div>
      </div>

      <div ref={ref} className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center">
              <Mic className="w-8 h-8 text-gold" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-white">
            Palestras Transformadoras
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Experiências presenciais e online que despertam consciências, expandem perspectivas 
            e catalisam transformações profundas em indivíduos e organizações
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {talks.map((talk, index) => (
            <div 
              key={index} 
              className="group relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 hover:border-gold/50 transition-all duration-500 hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-gold/10"
            >
              {/* Icon background glow */}
              <div className="absolute top-8 left-8 w-16 h-16 bg-gold/20 rounded-full filter blur-xl group-hover:bg-gold/30 transition-all duration-500"></div>
              
              <div className="relative mb-6 text-gold">
                {talk.icon}
              </div>
              
              <h3 className="text-2xl font-serif font-bold mb-3 text-white group-hover:text-gold transition-colors duration-300">
                {talk.title}
              </h3>
              <p className="text-gold-light text-lg mb-4 font-medium">{talk.subtitle}</p>
              <p className="text-gray-300 mb-6 leading-relaxed">{talk.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {talk.tags.map((tag, i) => (
                  <span 
                    key={i}
                    className="px-3 py-1 bg-gold/10 text-gold-light text-sm rounded-full border border-gold/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{talk.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{talk.audience} pessoas</span>
                </div>
              </div>

              <Button 
                className="w-full bg-gradient-to-r from-gold to-gold-dark hover:from-gold-dark hover:to-gold text-rich-black font-semibold py-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Solicitar informações
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-12 border border-gray-700/50 max-w-4xl mx-auto">
          <h3 className="text-2xl font-serif font-bold text-white mb-4">
            Leve esta experiência para sua empresa ou evento
          </h3>
          <p className="text-gray-300 mb-8 text-lg leading-relaxed">
            Palestras customizadas para suas necessidades específicas, 
            com abordagem única que une ciência, filosofia e espiritualidade aplicada
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleContact}
              className="bg-gradient-to-r from-gold to-gold-dark hover:from-gold-dark hover:to-gold text-rich-black font-semibold px-8 py-6 text-lg rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Agendar Palestra
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              variant="outline"
              className="border-2 border-gold text-gold hover:bg-gold hover:text-rich-black font-semibold px-8 py-6 text-lg rounded-lg transition-all duration-300"
            >
              Baixar Portfolio
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
