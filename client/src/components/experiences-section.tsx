import { useRef } from "react";
import useScrollReveal from "@/hooks/useScrollReveal";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Users, Sparkles } from "lucide-react";

export default function ExperiencesSection() {
  const ref = useRef<HTMLDivElement>(null);
  useScrollReveal(ref, "animate-fade-in");

  const experiences = [
    {
      title: "Leitura de Campo Sutil",
      subtitle: "Alinhamento Vibracional Pessoal ou de Projetos",
      description: "Sessões individuais que integram percepção energética, orientação tecnosófica e alinhamento de caminhos.",
      icon: <Sparkles className="w-8 h-8 text-gold" />,
      features: [
        "Percepção energética",
        "Orientação tecnosófica",
        "Alinhamento de caminhos",
        "Leitura de campo sutil"
      ]
    },
    {
      title: "Jornadas de Escrita Existencial",
      subtitle: "Workshops e Vivências",
      description: "Workshops ou vivências para grupos que desejam escrever a partir do centro do ser, alinhando narrativa e alma.",
      icon: <BookOpen className="w-8 h-8 text-gold" />,
      features: [
        "Escrita consciente",
        "Narrativa autêntica",
        "Expressão da alma",
        "Desenvolvimento pessoal"
      ]
    },
    {
      title: "Oficinas e Retiros com Propósito",
      subtitle: "Imersões Transformadoras",
      description: "Imersões curtas ou longas que unem escrita, propósito, autoconhecimento, expressão e reconexão.",
      icon: <Users className="w-8 h-8 text-gold" />,
      features: [
        "Imersão profunda",
        "Autoconhecimento",
        "Expressão criativa",
        "Reconexão interior"
      ]
    }
  ];

  return (
    <section id="experiencias" className="py-24 bg-gradient-to-b from-black to-gray-900" data-theme="dark">
      <div ref={ref} className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-gold font-medium mb-4 block">Experiências</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Experiências Transformadoras</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Programas imersivos e workshops práticos para desenvolvimento pessoal e profissional
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {experiences.map((experience, index) => (
            <div 
              key={index} 
              className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50 hover:border-gold/50 transition-all duration-300 group"
            >
              <div className="mb-6">
                {experience.icon}
              </div>
              <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-gold transition-colors duration-300">
                {experience.title}
              </h3>
              <p className="text-gold text-lg mb-4">{experience.subtitle}</p>
              <p className="text-gray-300 mb-6">{experience.description}</p>
              <ul className="space-y-3 mb-8">
                {experience.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-gray-300">
                    <span className="w-2 h-2 bg-gold rounded-full mr-3"></span>
                    {feature}
                  </li>
                ))}
              </ul>
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
            Para mais informações sobre as experiências transformadoras ou agendamento, entre em contato através do formulário na seção Contato ou envie um e-mail para contato@pedrolichtnow.com
          </p>
          <Button 
            className="bg-gold hover:bg-yellow-500 text-rich-black font-semibold px-8 py-6 text-lg rounded-lg transition-all duration-300"
          >
            Agendar Experiência
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
} 