import React, { useState, useEffect, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import rockGlass from '../images/rockGlass.svg';
import ErrorLogin from '../components/ErrorLogin';
import { loginUser } from '../services/user';
import Context from '../context/Context';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisable, setIsDisable] = useState(true);
  const history = useHistory();
  const { errorMsg, setErrorMsg } = useContext(Context);

  const setToken = (token) => {
    localStorage.setItem('user', JSON.stringify(token));
  };

  const handleClickLogin = async () => {
    if (!email || !password) setErrorMsg(true);
    try {
      const { data } = await loginUser({ email, password });
      setToken(data);
      history.push({ pathname: '/customer/products' });
    } catch (err) {
      console.log(err);
      setErrorMsg(true);
    }
  };

  useEffect(() => {
    const isValid = () => {
      const validEmail = email.match(/^[a-z0-9-_.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/ig);
      const minLength = 6;
      const validPassword = password.length >= minLength;
      if (validEmail) {
        if (validPassword) {
          setIsDisable(false);
        }
      } else {
        setIsDisable(true);
      }
    };
    isValid();
  }, [email, password, setIsDisable]);

  return (
    <>
      <span className="logo">TRYBE</span>
      <object className="rocksGlass" type="image/svg+xml" data={ rockGlass }>
        Glass
      </object>
      <form action="">
        <label htmlFor="loginInput">
          Login
          <input
            type="email"
            name="loginInput"
            placeholder="email@trybeer.com.br"
            data-testid="common_login__input-email"
            onChange={ ({ target }) => setEmail(target.value) }
          />
        </label>
        <label htmlFor="passwordInput">
          Senha
          <input
            type="password"
            name="passwordInput"
            placeholder="***********"
            data-testid="common_login__input-password"
            onChange={ ({ target }) => setPassword(target.value) }
          />
        </label>
        <button
          type="button"
          data-testid="common_login__button-login"
          disabled={ isDisable }
          onClick={ () => handleClickLogin() }
        >
          LOGIN
        </button>
        <button
          type="button"
          data-testid="common_login__button-register"
        >
          <Link to="/register">
            Ainda não tenho conta
          </Link>
        </button>
        { errorMsg ? <ErrorLogin /> : '' }
      </form>
    </>
  );
}

export default Login;
