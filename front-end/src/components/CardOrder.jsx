import React from 'react';
import { Link, useHistory } from 'react-router-dom';

function CardOrder(prop) {
  const history = useHistory();
  const { orderData: data } = prop;
  const { location } = history;
  const dataInput = new Date(data.saleDate);

  const dataFormatada = dataInput.toLocaleDateString('pt-BR', { timeZone: 'UTC' });

  const cardOrderClient = (path) => {
    if (location.pathname.includes(path)) {
      const customerProducts = 'customer_products__element-order-date-';

      return (
        <Link
          to={ `/customer/orders/${data.id}` }
        >
          <>
            <p
              id="pedido"
              data-testid={ `${customerProducts}33` }
            >
              Pedido
              <br />
              {data.id}
            </p>
            <p data-testid={ `${customerProducts}34` }>
              {data.status.toUpperCase()}
            </p>
            <p id="data" data-testid={ `${customerProducts}35` }>
              {dataFormatada}
            </p>
            <p id="preco">
              { `R$ ${data.totalPrice}` }
            </p>
          </>
        </Link>
      );
    }
  };

  const cardOrderSeller = (path) => {
    if (location.pathname.includes(path)) {
      const sellerOrders = 'seller_orders__element-order-date-';

      return (
        <Link
          to={ `/seller/orders/${data.id}` }
        >
          <div>
            <p
              id="pedido"
              data-testid={ `${sellerOrders}48` }
            >
              Pedido
              <br />
              {data.id}
            </p>
          </div>
          <div>
            <div data-testid={ `${sellerOrders}49` }>
              {data.status.toUpperCase()}
            </div>
            <div>
              <p id="data" data-testid={ `${sellerOrders}50` }>
                {data.sale_data}
              </p>
              <p id="preco" data-testid={ `${sellerOrders}51` }>
                { data.total_price }
              </p>
            </div>
            <div data-testid={ `${sellerOrders}52` }>
              { data.delivery_address }
            </div>
          </div>
        </Link>
      );
    }
  };

  return (
    <div>
      { cardOrderClient('/customer/orders') }
      {cardOrderSeller('/seller/orders')}
    </div>
  );
}

export default CardOrder;
