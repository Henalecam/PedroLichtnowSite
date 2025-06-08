import { useEffect } from "react";

export default function useScrollReveal(ref: React.RefObject<HTMLElement>, animationClass: string) {
  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          node.classList.add(animationClass);
          node.style.opacity = "1";
          node.style.transform = "translateY(0)";
        }
      });
    };

    let observer: IntersectionObserver | undefined;

    if (typeof window !== 'undefined') {
      observer = new IntersectionObserver(handleIntersection, {
        threshold: 0.1,
        rootMargin: "0px 0px -10% 0px"
      });

      observer.observe(node);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [ref, animationClass]);
} 