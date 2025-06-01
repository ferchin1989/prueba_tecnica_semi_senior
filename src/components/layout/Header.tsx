import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../../styles/Header.module.css';
import { MenuItem } from '../../types';
import { getMenuItems } from '../../services/menuService';
import useScrollDirection from '../../hooks/useScrollDirection';
import useCartStore from '../../store/useCartStore';
import CartDropdown from '../ui/CartDropdown';

/**
 * Componente Header que incluye banner superior, logo, navegación y menú móvil
 * Implementa la funcionalidad de scroll para mostrar/ocultar el header
 */
const Header: React.FC = () => {
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [bannerText, setBannerText] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('mujer'); // Estado para la pestaña activa
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false);
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
  
  // Navegar a página y cerrar menú móvil
  const navigateAndClose = (path: string) => {
    navigate(path);
    toggleMobileMenu();
  };

  return (
    <>
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
              <button 
                className={styles.iconButton} 
                aria-label="Carrito"
                onClick={() => setCartDropdownOpen(true)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                {cartItems > 0 && (
                  <span className={styles.cartBadge}>{cartItems}</span>
                )}
              </button>
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.mobileMenuActive : ''}`}>
        {/* Botón de cierre */}
        <button className={styles.mobileCloseButton} onClick={toggleMobileMenu} aria-label="Cerrar menú">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        
        {/* Tabs de navegación principal */}
        <div className={styles.mobileTabs}>
          <button 
            className={activeTab === 'mujer' ? styles.mobileTabActive : styles.mobileTab}
            onClick={() => {
              changeTab('mujer');
              // No cerramos el menú aquí para permitir ver las opciones
            }}
          >
            Mujer
          </button>
          <button 
            className={activeTab === 'hombre' ? styles.mobileTabActive : styles.mobileTab}
            onClick={() => {
              changeTab('hombre');
              // No cerramos el menú aquí para permitir ver las opciones
            }}
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
              <div 
                className={styles.mobileNavLink}
                onClick={() => navigateAndClose('/')}
              >
                <span>Ir a Inicio</span>
              </div>
            </li>
            <li>
              <div 
                className={styles.mobileNavLink}
                onClick={() => navigateAndClose('/mujer')}
              >
                <span>Ver todo Mujer</span>
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
              <div 
                className={styles.mobileNavLink}
                onClick={() => navigateAndClose('/mujer/malva-edition')}
              >
                <span>Malva Edition</span>
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
              <div 
                className={styles.mobileNavLink}
                onClick={() => navigateAndClose('/mujer/ropa')}
              >
                <span>Ropa</span>
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
              <div 
                className={styles.mobileNavLink}
                onClick={() => navigateAndClose('/mujer/calzado')}
              >
                <span>Calzado</span>
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
              <div 
                className={styles.mobileNavLink}
                onClick={() => navigateAndClose('/mujer/accesorios')}
              >
                <span>Accesorios</span>
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
              <div 
                className={styles.mobileNavLink}
                onClick={() => navigateAndClose('/mujer/joyeria')}
              >
                <span>Joyería</span>
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
              <div 
                className={styles.mobileNavLink}
                onClick={() => navigateAndClose('/mujer/black-days')}
              >
                <span>Black Days</span>
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
              <div 
                className={styles.mobileNavLink}
                onClick={() => navigateAndClose('/')}
              >
                <span>Ir a Inicio</span>
              </div>
            </li>
            <li>
              <div 
                className={styles.mobileNavLink}
                onClick={() => navigateAndClose('/hombre')}
              >
                <span>Ver todo Hombre</span>
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
              <div 
                className={styles.mobileNavLink}
                onClick={() => navigateAndClose('/hombre/ropa')}
              >
                <span>Ropa Hombre</span>
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
              <div 
                className={styles.mobileNavLink}
                onClick={() => navigateAndClose('/hombre/calzado')}
              >
                <span>Calzado Hombre</span>
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
              <div 
                className={styles.mobileNavLink}
                onClick={() => navigateAndClose('/hombre/accesorios')}
              >
                <span>Accesorios Hombre</span>
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
              <div 
                className={styles.mobileNavLink}
                onClick={() => navigateAndClose('/hombre/black-days')}
              >
                <span>Black Days Hombre</span>
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
              <div 
                className={styles.mobileNavLink}
                onClick={() => navigateAndClose('/')}
              >
                <span>Ir a Inicio</span>
              </div>
            </li>
            <li>
              <div 
                className={styles.mobileNavLink}
                onClick={() => navigateAndClose('/brands/luxury')}
              >
                <span>Marcas de Lujo</span>
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
              <div 
                className={styles.mobileNavLink}
                onClick={() => navigateAndClose('/brands/new')}
              >
                <span>Nuevas Marcas</span>
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
      
      {/* Dropdown del carrito */}
      <CartDropdown 
        isOpen={cartDropdownOpen} 
        onClose={() => setCartDropdownOpen(false)} 
      />
    </>
  );
};

export default Header;
