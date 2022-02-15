module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Subcategories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      subcategory: {
        type: Sequelize.TEXT('long'),
        allowNull: false,
      },
      surveyId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Surveys',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.removeColumn(
      'Questions',
      'surveyId',
    );

    await queryInterface.addColumn(
      'Questions',
      'subcategoryId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Subcategories',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    );

    await queryInterface.removeColumn(
      'Answers',
      'subquestionId',
    );

    await queryInterface.removeColumn(
      'CorrectAnswers',
      'subquestionId',
    );

    await queryInterface.removeColumn(
      'PossibleAnswers',
      'subquestionId',
    );

    await queryInterface.dropTable('Subquestions');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Subcategories');

    await queryInterface.createTable('Subquestions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      weight: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      subquestion: {
        type: Sequelize.TEXT('long'),
        allowNull: false,
      },
      questionId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Questions',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

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

    await queryInterface.removeColumn(
      'Questions',
      'subcategoryId',
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

    await querInterface.addColumn(
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
  },
};
