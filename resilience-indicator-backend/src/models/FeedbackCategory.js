const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class FeedbackCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      FeedbackCategory.hasMany(
        models.Feedback,
        {
          foreignKey: 'feedbackCategoryId',
        },
      );
    }
  }
  FeedbackCategory.init({
    feedbackCategoryValue: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    feedbackCategoryLabel: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'FeedbackCategory',
  });
  return FeedbackCategory;
};
