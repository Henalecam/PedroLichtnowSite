import { useRef } from "react";
import useScrollReveal from "@/hooks/useScrollReveal";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Users, Sparkles } from "lucide-react";

export default function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null);
  useScrollReveal(ref, "animate-fade-in");

  const services = [
    {
      title: "Mentorias Existentes",
      description: "Sessões individuais ou em grupo focadas em desenvolvimento pessoal, autoconhecimento e transformação existencial.",
      icon: <Users className="w-12 h-12 text-gold" />,
      items: [
        "Mentoria Individual",
        "Mentoria em Grupo",
        "Mentoria para Líderes",
        "Mentoria para Escritores"
      ]
    },
    {
      title: "Palestras Evolutivas",
      description: "Palestras e workshops sobre temas como consciência, propósito, liderança e transformação pessoal.",
      icon: <Sparkles className="w-12 h-12 text-gold" />,
      items: [
        "O Poder da Consciência",
        "Consciência e Propósito na Era do Caos",
        "Liderança com Alma",
        "Entre Humanos e Máquinas",
        "Comunicação Quântica e Realidade"
      ]
    },
    {
      title: "Experiências Transformadoras",
      description: "Programas imersivos e workshops práticos para desenvolvimento pessoal e profissional.",
      icon: <BookOpen className="w-12 h-12 text-gold" />,
      items: [
        "Workshop de Escrita Existencial",
        "Retiro de Autoconhecimento",
        "Programa de Liderança Consciente",
        "Imersão em Comunicação Quântica"
      ]
    }
  ];

  return (
    <section id="servicos" className="py-20 bg-gray-50">
      <div ref={ref} className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Serviços</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transformando vidas através de mentorias, palestras e experiências únicas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-lg">
              <div className="mb-6">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <ul className="space-y-3 mb-8">
                {service.items.map((item, i) => (
                  <li key={i} className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-gold rounded-full mr-3"></span>
                    {item}
                  </li>
                ))}
              </ul>
              <Button className="w-full bg-gold hover:bg-yellow-500 text-rich-black font-semibold">
                Saiba mais
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 