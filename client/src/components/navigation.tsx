import { useState, useEffect } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [navTheme, setNavTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = Array.from(document.querySelectorAll('section[id]'));
      const navbar = document.querySelector('nav');
      if (!navbar) return;
      const navbarHeight = navbar.getBoundingClientRect().height;
      const scrollPosition = window.scrollY + navbarHeight + 1;
      let currentTheme = 'light';
      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        const sectionTop = window.scrollY + rect.top;
        const sectionBottom = sectionTop + rect.height;
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          const theme = section.getAttribute('data-theme');
          if (theme === 'dark') {
            currentTheme = 'dark';
          }
          break;
        }
      }
      setNavTheme(currentTheme as 'light' | 'dark');
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#inicio", label: "Início" },
    { href: "#sobre", label: "Sobre" },
    { href: "#servicos", label: "Serviços" },
    { href: "#livros", label: "Livros" },
    { href: "#palestras", label: "Palestras" },
    { href: "#depoimentos", label: "Depoimentos" },
    { href: "#blog", label: "Blog" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleWhatsAppContact = () => {
    const message = "Olá Pedro, gostaria de mais informações sobre seu trabalho.";
    const whatsappUrl = `https://wa.me/5541988224524?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const navBg = navTheme === 'dark'
    ? (isScrolled ? 'glass-effect-dark' : 'bg-transparent')
    : (isScrolled ? 'glass-effect' : 'bg-transparent');
  const navText = navTheme === 'dark' ? 'text-white' : 'text-rich-black';
  const navLink = navTheme === 'dark'
    ? 'nav-link text-white/90 hover:text-gold'
    : 'nav-link text-refined-gray hover:text-rich-black';

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${navBg}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className={`font-serif font-bold text-2xl ${navText} transition-colors duration-300`}>
            Pedro Lichtnow
          </div>
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className={`${navLink} text-sm font-medium tracking-wide transition-all duration-300`}
              >
                {link.label}
              </button>
            ))}
            <Button 
              onClick={handleWhatsAppContact}
              className="bg-gold hover:bg-yellow-500 text-rich-black font-semibold px-6 py-2 rounded-lg transition-all duration-300"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Contato
            </Button>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" className="md:hidden" size="icon">
                <Menu className={`h-6 w-6 ${navText}`} />
              </Button>
            </SheetTrigger>
            <SheetContent className="glass-effect">
              <div className="flex flex-col space-y-6 mt-8">
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => scrollToSection(link.href)}
                    className={`${navLink} text-lg text-left transition-all duration-300`}
                  >
                    {link.label}
                  </button>
                ))}
                <Button 
                  onClick={handleWhatsAppContact}
                  className="bg-gold hover:bg-yellow-500 text-rich-black font-semibold px-6 py-3 rounded-lg transition-all duration-300 mt-4"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Contato
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
