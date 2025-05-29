export default function Footer() {
  return (
    <footer className="bg-black text-white py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="font-serif text-xl font-bold mb-4">Pedro Lichtnow</div>
        <p className="text-white/60 mb-4">Escritor e Palestrante</p>
        <div className="text-sm text-white/40">
          © {new Date().getFullYear()} Pedro Lichtnow. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
