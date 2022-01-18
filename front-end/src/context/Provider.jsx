import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getAllUsers, loginUser } from '../services/user';
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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [sales, setSales] = useState([]);

  const setToken = (token) => {
    localStorage.setItem('user', JSON.stringify(token));
  };

  const handleClickLogin = async (history) => {
    if (!email || !password) setErrorMsg(true);

    try {
      const { data } = await loginUser({ email, password });
      console.log(history);
      if (data.role === 'customer') {
        setToken(data);
        return history.push({ pathname: '/customer/products' });
      }
      if (data.role === 'administrator') {
        setToken(data);
        history.push({ pathname: '/admin/manage' });
      }

      if (data.role === 'seller') {
        console.log('entrou em seller');
        setToken(data);
        console.log(history);
        return history.push({ pathname: '/seller/orders' });
      }
    } catch (err) {
      console.log(err);
      setErrorMsg(true);
    }
  };

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
    email,
    password,
    sales,
    setSales,
    setEmail,
    setPassword,
    setTotal,
    setHidden,
    setCarrinho,
    setValue,
    setErrorMsg,
    setUsers,
    setOrderIdCheckout,
    getUsers,
    handleClickLogin,
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
