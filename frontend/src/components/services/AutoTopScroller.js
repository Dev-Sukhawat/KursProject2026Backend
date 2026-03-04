import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function AutoTopScroller() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]); // Körs varje gång URL:en ändras

  return null;
}