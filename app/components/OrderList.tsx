import { Order } from "@/types/orders";
import { Box } from '@mui/material';
import OrderCard from './OrderCard';

export default function OrderList({ 
  orders,
  onCompleteOrder, 
  onCancelOrder 
}: { 
  orders: Order[]; 
  onCompleteOrder: (orderId: string) => void;
  onCancelOrder: (orderId: string) => void;
}) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2, mb: 4 }}>
      {orders.map((order: Order, index) => (
        <OrderCard 
          key={order._id}
          order={order}
          index={index}
          selectedOrderStatus="aguardando"
          onCompleteOrder={onCompleteOrder}
          onCancelOrder={onCancelOrder}
        />
      ))}
    </Box>
  )
}