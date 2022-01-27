const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Goal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Goal.belongsTo(
        models.ImprovementPlan,
        {
          foreignKey: 'improvementPlanId',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
      );
      Goal.belongsTo(
        models.User,
        {
          foreignKey: 'userId',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
      );
    }
  }
  Goal.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    goal: {
      type: DataTypes.TEXT('long'),
      allowNull: false,
    },
    dueDate: DataTypes.DATEONLY,
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Goal',
  });
  return Goal;
};
