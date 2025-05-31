import React, { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from '../../styles/ProductSlider.module.css';
import { Product } from '../../types';
import { getProducts } from '../../services/productService';
import useCartStore from '../../store/useCartStore';

// Importar imágenes locales
import mujer1 from '../../assets/images/mujeres/mujer 1.webp';
import mujer2 from '../../assets/images/mujeres/mujer 2.webp';
import mujer3 from '../../assets/images/mujeres/mujer 3.webp';

/**
 * Componente ProductSlider que muestra un carrusel de productos
 * Permite añadir productos al carrito
 */
const ProductSlider: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const sliderRef = useRef<Slider>(null);
  const addToCart = useCartStore(state => state.addToCart);

  // Cargar productos
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error al cargar los productos:', error);
      }
    };

    fetchProducts();
  }, []);

  // Configuración del slider
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  // Funciones para controlar el slider
  const goToPrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const goToNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  // Formatear precio
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  // Manejar añadir al carrito
  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  return (
    <section className={styles.sliderSection}>
      <div className="container">
        <div className={styles.sliderHeader}>
          <h2 className={styles.sliderTitle}>Productos GLEE</h2>
          <div className={styles.sliderControls}>
            <button 
              className={styles.sliderArrow} 
              onClick={goToPrev}
              aria-label="Anterior"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <button 
              className={styles.sliderArrow} 
              onClick={goToNext}
              aria-label="Siguiente"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>

        <Slider ref={sliderRef} {...settings}>
          <div className={styles.productCard}>
            <div className={styles.productImageContainer}>
              <img 
                src={mujer1} 
                alt="Top Mat" 
                className={styles.productImage}
              />
            </div>
            <div className={styles.productInfo}>
              <div className={styles.productBrand}>GLEE</div>
              <h3 className={styles.productTitle}>Top Mat</h3>
              <div className={styles.productPrice}>$199.990</div>
            </div>
          </div>
          
          <div className={styles.productCard}>
            <div className={styles.productImageContainer}>
              <img 
                src={mujer2} 
                alt="Legging Ankle" 
                className={styles.productImage}
              />
            </div>
            <div className={styles.productInfo}>
              <div className={styles.productBrand}>GLEE</div>
              <h3 className={styles.productTitle}>Legging Ankle</h3>
              <div className={styles.productPrice}>$249.990</div>
            </div>
          </div>
          
          <div className={styles.productCard}>
            <div className={styles.productImageContainer}>
              <img 
                src={mujer3} 
                alt="Short Dream" 
                className={styles.productImage}
              />
            </div>
            <div className={styles.productInfo}>
              <div className={styles.productBrand}>GLEE</div>
              <h3 className={styles.productTitle}>Short Dream</h3>
              <div className={styles.productPrice}>$179.990</div>
            </div>
          </div>
          
          <div className={styles.productCard}>
            <div className={styles.productImageContainer}>
              <img 
                src={mujer1} 
                alt="Legging Ankle Active" 
                className={styles.productImage}
              />
            </div>
            <div className={styles.productInfo}>
              <div className={styles.productBrand}>GLEE</div>
              <h3 className={styles.productTitle}>Legging Ankle Active</h3>
              <div className={styles.productPrice}>$199.990</div>
            </div>
          </div>
        </Slider>
      </div>
    </section>
  );
};

export default ProductSlider;
