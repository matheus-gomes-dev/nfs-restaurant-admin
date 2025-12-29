import { Order } from "@/types/orders";
import { Card, CardContent, Typography, Chip, Box, Button } from '@mui/material';

export default function OrderList({ orders }: { orders: Order[] }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2, mb: 4 }}>
      {orders.map((order: Order, index) => (
        <Card key={order._id} variant="outlined">
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="h6">Pedido {index + 1}</Typography>
              <Chip 
                label={order.status} 
                color={order.status === 'completa' ? 'success' : order.status === 'aguardando' ? 'warning' : 'default'}
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
            {order.status === 'aguardando' && (
              <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                <Button variant="contained" color="primary" size="small">
                  Concluir
                </Button>
                <Button variant="outlined" color="error" size="small">
                  Cancelar
                </Button>
              </Box>
            )}
          </CardContent>
        </Card>
      ))}
    </Box>
  )
}