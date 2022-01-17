import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function TableOrders(props) {
  const dez = 10;
  const zero = 0;
  const { item, user } = props;
  const { id, status, saleDate, totalPrice } = item;

  const date = saleDate.slice(zero, dez).split('-').reverse().join('/');

  return (
    <Link to={ `/${user}/orders/${id}` }>
      <table>
        <tr>
          <td data-testid={ `${user}_orders__element-order-id-${id}` }>
            {id}
          </td>
          <td data-testid={ `${user}_orders__element-delivery-status-${id}` }>
            {status}
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
