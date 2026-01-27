'use client';

import { AppBar, Toolbar, Button, IconButton, Menu, MenuItem } from '@mui/material';
import {
  LogoutOutlined,
  MenuOutlined,
  DashboardOutlined,
  ShoppingCartOutlined,
  InventoryOutlined,
  SurfingOutlined
} from '@mui/icons-material';
import { useRouter, usePathname } from 'next/navigation';
import { deleteCookie } from 'cookies-next';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleLogout = () => {
    deleteCookie('token');
    router.push('/');
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigation = (path: string) => {
    router.push(path);
    handleMenuClose();
  };

  return (
    <AppBar position="static">
      <Toolbar className='bg-gray-800 text-white'>
        <Link href={'/dashboard'} >
          <Image 
            src="/nfs-logo-removebg.png" 
            alt="Natal Free Surf Logo" 
            width={75}
            height={20}
            className="cursor-pointer ml-2 md:ml-8"
          />
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 ml-auto">
          <div className="relative">
            <Button 
              color="inherit"
              onClick={() => router.push('/dashboard')}
              startIcon={<DashboardOutlined />}
            >
              Dashboard
            </Button>
            {pathname === '/dashboard' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-500"></div>}
          </div>
          <div className="relative">
            <Button 
              color="inherit"
              onClick={() => router.push('/orders')}
              startIcon={<ShoppingCartOutlined />}
            >
              Pedidos
            </Button>
            {pathname === '/orders' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-500"></div>}
          </div>
          <div className="relative">
            <Button 
              color="inherit"
              onClick={() => router.push('/products')}
              startIcon={<InventoryOutlined />}
            >
              Produtos
            </Button>
            {pathname === '/products' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-500"></div>}
          </div>
          <div className="relative">
            <Button 
              color="inherit"
              onClick={() => router.push('/storage-customers')}
              startIcon={<SurfingOutlined />}
            >
              Guarderia
            </Button>
            {pathname === '/storage-customers' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-500"></div>}
          </div>
          <IconButton color="inherit" onClick={handleLogout}>
            <LogoutOutlined />
          </IconButton>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden ml-auto">
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <MenuOutlined />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => handleNavigation('/dashboard')}>
              <DashboardOutlined sx={{ mr: 1 }} /> Dashboard
            </MenuItem>
            <MenuItem onClick={() => handleNavigation('/orders')}>
              <ShoppingCartOutlined sx={{ mr: 1 }} /> Pedidos
            </MenuItem>
            <MenuItem onClick={() => handleNavigation('/products')}>
              <InventoryOutlined sx={{ mr: 1 }} /> Produtos
            </MenuItem>
            <MenuItem onClick={() => handleNavigation('/storage-customers')}>
              <SurfingOutlined sx={{ mr: 1 }} /> Guarderia
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <LogoutOutlined sx={{ mr: 1 }} /> Logout
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
}