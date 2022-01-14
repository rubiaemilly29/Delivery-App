module.exports = (sequelize, DataTypes) => {
  const SaleProduct = sequelize.define('SaleProduct', {
    quantity: DataTypes.INTEGER,
  },
  {
    tableName: 'sales_products',
    underscored: true,
    timestamps: false,
  });

  return SaleProduct;
};