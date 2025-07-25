import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, MessageCircle } from "lucide-react";
import { useRef } from "react";
import useScrollReveal from "@/hooks/useScrollReveal";

export function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  useScrollReveal(ref, "animate-fade-in");

  const handleWhatsAppContact = () => {
    const message = "Olá Pedro, gostaria de mais informações sobre seu trabalho.";
    const whatsappUrl = `https://wa.me/5541988224524?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-gray-900 to-black" data-theme="dark">
      <div ref={ref} className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-gold font-medium mb-4 block">Contato</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Entre em Contato</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Atendimentos presenciais em Curitiba/PR e online para todo o Brasil e exterior
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="space-y-12">
            <div className="space-y-8">
              <div className="flex items-start space-x-6">
                <div className="bg-gray-800/50 p-4 rounded-xl">
                  <Mail className="w-8 h-8 text-gold" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-white">Email</h3>
                  <p className="text-gray-300">contato@pedrolichtnow.com.br</p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="bg-gray-800/50 p-4 rounded-xl">
                  <Phone className="w-8 h-8 text-gold" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-white">Telefone</h3>
                  <p className="text-gray-300">(41) 98822-4524</p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="bg-gray-800/50 p-4 rounded-xl">
                  <MapPin className="w-8 h-8 text-gold" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-white">Localização</h3>
                  <p className="text-gray-300">Curitiba, Paraná - Brasil</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-6 text-white">Redes Sociais</h3>
              <div className="flex space-x-6">
                <a
                  href="https://instagram.com/pedrolichtnow"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800/50 p-4 rounded-xl text-gray-300 hover:text-gold transition-colors duration-300"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="https://linkedin.com/in/pedrolichtnow"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800/50 p-4 rounded-xl text-gray-300 hover:text-gold transition-colors duration-300"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>

            <Button 
              onClick={handleWhatsAppContact}
              className="w-full bg-gold hover:bg-yellow-500 text-rich-black font-semibold px-8 py-6 text-lg rounded-lg transition-all duration-300"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Falar no WhatsApp
            </Button>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50">
            <h3 className="text-2xl font-semibold mb-6 text-white">Envie uma Mensagem</h3>
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Nome
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Seu nome completo"
                  required
                  className="bg-gray-900/50 border-gray-700 text-white placeholder-gray-400 focus:border-gold focus:ring-gold"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  required
                  className="bg-gray-900/50 border-gray-700 text-white placeholder-gray-400 focus:border-gold focus:ring-gold"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Assunto
                </label>
                <Input
                  id="subject"
                  type="text"
                  placeholder="Assunto da mensagem"
                  required
                  className="bg-gray-900/50 border-gray-700 text-white placeholder-gray-400 focus:border-gold focus:ring-gold"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Mensagem
                </label>
                <Textarea
                  id="message"
                  placeholder="Sua mensagem"
                  rows={6}
                  required
                  className="bg-gray-900/50 border-gray-700 text-white placeholder-gray-400 focus:border-gold focus:ring-gold"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gold hover:bg-yellow-500 text-rich-black font-semibold px-8 py-6 text-lg rounded-lg transition-all duration-300"
              >
                Enviar Mensagem
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
