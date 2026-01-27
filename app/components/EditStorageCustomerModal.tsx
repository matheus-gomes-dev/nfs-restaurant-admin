'use client'

import { toastConfig } from '@/constants';
import { StorageCustomer } from '@/types/storageCustomer';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { StorageCustomerResponse } from '../(admin)/storage-customers/page';

interface EditStorageCustomerModalProps {
  open: boolean;
  customer: StorageCustomer | null;
  onClose: () => void;
  onSave: (customer: StorageCustomer) => Promise<StorageCustomerResponse>;
}

const formInitialState: StorageCustomer = {
  name: '',
  phone: '',
  fee: 0,
  payday: new Date(),
};

export default function EditStorageCustomerModal({ open, customer, onClose, onSave }: EditStorageCustomerModalProps) {
  const [formData, setFormData] = useState<StorageCustomer>(customer || formInitialState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData(customer || formInitialState);
  }, [customer]);

  const handleSubmit = async () => {
    setLoading(true)
    const payload = customer ? { ...customer, ...formData } : formData;
    const successStatus = customer ? 'atualizado' : 'criado';
    const errorVerb = customer ? 'atualizar' : 'criar';
    const saveResult = await onSave(payload as StorageCustomer);
    setLoading(false)
    if (!saveResult.success) {
      toast.error(`Erro ao ${errorVerb} cliente!`, toastConfig);
      return
    }
    toast.success(`Cliente ${successStatus} com sucesso! Recarregue para atualizar`, toastConfig);
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
      }}>
        <Typography variant="h6" mb={2}>
          {customer?._id ? 'Editar Cliente' : 'Criar Cliente'}
        </Typography>
        <TextField
          fullWidth
          label="Nome"
          value={formData?.name ?? ''}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          sx={{ mb: 2 }}
        />
        
        <TextField
          fullWidth
          label="Telefone"
          value={formData?.phone ?? ''}
          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
          sx={{ mb: 2 }}
        />
        
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <Button onClick={handleClose} disabled={loading}>Cancelar</Button>
          <Button
            variant="contained" 
            onClick={handleSubmit}
            loading={loading}
            disabled={loading || !formData?.name || !formData?.phone}
          >
            Salvar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}