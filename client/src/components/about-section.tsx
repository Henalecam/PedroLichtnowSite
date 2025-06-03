import { useRef } from "react";
import useScrollReveal from "@/hooks/useScrollReveal";

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLSpanElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLParagraphElement>(null);
  const text2Ref = useRef<HTMLParagraphElement>(null);
  const clientsRef = useRef<HTMLDivElement>(null);

  useScrollReveal(sectionRef, "animate-fade-in");
  useScrollReveal(titleRef, "animate-fade-in");
  useScrollReveal(subtitleRef, "animate-slide-up");
  useScrollReveal(imageRef, "animate-fade-in");
  useScrollReveal(statsRef, "animate-fade-in");
  useScrollReveal(text1Ref, "animate-slide-up");
  useScrollReveal(text2Ref, "animate-slide-up");
  useScrollReveal(clientsRef, "animate-fade-in");

  return (
    <section id="sobre" className="py-24 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5"></div>
      
      <div ref={sectionRef} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <span ref={subtitleRef} className="text-gold font-medium tracking-wider uppercase text-sm mb-4 block opacity-0">Minha História</span>
          <h2 ref={titleRef} className="font-serif text-4xl md:text-5xl font-bold text-rich-black mb-6 opacity-0">
            Transformando Vidas Através da Palavra
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div ref={imageRef} className="relative opacity-0">
            <div className="absolute -inset-4 bg-gold/10 rounded-3xl transform rotate-3"></div>
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3" 
              alt="Pedro Lichtnow em seu escritório" 
              className="rounded-2xl shadow-2xl w-full h-auto relative z-10"
            />
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg z-20">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-medium text-rich-black">Certificado</div>
                  <div className="text-xs text-refined-gray">Especialista em Desenvolvimento Humano</div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <p ref={text1Ref} className="text-lg text-refined-gray mb-6 leading-relaxed opacity-0">
              Com mais de uma década dedicada à literatura e ao desenvolvimento humano, Pedro Lichtnow é reconhecido como uma das vozes mais inspiradoras da atualidade. Sua trajetória como escritor e palestrante tem tocado milhares de vidas através de palavras que transformam e inspiram mudanças significativas.
            </p>
            
            <p ref={text2Ref} className="text-lg text-refined-gray mb-8 leading-relaxed opacity-0">
              Especialista em temas como liderança, autoconhecimento e transformação pessoal, Pedro combina conhecimento acadêmico com experiência prática, criando conteúdos que ressoam profundamente com seu público e geram resultados mensuráveis.
            </p>
            
            <div ref={statsRef} className="grid grid-cols-3 gap-8 opacity-0">
              <div className="text-center p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl font-bold text-gold mb-2">12+</div>
                <div className="text-sm text-refined-gray font-medium">Livros Publicados</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl font-bold text-gold mb-2">500+</div>
                <div className="text-sm text-refined-gray font-medium">Eventos Realizados</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl font-bold text-gold mb-2">50k+</div>
                <div className="text-sm text-refined-gray font-medium">Pessoas Impactadas</div>
              </div>
            </div>

            <div ref={clientsRef} className="flex flex-col items-center mt-8 gap-2 opacity-0">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <img
                    key={i}
                    src={`https://i.pravatar.cc/150?img=${i + 10}`}
                    alt={`Cliente ${i}`}
                    className="w-10 h-10 rounded-full border-2 border-white"
                  />
                ))}
              </div>
              <div className="text-sm text-refined-gray">
                <span className="font-semibold text-rich-black">+1000 clientes satisfeitos</span> em todo o Brasil
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
