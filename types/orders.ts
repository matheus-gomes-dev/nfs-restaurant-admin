import { Product } from "./products";

export type OrderStatus = 'aguardando' | 'completa' | 'cancelada';

export interface Order {
  _id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  items: Product[];
  comment?: string;
  status: OrderStatus;
  total: number;
}