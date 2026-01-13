'use client';

import { Order, OrderStatus } from "@/types/orders";
import { Card, CardContent, Typography, Chip, Box, Button } from '@mui/material';
import { useState } from 'react';
import { toast } from "react-toastify";
import { shouldRenderOrderCard } from "../helpers/shouldRenderOrderCard";

const statusColors = {
  aguardando: 'warning',
  completa: 'success',
  cancelada: 'error',
  pagando: 'info'
} as const;

export default function OrderCard({ 
  order, 
  index, 
  selectedOrderStatus = 'aguardando',
  onUpdateOrder, 
  onCancelOrder,
  onDeleteOrder
}: { 
  order: Order; 
  index: number;
  selectedOrderStatus: OrderStatus;
  onUpdateOrder: (orderId: string, status: OrderStatus) => Promise<void>;
  onCancelOrder: (orderId: string) => void;
  onDeleteOrder: (orderId: string) => void;
}) {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [loadingCancel, setLoadingCancel] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [orderStatus, setOrderStatus] = useState<OrderStatus>(order.status);

  const handleOrderUpdate = async (id: string, status: OrderStatus) => {
    setLoadingComplete(true);
    try {
      await onUpdateOrder(id, status);
      setLoadingComplete(false);
      setOrderStatus(status);
      toast.success('Status atualizado com sucesso! Se necessário, atualize para recarregar a lista.');
    } catch (error) {
      setLoadingComplete(false);
      toast.error('Erro ao atualizar o status do pedido.');
      console.error(error);
    }
  }

  const handleOrderCancel = async (id: string) => {
    setLoadingCancel(true);
    try {
      await onCancelOrder(id);
      setLoadingCancel(false);
      setOrderStatus('cancelada');
      toast.success('Pedido cancelado com sucesso! Atualize para recarregar a lista.');
    } catch (error) {
      setLoadingCancel(false);
      toast.error('Erro ao cancelar o pedido.');
      console.error(error);
    }
  }

  const handleOrderDelete = async (id: string) => {
    setLoadingDelete(true);
    try {
      await onDeleteOrder(id);
      setLoadingDelete(false);
      toast.success('Pedido excluído com sucesso! Atualize para recarregar a lista.');
    } catch (error) {
      setLoadingDelete(false);
      toast.error('Erro ao excluir o pedido.');
      console.error(error);
    }
  }

  if (!shouldRenderOrderCard(orderStatus, selectedOrderStatus)) {
    return null;
  }

  return (
    <Card key={order._id} variant="outlined">
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="h6">Pedido {index + 1}</Typography>
          <Chip 
            label={orderStatus} 
            color={statusColors[orderStatus]}
            size="small"
          />
        </Box>
        <Typography color="text.secondary" gutterBottom>
          Cliente: {order.name}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>Itens:</Typography>
          {order.items.map((item, itemIndex) => (
            <Typography key={itemIndex} variant="body2" sx={{ ml: 2 }}>
              • {item.name} - R$ {item.price.toFixed(2)}
            </Typography>
          ))}
        </Box>
        {order.comment && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2">Comentário:</Typography>
            <Typography variant="body2" color="text.secondary">
              {order.comment}
            </Typography>
          </Box>
        )}
        <Typography variant="body2" sx={{ mt: 2, fontWeight: 'bold' }} color="primary">
          Total: R$ {order.items.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
        </Typography>
        {orderStatus === 'aguardando' && (
          <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
            <Button 
              variant="contained" 
              color="primary" 
              size="small"
              onClick={() => handleOrderUpdate(order._id, 'pagando')}
              loading={loadingComplete}
              disabled={loadingCancel}
            >
              Entregue
            </Button>
            <Button 
              variant="outlined" 
              color="error" 
              size="small"
              onClick={() => handleOrderCancel(order._id)}
              loading={loadingCancel}
              disabled={loadingComplete}
            >
              Cancelar
            </Button>
          </Box>
        )}
        {orderStatus === 'pagando' && (
          <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
            <Button 
              variant="contained" 
              color="primary" 
              size="small"
              onClick={() => handleOrderUpdate(order._id, 'completa')}
              loading={loadingComplete}
              disabled={loadingCancel}
            >
              Pago
            </Button>
            <Button 
              variant="outlined" 
              color="error" 
              size="small"
              onClick={() => handleOrderCancel(order._id)}
              loading={loadingCancel}
              disabled={loadingComplete}
            >
              Cancelar
            </Button>
          </Box>
        )}
        {(order.status === 'completa' || order.status === 'cancelada') && (
          <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
            <Button 
              variant="outlined" 
              color="error" 
              size="small"
              onClick={() => handleOrderDelete(order._id)}
              loading={loadingDelete}
            >
              Excluir
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  )
}