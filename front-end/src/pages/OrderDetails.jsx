import React from 'react';
import NavBar from '../components/NavBar';
import OrderTable from '../components/OrderTable';

export default function OrderDetails(props) {
  console.log('esse eh o props ====>', props);
  const products = [{ id: 1, name: 'skol', salesProducts: { quantity: 12 }, price: 5 }];
  return (
    <div>
      <NavBar />
      <OrderTable products={ products } />
    </div>
  );
}
