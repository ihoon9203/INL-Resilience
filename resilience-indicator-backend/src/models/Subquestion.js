const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Subquestion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Subquestion.belongsTo(
        models.Question,
        {
          foreignKey: 'questionId',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
      );
      Subquestion.hasMany(
        models.PossibleAnswer,
        {
          foreignKey: 'subquestionId',
        },
      );
    }
  }
  Subquestion.init({
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    subquestion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Subquestion',
  });
  return Subquestion;
};
