import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "./theme-toggle";

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

  const navBg = navTheme === 'dark'
    ? (isScrolled ? 'bg-background/80 backdrop-blur-md' : 'bg-transparent')
    : (isScrolled ? 'bg-background/80 backdrop-blur-md' : 'bg-transparent');
  const navText = navTheme === 'dark' ? 'text-foreground' : 'text-foreground';
  const navLink = navTheme === 'dark'
    ? 'nav-link text-foreground/90 hover:text-primary'
    : 'nav-link text-foreground/90 hover:text-primary';

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${navBg}`}
      role="navigation"
      aria-label="Menu principal"
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
                aria-label={`Ir para seção ${link.label}`}
              >
                {link.label}
              </button>
            ))}
            <ThemeToggle />
          </div>
          <div className="flex items-center space-x-4 md:hidden">
            <ThemeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Abrir menu">
                  <Menu className={`h-6 w-6 ${navText}`} />
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-background/95 backdrop-blur-md">
                <div className="flex flex-col space-y-6 mt-8">
                  {navLinks.map((link) => (
                    <button
                      key={link.href}
                      onClick={() => scrollToSection(link.href)}
                      className={`${navLink} text-lg text-left transition-all duration-300`}
                      aria-label={`Ir para seção ${link.label}`}
                    >
                      {link.label}
                    </button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
