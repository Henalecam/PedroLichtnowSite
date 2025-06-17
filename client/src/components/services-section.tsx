import { useRef } from "react";
import useScrollReveal from "@/hooks/useScrollReveal";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Users, Sparkles, Brain, MessageSquare, Target } from "lucide-react";

export default function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null);
  useScrollReveal(ref, "animate-fade-in");

  const services = [
    {
      title: "Mentorias Existentes",
      description: "Mentorias individuais e corporativas focadas em desenvolvimento pessoal, autoconhecimento e transformação existencial.",
      icon: <Users className="w-12 h-12 text-gold" />,
      items: [
        {
          title: "Mentoria de Posicionamento com Propósito",
          description: "Para líderes, marcas e profissionais que desejam alinhar sua essência à comunicação, narrativa e presença estratégica."
        },
        {
          title: "Mentoria de Transformação e Consciência",
          description: "Aprofundamento em consciência, transição de ciclos existenciais e reconexão com o verdadeiro propósito de vida."
        },
        {
          title: "Mentoria de Escrita Consciente",
          description: "Para quem deseja escrever um livro, criar conteúdos autorais ou usar a palavra como ferramenta de expansão e autoridade."
        },
        {
          title: "Mentoria de Comunicação Quântica",
          description: "Desenvolvimento de percepção vibracional, leitura energética de situações, decisões e projetos."
        }
      ]
    },
    {
      title: "Palestras Evolutivas",
      description: "Palestras presenciais e online sobre consciência, propósito, autoconhecimento e os novos caminhos da humanidade.",
      icon: <Sparkles className="w-12 h-12 text-gold" />,
      items: [
        {
          title: "O Poder da Consciência",
          description: "A consciência como campo criador. Uma jornada sobre como acessar, expandir e direcionar nosso poder interno."
        },
        {
          title: "Consciência e Propósito na Era do Caos",
          description: "Como encontrar sentido, foco e presença diante da instabilidade global? Uma palestra sobre inteligência existencial."
        },
        {
          title: "Liderança com Alma",
          description: "Mais que técnicas: uma liderança que pulsa com verdade. Mergulhe na inteligência vibracional e no magnetismo da presença."
        },
        {
          title: "Entre Humanos e Máquinas",
          description: "Como permanecer humano em um mundo automatizado? A consciência como diferencial competitivo e criativo."
        }
      ]
    },
    {
      title: "Experiências Transformadoras",
      description: "Programas imersivos e workshops práticos para desenvolvimento pessoal e profissional.",
      icon: <Brain className="w-12 h-12 text-gold" />,
      items: [
        {
          title: "Leitura de Campo Sutil",
          description: "Sessões individuais que integram percepção energética, orientação tecnosófica e alinhamento de caminhos."
        },
        {
          title: "Jornadas de Escrita Existencial",
          description: "Workshops ou vivências para grupos que desejam escrever a partir do centro do ser, alinhando narrativa e alma."
        },
        {
          title: "Oficinas e Retiros com Propósito",
          description: "Imersões curtas ou longas que unem escrita, propósito, autoconhecimento, expressão e reconexão."
        }
      ]
    }
  ];

  return (
    <section id="servicos" className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div ref={ref} className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-gold font-medium mb-4 block">Serviços</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Transformação e Evolução</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Unindo propósito, inovação e narrativa de valor para criar experiências transformadoras
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="mb-6">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-8">{service.description}</p>
              <div className="space-y-6 mb-8">
                {service.items.map((item, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex items-center text-gray-900 font-semibold">
                      <span className="w-2 h-2 bg-gold rounded-full mr-3"></span>
                      {item.title}
                    </div>
                    <p className="text-gray-600 text-sm ml-5">{item.description}</p>
                  </div>
                ))}
              </div>
              <Button className="w-full bg-gold hover:bg-yellow-500 text-rich-black font-semibold px-6 py-6 text-lg rounded-lg transition-all duration-300">
                Saiba mais
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 