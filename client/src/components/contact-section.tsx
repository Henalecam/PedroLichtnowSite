import { Button } from "@/components/ui/button";
import { Mail, MessageCircle, Calendar, MapPin } from "lucide-react";
import { useRef } from "react";
import useScrollReveal from "@/hooks/useScrollReveal";

export default function ContactSection() {
  const handleWhatsAppContact = () => {
    const message = "Olá Pedro, gostaria de conversar sobre uma oportunidade.";
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleEmailContact = () => {
    window.open("mailto:contato@pedrolichtnow.com.br");
  };

  const socialLinks = [
    { 
      icon: "fab fa-instagram", 
      href: "https://instagram.com/pedrolichtnow",
      label: "Instagram",
      followers: "20k+"
    },
    { 
      icon: "fab fa-youtube", 
      href: "https://youtube.com/pedrolichtnow",
      label: "YouTube",
      followers: "50k+"
    },
    { 
      icon: "fab fa-linkedin", 
      href: "https://linkedin.com/in/pedrolichtnow",
      label: "LinkedIn",
      followers: "15k+"
    }
  ];

  const contactInfo = [
    {
      icon: MessageCircle,
      title: "WhatsApp",
      description: "Resposta em até 24h",
      action: handleWhatsAppContact,
      color: "bg-green-600 hover:bg-green-700"
    },
    {
      icon: Mail,
      title: "E-mail",
      description: "contato@pedrolichtnow.com.br",
      action: handleEmailContact,
      color: "bg-wine hover:bg-red-800"
    },
    {
      icon: Calendar,
      title: "Agenda",
      description: "Disponibilidade para eventos",
      action: () => window.open("https://calendly.com/pedrolichtnow"),
      color: "bg-gold hover:bg-yellow-500 text-rich-black"
    }
  ];

  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

  useScrollReveal(sectionRef, "animate-fade-in");
  useScrollReveal(titleRef, "animate-fade-in");
  useScrollReveal(subtitleRef, "animate-slide-up");
  useScrollReveal(descRef, "animate-slide-up");
  useScrollReveal(buttonsRef, "animate-fade-in");
  useScrollReveal(socialRef, "animate-fade-in");

  return (
    <section id="contato" data-theme="dark" className="py-24 relative overflow-hidden bg-rich-black text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5"></div>
      
      <div ref={sectionRef} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <span ref={subtitleRef} className="text-gold font-medium tracking-wider uppercase text-sm mb-4 block opacity-0">Contato</span>
          <h2 ref={titleRef} className="font-serif text-4xl md:text-5xl font-bold mb-6 opacity-0">
            Vamos Criar Algo Extraordinário
        </h2>
        <p ref={descRef} className="text-lg text-white/80 mb-12 max-w-2xl mx-auto opacity-0">
            Seja para uma palestra, parceria ou apenas uma conversa inspiradora, estou sempre aberto a novas conexões 
            que possam gerar transformação e crescimento.
        </p>
        </div>
        
        <div ref={buttonsRef} className="grid md:grid-cols-3 gap-8 mb-16 opacity-0">
          {contactInfo.map((info, index) => (
          <Button
              key={index}
              onClick={info.action}
              className={`flex items-center justify-center p-6 ${info.color} rounded-xl transition-all duration-300 group h-auto transform hover:scale-105`}
          >
              <info.icon className="w-8 h-8 mr-4 group-hover:scale-110 transition-transform" />
            <div className="text-left">
                <div className="font-semibold">{info.title}</div>
                <div className="text-sm text-white/80">{info.description}</div>
            </div>
          </Button>
          ))}
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="font-serif text-2xl font-bold mb-4">
                Vamos Conversar Sobre Seu Projeto
              </h3>
              <p className="text-white/80 mb-6">
                Preencha o formulário ao lado e conte-me mais sobre sua ideia. 
                Estou aqui para ajudar a transformar sua visão em realidade através de palestras, mentorias e consultorias.
              </p>
              <div className="flex items-center gap-4 text-white/80">
                <MapPin className="w-5 h-5 text-gold" />
                <span>São Paulo, Brasil</span>
              </div>
            </div>
            <form className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Seu nome"
                  className="w-full px-4 py-3 rounded-lg bg-rich-black/60 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-gold"
                />
                <input
                  type="email"
                  placeholder="Seu e-mail"
                  className="w-full px-4 py-3 rounded-lg bg-rich-black/60 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-gold"
                />
              </div>
              <textarea
                placeholder="Sua mensagem"
                rows={4}
                className="w-full px-4 py-3 rounded-lg bg-rich-black/60 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-gold"
              ></textarea>
              <Button className="w-full bg-gold hover:bg-yellow-500 text-rich-black font-semibold py-3 !opacity-100">
                Enviar Mensagem
          </Button>
            </form>
          </div>
        </div>
        
        <div ref={socialRef} className="text-center opacity-0">
          <h3 className="font-serif text-2xl font-bold mb-8">
            Conecte-se nas Redes Sociais
          </h3>
          <div className="flex justify-center gap-8">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
                className="group"
              >
                <div className="w-16 h-16 bg-white/10 hover:bg-gold rounded-full flex items-center justify-center transition-all duration-300 mb-2 group-hover:scale-110">
                  <i className={`${social.icon} text-2xl`}></i>
                </div>
                <div className="text-sm text-white/80">
                  {social.followers} seguidores
                </div>
            </a>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
