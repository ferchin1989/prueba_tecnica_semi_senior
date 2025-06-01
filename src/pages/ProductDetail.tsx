import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import styles from '../styles/ProductDetail.module.css';
import { Product } from '../types';
import { getProducts } from '../services/productService';
import useCartStore from '../store/useCartStore';
import CartNotification from '../components/ui/CartNotification';

// Importar imágenes de productos
import mujer1 from '../assets/images/mujeres/mujer 1.webp';
import mujer2 from '../assets/images/mujeres/mujer 2.webp';
import mujer3 from '../assets/images/mujeres/mujer 3.webp';
import mujer4 from '../assets/images/mujeres/mujer 4.webp';
import mujer5 from '../assets/images/mujeres/mujer 5.webp';
import mujer6 from '../assets/images/mujeres/mujer 6.webp';
import mujer7 from '../assets/images/mujeres/mujer 7.webp';
import mujer8 from '../assets/images/mujeres/mujer 8.webp';

// Mapa de imágenes para asociar las rutas con las importaciones
const imageMap: Record<string, string> = {
  '../../assets/images/mujeres/mujer 1.webp': mujer1,
  '../../assets/images/mujeres/mujer 2.webp': mujer2,
  '../../assets/images/mujeres/mujer 3.webp': mujer3,
  '../../assets/images/mujeres/mujer 4.webp': mujer4,
  '../../assets/images/mujeres/mujer 5.webp': mujer5,
  '../../assets/images/mujeres/mujer 6.webp': mujer6,
  '../../assets/images/mujeres/mujer 7.webp': mujer7,
  '../../assets/images/mujeres/mujer 8.webp': mujer8
};

/**
 * Página de detalle de producto que muestra información completa de un producto
 * Permite seleccionar talla, color y añadir al carrito
 */
const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('S');
  const [selectedColor, setSelectedColor] = useState<string>('VERDE');
  const [loading, setLoading] = useState<boolean>(true);
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const addToCart = useCartStore(state => state.addToCart);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const products = await getProducts();
        const foundProduct = products.find(p => p.id === parseInt(id || '0'));
        
        if (foundProduct) {
          // Usar el producto encontrado directamente ya que ahora tiene todos los campos necesarios
          const enhancedProduct = foundProduct;
          
          setProduct(enhancedProduct);
          if (enhancedProduct.colors && enhancedProduct.colors.length > 0) {
            setSelectedColor(enhancedProduct.colors[0]);
          }
        }
      } catch (error) {
        console.error('Error al cargar el producto:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      // Añadimos el producto al carrito con una cantidad inicial de 1
      // El tipo CartItem extiende de Product y añade la propiedad quantity
      addToCart({
        ...product,
        quantity: 1
      } as any); // Usamos type assertion para evitar el error de tipo
      
      // Mostrar notificación
      setShowNotification(true);
    }
  };
  
  // Cerrar notificación
  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  // Formatear precio
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  if (loading) {
    return (
      <Layout>
        <div className="container">
          <div className={styles.loading}>Cargando producto...</div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="container">
          <div className={styles.notFound}>Producto no encontrado</div>
        </div>
      </Layout>
    );
  }

  return (
    <>
      <Layout>
        <div className={styles.productDetail}>
        <div className="container">
          <div className={styles.productGrid}>
            {/* Columna de imagen del producto */}
            <div className={styles.productImageColumn}>
              <div className={styles.mainImage}>
                <img 
                  src={imageMap[product.image] || product.image} 
                  alt={product.title} 
                  className={styles.productImg}
                />
              </div>
            </div>
            
            {/* Columna de información del producto */}
            <div className={styles.productInfoColumn}>
              {/* Marca y nombre del producto */}
              <div className={styles.productBrand}>{product.brand}</div>
              <h1 className={styles.productTitle}>{product.title}</h1>
              
              {/* Precio y etiqueta de nuevo */}
              <div className={styles.priceContainer}>
                <span className={styles.productPrice}>{formatPrice(product.price)}</span>
                {product.isNew && <span className={styles.newLabel}>New in</span>}
              </div>
              
              {/* Selector de talla */}
              <div className={styles.sizeSelector}>
                <div className={styles.selectorHeader}>
                  <span className={styles.selectorLabel}>S</span>
                  <span className={styles.selectedValue}>Seleccionado</span>
                  <button className={styles.sizeGuideButton}>Guía de tallas</button>
                </div>
                <div className={styles.sizeOptions}>
                  {product.sizes?.map((size) => (
                    <button 
                      key={size} 
                      className={`${styles.sizeOption} ${selectedSize === size ? styles.sizeOptionSelected : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Selector de color */}
              <div className={styles.colorSelector}>
                <div className={styles.selectorHeader}>
                  <span className={styles.selectorLabel}>Color:</span>
                  <span className={styles.selectedValue}>{selectedColor}</span>
                </div>
                <div className={styles.colorOptions}>
                  {product.colors?.map((color) => (
                    <button 
                      key={color} 
                      className={`${styles.colorOption} ${selectedColor === color ? styles.colorOptionSelected : ''}`}
                      onClick={() => setSelectedColor(color)}
                      title={color}
                    >
                      <span 
                        className={styles.colorSwatch} 
                        style={{ backgroundColor: color.toLowerCase() }}
                      />
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Botones de acción */}
              <div className={styles.actionButtons}>
                <button 
                  className={styles.addToCartButton}
                  onClick={handleAddToCart}
                >
                  Agregar al carrito
                </button>
                <button className={styles.buyNowButton}>
                  Comprar ahora
                </button>
              </div>
              
              {/* Opciones adicionales */}
              <div className={styles.additionalOptions}>
                <button className={styles.storePickupButton}>
                  Recoger en tienda
                </button>
              </div>
              
              {/* Información de envío */}
              <div className={styles.shippingInfo}>
                <div className={styles.shippingDetail}>
                  <span className={styles.shippingIcon}>○</span>
                  <span>Envíos y devoluciones sin costo hasta 30 días</span>
                </div>
              </div>
              
              {/* Descripción del producto */}
              <div className={styles.productDescription}>
                <h3 className={styles.descriptionTitle}>Descripción</h3>
                <div className={styles.descriptionContent}>
                  <p>{product.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </Layout>
      
      {/* Notificación de producto añadido al carrito */}
      <CartNotification
        message="Producto añadido correctamente al carrito"
        isVisible={showNotification}
        onClose={handleCloseNotification}
      />
    </>
  );
};

export default ProductDetail;
