import moment from 'moment';
import React, { useEffect, useState } from 'react';
/* import PropTypes from 'prop-types'; */
import io from 'socket.io-client';
import NavBar from '../components/NavBar';
import { getOrderById, updateOrder } from '../services/customer';

const socket = io('http://localhost:3001');

function OrderDetails(prop) {
  const [sale, setSale] = useState({});
  const [loading, setLoading] = useState(true);
  const { match: { params: { id } } } = prop;

  socket.on('entregue', (newSale) => {
    console.log(newSale);
    if (newSale !== undefined) setSale(newSale);
  });

  if (sale.sellerId === 2) sale.sellerId = 'Fulana Pereira';
  const handleClick = async (status) => {
    const newSale = { ...sale, status };
    setSale(newSale);
    socket.emit('sale', newSale);
    const newOrder = { id: sale.id, status };
    await updateOrder(newOrder);
  };

  useEffect(() => {
    const getOrder = async () => {
      const order = await getOrderById(id);
      // const dez = 10;
      order.data.saleDate = moment().format('DD/MM/yyyy');
      setSale(order.data);
      setLoading(false);
    };
    setLoading(true);
    getOrder();
  }, [sale.status, id]);

  const { products } = sale;
  const dataTestids = 'seller_order_details__element-order-';
  return loading ? 'Carregando' : (
    <div>
      <NavBar />
      <h3>Detalhes do Pedido</h3>
      <div className="details-info">
        <p data-testid={ `${dataTestids}details-label-order-id` }>
          {`PEDIDO: ${sale.id}`}
        </p>
        <p data-testid={ `${dataTestids}details-label-seller-name` }>
          { sale.sellerId }
        </p>
        <p data-testid={ `${dataTestids}details-label-order-date` }>
          { sale.saleDate }
        </p>
        <p
          data-testid={ `${dataTestids}details-label-delivery-status` }
        >
          { sale.status }
        </p>
        <button
          type="button"
          data-testid="seller_order_details__button-preparing-check"
          disabled={ sale.status !== 'Pendente' }
          onClick={ () => handleClick('Preparando') }
        >
          Preparar pedido
        </button>
        <button
          type="button"
          data-testid="seller_order_details__button-dispatch-check"
          disabled={ sale.status !== 'Preparando' }
          onClick={ () => handleClick('Em Trânsito') }
        >
          Saiu para Entrega
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
          </tr>
        </thead>
        <tbody>
          { products.map(({ name, SaleProduct: { quantity }, price }, index) => {
            const priceTotal = Number(price) * Number(quantity);
            return (
              <tr key={ index }>
                <td
                  data-testid={ `${dataTestids}table-item-number-${index}` }
                >
                  {index + 1}
                </td>
                <td
                  data-testid={ `${dataTestids}table-name-${index}` }
                >
                  {name}
                </td>
                <td
                  data-testid={ `${dataTestids}table-quantity-${index}` }
                >
                  {quantity}
                </td>
                <td
                  data-testid={ `${dataTestids}table-sub-total-${index}` }
                >
                  {`R$ ${price.replace(/\./, ',')}`}
                </td>
                <td
                  data-testid={ `${dataTestids}total-price-${index}` }
                >
                  {`R$ ${priceTotal.toFixed(2)}`}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <h2 data-testid={ `${dataTestids}total-price` }>
        { sale.totalPrice.replace(/\./, ',') }
      </h2>
    </div>
  );
}

/* OrderDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number,
    }),
  }).isRequired,
}; */

export default OrderDetails;
