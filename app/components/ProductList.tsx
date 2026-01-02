import { Product } from '@/types/products';
import { Grid, Card, CardContent, Typography } from '@mui/material';

interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  return (
    <Grid container spacing={2} sx={{ mt: 1 }} className="mb-4">
      {products.map((product) => (
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product._id}>
          <Card>
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
  );
}