const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class EmailNotification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
    }
  }
  EmailNotification.init({
    sent: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    fromEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    setting: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    logoText: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    logoLink: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    buttonLink: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    buttonText: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstParagraph: {
      type: DataTypes.TEXT('long'),
      allowNull: false,
    },
    secondParagraph: {
      type: DataTypes.TEXT('long'),
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'EmailNotification',
  });
  return EmailNotification;
};
