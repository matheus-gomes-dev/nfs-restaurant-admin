'use client'

import { Order, OrderStatus } from "@/types/orders";
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useState } from 'react';
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
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus>('aguardando');
  
  const filteredOrders = orders.filter(order => order.status === selectedStatus);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2, mb: 4 }}>
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
    </Box>
  )
}