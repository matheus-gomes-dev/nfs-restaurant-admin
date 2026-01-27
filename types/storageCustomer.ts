export interface StorageCustomer {
  _id?: string;
  name: string;
  phone: string;
  fee: number;
  payday: string;
  lastPaymentDate: string;
  customerPicture?: string;
  equipmentPicture?: string;
  active?: boolean;
  updatedAt?: string;
  createdAt?: string;
}