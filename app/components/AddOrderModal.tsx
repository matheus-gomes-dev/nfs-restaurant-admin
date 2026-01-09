'use client'

import { Order, OrderStatus } from "@/types/orders";
import { Product } from "@/types/products";
import { Modal, Box, Typography, TextField, Chip, IconButton, Button } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { useState } from 'react';
import { toast } from "react-toastify";
import { toastConfig } from "@/constants";

interface AddOrderModalProps {
  open: boolean;
  products: Product[];
  onClose: () => void;
  onAddOrder: (order: Omit<Order, '_id' | 'createdAt' | 'updatedAt'>) => void;
}

export default function AddOrderModal({ open, onClose, onAddOrder, products }: AddOrderModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    comment: '',
    items: [] as Product[],
    status: 'aguardando' as OrderStatus
  });
  const [loading, setLoading] = useState(false);
  
  const handleAddProduct = (product: Product) => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, product]
    }));
  };
  
  const handleRemoveProduct = (index: number) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };
  
  const handleSubmit = async () => {
    setLoading(true);
    try {
      await onAddOrder(formData);
      setLoading(false);
      toast.success('Pedido adicionado com sucesso! Atualize para ver o novo pedido.', toastConfig);
      setFormData({ name: '', comment: '', items: [], status: 'aguardando' });
      onClose();
    } catch (error) {
      setLoading(false);
      toast.error('Erro ao adicionar o pedido.', toastConfig);
      console.error('Error adding order:', error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        maxWidth: '90vw',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
        maxHeight: '80vh',
        overflow: 'auto'
      }}>
        <Typography variant="h6" mb={2}>Adicionar Novo Pedido</Typography>
        
        <TextField
          fullWidth
          label="Nome do Cliente"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          sx={{ mb: 2 }}
        />
        
        <TextField
          fullWidth
          label="Comentário (opcional)"
          value={formData.comment}
          onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
          multiline
          rows={2}
          sx={{ mb: 2 }}
        />
        
        <Typography variant="subtitle1" mb={1}>Produtos Disponíveis:</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2, maxHeight: 200, overflow: 'auto' }}>
          {products.map(product => (
            <Chip
              key={product._id}
              label={`${product.name} - R$ ${product.price.toFixed(2)}`}
              onClick={() => handleAddProduct(product)}
              clickable
              icon={<Add />}
            />
          ))}
        </Box>
        
        <Typography variant="subtitle1" mb={1}>Itens do Pedido:</Typography>
        <Box sx={{ mb: 2, maxHeight: 150, overflow: 'auto' }}>
          {formData.items.map((item, index) => (
            <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography>{item.name} - R$ {item.price.toFixed(2)}</Typography>
              <IconButton size="small" onClick={() => handleRemoveProduct(index)}>
                <Remove />
              </IconButton>
            </Box>
          ))}
        </Box>
        
        <Typography variant="h6" mb={2}>
          Total: R$ {formData.items.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <Button onClick={onClose} disabled={loading}>Cancelar</Button>
          <Button 
            variant="contained" 
            onClick={handleSubmit}
            disabled={!formData.name || formData.items.length === 0}
            loading={loading}
          >
            Criar Pedido
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}