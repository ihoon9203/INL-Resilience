module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('EmailNotifications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      sent: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      setting: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fromEmail: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      subject: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      logoText: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      logoLink: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      firstParagraph: {
        type: Sequelize.TEXT('long'),
        allowNull: false,
      },
      secondParagraph: {
        type: Sequelize.TEXT('long'),
        allowNull: false,
      },
      buttonLink: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      buttonText: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('EmailNotifications');
  },
};
