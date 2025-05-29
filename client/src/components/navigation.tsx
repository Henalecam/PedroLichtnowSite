import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [navTheme, setNavTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);

      // Detectar seção sob a navbar
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
    handleScroll(); // inicial
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#inicio", label: "Início" },
    { href: "#sobre", label: "Sobre" },
    { href: "#livros", label: "Livros" },
    { href: "#palestras", label: "Palestras" },
    { href: "#depoimentos", label: "Depoimentos" },
    { href: "#blog", label: "Blog" },
    { href: "#contato", label: "Contato" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Classes dinâmicas para navbar e links
  const navBg = navTheme === 'dark'
    ? (isScrolled ? 'bg-rich-black/95 backdrop-blur-md' : 'bg-rich-black/80 backdrop-blur')
    : (isScrolled ? 'bg-white/98 backdrop-blur-md' : 'bg-white/95 backdrop-blur-sm');
  const navText = navTheme === 'dark' ? 'text-white' : 'text-rich-black';
  const navLink = navTheme === 'dark'
    ? 'nav-link text-white hover:text-gold'
    : 'nav-link text-refined-gray hover:text-rich-black';

  return (
    <nav 
      className={`fixed top-0 w-full z-50 border-b border-gray-100 transition-all duration-300 ${navBg}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className={`font-serif font-bold text-xl ${navText}`}>Pedro Lichtnow</div>
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className={navLink}
              >
                {link.label}
              </button>
            ))}
          </div>
          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" className="md:hidden" size="icon">
                <Menu className={`h-6 w-6 ${navText}`} />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col space-y-4 mt-8">
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => scrollToSection(link.href)}
                    className={navLink + " text-lg text-left transition-colors"}
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
