'use client'

import { toastConfig } from '@/constants';
import { Product } from '@/types/products';
import { Modal, Box, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem, Switch, FormControlLabel } from '@mui/material';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { ProductResponse } from '../(admin)/products/page';

interface EditProductModalProps {
  open: boolean;
  product: Product | null;
  onClose: () => void;
  onSave: (product: Product) => Promise<ProductResponse>;
}

const formInitialState: Product = {
  name: '',
  description: '',
  price: 0,
  cost: 0,
  category: 'lanches',
  imgSrc: '',
  available: true,
};

export default function EditProductModal({ open, product, onClose, onSave }: EditProductModalProps) {
  const [formData, setFormData] = useState<Product>(product || formInitialState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData(product || formInitialState);
  }, [product]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setFormData(prev => ({ ...prev, imgSrc: result }) as Product);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    setLoading(true)
    const payload = product ? { ...product, ...formData } : formData;
    const successStatus = product ? 'atualizado' : 'criado';
    const errorVerb = product ? 'atualizar' : 'criar';
    const saveResult = await onSave(payload as Product);
    setLoading(false)
    if (!saveResult.success) {
      toast.error(`Erro ao ${errorVerb} produto!`, toastConfig);
      return
    }
    toast.success(`Produto ${successStatus} com sucesso! Recarregue para atualizar`, toastConfig);
    onClose();
    setFormData(formInitialState);
  };

  const handleClose = () => {
    onClose()
    setFormData(formInitialState);
  }

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
          value={formData?.name ?? ''}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }) as Product)}
          sx={{ mb: 2 }}
        />
        
        <TextField
          fullWidth
          label="Descrição"
          value={formData?.description ?? ''}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }) as Product)}
          multiline
          rows={3}
          sx={{ mb: 2 }}
        />
        
        <Box sx={{ mb: 2 }}>
          <Button
            variant="outlined"
            component="label"
            fullWidth
          >
            Upload de Imagem
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageUpload}
            />
          </Button>
          {formData?.imgSrc && (
            <Box sx={{ mt: 1, display: 'flex', justifyContent: 'center' }}>
              <Image
                src={formData.imgSrc}
                alt="Image preview"
                width={100}
                height={60}
              />
            </Box>
          )}
        </Box>
        
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <TextField
            label="Preço"
            type="number"
            value={formData?.price ?? 0}
            onChange={(e) => setFormData(prev => ({ ...prev, price: Number(e.target.value) }) as Product)}
          />
          <TextField
            label="Custo"
            type="number"
            value={formData?.cost ?? 0}
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
          <Button onClick={handleClose} disabled={loading}>Cancelar</Button>
          <Button
            variant="contained" 
            onClick={handleSubmit}
            loading={loading}
            disabled={loading || !formData?.name || !formData?.price || !formData?.category}
          >
            Salvar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}