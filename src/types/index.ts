// Product types
export interface Product {
  name: string;
  description: string;
  price: number;
  rating: number;
  image: string;
}

export interface ProductsData {
  bread: Product[];
  pastries: Product[];
  cakes: Product[];
  drinks: Product[];
  sweets?: Product[];
}

// Category types
export interface CategoryItem {
  name: string;
  description: string;
  icon: string;
  items: string[];
}

export interface ProductCategory {
  key: keyof ProductsData;
  name: string;
  icon: string;
  items: Product[];
}

// Outlet types
export interface Outlet {
  name: string;
  address: string;
  hours: string;
  phone?: string;
  lat: number;
  lng: number;
}

// Testimonial types
export interface Testimonial {
  name: string;
  rating: number;
  comment: string;
  date: string;
}

// Navigation types
export interface NavItem {
  name: string;
  id: string;
  href?: string;
}

// Contact types
export interface ContactInfo {
  icon: string;
  title: string;
  content: string | string[];
}