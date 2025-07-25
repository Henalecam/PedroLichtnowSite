import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getImageWithFallback(src: string | null | undefined, fallback: string = "https://via.placeholder.com/800x600/1a1a1a/666666?text=Imagem+Indispon%C3%ADvel"): string {
  return src || fallback;
}

export function handleImageError(event: React.SyntheticEvent<HTMLImageElement, Event>, fallback: string = "https://via.placeholder.com/800x600/1a1a1a/666666?text=Imagem+Indispon%C3%ADvel") {
  const img = event.currentTarget;
  img.src = fallback;
  img.onerror = null; // Prevent infinite loop
}
