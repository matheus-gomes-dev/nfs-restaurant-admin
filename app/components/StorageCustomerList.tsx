'use client'

import { StorageCustomer } from '@/types/storageCustomer';
import { Grid, Card, CardContent, Typography, TextField, Box, Button } from '@mui/material';
import { useState } from 'react';
import EditStorageCustomerModal from './EditStorageCustomerModal';
import { StorageCustomerResponse } from '../(admin)/storage-customers/page';

interface StorageCustomerListProps {
  storageCustomers: StorageCustomer[];
  onUpdateCustomer: (customer: StorageCustomer) => Promise<StorageCustomerResponse>;
  onCreateCustomer: (customer: Omit<StorageCustomer, '_id' | 'createdAt' | 'updatedAt'>) => Promise<StorageCustomerResponse>;
}

export default function StorageCustomerList({
  storageCustomers = [],
  onUpdateCustomer,
  onCreateCustomer
}: StorageCustomerListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<StorageCustomer | null>(null);
  
  const handleCustomerClick = (customer: StorageCustomer) => {
    setSelectedCustomer(customer);
    setModalOpen(true);
  };

  const handleCreateCustomer = () => {
    setSelectedCustomer(null);
    setModalOpen(true);
  };

  const handleSaveCustomer = async (customer: StorageCustomer): Promise<StorageCustomerResponse> => {
    return selectedCustomer
      ? await onUpdateCustomer(customer)
      : await onCreateCustomer(customer);
  };

  const getDaysSinceLastPayment = (lastPaymentDate: string) => {
    const today = new Date();
    const lastPayment = new Date(lastPaymentDate);
    const diffTime = Math.abs(today.getTime() - lastPayment.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const filteredCustomers = storageCustomers.filter(customer => {
    return customer.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 2, mt: 2, mb: 4 }}>
        <TextField
          fullWidth
          label="Buscar clientes"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button 
          variant="contained" 
          onClick={handleCreateCustomer}
          sx={{ minWidth: 'auto', whiteSpace: 'nowrap' }}
        >
          Novo Cliente
        </Button>
      </Box>
      <Grid container spacing={2}>
        {filteredCustomers.map((customer) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={customer._id}>
            <Card sx={{ cursor: 'pointer' }} onClick={() => handleCustomerClick(customer)}>
              <CardContent>
                <Typography variant="h6" component="h3" gutterBottom>
                  {customer.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Telefone: {customer.phone}
                </Typography>
                {customer.payday && (
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      mt: 1,
                      color: !customer.active ? 'text.secondary' : (getDaysSinceLastPayment(customer.payday) < 30 ? 'green' : 'red')
                    }}
                  >
                    Último pagamento: há {getDaysSinceLastPayment(customer.payday)} dias
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      <EditStorageCustomerModal
        open={modalOpen}
        customer={selectedCustomer}
        onClose={() => {
          setModalOpen(false);
          setSelectedCustomer(null);
        }}
        onSave={handleSaveCustomer}
      />
    </Box>
  );
}