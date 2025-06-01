import React, { useEffect, useState } from 'react';
import styles from '../../styles/CartNotification.module.css';

interface CartNotificationProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

/**
 * Componente que muestra una notificación emergente cuando se añade un producto al carrito
 */
const CartNotification: React.FC<CartNotificationProps> = ({ message, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      // Cerrar automáticamente después de 3 segundos
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className={styles.notificationContainer}>
      <div className={styles.notification}>
        <div className={styles.notificationContent}>
          <div className={styles.notificationIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <div className={styles.notificationMessage}>{message}</div>
        </div>
        <button className={styles.closeButton} onClick={onClose}>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CartNotification;
