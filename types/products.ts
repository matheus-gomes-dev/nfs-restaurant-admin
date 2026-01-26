export interface Product {
  _id?: string;
  name: string;
  description: string;
  price: number;
  cost: number;
  imgSrc: string;
  category: 'lanches' | 'açaí' | 'bebidas';
  updatedAt?: string;
  createdAt?: string;
  available: boolean;
}