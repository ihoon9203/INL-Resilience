module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn(
      'Answers',
      'userId',
      {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn(
      'Answers',
      'userId',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    );
  },
};
