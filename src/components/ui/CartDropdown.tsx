import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/CartDropdown.module.css';
import { CartItem } from '../../types';
import useCartStore from '../../store/useCartStore';

interface CartDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Componente que muestra un dropdown con los productos en el carrito
 */
const CartDropdown: React.FC<CartDropdownProps> = ({ isOpen, onClose }) => {
  const { cart, removeFromCart } = useCartStore(state => ({
    cart: state.cart,
    removeFromCart: state.removeFromCart
  }));

  // Formatear precio
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.cartDropdownContainer}>
      <div className={styles.cartDropdown}>
        <div className={styles.cartHeader}>
          <h3 className={styles.cartTitle}>Mi Carrito ({cart.totalItems})</h3>
          <button className={styles.closeButton} onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        {cart.items.length === 0 ? (
          <div className={styles.emptyCart}>
            <p>Tu carrito está vacío</p>
            <Link to="/" className={styles.continueShoppingLink} onClick={onClose}>
              Continuar comprando
            </Link>
          </div>
        ) : (
          <>
            <div className={styles.cartItems}>
              {cart.items.map((item: CartItem) => (
                <div key={item.id} className={styles.cartItem}>
                  <div className={styles.itemImage}>
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className={styles.itemDetails}>
                    <div className={styles.itemBrand}>{item.brand}</div>
                    <div className={styles.itemTitle}>{item.title}</div>
                    <div className={styles.itemPrice}>{formatPrice(item.price)}</div>
                    <div className={styles.itemQuantity}>Cantidad: {item.quantity}</div>
                  </div>
                  <button 
                    className={styles.removeButton}
                    onClick={() => removeFromCart(item.id)}
                    aria-label="Eliminar producto"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
            
            <div className={styles.cartFooter}>
              <div className={styles.cartTotal}>
                <span>Total:</span>
                <span>{formatPrice(cart.totalPrice)}</span>
              </div>
              <div className={styles.cartActions}>
                <Link to="/checkout" className={styles.checkoutButton} onClick={onClose}>
                  Finalizar compra
                </Link>
                <button className={styles.continueShoppingButton} onClick={onClose}>
                  Seguir comprando
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartDropdown;
