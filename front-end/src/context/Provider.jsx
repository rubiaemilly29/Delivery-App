import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getAllUsers } from '../services/user';
import Context from './Context';

function Provider({ children }) {
  const [value, setValue] = useState(0);
  const [errorMsg, setErrorMsg] = useState(false);
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const { data: allUsers } = await getAllUsers();
    setUsers(allUsers);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const states = {
    value,
    email,
    password,
    errorMsg,
    users,
    setValue,
    setEmail,
    setPassword,
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
