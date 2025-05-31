import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/Header.module.css';
import { MenuItem } from '../../types';
import { getMenuItems } from '../../services/menuService';
import useScrollDirection from '../../hooks/useScrollDirection';
import useCartStore from '../../store/useCartStore';

/**
 * Componente Header que incluye banner superior, logo, navegación y menú móvil
 * Implementa la funcionalidad de scroll para mostrar/ocultar el header
 */
const Header: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [bannerText, setBannerText] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('mujer'); // Estado para la pestaña activa
  const { scrollDirection, isTop } = useScrollDirection();
  const cartItems = useCartStore(state => state.cart.totalItems);

  // Cargar datos del menú
  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const data = await getMenuItems();
        setMenuItems(data.menuItems);
        setBannerText(data.bannerText);
      } catch (error) {
        console.error('Error al cargar el menú:', error);
      }
    };

    fetchMenuData();
  }, []);

  // Manejar toggle del menú móvil
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    // Bloquear scroll cuando el menú está abierto
    document.body.style.overflow = !mobileMenuOpen ? 'hidden' : '';
  };

  // Manejar toggle de submenús en móvil
  const toggleSubmenu = (id: number) => {
    setActiveSubmenu(activeSubmenu === id ? null : id);
  };

  // Cambiar entre pestañas de Mujer y Hombre
  const changeTab = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <header 
      className={`${styles.header} ${scrollDirection === 'down' && !isTop ? styles.headerHidden : ''}`}
    >
      {/* Banner strip */}
      <div className={styles.bannerStrip}>
        <div className="container">
          {bannerText || "Suscríbete hoy y recibe un 10% de descuento en tu primera compra"}
        </div>
      </div>

      {/* Main header */}
      <div className={styles.mainHeader}>
        <div className="container flex justify-between items-center w-full">
          {/* Hamburger menu (mobile) */}
          <button 
            className={`${styles.hamburger} ${mobileMenuOpen ? styles.hamburgerActive : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Menú"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>

          {/* Logo */}
          <div className={styles.logo}>
            <Link to="/">
              <span className={styles.logoText}>MALVA</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className={styles.navContainer}>
            <ul className={styles.navLinks}>
              <li className={styles.navLink}>
                <Link to="/mujer">Mujer</Link>
              </li>
              <li className={styles.navLink}>
                <Link to="/hombre">Hombre</Link>
              </li>
            </ul>

            {/* Icons */}
            <div className={styles.icons}>
              <button className={styles.iconButton} aria-label="Buscar">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </button>
              <button className={styles.iconButton} aria-label="Mi cuenta">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </button>
              <button className={styles.iconButton} aria-label="Carrito">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                {cartItems > 0 && (
                  <span className={styles.cartCount}>{cartItems}</span>
                )}
              </button>
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.mobileMenuActive : ''}`}>
        {/* Botón de cierre */}
        <button className={styles.mobileCloseButton} onClick={toggleMobileMenu}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        
        {/* Tabs de navegación principal */}
        <div className={styles.mobileTabs}>
          <button 
            className={activeTab === 'mujer' ? styles.mobileTabActive : styles.mobileTab}
            onClick={() => changeTab('mujer')}
          >
            Mujer
          </button>
          <button 
            className={activeTab === 'hombre' ? styles.mobileTabActive : styles.mobileTab}
            onClick={() => changeTab('hombre')}
          >
            Hombre
          </button>
          <button 
            className={activeTab === 'brand' ? styles.mobileTabActive : styles.mobileTab}
            onClick={() => changeTab('brand')}
          >
            Shop By Brand
          </button>
        </div>
        
        {/* Enlaces de navegación */}
        {activeTab === 'mujer' && (
          <ul className={styles.mobileNavLinks}>
            <li>
              <div className={styles.mobileNavLink}>
                <Link to="/">Ir a Inicio</Link>
              </div>
            </li>
            <li>
              <div className={styles.mobileNavLink}>
                <Link to="/mujer/new">New in</Link>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="#666" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </div>
            </li>
            <li>
              <div className={styles.mobileNavLink}>
                <Link to="/mujer/malva-edition">Malva Edition</Link>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="#666" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </div>
            </li>
            <li>
              <div className={styles.mobileNavLink}>
                <Link to="/mujer/ropa">Ropa</Link>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="#666" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </div>
            </li>
            <li>
              <div className={styles.mobileNavLink}>
                <Link to="/mujer/calzado">Calzado</Link>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="#666" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </div>
            </li>
            <li>
              <div className={styles.mobileNavLink}>
                <Link to="/mujer/disenadores">Diseñadores</Link>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="#666" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </div>
            </li>
            <li>
              <div className={styles.mobileNavLink}>
                <Link to="/mujer/accesorios">Accesorios</Link>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="#666" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </div>
            </li>
            <li>
              <div className={styles.mobileNavLink}>
                <Link to="/mujer/joyeria">Joyería</Link>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="#666" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </div>
            </li>
            <li>
              <div className={styles.mobileNavLink}>
                <Link to="/mujer/black-days">Black Days</Link>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="#666" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </div>
            </li>
          </ul>
        )}
        
        {activeTab === 'hombre' && (
          <ul className={styles.mobileNavLinks}>
            <li>
              <div className={styles.mobileNavLink}>
                <Link to="/">Ir a Inicio</Link>
              </div>
            </li>
            <li>
              <div className={styles.mobileNavLink}>
                <Link to="/hombre/new">New in Hombre</Link>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="#666" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </div>
            </li>
            <li>
              <div className={styles.mobileNavLink}>
                <Link to="/hombre/ropa">Ropa Hombre</Link>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="#666" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </div>
            </li>
            <li>
              <div className={styles.mobileNavLink}>
                <Link to="/hombre/calzado">Calzado Hombre</Link>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="#666" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </div>
            </li>
            <li>
              <div className={styles.mobileNavLink}>
                <Link to="/hombre/accesorios">Accesorios Hombre</Link>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="#666" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </div>
            </li>
            <li>
              <div className={styles.mobileNavLink}>
                <Link to="/hombre/black-days">Black Days Hombre</Link>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="#666" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </div>
            </li>
          </ul>
        )}
        
        {activeTab === 'brand' && (
          <ul className={styles.mobileNavLinks}>
            <li>
              <div className={styles.mobileNavLink}>
                <Link to="/">Ir a Inicio</Link>
              </div>
            </li>
            <li>
              <div className={styles.mobileNavLink}>
                <Link to="/brands/luxury">Marcas de Lujo</Link>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="#666" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </div>
            </li>
            <li>
              <div className={styles.mobileNavLink}>
                <Link to="/brands/contemporary">Marcas Contemporáneas</Link>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="#666" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </div>
            </li>
            <li>
              <div className={styles.mobileNavLink}>
                <Link to="/brands/new">Nuevas Marcas</Link>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="#666" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </div>
            </li>
          </ul>
        )}
        
        {/* Banner promocional */}
        <div className={styles.mobileBanner}>
          <img src="/images/products/blusa-satinada.jpg" alt="Promoción" />
        </div>
      </div>
    </header>
  );
};

export default Header;
