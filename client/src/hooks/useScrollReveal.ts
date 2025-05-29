import { useEffect } from "react";

export default function useScrollReveal(ref: React.RefObject<HTMLElement>, animationClass: string) {
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          node.classList.add(animationClass);
        } else {
          node.classList.remove(animationClass);
        }
      });
    };
    const observer = new window.IntersectionObserver(handleIntersection, {
      threshold: 0.15,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, animationClass]);
} 