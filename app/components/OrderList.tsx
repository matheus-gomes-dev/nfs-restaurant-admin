'use client'

import { Order, OrderStatus } from "@/types/orders";
import { Box, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import { useState } from 'react';
import OrderCard from './OrderCard';
import AddOrderModal from './AddOrderModal';
import { Product } from "@/types/products";

export default function OrderList({ 
  orders,
  products,
  onUpdateOrder, 
  onCancelOrder,
  onDeleteOrder,
  onAddOrder
}: { 
  orders: Order[];
  products: Product[];
  onUpdateOrder: (orderId: string, status: OrderStatus) => Promise<void>;
  onCancelOrder: (orderId: string) => void;
  onDeleteOrder: (orderId: string) => void;
  onAddOrder: (order: Omit<Order, '_id' | 'createdAt' | 'updatedAt'>) => void;
}) {
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus>('aguardando');
  const [modalOpen, setModalOpen] = useState(false);
  
  const filteredOrders = orders
    .filter(order => order.status === selectedStatus || order.status === 'pagando' && selectedStatus === 'aguardando');

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2, mb: 4 }}>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Status do Pedido</InputLabel>
          <Select
            value={selectedStatus}
            label="Status do Pedido"
            onChange={(e) => setSelectedStatus(e.target.value as OrderStatus)}
          >
            <MenuItem value="aguardando">Aguardando</MenuItem>
            <MenuItem value="completa">Completa</MenuItem>
            <MenuItem value="cancelada">Cancelada</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" onClick={() => setModalOpen(true)}>
          Novo Pedido
        </Button>
      </Box>
      
      {filteredOrders.map((order: Order, index) => (
        <OrderCard 
          key={order._id}
          order={order}
          index={index}
          selectedOrderStatus={selectedStatus}
          onUpdateOrder={onUpdateOrder}
          onCancelOrder={onCancelOrder}
          onDeleteOrder={onDeleteOrder}
        />
      ))}
      
      <AddOrderModal 
        open={modalOpen} 
        onClose={() => setModalOpen(false)}
        onAddOrder={onAddOrder}
        products={products}
      />
    </Box>
  )
}