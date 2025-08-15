import React, { useEffect, useRef } from 'react';

const GalaxyBackground = () => {
  const starsRef = useRef(null);
  const galaxyRef = useRef(null);

  useEffect(() => {
    // Create animated stars
    const createStars = () => {
      const starsContainer = starsRef.current;
      if (!starsContainer) return;

      // Clear existing stars
      starsContainer.innerHTML = '';

      // Create 150 stars for that dense galaxy feel
      for (let i = 0; i < 150; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Random position
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        
        // Random size (some bigger, some smaller)
        const size = Math.random() * 3 + 1;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        
        // Random animation delay
        star.style.animationDelay = Math.random() * 3 + 's';
        
        // Random opacity
        star.style.opacity = Math.random() * 0.8 + 0.2;
        
        starsContainer.appendChild(star);
      }
    };

    // Parallax scroll effect
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallax = galaxyRef.current;
      
      if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
      }
    };

    createStars();
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="galaxy-background">
      <div className="gradient-bg"></div>
      <div className="nebula nebula-1"></div>
      <div className="nebula nebula-2"></div>
      <div className="nebula nebula-3"></div>
      <div ref={galaxyRef} className="galaxy-spiral"></div>
      <div ref={starsRef} className="stars-container"></div>
      <div className="retro-grid"></div>
      <div className="scan-lines"></div>
    </div>
  );
};

export default GalaxyBackground;