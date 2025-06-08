import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import BooksSection from "@/components/books-section";
import SpeakingSection from "@/components/speaking-section";
import TestimonialsSection from "@/components/testimonials-section";
import BlogSection from "@/components/blog-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <BooksSection />
      <SpeakingSection data-theme="dark" />
      <TestimonialsSection />
      <BlogSection />
      <ContactSection data-theme="dark" />
      <Footer />
    </div>
  );
}
