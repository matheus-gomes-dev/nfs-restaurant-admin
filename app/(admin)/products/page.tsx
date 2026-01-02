import authCheck from "@/app/helpers/authCheck"
import { Product } from "@/types/products"
import ProductList from "@/app/components/ProductList"
import { Divider, Typography } from "@mui/material"
import { redirect } from "next/navigation"

export default async function ProductsPage() {
  const token = await authCheck()
  if (!token) {
    redirect('/')
  }
  const productsResponse = await fetch(`https://nfs-api.onrender.com/products`)
  const products: Product[] = await productsResponse.json()

  const handleUpdateProduct = async (updatedProduct: Product) => {
    'use server';
    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${updatedProduct._id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedProduct)
    })
    if (result.status !== 200) {
      const error = await result.text();
      console.error('Error completing order:', error);
      throw new Error('Error completing order')
    }
  }
  return (
    <>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>Produtos</Typography>
      <Divider />
      <ProductList products={products} onUpdateProduct={handleUpdateProduct}/>
    </>
  )
}