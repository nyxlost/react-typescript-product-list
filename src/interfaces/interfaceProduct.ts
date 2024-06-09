export interface Product {
  id: number;
  title: string;
  price: number;
  discountPercentage: number;
  stock: number;
  thumbnail: string;
  rating: number;
  totalPrice?: number;
}

export interface ProductDetail {
  id: number;
  title: string;
  price: number;
  stock: number;
  thumbnail: string;
  images: string[];
}

export interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}
