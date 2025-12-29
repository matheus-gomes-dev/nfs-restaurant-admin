import { Product } from "./products";

export interface Order {
  _id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  items: Product[];
  comment?: string;
  status: 'aguardando' | 'completa' | 'canceleda';
  total: number;
}