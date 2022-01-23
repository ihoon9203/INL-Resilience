const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class ImprovementPlan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ImprovementPlan.belongsTo(
        models.Survey,
        {
          foreignKey: 'surveyId',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
      );
      ImprovementPlan.hasOne(
        models.Goal,
        {
          foreignKey: 'improvementPlanId',
        },
      );
      ImprovementPlan.hasOne(
        models.PossibleAnswer,
        {
          foreignKey: 'improvementPlanId',
        },
      );
      ImprovementPlan.belongsTo(
        models.User,
        {
          foreignKey: 'userId',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
      );
    }
  }
  ImprovementPlan.init({
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    priority: {
      type: DataTypes.ENUM('High', 'Medium', 'Low'),
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'ImprovementPlan',
  });
  return ImprovementPlan;
};
