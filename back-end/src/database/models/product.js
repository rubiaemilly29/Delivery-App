'use strict';

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: { 
    type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL(4, 2),
    url_image: DataTypes.STRING,
  },
  {
    tableName: 'products',
    timestamps: false,
  });

  Product.associates = (models) => {
    Product.belongsToMany(models.Sale, {
      through: models.SaleProduct, foreignKey: 'product_id', as: 'sales',
    });
  };

  return Product;
};