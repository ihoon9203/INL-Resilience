const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Subcategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Subcategory.belongsTo(
        models.Survey,
        {
          foreignKey: 'surveyId',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
      );
      Subcategory.hasMany(models.Question, {
        foreignKey: 'subcategoryId',
      });
    }
  }
  Subcategory.init({
    subcategory: {
      type: DataTypes.TEXT('long'),
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Subcategory',
  });
  return Subcategory;
};
