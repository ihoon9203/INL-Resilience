module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'PossibleAnswers',
      'improvementPlanId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'ImprovementPlans',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        defaultValue: null,
      },
    );

    await queryInterface.removeColumn(
      'ImprovementPlans',
      'category',
    );

    await queryInterface.removeColumn(
      'ImprovementPlans',
      'userId',
    );

    await queryInterface.addColumn(
      'ImprovementPlans',
      'task',
      {
        type: Sequelize.TEXT('long'),
        allowNull: false,
      },
    );

    await queryInterface.addColumn(
      'Goals',
      'surveyId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Surveys',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'ImprovementPlans',
      'userId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    );

    await queryInterface.addColumn(
      'ImprovementPlans',
      'category',
      {
        type: Sequelize.STRING,
        allowNull: false,
      },
    );

    await queryInterface.removeColumn(
      'ImprovementPlans',
      'task',
    );

    await queryInterface.removeColumn(
      'PossibleAnswers',
      'improvementPlanId',
    );

    await queryInterface.removeColumn(
      'Goals',
      'surveyId',
    );
  },
};
