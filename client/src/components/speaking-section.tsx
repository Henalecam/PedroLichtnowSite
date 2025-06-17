import { useRef } from "react";
import useScrollReveal from "@/hooks/useScrollReveal";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Globe, Flame, Bot, Sparkles } from "lucide-react";

export default function SpeakingSection() {
  const ref = useRef<HTMLDivElement>(null);
  useScrollReveal(ref, "animate-fade-in");

  const talks = [
    {
      title: "O Poder da Consciência",
      subtitle: "Inteligência vibracional e despertar existencial",
      description: "A consciência como campo criador. Uma jornada sobre como acessar, expandir e direcionar nosso poder interno com intenção, clareza e presença.",
      icon: <Star className="w-8 h-8 text-gold" />,
      tags: ["Consciência", "Despertar", "Poder Interno"]
    },
    {
      title: "Consciência e Propósito na Era do Caos",
      subtitle: "Inteligência existencial e escolhas profundas",
      description: "Uma provocação necessária sobre o papel da consciência em tempos de crise. Como encontrar sentido, foco e presença diante da instabilidade global?",
      icon: <Globe className="w-8 h-8 text-gold" />,
      tags: ["Propósito", "Crise", "Sentido"]
    },
    {
      title: "Liderança com Alma",
      subtitle: "Comunicação autêntica e coerência energética",
      description: "Mais que técnicas: uma liderança que pulsa com verdade. Mergulhe na inteligência vibracional, no magnetismo da presença e no poder da coerência.",
      icon: <Flame className="w-8 h-8 text-gold" />,
      tags: ["Liderança", "Autenticidade", "Presença"]
    },
    {
      title: "Entre Humanos e Máquinas",
      subtitle: "Consciência, IA e o futuro da sensibilidade",
      description: "Como permanecer humano em um mundo automatizado? A consciência como diferencial competitivo, criativo e espiritual diante da Inteligência Artificial.",
      icon: <Bot className="w-8 h-8 text-gold" />,
      tags: ["Tecnologia", "Humanidade", "Futuro"]
    },
    {
      title: "Comunicação Quântica e Realidade",
      subtitle: "Palavra, intenção e frequência",
      description: "Tudo comunica. Esta palestra revela como a frequência da palavra e da presença molda realidades, conecta consciências e ativa potenciais ocultos.",
      icon: <Sparkles className="w-8 h-8 text-gold" />,
      tags: ["Comunicação", "Quântica", "Realidade"]
    }
  ];

  return (
    <section id="palestras" className="py-24 bg-gradient-to-b from-gray-900 to-black" data-theme="dark">
      <div ref={ref} className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-gold font-medium mb-4 block">Palestras</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Palestras Evolutivas</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Palestras presenciais e online sobre consciência, propósito, autoconhecimento e os novos caminhos da humanidade
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {talks.map((talk, index) => (
            <div 
              key={index} 
              className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50 hover:border-gold/50 transition-all duration-300 group"
            >
              <div className="mb-6">
                {talk.icon}
              </div>
              <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-gold transition-colors duration-300">
                {talk.title}
              </h3>
              <p className="text-gold text-lg mb-4">{talk.subtitle}</p>
              <p className="text-gray-300 mb-6">{talk.description}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {talk.tags.map((tag, i) => (
                  <span 
                    key={i}
                    className="px-3 py-1 bg-gray-700/50 text-gray-300 text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Button 
                className="w-full bg-gold hover:bg-yellow-500 text-rich-black font-semibold px-6 py-6 text-lg rounded-lg transition-all duration-300"
              >
                Saiba mais
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-300 mb-8">
            Para mais informações ou agendamento, entre em contato através do formulário na seção Contato ou envie um e-mail para contato@pedrolichtnow.com
          </p>
          <Button 
            className="bg-gold hover:bg-yellow-500 text-rich-black font-semibold px-8 py-6 text-lg rounded-lg transition-all duration-300"
          >
            Agendar Palestra
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
