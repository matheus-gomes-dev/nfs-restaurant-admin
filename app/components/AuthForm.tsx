'use client';

import { useState } from 'react'
import { TextField, Button, Box } from '@mui/material'
import { redirect } from 'next/navigation'
import { setCookie } from 'cookies-next';
import { toast } from 'react-toastify';
import { toastConfig } from '@/constants';

export default function AuthForm() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: usuario, password: senha }),
    })
    setLoading(false)
    if (apiResponse.status === 200) {
      const { token } = await apiResponse.json();
      setCookie('token', token, { path: '/' });
      redirect('/dashboard')
    } else {
      toast.error('Usuário ou senha inválidos!', toastConfig);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      className='w-full'
    >
      <TextField
        placeholder='Usuário'
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
        required
      />
      <TextField
        placeholder='Senha'
        type="password"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        required
      />
      <Button type="submit" variant="contained" disabled={loading}>
        Entrar
      </Button>
    </Box>
  );
}