import authCheck from "@/app/helpers/authCheck"
import { Divider, Typography } from "@mui/material"
import { redirect } from "next/navigation"
import { StorageCustomer } from "@/types/storageCustomer"
import StorageCustomerList from "@/app/components/StorageCustomerList"

export interface StorageCustomerResponse {
  success: boolean;
  error?: string;
}

export default async function StorageCustomersPage() {
  const token = await authCheck()
  if (!token) {
    redirect('/')
  }
  const storageCustomersResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/storage-customers`,
    {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    }
  )
  const storageCustomers: StorageCustomer[] = await storageCustomersResponse.json()

  const handleUpdateCustomer = async (updatedCustomer: StorageCustomer): Promise<StorageCustomerResponse> => {
    'use server';
    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/storage-customers/${updatedCustomer._id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedCustomer)
    })
    if (result.status !== 200) {
      const error = await result.text();
      console.error('Error updating customer:', error);
      return { success: false, error: 'Error updating customer'};
    }
    return { success: true };
  }

  const handleCreateCustomer = async (newCustomer: Omit<StorageCustomer, '_id' | 'createdAt' | 'updatedAt'>): Promise<StorageCustomerResponse> => {
    'use server';
    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/storage-customers`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newCustomer)
    })
    if (result.status !== 200 && result.status !== 201) {
      const error = await result.text();
      console.error('Error creating customer:', error);
      return { success: false, error: 'Error creating customer'};
    }
    return { success: true };
  }

  return (
    <>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>Guarderia</Typography>
      <Divider />
      <StorageCustomerList
        storageCustomers={storageCustomers}
        onUpdateCustomer={handleUpdateCustomer}
        onCreateCustomer={handleCreateCustomer}
      />
    </>
  )
}