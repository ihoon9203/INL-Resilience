const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Score extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Score.belongsTo(
        models.User,
        {
          foreignKey: 'userId',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
      );
      Score.belongsTo(
        models.Survey,
        {
          foreignKey: 'surveyId',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
      );
    }
  }
  Score.init({
    score: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Score',
  });
  return Score;
};
