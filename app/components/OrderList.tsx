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
  onCompleteOrder, 
  onCancelOrder,
  onAddOrder
}: { 
  orders: Order[];
  products: Product[];
  onCompleteOrder: (orderId: string) => void;
  onCancelOrder: (orderId: string) => void;
  onAddOrder: (order: Omit<Order, '_id' | 'createdAt' | 'updatedAt'>) => void;
}) {
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus>('aguardando');
  const [modalOpen, setModalOpen] = useState(false);
  
  const filteredOrders = orders.filter(order => order.status === selectedStatus);

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
          Adicionar Pedido
        </Button>
      </Box>
      
      {filteredOrders.map((order: Order, index) => (
        <OrderCard 
          key={order._id}
          order={order}
          index={index}
          selectedOrderStatus={selectedStatus}
          onCompleteOrder={onCompleteOrder}
          onCancelOrder={onCancelOrder}
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