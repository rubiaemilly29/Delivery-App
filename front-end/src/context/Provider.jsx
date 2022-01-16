import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getAllUsers } from '../services/user';
import getProducts from '../services/product';
// import { getOrderById } from '../services/customer';
import Context from './Context';

function Provider({ children }) {
  const [value, setValue] = useState(0);
  const [errorMsg, setErrorMsg] = useState(false);
  const [users, setUsers] = useState([]);
  const [hidden, setHidden] = useState(true);
  const [carrinho, setCarrinho] = useState({});
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [orderIdCheckout, setOrderIdCheckout] = useState(0);
  // const [status, setStatus] = useState('');
  // const [orderId, setOrderId] = useState([]);
  // const [finished, setFinished] = useState(false);

  // const getOrderId = async (id) => {
  //   const { data: order } = await getOrderById(id);
  //   setOrderId(order);
  // };

  const getAllProducts = async () => {
    const { data: allProducts } = await getProducts();
    setProducts(allProducts);
  };

  const getUsers = async () => {
    const { data: allUsers } = await getAllUsers();
    setUsers(allUsers);
  };

  useEffect(() => {
    getAllProducts();
    getUsers();
  }, []);

  const states = {
    value,
    errorMsg,
    users,
    products,
    carrinho,
    total,
    hidden,
    orderIdCheckout,
    // status,
    // orderId,
    // finished,
    // setFinished,
    // setStatus,
    setTotal,
    setHidden,
    setCarrinho,
    setValue,
    setErrorMsg,
    setUsers,
    setOrderIdCheckout,
    getUsers,
    // getOrderId,
  };

  return (
    <Context.Provider value={ states }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Provider;
