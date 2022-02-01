const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Question.belongsTo(
        models.Survey,
        {
          foreignKey: 'surveyId',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
      );
      Question.hasMany(models.Subquestion, {
        foreignKey: 'questionId',
      });
      Question.hasMany(models.PossibleAnswer, {
        foreignKey: 'questionId',
      });
    }
  }
  Question.init({
    weight: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    question: {
      type: DataTypes.TEXT('long'),
      allowNull: false,
    },
    information: {
      type: DataTypes.TEXT('long'),
      defaultValue: null,
    },
  }, {
    sequelize,
    modelName: 'Question',
  });
  return Question;
};
