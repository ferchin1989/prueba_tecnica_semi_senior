import { FooterData } from '../types';

/**
 * Servicio para obtener los datos del footer
 */
export const getFooterData = async (): Promise<FooterData> => {
  try {
    const response = await import('../mocks/footer.json');
    return response.default;
  } catch (error) {
    console.error('Error al cargar los datos del footer:', error);
    return {
      socialMedia: [],
      customerService: [],
      aboutUs: [],
      legalInfo: [],
      copyright: ''
    };
  }
};
