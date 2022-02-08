const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Answer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Answer.belongsTo(
        models.User,
        {
          foreignKey: 'userId',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          allowNull: true,
        },
      );
      Answer.belongsTo(
        models.Question,
        {
          foreignKey: 'questionId',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          defaultValue: null,
        },
      );
      Answer.belongsTo(
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
  Answer.init({
    answer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Answer',
  });
  return Answer;
};
