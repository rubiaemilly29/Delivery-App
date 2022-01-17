import React, { useEffect, useContext } from 'react';
import Context from '../context/Context';
import NavBar from '../components/NavBar';
import TableOrders from '../components/TableOrder';
import { getOrders } from '../services/customer';

function OrdersCustomer() {
  const { sales, setSales } = useContext(Context);
  const allOrders = async () => {
    const { data } = await getOrders();
    setSales(data);
  };
  useEffect(() => {
    allOrders();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <NavBar />
      { sales.map((item) => (
        <TableOrders user="customer" key={ item.id } item={ item } />
      )) }
    </>
  );
}
export default OrdersCustomer;
