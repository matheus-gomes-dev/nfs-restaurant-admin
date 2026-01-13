import { OrderStatus } from "@/types/orders";

export const shouldRenderOrderCard = (
  currentOrderStatus: OrderStatus,
  selectedOrderStatus: OrderStatus
): boolean => {
  if (selectedOrderStatus === 'aguardando' && currentOrderStatus === 'pagando') return true
  return true;
}