import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import useScrollReveal from "@/hooks/useScrollReveal";
import { ArrowRight } from "lucide-react";
import { handleImageError } from "@/lib/utils";

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  useScrollReveal(ref, "animate-fade-in");

  const handleWhatsAppContact = () => {
    const message = "Olá Pedro, gostaria de mais informações sobre seu trabalho.";
    const whatsappUrl = `https://wa.me/5541988224524?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const scrollToBooks = () => {
    const element = document.querySelector("#livros");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden" data-theme="dark">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://plus.unsplash.com/premium_photo-1664790560283-7c9c4701bb97?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
          alt="Pedro Lichtnow - Professional Author Portrait" 
          className="w-full h-full object-cover object-center transform scale-105"
          onError={(e) => handleImageError(e, "https://via.placeholder.com/1920x1080/1a1a1a/d4af37?text=Pedro+Lichtnow")}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/90"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.15)_0%,transparent_70%)]"></div>
      </div>
      
      <div ref={ref} className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="mb-8 transform hover:scale-105 transition-transform duration-500">
          <span className="inline-block px-6 py-3 bg-gold/20 backdrop-blur-sm rounded-full text-gold text-sm font-medium mb-4 border border-gold/30">
            Unindo alma e estratégia, ciência e espiritualidade
          </span>
        </div>
        
        <h1 className="font-serif text-6xl md:text-8xl font-bold text-white mb-8 text-shadow animate-fade-in">
          Pedro Lichtnow
        </h1>
        
        <div className="space-y-6 mb-12 max-w-3xl mx-auto">
          <p className="text-2xl md:text-3xl text-white/90 font-light leading-relaxed animate-slide-up">
            Escritor, palestrante existencialista e mentor de transformação
          </p>
          
          <p className="text-lg md:text-xl text-white/80 leading-relaxed animate-slide-up">
            Especialista em Consciência e Desenvolvimento Humano, neurocomunicador e formado em Física Quântica Aplicada. 
            Integrando saberes da neurociência, física quântica, filosofia e espiritualidade aplicada.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button 
            onClick={handleWhatsAppContact}
            className="bg-gold hover:bg-gold-light text-rich-black font-semibold px-10 py-6 text-lg rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.690"/>
            </svg>
            Agende uma conversa
          </Button>
          
          <Button 
            variant="outline"
            onClick={scrollToBooks}
            className="border-2 border-gold bg-white/10 backdrop-blur-sm text-white hover:bg-gold hover:text-rich-black font-semibold px-10 py-6 text-lg rounded-lg transition-all duration-300"
          >
            Conheça meus livros
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float">
        <ChevronDown className="text-white text-3xl opacity-70" />
      </div>
    </section>
  );
}
