'use client'

import { toastConfig } from '@/constants';
import { StorageCustomer } from '@/types/storageCustomer';
import { Modal, Box, Typography, TextField, Button, FormControlLabel, Checkbox } from '@mui/material';
import Image from 'next/image';
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
  payday: new Date().toISOString().split('T')[0],
  lastPaymentDate: new Date().toISOString().split('T')[0],
  active: true,
};

export default function EditStorageCustomerModal({ open, customer, onClose, onSave }: EditStorageCustomerModalProps) {
  const [formData, setFormData] = useState<StorageCustomer>(customer || formInitialState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData(customer || formInitialState);
  }, [customer]);

  const handleCustomerImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, customerPicture: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEquipmentImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, equipmentPicture: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

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
        maxHeight: '90vh',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
        overflow: 'auto',
      }}>
        <Typography variant="h6" mb={2}>
          {customer?._id ? 'Editar Cliente' : 'Novo Cliente'}
        </Typography>
        <TextField
          fullWidth
          label="Nome"
          value={formData?.name ?? ''}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          sx={{ mb: 2 }}
        />

        <Box sx={{ mb: 2 }}>
          <Button
            variant="outlined"
            component="label"
            fullWidth
          >
            Upload Foto do Cliente
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleCustomerImageUpload}
            />
          </Button>
          {formData?.customerPicture && (
            <Box sx={{ mt: 1, display: 'flex', justifyContent: 'center' }}>
              <Image
                src={formData.customerPicture}
                alt="Customer preview"
                width={100}
                height={60}
              />
            </Box>
          )}
        </Box>
        
        <TextField
          fullWidth
          label="Telefone"
          value={formData?.phone ?? ''}
          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
          sx={{ mb: 2 }}
        />
        
        <Box sx={{ mb: 2 }}>
          <Button
            variant="outlined"
            component="label"
            fullWidth
          >
            Upload Foto do Equipamento
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleEquipmentImageUpload}
            />
          </Button>
          {formData?.equipmentPicture && (
            <Box sx={{ mt: 1, display: 'flex', justifyContent: 'center' }}>
              <Image
                src={formData.equipmentPicture}
                alt="Equipment preview"
                width={100}
                height={60}
              />
            </Box>
          )}
        </Box>
        
        <TextField
          fullWidth
          label="Taxa Mensal (R$)"
          type="number"
          value={formData?.fee ?? 0}
          onChange={(e) => setFormData(prev => ({ ...prev, fee: Number(e.target.value) }))}
          sx={{ mb: 2 }}
        />
        
        <TextField
          fullWidth
          label="Data de Pagamento"
          type="date"
          value={formData?.payday}
          onChange={(e) => setFormData(prev => ({ ...prev, payday: e.target.value }))}
          sx={{ mb: 2 }}
        />
        
        <TextField
          fullWidth
          label="Data do Último Pagamento"
          type="date"
          value={formData?.lastPaymentDate}
          onChange={(e) => setFormData(prev => ({ ...prev, lastPaymentDate: e.target.value }))}
          sx={{ mb: 2 }}
        />
        
        <FormControlLabel
          control={
            <Checkbox
              checked={formData?.active ?? true}
              onChange={(e) => setFormData(prev => ({ ...prev, active: e.target.checked }))}
            />
          }
          label="Cliente Ativo"
          sx={{ mb: 2 }}
        />
        
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <Button onClick={handleClose} disabled={loading}>Cancelar</Button>
          <Button
            variant="contained" 
            onClick={handleSubmit}
            loading={loading}
            disabled={loading || !formData?.name || !formData?.phone || !formData?.payday}
          >
            Salvar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}