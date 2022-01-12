module.exports = (sequelize, DataTypes) => {
  const SaleProduct = sequelize.define('SaleProduct', {
    quantity: DataTypes.INTEGER,
  },
  {
    tableName: 'sale_products',
    timestamps: false,
  });

  return SaleProduct;
};