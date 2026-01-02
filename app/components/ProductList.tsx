'use client'

import { Product } from '@/types/products';
import { Grid, Card, CardContent, Typography, TextField, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useState } from 'react';
import EditProductModal from './EditProductModal';

interface ProductListProps {
  products: Product[];
  onUpdateProduct: (product: Product) => void;
}

export default function ProductList({ products, onUpdateProduct }: ProductListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todas');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleSaveProduct = (product: Product) => {
    onUpdateProduct(product);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'todas' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 2, mt: 2, mb: 4 }}>
        <TextField
          fullWidth
          label="Buscar produtos"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Categoria</InputLabel>
          <Select
            value={selectedCategory}
            label="Categoria"
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <MenuItem value="todas">Todas</MenuItem>
            <MenuItem value="lanches">Lanches</MenuItem>
            <MenuItem value="açaí">Açaí</MenuItem>
            <MenuItem value="bebidas">Bebidas</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Grid container spacing={2}>
        {filteredProducts.map((product) => (
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product._id}>
          <Card sx={{ cursor: 'pointer' }} onClick={() => handleProductClick(product)}>
            <CardContent>
              <Typography variant="h6" component="h3" gutterBottom>
                {product.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
              </Typography>
              <Typography variant="h5" color="primary">
                R$ {product.price.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        ))}
      </Grid>
      
      <EditProductModal
        open={modalOpen}
        product={selectedProduct}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveProduct}
      />
    </Box>
  );
}