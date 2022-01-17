const express = require('express');
const rescue = require('express-rescue');
const { validateToken } = require('../middlewares/tokenMiddleware');
const { getProducts } = require('../services/products');
const {
  createSale,
  createSaleProduct,
  getSaleById,
  getAllSales,
  updateSale,
} = require('../services/sales');

const customerRouter = express.Router();

customerRouter.get('/products', async (req, res) => {
  try {
    const products = await getProducts();
    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
  }
});

customerRouter.post('/orders', validateToken, async (req, res) => {
  try {
    const { sellerId, totalPrice, deliveryAddress, deliveryNumber, products, status } = req.body;
    const { id } = req.user;
    const newSale = await createSale({
      userId: id,
      sellerId,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
      status,
    });
    // Comments: Chama Service SaleProducts solicitando registro na base dos produtos associados à saleId
    products.forEach(async ({ id: productId, quantity }) => {
      console.log('estou inserindo no banco na tabela salesProducts');
      await createSaleProduct({ saleId: newSale.id, productId, quantity });
    });

    return res.status(201).json(newSale.id);
  } catch (error) {
    // console.log(error);
  }
});

customerRouter.get(
  '/orders/:id',
  rescue(async (req, res) => {
    const { id } = req.params;
    const sale = await getSaleById(id);
    return res.status(200).json(sale);
  }),
);

customerRouter.get('/orders', rescue(async (_req, res) => {
  console.log('estou no controller');
    const orders = await getAllSales();

    return res.status(200).json(orders);
  }),
);

customerRouter.put('/orders/update', rescue(async (req, res) => {
    const { id, status } = req.body;

    await updateSale(id, status);

    res.status(200).json(status);
  }));

module.exports = { customerRouter };
