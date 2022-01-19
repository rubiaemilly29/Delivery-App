import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

function TableOrders(props) {
  const [myStatus, setStatus] = useState('');
  const dez = 10;
  const zero = 0;
  const { item, user } = props;
  const { id, status, saleDate, totalPrice } = item;

  socket.on('sale', (newSale) => {
    console.log(newSale);
    if (newSale.id === id) setStatus(newSale.status);
  });

  socket.on('entregue', (newSale) => {
    console.log(newSale);
    if (newSale.id === id) setStatus(newSale.status);
  });

  useEffect(() => {
    setStatus(status);
    console.log(myStatus);
  }, [status]);

  const date = saleDate.slice(zero, dez).split('-').reverse().join('/');

  return (
    <Link to={ `/${user}/orders/${id}` }>
      <table>
        <tr>
          <td data-testid={ `${user}_orders__element-order-id-${id}` }>
            {id}
          </td>
          <td data-testid={ `${user}_orders__element-delivery-status-${id}` }>
            {myStatus}
          </td>
          <td>
            <tr data-testid={ `${user}_orders__element-order-date-${id}` }>
              {date}
            </tr>
            <tr data-testid={ `${user}_orders__element-card-price-${id}` }>
              {`R$${totalPrice.replace(/\./, ',')}`}
            </tr>
          </td>
        </tr>
      </table>
    </Link>
  );
}

TableOrders.propTypes = {
  user: PropTypes.string.isRequired,
  item: PropTypes.shape({
    id: PropTypes.string,
    totalPrice: PropTypes.number,
    status: PropTypes.string,
    saleDate: PropTypes.string,
  }).isRequired,
};

export default TableOrders;
