import React from 'react';
import styles from '../../styles/Banner.module.css';
import bannerImage from '../../assets/images/Desk_3.webp';

/**
 * Componente Banner principal que muestra una imagen de fondo con texto y CTA
 * Incluye versiones para desktop y mobile
 */
const Banner: React.FC = () => {
  return (
    <section className={styles.banner}>
      {/* Imagen de fondo */}
      <img 
        src={bannerImage} 
        alt="Glee Wear" 
        className={styles.bannerImage}
      />
      
      {/* Contenido del banner */}
      <div className={styles.bannerContent}>
        <h1 className={styles.bannerTitle}>Glee Wear</h1>
        <p className={styles.bannerText}>
          Indumentaria deportiva. Crea moda en tu día a día.
        </p>
        <button className={styles.bannerButton}>Shop Now</button>
      </div>
    </section>
  );
};

export default Banner;
