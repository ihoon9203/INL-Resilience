const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(
        models.Score,
        {
          foreignKey: 'userId',
        },
      );
      User.hasMany(
        models.Answer,
        {
          foreignKey: 'userId',
        },
      );
      User.hasMany(
        models.Achievement,
        {
          foreignKey: 'userId',
        },
      );
      User.hasMany(
        models.Goal,
        {
          foreignKey: 'userId',
        },
      );
      User.hasMany(
        models.NotificationSetting,
        {
          foreignKey: 'userId',
        },
      );
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    timesVisited: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    resetPasswordToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    resetPasswordExpires: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    emailVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    emailVerifyToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
