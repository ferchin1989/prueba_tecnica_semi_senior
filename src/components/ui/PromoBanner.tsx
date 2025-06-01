import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/PromoBanner.module.css';

/**
 * Componente que muestra un banner promocional de Black Days
 */
const PromoBanner: React.FC = () => {
  return (
    <div className={styles.promoBannerContainer}>
      <div className={styles.promoBanner}>
        <div className={styles.promoContent}>
          <div className={styles.promoTitle}>
            <span className={styles.blackText}>Black</span>
            <span className={styles.daysText}>DAYS</span>
            <span className={styles.dateText}>26 MAYO - 1 JUNIO</span>
          </div>
          <div className={styles.promoInfo}>
            <span>APLICAN T&C • APLICA EN REF SELECCIONADAS • EXCLUSIVO ONLINE</span>
          </div>
          <div className={styles.promoOffer}>
            <span className={styles.offerText}>UP TO 60% OFF</span>
            <Link to="/productos" className={styles.shopNowButton}>
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;
