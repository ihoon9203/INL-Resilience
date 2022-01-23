const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class CorrectAnswer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CorrectAnswer.belongsTo(
        models.Question,
        {
          foreignKey: 'questionId',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          defaultValue: null,
        },
      );
      CorrectAnswer.belongsTo(
        models.Subquestion,
        {
          foreignKey: 'subquestionId',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          defaultValue: null,
        },
      );
    }
  }
  CorrectAnswer.init({
    correctAnswer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'CorrectAnswer',
  });
  return CorrectAnswer;
};
