import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

export default function ContactSection() {
  const handleWhatsAppContact = () => {
    const message = "Olá Pedro, gostaria de conversar sobre uma oportunidade.";
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleEmailContact = () => {
    window.open("mailto:pedro@pedrolichtnow.com");
  };

  const socialLinks = [
    { 
      icon: "fab fa-instagram", 
      href: "https://instagram.com/pedrolichtnow",
      label: "Instagram"
    },
    { 
      icon: "fab fa-youtube", 
      href: "https://youtube.com/pedrolichtnow",
      label: "YouTube"
    },
    { 
      icon: "fab fa-linkedin", 
      href: "https://linkedin.com/in/pedrolichtnow",
      label: "LinkedIn"
    }
  ];

  return (
    <section id="contato" className="py-20 bg-rich-black text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="relative font-serif text-4xl md:text-5xl font-bold mb-6 gold-accent inline-block">
          Vamos Conversar
        </h2>
        <p className="text-lg text-white/80 mb-12 max-w-2xl mx-auto">
          Seja para uma palestra, parceria ou apenas uma conversa inspiradora, estou sempre aberto a novas conexões.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Button
            onClick={handleWhatsAppContact}
            className="flex items-center justify-center p-6 bg-green-600 hover:bg-green-700 rounded-xl transition-colors group h-auto"
          >
            <svg className="w-8 h-8 mr-4 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.690"/>
            </svg>
            <div className="text-left">
              <div className="font-semibold">WhatsApp</div>
              <div className="text-sm text-white/80">Resposta rápida</div>
            </div>
          </Button>
          
          <Button
            onClick={handleEmailContact}
            variant="outline"
            className="flex items-center justify-center p-6 bg-wine hover:bg-red-800 border-wine text-white rounded-xl transition-colors group h-auto"
          >
            <Mail className="w-8 h-8 mr-4 group-hover:scale-110 transition-transform" />
            <div className="text-left">
              <div className="font-semibold">E-mail</div>
              <div className="text-sm text-white/80">pedro@pedrolichtnow.com</div>
            </div>
          </Button>
        </div>
        
        <div className="flex justify-center space-x-6">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-white/10 hover:bg-gold hover:text-rich-black rounded-full flex items-center justify-center transition-colors"
              aria-label={social.label}
            >
              <i className={`${social.icon} text-xl`}></i>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
