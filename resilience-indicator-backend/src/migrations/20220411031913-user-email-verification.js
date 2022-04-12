module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'Users',
      'emailVerifyToken',
      {
        type: Sequelize.STRING,
        allowNull: true,
      },
    );

    await queryInterface.addColumn(
      'Users',
      'emailVerified',
      {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    );
  },

  async down(queryInterface) {
    await queryInterface.removeColumn(
      'Users',
      'emailVerifyToken',
    );

    await queryInterface.removeColumn(
      'Users',
      'emailVerified',
    );
  },
};
