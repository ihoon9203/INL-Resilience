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
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    subquestion: {
      type: DataTypes.TEXT('long'),
      allowNull: false,
    },
    information: {
      type: DataTypes.TEXT('long'),
      defaultValue: null,
    }
  }, {
    sequelize,
    modelName: 'Subquestion',
  });
  return Subquestion;
};
