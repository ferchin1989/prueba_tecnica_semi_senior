import { MenuItem } from '../types';

/**
 * Servicio para obtener los datos del menú principal
 */
export const getMenuItems = async (): Promise<{ menuItems: MenuItem[], bannerText: string }> => {
  try {
    const response = await import('../mocks/menu.json');
    return response.default;
  } catch (error) {
    console.error('Error al cargar los datos del menú:', error);
    return { menuItems: [], bannerText: '' };
  }
};
