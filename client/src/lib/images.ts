// Lista de imagens disponíveis no projeto
// Você pode adicionar mais imagens aqui conforme necessário
const availableImages = [
  '/placeholder-1.svg',
  '/placeholder-2.svg',
  '/placeholder-3.svg',
  '/texture.svg',
];

export function getAvailableImages(): string[] {
  return availableImages;
}

export function getPlaceholderImage(): string {
  // SVG placeholder image
  const svg = `<svg width="800" height="400" xmlns="http://www.w3.org/2000/svg">
    <rect width="800" height="400" fill="#e5e7eb"/>
    <text x="400" y="200" font-family="Arial, sans-serif" font-size="24" fill="#9ca3af" text-anchor="middle" dominant-baseline="middle">
      Imagem não encontrada
    </text>
  </svg>`;
  
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

export function getImageUrl(imagePath: string | null | undefined): string {
  if (!imagePath) {
    return getPlaceholderImage();
  }
  
  // Se for uma URL completa (http/https), retorna como está
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // Se for um caminho relativo, adiciona a barra inicial se necessário
  const normalizedPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  
  // Verifica se a imagem existe na lista de disponíveis
  if (availableImages.includes(normalizedPath)) {
    return normalizedPath;
  }
  
  // Retorna placeholder se não encontrar
  return getPlaceholderImage();
}