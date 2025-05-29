import { Button } from "@/components/ui/button";
import { Mic, Users, Target, Award } from "lucide-react";
import { useRef } from "react";
import useScrollReveal from "@/hooks/useScrollReveal";

export default function SpeakingSection() {
  const handleWhatsAppContact = () => {
    const message = "Olá Pedro, gostaria de mais informações sobre suas palestras.";
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const topics = [
    {
      title: "Liderança Transformacional",
      description: "Desenvolva competências de liderança que inspiram equipes e geram resultados excepcionais através da influência positiva.",
      icon: Users
    },
    {
      title: "Autoconhecimento e Propósito",
      description: "Uma jornada introspectiva para descobrir seus valores essenciais e alinhar suas ações com seu propósito de vida.",
      icon: Target
    },
    {
      title: "Transformação Organizacional",
      description: "Estratégias práticas para criar culturas organizacionais mais humanas, produtivas e orientadas para o crescimento.",
      icon: Award
    }
  ];

  const stats = [
    { number: "500+", label: "Eventos Realizados" },
    { number: "50k+", label: "Pessoas Impactadas" },
    { number: "98%", label: "Satisfação" },
    { number: "100+", label: "Empresas Atendidas" }
  ];

  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const topicsRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useScrollReveal(sectionRef, "animate-fade-in");
  useScrollReveal(titleRef, "animate-fade-in");
  useScrollReveal(subtitleRef, "animate-slide-up");
  useScrollReveal(descRef, "animate-slide-up");
  useScrollReveal(statsRef, "animate-fade-in");
  useScrollReveal(imageRef, "animate-fade-in");
  useScrollReveal(topicsRef, "animate-fade-in");
  useScrollReveal(buttonRef, "animate-fade-in");

  return (
    <section id="palestras" data-theme="dark" className="py-24 relative overflow-hidden bg-rich-black text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5"></div>
      
      <div ref={sectionRef} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <span ref={subtitleRef} className="text-gold font-medium tracking-wider uppercase text-sm mb-4 block opacity-0">Palestras</span>
          <h2 ref={titleRef} className="font-serif text-4xl md:text-5xl font-bold mb-6 opacity-0">
            Transforme seu Evento com Inspiração
          </h2>
          <p ref={descRef} className="text-lg text-white/80 max-w-2xl mx-auto opacity-0">
            Palestras que combinam storytelling, insights práticos e metodologias comprovadas para gerar transformação real em sua audiência.
          </p>
        </div>
        
        {/* Stats */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 opacity-0">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-6 bg-white/5 rounded-xl backdrop-blur-sm">
              <div className="text-3xl font-bold text-gold mb-2">{stat.number}</div>
              <div className="text-sm text-white/70">{stat.label}</div>
            </div>
          ))}
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div ref={imageRef} className="relative opacity-0">
            <div className="absolute -inset-4 bg-gold/10 rounded-3xl transform -rotate-3"></div>
            <img 
              src="https://images.unsplash.com/photo-1559223607-b4d0555ae227?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Pedro Lichtnow palestrando para uma plateia" 
              className="rounded-2xl shadow-2xl w-full h-auto relative z-10"
            />
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg z-20">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center">
                  <Mic className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <div className="text-sm font-medium text-rich-black">Palestrante</div>
                  <div className="text-xs text-refined-gray">Certificado Internacional</div>
                </div>
              </div>
            </div>
          </div>
          
          <div ref={topicsRef} className="space-y-8 opacity-0">
            {topics.map((topic, index) => (
              <div key={index} className="group p-6 bg-white/5 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <topic.icon className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl font-bold mb-3 group-hover:text-gold transition-colors">
                      {topic.title}
                    </h3>
                    <p className="text-white/80 leading-relaxed">
                      {topic.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-center mt-16">
          <Button 
            ref={buttonRef}
            onClick={handleWhatsAppContact}
            className="bg-gold hover:bg-yellow-500 text-rich-black font-semibold px-8 py-4 text-lg rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg opacity-0"
          >
            <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.690"/>
            </svg>
            Agende uma Palestra
          </Button>
        </div>
      </div>
    </section>
  );
}
