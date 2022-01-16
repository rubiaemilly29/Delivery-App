module.exports = (sequelize, DataTypes) => {
  const SaleProduct = sequelize.define('SaleProduct', {
    quantity: DataTypes.INTEGER,
  },
  {
    tableName: 'salesProducts',
    underscored: true,
    timestamps: false,
  });

  SaleProduct.associate = (models) => {
    models.Sale.belongsToMany(models.Product, {
      through: SaleProduct,
      as: 'product',
      foreignKey: 'saleId',
    });
    models.Product.belongsToMany(models.Sale, {
      through: SaleProduct,
      as: 'sale',
      foreignKey: 'productId',
    });
  };
  
  return SaleProduct;
};