import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getAllUsers } from '../services/user';
import getProducts from '../services/product';
import Context from './Context';

function Provider({ children }) {
  const [value, setValue] = useState(0);
  const [errorMsg, setErrorMsg] = useState(false);
  const [users, setUsers] = useState([]);
  const [hidden, setHidden] = useState(true);
  const [carrinho, setCarrinho] = useState({});
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

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
    setTotal,
    setHidden,
    setCarrinho,
    setValue,
    setErrorMsg,
    setUsers,
    getUsers,
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
