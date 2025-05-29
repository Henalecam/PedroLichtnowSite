export default function AboutSection() {
  return (
    <section id="sobre" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Pedro Lichtnow em seu escritório" 
              className="rounded-2xl shadow-2xl w-full h-auto"
            />
          </div>
          
          <div className="animate-slide-up">
            <h2 className="relative font-serif text-4xl md:text-5xl font-bold text-rich-black mb-6 gold-accent">
              Sobre Pedro
            </h2>
            
            <p className="text-lg text-refined-gray mb-6 leading-relaxed">
              Com mais de uma década dedicada à literatura e ao desenvolvimento humano, Pedro Lichtnow é reconhecido como uma das vozes mais inspiradoras da atualidade. Sua trajetória como escritor e palestrante tem tocado milhares de vidas através de palavras que transformam.
            </p>
            
            <p className="text-lg text-refined-gray mb-8 leading-relaxed">
              Especialista em temas como liderança, autoconhecimento e transformação pessoal, Pedro combina conhecimento acadêmico com experiência prática, criando conteúdos que ressoam profundamente com seu público.
            </p>
            
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gold mb-2">12+</div>
                <div className="text-sm text-refined-gray font-medium">Livros Publicados</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gold mb-2">500+</div>
                <div className="text-sm text-refined-gray font-medium">Eventos Realizados</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gold mb-2">50k+</div>
                <div className="text-sm text-refined-gray font-medium">Pessoas Impactadas</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
