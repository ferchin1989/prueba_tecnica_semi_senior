import React from 'react';
import styles from '../../styles/Banner.module.css';

/**
 * Componente Banner principal que muestra una imagen de fondo con texto y CTA
 * Incluye versiones para desktop y mobile
 */
const Banner: React.FC = () => {
  return (
    <section className={styles.banner}>
      {/* Imagen de fondo (se carga una diferente para mobile y desktop) */}
      <picture>
        <source media="(max-width: 768px)" srcSet="/images/banner-mobile.jpg" />
        <img 
          src="/images/banner-desktop.jpg" 
          alt="Banner principal Malva" 
          className={styles.bannerImage}
        />
      </picture>
      
      {/* Contenido del banner */}
      <div className={styles.bannerContent}>
        <h1 className={styles.bannerTitle}>Nueva Colecciu00f3n</h1>
        <p className={styles.bannerText}>
          Descubre las u00faltimas tendencias en moda para esta temporada. Prendas exclusivas con estilo u00fanico.
        </p>
        <button className={styles.bannerButton}>Comprar ahora</button>
      </div>
    </section>
  );
};

export default Banner;
