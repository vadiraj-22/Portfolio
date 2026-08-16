import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook using IntersectionObserver to detect if a DOM element is visible in the viewport.
 * @param {Object} options - IntersectionObserver options (rootMargin, threshold)
 * @returns {[React.RefObject, boolean]} [ref, isInView]
 */
export function useInView(options = { rootMargin: '100px 0px 100px 0px', threshold: 0 }) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(true); // Default to true for SSR/initial frame

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, options);

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [options.rootMargin, options.threshold]);

  return [ref, isInView];
}
