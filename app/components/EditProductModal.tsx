'use client'

import { toastConfig } from '@/constants';
import { Product } from '@/types/products';
import { Modal, Box, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem, Switch, FormControlLabel } from '@mui/material';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

interface EditProductModalProps {
  open: boolean;
  product: Product | null;
  onClose: () => void;
  onSave: (product: Product) => void;
}

export default function EditProductModal({ open, product, onClose, onSave }: EditProductModalProps) {
  const [formData, setFormData] = useState<Product | null>(product);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData(product);
  }, [product]);

  const handleSubmit = async () => {
    setLoading(true)
    const payload = product ? { ...product, ...formData } : formData;
    const successStatus = product ? 'atualizado' : 'criado';
    const errorVerb = product ? 'atualizar' : 'criar';
    try {
      await onSave(payload as Product);
      setLoading(false)
      toast.success(`Produto ${successStatus} com sucesso! Recarregue para atualizar`, toastConfig);
      onClose();
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error(`Erro ao ${errorVerb} produto!`, toastConfig);
      setLoading(false)
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        maxWidth: '90vw',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
        maxHeight: '80vh',
        overflow: 'auto'
      }}>
        <Typography variant="h6" mb={2}>
          {product?._id ? 'Editar Produto' : 'Criar Produto'}
        </Typography>
        <TextField
          fullWidth
          label="Nome"
          value={formData?.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }) as Product)}
          sx={{ mb: 2 }}
        />
        
        <TextField
          fullWidth
          label="Descrição"
          value={formData?.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }) as Product)}
          multiline
          rows={3}
          sx={{ mb: 2 }}
        />
        
        <TextField
          fullWidth
          label="URL da Imagem"
          value={formData?.imgSrc}
          onChange={(e) => setFormData(prev => ({ ...prev, imgSrc: e.target.value }) as Product)}
          sx={{ mb: 2 }}
        />
        
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <TextField
            label="Preço"
            type="number"
            value={formData?.price}
            onChange={(e) => setFormData(prev => ({ ...prev, price: Number(e.target.value) }) as Product)}
          />
          <TextField
            label="Custo"
            type="number"
            value={formData?.cost}
            onChange={(e) => setFormData(prev => ({ ...prev, cost: Number(e.target.value) }) as Product)}
          />
        </Box>
        
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Categoria</InputLabel>
          <Select
            value={formData?.category}
            label="Categoria"
            onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }) as Product)}
          >
            <MenuItem value="lanches">Lanches</MenuItem>
            <MenuItem value="açaí">Açaí</MenuItem>
            <MenuItem value="bebidas">Bebidas</MenuItem>
            <MenuItem value="refeições">Refeições</MenuItem>
            <MenuItem value="sobremesas">Sobremesas</MenuItem>
          </Select>
        </FormControl>
        
        <FormControlLabel
          control={
            <Switch
              checked={formData?.available}
              onChange={(e) => setFormData(prev => ({ ...prev, available: e.target.checked }) as Product)}
            />
          }
          label="Disponível"
          sx={{ mb: 2 }}
        />
        
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <Button onClick={onClose} disabled={loading}>Cancelar</Button>
          <Button variant="contained" onClick={handleSubmit} loading={loading}>
            Salvar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}