import React, { useEffect, useContext, useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import Context from '../context/Context';
import CheckoutList from '../components/CheckoutList';
import NavBar from '../components/NavBar';
import { createOrders } from '../services/customer';

function Checkout() {
  const CARRINHO_DE_COMPRAS = 'Carrinho de Compras';
  const { setTotal, total } = useContext(Context);
  const [seller, setSeller] = useState('');
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [orderId, setOrderId] = useState(0);
  const orderLocalStorage = localStorage.getItem(CARRINHO_DE_COMPRAS);
  const ordersObj = JSON.parse(orderLocalStorage);
  const pedidos = Object.entries(ordersObj)
    .map((arr) => ({ id: arr[0], ...arr[1] }));
  const history = useHistory();
  console.log('pedidos:', pedidos);
  const list = () => pedidos.map((item, index) => (
    <tr key={ index } className="total">
      <CheckoutList item={ item } index={ index } />
      <td>
        <button
          type="button"
          data-testid={ `customer_checkout__element-order-table-remove-${index}` }
          onClick={ () => {
            pedidos.splice(index, 1);
            localStorage.setItem(CARRINHO_DE_COMPRAS, JSON.stringify(pedidos));
            history.push({ pathname: '/customer/checkout' });
          } }
        >
          Remover
        </button>
      </td>
    </tr>
  ));

  const newOrders = async ({
    sellerId, totalPrice, deliveryAddress, deliveryNumber, products, status,
  }, token) => {
    const created = await createOrders({
      sellerId, totalPrice, deliveryAddress, deliveryNumber, status, products,
    }, token);
    const { data } = created;
    setOrderId(data);
    return created;
  };

  useEffect(() => {
    if (orderId > 0) setRedirect(true);
  }, [orderId]);

  const finish = async () => {
    const user = localStorage.getItem('user');
    const userObj = JSON.parse(user);
    const { token } = userObj;
    await newOrders({
      sellerId: seller,
      totalPrice: total,
      deliveryAddress: address,
      deliveryNumber: number,
      status: 'Pendente',
      products: pedidos,
    }, token);
  };

  useEffect(() => {
    const orders = Object.values(JSON.parse(localStorage.getItem(CARRINHO_DE_COMPRAS)));
    const sumTotal = () => orders
      .map((item) => Number(item.totalPrice))
      .reduce((acc, curr) => acc + curr, 0)
      .toFixed(2);
    const priceTotal = sumTotal();
    setTotal(priceTotal);
  }, [total, pedidos, setTotal]);

  return (
    <div>
      { redirect && <Redirect to={ `/customer/orders/${orderId}` } /> }
      <NavBar />
      <h1>Finalizar Pedido</h1>
      <table>
        <tr>
          <th>Item</th>
          <th>Descrição</th>
          <th>Quantidade</th>
          <th>Valor Unitário</th>
          <th>Sub-total</th>
          <th>Remover Item</th>
        </tr>
        { list() }
      </table>
      <h2 data-testid="customer_checkout__element-order-total-price">
        R$
        { total.toString().replace(/\./, ',') }
      </h2>
      <h3>Detalhes e Endereço para Entrega</h3>
      <table>
        <tr>
          <th>P. Vendedora Responsável:</th>
          <th>Endereço</th>
          <th>Número</th>
        </tr>
        <tr>
          <select
            name="seller"
            id="seller"
            data-testid="customer_checkout__select-seller"
            onChange={ ({ target }) => { setSeller(target.value); } }
          >
            <option value="">Escolha um vendedor</option>
            <option value="1">Fulana de Tal</option>
            <option value="2">Fulana Pereira</option>
          </select>
          <td>
            <input
              type="text"
              placeholder="Alguma rua, algum bairro"
              data-testid="customer_checkout__input-address"
              onChange={ ({ target }) => { setAddress(target.value); } }
            />
          </td>
          <td>
            <input
              type="text"
              placeholder="123"
              data-testid="customer_checkout__input-addressNumber"
              onChange={ ({ target }) => { setNumber(target.value); } }
            />
          </td>
        </tr>
      </table>
      <button
        type="button"
        data-testid="customer_checkout__button-submit-order"
        onClick={ () => finish() }
      >
        FINALIZAR PEDIDO
      </button>
    </div>
  );
}

export default Checkout;
