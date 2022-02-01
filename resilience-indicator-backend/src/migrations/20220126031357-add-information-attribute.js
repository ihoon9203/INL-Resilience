module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'Questions',
      'information',
      {
        type: Sequelize.TEXT('long'),
      },
    );

    await queryInterface.addColumn(
      'Subquestions',
      'information',
      {
        type: Sequelize.TEXT('long'),
      },
    );

    await queryInterface.changeColumn(
      'Goals',
      'goal',
      {
        type: Sequelize.TEXT('long'),
        allowNull: false,
      },
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      'Questions',
      'information',
    );

    await queryInterface.removeColumn(
      'Subquestions',
      'information',
    );

    await queryInterface.changeColumn(
      'Goals',
      'goal',
      {
        type: Sequelize.STRING,
        allowNull: false,
      },
    );
  },
};
