'use strict';

module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: DataTypes.INTEGER,
    seller_id: DataTypes.INTEGER,
    total_price: DataTypes.DECIMAL(9, 2),
    delivery_address: DataTypes.STRING(100),
    delivery_number: DataTypes.STRING(50),
    sale_date: DataTypes.DATE,
    status: DataTypes.STRING(50),
  },
  {
    tableName: 'sales',
    timestamps: false,
  });

  Sale.associate = (models) => {
    Sale.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });

    Sale.belongsTo(models.User, {
      foreignKey: 'seller_id',
      as: 'seller',
    });

    Sale.belongsToMany(models.Product, {
      through: models.SaleProduct, foreignKey: 'sale_id', as: 'products',
    });
  };

  return Sale;
};