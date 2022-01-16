module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sales', {
      id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        field: 'user_id',
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      sellerId: {
        type: Sequelize.INTEGER,
        field: 'seller_id',
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      totalPrice: {
        type: Sequelize.DECIMAL(9, 2),
        field: 'total_price',
        allowNull: false,
      },
      deliveryAddress: {
        type: Sequelize.STRING,
        field: 'delivery_address',
        allowNull: false,
      },
      deliveryNumber: {
        type: Sequelize.STRING,
        field: 'delivery_number',
        allowNull: false,
      },
      saleDate: {
        type: Sequelize.DATE,
        field: 'sale_date',
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull:false,
      },
    });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('sales');
  }
};