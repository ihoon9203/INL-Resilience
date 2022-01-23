const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class PossibleAnswer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PossibleAnswer.belongsTo(
        models.Question,
        {
          foreignKey: 'questionId',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          defaultValue: null,
        },
      );
      PossibleAnswer.belongsTo(
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
  PossibleAnswer.init({
    possibleAnswer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'PossibleAnswer',
  });
  return PossibleAnswer;
};
