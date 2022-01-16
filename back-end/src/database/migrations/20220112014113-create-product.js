module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      price: {
        type: Sequelize.DECIMAL(4, 2),
        allowNull: false,
      },
      urlImage: {
        type: Sequelize.STRING,
        field: 'url_image',
        allowNull: false,
        defaultValue: '',
      }
    });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('products');
  }
};