import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/Footer.module.css';
import { getFooterData } from '../../services/footerService';
import { FooterData } from '../../types';

/**
 * Componente Footer que incluye columnas de información, formulario de newsletter y sección legal
 * Implementa acordeones para la versión móvil
 */
const Footer: React.FC = () => {
  const [footerData, setFooterData] = useState<FooterData | null>(null);
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [showError, setShowError] = useState(false);

  // Cargar datos del footer
  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const data = await getFooterData();
        setFooterData(data);
      } catch (error) {
        console.error('Error al cargar los datos del footer:', error);
      }
    };

    fetchFooterData();
  }, []);

  // Manejar toggle de acordeones en móvil
  const toggleAccordion = (section: string) => {
    setActiveAccordion(activeAccordion === section ? null : section);
  };

  // Manejar envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isChecked) {
      setShowError(true);
      return;
    }
    
    // Aquí iría la lógica para enviar el formulario
    console.log('Formulario enviado:', { email, isChecked });
    
    // Resetear formulario
    setEmail('');
    setIsChecked(false);
    setShowError(false);
  };

  if (!footerData) return null;

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        {/* Footer Top */}
        <div className={styles.footerTop}>
          {/* Síguenos */}
          <div className={styles.footerColumn}>
            <h3 className={styles.footerTitle}>Síguenos</h3>
            <div className={styles.socialIcons}>
              {footerData.socialMedia.map((social) => (
                <a 
                  key={social.id} 
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.socialIcon}
                  aria-label={social.name}
                >
                  {/* Iconos de redes sociales */}
                  {social.icon === 'facebook' && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  )}
                  {social.icon === 'instagram' && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  )}
                  {social.icon === 'twitter' && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                    </svg>
                  )}
                  {social.icon === 'youtube' && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Servicio al cliente */}
          <div className={styles.footerColumn}>
            <div 
              className={styles.accordionHeader}
              onClick={() => toggleAccordion('customer')}
            >
              <h3 className={styles.footerTitle}>Servicio al cliente</h3>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className={`${styles.accordionIcon} ${activeAccordion === 'customer' ? styles.accordionIconActive : ''}`}
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
            <div className={`${styles.accordionContent} ${activeAccordion === 'customer' ? styles.accordionContentActive : ''}`}>
              <ul className={styles.footerLinks}>
                {footerData.customerService.map((link) => (
                  <li key={link.id}>
                    <Link to={link.url} className={styles.footerLink}>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Quiénes somos */}
          <div className={styles.footerColumn}>
            <div 
              className={styles.accordionHeader}
              onClick={() => toggleAccordion('about')}
            >
              <h3 className={styles.footerTitle}>Quiénes somos</h3>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className={`${styles.accordionIcon} ${activeAccordion === 'about' ? styles.accordionIconActive : ''}`}
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
            <div className={`${styles.accordionContent} ${activeAccordion === 'about' ? styles.accordionContentActive : ''}`}>
              <ul className={styles.footerLinks}>
                {footerData.aboutUs.map((link) => (
                  <li key={link.id}>
                    <Link to={link.url} className={styles.footerLink}>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className={styles.footerColumn}>
            <h3 className={styles.footerTitle}>Suscríbete a nuestro newsletter</h3>
            <form className={styles.newsletterForm} onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <input 
                  type="email" 
                  placeholder="Correo electrónico" 
                  className={styles.input}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className={styles.checkboxGroup}>
                <input 
                  type="checkbox" 
                  id="terms" 
                  className={styles.checkbox}
                  checked={isChecked}
                  onChange={() => {
                    setIsChecked(!isChecked);
                    if (showError) setShowError(false);
                  }}
                />
                <label htmlFor="terms" className={styles.checkboxLabel}>
                  Acepto recibir comunicaciones comerciales personalizadas de Malva a través de email.
                </label>
              </div>
              {showError && (
                <p className={styles.requiredText}>* Debes aceptar los términos para continuar</p>
              )}
              <button type="submit" className={styles.submitButton}>
                Suscribirme
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className={styles.footerBottom}>
          <div className={styles.copyright}>
            {footerData.copyright}
          </div>
          <div className={styles.legalLinks}>
            {footerData.legalInfo.map((link) => (
              <Link key={link.id} to={link.url} className={styles.legalLink}>
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
