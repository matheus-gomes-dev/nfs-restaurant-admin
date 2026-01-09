import OrderList from "@/app/components/OrderList"
import authCheck from "@/app/helpers/authCheck"
import { Order } from "@/types/orders"
import { Product } from "@/types/products"
import { Divider, Typography } from "@mui/material"
import { redirect } from "next/navigation"
import _pick from 'lodash/pick';

export default async function OrdersPage() {
  const token = await authCheck()
  if (!token) {
    redirect('/')
  }
  const ordersResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
  const orders: Order[] = await ordersResponse.json()

  const productsResponse = await fetch(`https://nfs-api.onrender.com/products`)
  const productsData = await productsResponse.json()
  const productsList: Product[] = productsData
    .map((product: Product) => _pick(product, ['_id', 'name', 'description', 'price', 'category']))


  const onCompleteOrder = async (orderId: string) => {
    'use server';
    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/${orderId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status: 'completa' })
    })
    if (result.status !== 200) {
      const error = await result.text();
      console.error('Error completing order:', error);
      throw new Error('Error completing order')
    }
  }

  const onCancelOrder = async (orderId: string) => {
    'use server';
    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/${orderId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status: 'cancelada' })
    })
    if (result.status !== 200) {
      const error = await result.text();
      console.error('Error cancelling order:', error);
      throw new Error('Error cancelling order')
    }
  }
  const onAddOrder = async (order: Omit<Order, '_id' | 'createdAt' | 'updatedAt'>) => {
    'use server';
    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...order,
        items: order.items.map(item => item._id)
      })
    })
    if (result.status !== 200 && result.status !== 201) {
      const error = await result.text();
      console.error('Error adding order:', error);
      throw new Error('Error adding order')
    }
  }

  const onDeleteOrder = async (orderId: string) => {
    'use server';
    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/${orderId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
    if (result.status !== 200) {
      const error = await result.text();
      console.error('Error deleting order:', error);
      throw new Error('Error deleting order')
    }
  }

  return (
    <>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>Pedidos</Typography>
      <Divider />
      <OrderList
        orders={orders}
        products={productsList}
        onCompleteOrder={onCompleteOrder}
        onCancelOrder={onCancelOrder}
        onDeleteOrder={onDeleteOrder}
        onAddOrder={onAddOrder}
      />
    </>
  )
}