'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn(
      'Questions',
      'weight',
      {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
    );

    await queryInterface.changeColumn(
      'Subquestions',
      'weight',
      {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
    );

    await queryInterface.changeColumn(
      'Scores',
      'score',
      {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn(
      'Questions',
      'weight',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    );

    await queryInterface.changeColumn(
      'Subquestions',
      'weight',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    );

    await queryInterface.changeColumn(
      'Scores',
      'score',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    );
  }
};
