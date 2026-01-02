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
  return (
    <>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>Produtos</Typography>
      <Divider />
      <ProductList products={products} />
    </>
  )
}