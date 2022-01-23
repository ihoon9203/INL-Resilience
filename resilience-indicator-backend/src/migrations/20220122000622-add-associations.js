module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'Questions',
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
    await queryInterface.addColumn(
      'Scores',
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
    await queryInterface.addColumn(
      'Scores',
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
    await queryInterface.addColumn(
      'Answers',
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
      'Answers',
      'questionId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Questions',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        defaultValue: null,
      },
    );
    await queryInterface.addColumn(
      'Answers',
      'subquestionId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Subquestions',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        defaultValue: null,
      },
    );
    await queryInterface.addColumn(
      'PossibleAnswers',
      'questionId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Questions',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        defaultValue: null,
      },
    );
    await queryInterface.addColumn(
      'PossibleAnswers',
      'subquestionId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Subquestions',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        defaultValue: null,
      },
    );
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
      },
    );
    await queryInterface.addColumn(
      'CorrectAnswers',
      'questionId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Questions',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        defaultValue: null,
      },
    );
    await queryInterface.addColumn(
      'CorrectAnswers',
      'subquestionId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Subquestions',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        defaultValue: null,
      },
    );
    await queryInterface.addColumn(
      'Subquestions',
      'questionId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Questions',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    );
    await queryInterface.addColumn(
      'Goals',
      'improvementPlanId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'ImprovementPlans',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    );
    await queryInterface.addColumn(
      'Goals',
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
      'Achievements',
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
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn(
      'Questions',
      'surveyId',
    );
    await queryInterface.removeColumn(
      'Scores',
      'surveyId',
    );
    await queryInterface.removeColumn(
      'Scores',
      'userId',
    );
    await queryInterface.removeColumn(
      'ImprovementPlans',
      'surveyId',
    );
    await queryInterface.removeColumn(
      'Answers',
      'userId',
    );
    await queryInterface.removeColumn(
      'Answers',
      'questionId',
    );
    await queryInterface.removeColumn(
      'Answers',
      'subquestionId',
    );
    await queryInterface.removeColumn(
      'PossibleAnswers',
      'questionId',
    );
    await queryInterface.removeColumn(
      'PossibleAnswers',
      'subquestionId',
    );
    await queryInterface.removeColumn(
      'PossibleAnswers',
      'improvmentPlanId',
    );
    await queryInterface.removeColumn(
      'CorrectAnswers',
      'questionId',
    );
    await queryInterface.removeColumn(
      'CorrectAnswers',
      'subquestionId',
    );
    await queryInterface.removeColumn(
      'Subquestions',
      'questionId',
    );
    await queryInterface.removeColumn(
      'Goals',
      'improvementPlanId',
    );
    await queryInterface.removeColumn(
      'Goals',
      'userId',
    );
    await queryInterface.removeColumn(
      'Achievements',
      'userId',
    );
    await queryInterface.removeColumn(
      'ImprovementPlans',
      'userId',
    );
  },
};
