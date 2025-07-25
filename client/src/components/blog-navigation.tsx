import { useState, useEffect } from "react";
import { Menu, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useLocation } from "wouter";

export default function BlogNavigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Início" },
    { href: "/blog", label: "Blog" },
  ];

  const handleWhatsAppContact = () => {
    const message = "Olá Pedro, gostaria de mais informações sobre seu trabalho.";
    const whatsappUrl = `https://wa.me/5541988224524?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const navBg = isScrolled ? 'glass-effect' : 'bg-transparent';

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div 
            className="font-serif font-bold text-2xl text-rich-black transition-colors duration-300 cursor-pointer"
            onClick={() => setLocation('/')}
          >
            Pedro Lichtnow
          </div>
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => setLocation(link.href)}
                className="nav-link text-refined-gray hover:text-rich-black text-sm font-medium tracking-wide transition-all duration-300"
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
                <Menu className="h-6 w-6 text-rich-black" />
              </Button>
            </SheetTrigger>
            <SheetContent className="glass-effect">
              <div className="flex flex-col space-y-6 mt-8">
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => setLocation(link.href)}
                    className="nav-link text-refined-gray hover:text-rich-black text-lg text-left transition-all duration-300"
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