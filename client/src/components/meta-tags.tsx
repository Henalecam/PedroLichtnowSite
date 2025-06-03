import { Helmet } from "react-helmet-async";

export function MetaTags() {
  return (
    <Helmet>
      <title>Pedro Lichtnow - Autor e Palestrante</title>
      <meta name="description" content="Site oficial de Pedro Lichtnow, autor e palestrante. Conheça seus livros, palestras e conteúdo exclusivo." />
      <meta property="og:title" content="Pedro Lichtnow - Autor e Palestrante" />
      <meta property="og:description" content="Site oficial de Pedro Lichtnow, autor e palestrante. Conheça seus livros, palestras e conteúdo exclusivo." />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <link rel="icon" type="image/png" href="/favicon.png" />
    </Helmet>
  );
} 