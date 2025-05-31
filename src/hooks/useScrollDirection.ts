import { useState, useEffect } from 'react';

/**
 * Hook personalizado para detectar la dirección del scroll
 * @returns Objeto con la dirección del scroll (up o down) y si el scroll está en la parte superior
 */
const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  const [isTop, setIsTop] = useState<boolean>(true);
  
  useEffect(() => {
    let lastScrollY = window.scrollY;
    
    // Función para manejar el evento de scroll
    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      const direction = scrollY > lastScrollY ? 'down' : 'up';
      
      // Solo actualizar si hay un cambio significativo
      if (direction !== scrollDirection && (scrollY - lastScrollY > 5 || scrollY - lastScrollY < -5)) {
        setScrollDirection(direction);
      }
      
      // Determinar si estamos en la parte superior
      setIsTop(scrollY < 10);
      
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };
    
    // Agregar el evento de scroll
    window.addEventListener('scroll', updateScrollDirection);
    
    // Limpiar el evento al desmontar
    return () => {
      window.removeEventListener('scroll', updateScrollDirection);
    };
  }, [scrollDirection]);
  
  return { scrollDirection, isTop };
};

export default useScrollDirection;
