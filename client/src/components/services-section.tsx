import { Button } from "@/components/ui/button";
import { BookOpen, MessageSquare, Users } from "lucide-react";

export function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Serviços</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Mentoria, palestras e experiências transformadoras para seu desenvolvimento pessoal e profissional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-50 p-8 rounded-lg">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-2xl font-semibold mb-4">Mentorias Existentes</h3>
            <ul className="space-y-4 text-gray-600">
              <li>• Mentoria de Posicionamento com Propósito</li>
              <li>• Mentoria de Transformação e Consciência</li>
              <li>• Mentoria de Escrita Consciente</li>
              <li>• Mentoria de Comunicação Quântica</li>
            </ul>
            <Button className="mt-6 w-full">Saiba Mais</Button>
          </div>

          <div className="bg-gray-50 p-8 rounded-lg">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
              <MessageSquare className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-2xl font-semibold mb-4">Palestras Evolutivas</h3>
            <ul className="space-y-4 text-gray-600">
              <li>• O Poder da Consciência</li>
              <li>• Consciência e Propósito na Era do Caos</li>
              <li>• Liderança com Alma</li>
              <li>• Entre Humanos e Máquinas</li>
              <li>• Comunicação Quântica e Realidade</li>
            </ul>
            <Button className="mt-6 w-full">Saiba Mais</Button>
          </div>

          <div className="bg-gray-50 p-8 rounded-lg">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-2xl font-semibold mb-4">Experiências Transformadoras</h3>
            <ul className="space-y-4 text-gray-600">
              <li>• Leitura de Campo Sutil</li>
              <li>• Alinhamento Vibracional</li>
              <li>• Jornadas de Escrita Existencial</li>
              <li>• Oficinas e Retiros com Propósito</li>
            </ul>
            <Button className="mt-6 w-full">Saiba Mais</Button>
          </div>
        </div>
      </div>
    </section>
  );
} 