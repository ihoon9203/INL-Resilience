const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Feedback extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Feedback.belongsTo(
        models.FeedbackCategory,
        {
          foreignKey: 'feedbackCategoryId',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
      );
    }
  }
  Feedback.init({
    feedback: {
      type: DataTypes.TEXT('long'),
      allowNull: false,
    },
    resolved: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Feedback',
  });
  return Feedback;
};
