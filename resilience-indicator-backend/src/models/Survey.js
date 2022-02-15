const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Survey extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Survey.hasMany(
        models.Subcategory,
        {
          foreignKey: 'surveyId',
        },
      );
    }
  }
  Survey.init({
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Survey',
  });
  return Survey;
};
