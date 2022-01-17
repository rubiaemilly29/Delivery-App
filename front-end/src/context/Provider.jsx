import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
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
  // const [status, setStatus] = useState('');
  // const [orderId, setOrderId] = useState([]);
  // const [finished, setFinished] = useState(false);

  // const getOrderId = async (id) => {
  //   const { data: order } = await getOrderById(id);
  //   setOrderId(order);
  // };

  const setToken = (token) => {
    localStorage.setItem('user', JSON.stringify(token));
  };

  const history = useHistory();
  const handleClickLogin = async () => {
    if (!email || !password) setErrorMsg(true);
    console.log(history);
    try {
      const { data } = await loginUser({ email, password });
      setToken(data);
      history.push({ pathname: '/customer/products' });
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
    // status,
    // orderId,
    // finished,
    // setFinished,
    // setStatus,
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
