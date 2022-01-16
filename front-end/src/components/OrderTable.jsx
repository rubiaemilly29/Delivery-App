import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function OrderTable(props) {
  const history = useHistory();
  const { location } = history;
  const { products } = props;
  const calcTotal = ({ quantity }, price) => (quantity * price)
    .toFixed(2).replace('.', ',');
  const locationPathname = location.pathname.includes('/seller/orders');
  const idDataTestSeller = ['59', '60', '61', '62', '63'];
  const idDataTestCustomer = ['41', '42', '43', '44', '45'];
  const dataIdCommon = locationPathname ? idDataTestSeller : idDataTestCustomer;
  const dataTestCommon = locationPathname
    ? 'seller_order_details__element-order-details-label'
    : 'customer_order_details__element-order';

  return (
    <>
      <h3>Detalhes do Produto</h3>
      <table>
        <thead>
          <tr>
            <th>oi</th>
          </tr>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
          </tr>
        </thead>
        <tbody>
          { products && products.map((p) => (
            <tr key={ p.name }>
              <td
                data-testid={
                  `${dataTestCommon}-table-item-number-${dataIdCommon[0]}`
                }
              >
                { p.id }
              </td>
              <td
                data-testid={ `${dataTestCommon}-table-name-${dataIdCommon[1]}` }
              >
                { p.name }
              </td>
              <td data-testid={ `${dataTestCommon}-table-quantity-${dataIdCommon[2]}` }>
                {p.salesProducts.quantity}
              </td>
              <td data-testid={ `${dataTestCommon}-table-sub-total-${dataIdCommon[3]}` }>
                {p.price}
              </td>
              <td data-testid={ `${dataTestCommon}-total-price-${dataIdCommon[4]}` }>
                {calcTotal(p.salesProducts, p.price)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

OrderTable.propTypes = {
  products: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
};
