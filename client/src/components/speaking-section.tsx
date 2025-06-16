import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function SpeakingSection() {
  const topics = [
    {
      title: "O Poder da Consciência",
      description: "A consciência como campo criador. Uma jornada sobre como acessar, expandir e direcionar nosso poder interno com intenção, clareza e presença.",
      icon: "🌟"
    },
    {
      title: "Consciência e Propósito na Era do Caos",
      description: "Uma provocação necessária sobre o papel da consciência em tempos de crise. Como encontrar sentido, foco e presença diante da instabilidade global?",
      icon: "🌍"
    },
    {
      title: "Liderança com Alma",
      description: "Mais que técnicas: uma liderança que pulsa com verdade. Esta palestra mergulha na inteligência vibracional, no magnetismo da presença e no poder da coerência.",
      icon: "🔥"
    },
    {
      title: "Entre Humanos e Máquinas",
      description: "Como permanecer humano em um mundo automatizado? A consciência como diferencial competitivo, criativo e espiritual diante da Inteligência Artificial.",
      icon: "🤖"
    },
    {
      title: "Comunicação Quântica e Realidade",
      description: "Tudo comunica. Esta palestra revela como a frequência da palavra e da presença molda realidades, conecta consciências e ativa potenciais ocultos.",
      icon: "🔮"
    }
  ];

  return (
    <section id="speaking" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Palestras Evolutivas</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Palestras presenciais e online sobre consciência, propósito, autoconhecimento, física quântica aplicada e os novos caminhos da humanidade.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {topics.map((topic, index) => (
            <div key={index} className="bg-gray-50 p-8 rounded-lg">
              <div className="text-4xl mb-4">{topic.icon}</div>
              <h3 className="text-2xl font-semibold mb-4">{topic.title}</h3>
              <p className="text-gray-600 mb-6">{topic.description}</p>
              <Button variant="outline" className="w-full group">
                Saiba mais
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            Para mais informações ou agendamento, entre em contato através do formulário na seção Contato ou envie um e-mail para contato@pedrolichtnow.com
          </p>
          <Button size="lg">
            Agendar Palestra
          </Button>
        </div>
      </div>
    </section>
  );
}
