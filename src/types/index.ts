// Tipos para el menú
export interface MenuItem {
  id: number;
  name: string;
  url: string;
  submenus?: Submenu[];
}

export interface Submenu {
  id: number;
  name: string;
  url: string;
  items: SubItem[];
}

export interface SubItem {
  id: number;
  name: string;
  url: string;
}

// Tipos para el footer
export interface SocialMedia {
  id: number;
  name: string;
  url: string;
  icon: string;
}

export interface FooterLink {
  id: number;
  name: string;
  url: string;
}

export interface FooterData {
  socialMedia: SocialMedia[];
  customerService: FooterLink[];
  aboutUs: FooterLink[];
  legalInfo: FooterLink[];
  copyright: string;
}

// Tipos para los productos
export interface Product {
  id: number;
  brand: string;
  title: string;
  price: number;
  image: string;
  tags: string[];
  colors?: string[];
  sizes?: string[];
  description?: string;
  isNew?: boolean;
  images?: string[];
  stock?: number;
}

// Tipo para el carrito
export interface CartItem extends Product {
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}
