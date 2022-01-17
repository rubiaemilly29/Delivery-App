import React, { useState, useEffect } from 'react';
import CardOrder from '../components/CardOrder';
import NavBar from '../components/NavBar';
import { getOrders } from '../services/customer';

// const arrayOrder = [
//   {
//     id: 1,
//     delivery_number: 1,
//     status: 'pendente',
//     sale_data: '08/04/21',
//     total_price: 23.80,
//     delivery_address: 'rua tatata',
//   },
// ];
export default function Orders() {
  const [loading, setLoading] = useState(true);
  const [dataOrder, setDataOrder] = useState('');
  async function customerData() {
    const { data } = await getOrders();
    setDataOrder(data);
    setLoading(false);
  }

  useEffect(() => {
    customerData();
  }, []);

  return (
    <>
      <NavBar />
      {loading ? <h5>Carregando...</h5> : dataOrder.map((orderData) => (
        <CardOrder key={ orderData.id } orderData={ orderData } />))}
    </>
  );
}
