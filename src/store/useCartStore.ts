import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Cart, CartItem, Product } from '../types';

interface CartStore {
  cart: Cart;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

type CartPersist = {
  name: string;
  storage?: Storage;
};

/**
 * Store para manejar el estado del carrito de compras
 * Utiliza persist para guardar el estado en localStorage
 */
const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cart: {
        items: [],
        totalItems: 0,
        totalPrice: 0
      },
      
      // Añadir producto al carrito
      addToCart: (product: Product) => {
        set((state) => {
          const existingItem = state.cart.items.find(item => item.id === product.id);
          
          if (existingItem) {
            // Si el producto ya existe, incrementar cantidad
            const updatedItems = state.cart.items.map(item => 
              item.id === product.id 
                ? { ...item, quantity: item.quantity + 1 } 
                : item
            );
            
            return {
              cart: {
                items: updatedItems,
                totalItems: state.cart.totalItems + 1,
                totalPrice: state.cart.totalPrice + product.price
              }
            };
          } else {
            // Si es un producto nuevo, añadirlo al carrito
            const newItem: CartItem = {
              ...product,
              quantity: 1
            };
            
            return {
              cart: {
                items: [...state.cart.items, newItem],
                totalItems: state.cart.totalItems + 1,
                totalPrice: state.cart.totalPrice + product.price
              }
            };
          }
        });
      },
      
      // Eliminar producto del carrito
      removeFromCart: (productId: number) => {
        set((state) => {
          const itemToRemove = state.cart.items.find(item => item.id === productId);
          
          if (!itemToRemove) return state;
          
          const updatedItems = state.cart.items.filter(item => item.id !== productId);
          
          return {
            cart: {
              items: updatedItems,
              totalItems: state.cart.totalItems - itemToRemove.quantity,
              totalPrice: state.cart.totalPrice - (itemToRemove.price * itemToRemove.quantity)
            }
          };
        });
      },
      
      // Actualizar cantidad de un producto
      updateQuantity: (productId: number, quantity: number) => {
        set((state) => {
          const itemToUpdate = state.cart.items.find(item => item.id === productId);
          
          if (!itemToUpdate) return state;
          
          const quantityDiff = quantity - itemToUpdate.quantity;
          const priceDiff = itemToUpdate.price * quantityDiff;
          
          const updatedItems = state.cart.items.map(item => 
            item.id === productId 
              ? { ...item, quantity } 
              : item
          );
          
          return {
            cart: {
              items: updatedItems,
              totalItems: state.cart.totalItems + quantityDiff,
              totalPrice: state.cart.totalPrice + priceDiff
            }
          };
        });
      },
      
      // Vaciar carrito
      clearCart: () => {
        set({
          cart: {
            items: [],
            totalItems: 0,
            totalPrice: 0
          }
        });
      }
    }),
    {
      name: 'malva-cart-storage' // Nombre para localStorage
    }
  )
);

export default useCartStore;
