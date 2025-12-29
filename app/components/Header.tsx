'use client';

import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { deleteCookie } from 'cookies-next';

export default function Header() {
  const router = useRouter();

  const handleLogout = () => {
    deleteCookie('token');
    router.push('/');
  };

  return (
    <AppBar position="static">
      <Toolbar className='bg-gray-800 text-white'>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          NFS Admin
        </Typography>
        <Button color="inherit" onClick={() => router.push('/dashboard')}>
          Dashboard
        </Button>
        <Button color="inherit" onClick={() => router.push('/orders')}>
          Pedidos
        </Button>
        <Button color="inherit" onClick={() => router.push('/products')}>
          Produtos
        </Button>
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}