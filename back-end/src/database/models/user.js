'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: { 
      type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
  },
  {
    tableName: 'users',
    underscored: true,
    timestamps: false,
  });

  User.associate = (models) => {
    User.hasMany(models.Sale, {
      foreignKey: 'userId',
      as: 'sale',
    });

    User.hasMany(models.Sale, {
      foreignKey: 'sellerId',
      as: 'seller',
    });
  };

  return User;
};