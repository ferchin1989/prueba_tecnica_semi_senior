import React, { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from '../../styles/ProductSlider.module.css';
import { Product } from '../../types';
import { getProducts } from '../../services/productService';
import useCartStore from '../../store/useCartStore';

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
    slidesToShow: 3.5,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2.5,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1.2,
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
          <h2 className={styles.sliderTitle}>Productos destacados</h2>
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
          {products.map((product) => (
            <div key={product.id} className={styles.productCard}>
              <div className={styles.productImageContainer}>
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className={styles.productImage}
                />
                {product.tags && product.tags.length > 0 && (
                  <div className={styles.productTags}>
                    {product.tags.map((tag, index) => (
                      <span 
                        key={index} 
                        className={`${styles.productTag} ${tag.toLowerCase() === 'descuento' ? styles.discount : ''} ${tag.toLowerCase() === 'nuevo' ? styles.new : ''}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className={styles.productBrand}>{product.brand}</div>
              <h3 className={styles.productTitle}>{product.title}</h3>
              <div className={styles.productPrice}>{formatPrice(product.price)}</div>
              <button 
                className={styles.addToCartButton}
                onClick={() => handleAddToCart(product)}
              >
                Añadir al carrito
              </button>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default ProductSlider;
