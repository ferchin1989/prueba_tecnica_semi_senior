import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import styles from '../styles/ProductDetail.module.css';
import { Product } from '../types';
import { getProducts } from '../services/productService';
import useCartStore from '../store/useCartStore';

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
      alert('Producto añadido al carrito');
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
    <Layout>
      <div className={styles.productDetail}>
        <div className="container">
          <div className={styles.productGrid}>
            {/* Columna de imagen del producto */}
            <div className={styles.productImageColumn}>
              <div className={styles.mainImage}>
                <img src={product.image} alt={product.title} />
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
  );
};

export default ProductDetail;
