import React from 'react';
import CardOrder from '../components/CardOrder';
import NavBar from '../components/NavBar';
import { getOrders } from '../services/customer';

const arrayOrder = [
  {
    id: 1,
    delivery_number: 1,
    status: 'pendente',
    sale_data: '08/04/21',
    total_price: 23.80,
    delivery_address: 'rua tatata',
  },
  {
    id: 2,
    delivery_number: 2,
    status: 'entregue',
    sale_data: '08/04/21',
    total_price: 23.80,
    delivery_address: 'rua tatata',
  }];
export default function SellerOrders() {
  const dataOrder = getOrders();
  console.log(dataOrder);
  return (
    <div>
      <NavBar />
      {arrayOrder.map((orderData) => (
        <CardOrder key={ orderData.id } orderData={ orderData } />))}
    </div>
  );
}
