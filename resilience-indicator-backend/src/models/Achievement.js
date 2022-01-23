const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Achievement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Achievement.belongsTo(
        models.User,
        {
          foreignKey: 'userId',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
      );
    }
  }
  Achievement.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    badge: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Achievement',
  });
  return Achievement;
};
