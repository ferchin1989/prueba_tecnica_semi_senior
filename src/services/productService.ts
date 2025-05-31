import { Product } from '../types';

/**
 * Servicio para obtener los productos para el slider
 */
export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await import('../mocks/products.json');
    return response.default.products;
  } catch (error) {
    console.error('Error al cargar los productos:', error);
    return [];
  }
};
