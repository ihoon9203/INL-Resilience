module.exports = {
  up: async (queryInterface) => {
    const settings = [
      'General',
      'Financial',
      'Cyber',
      'Health',
      'Emergency',
    ];
    const notificationSettingsObjectList = [];
    for (let i = 1; i <= 14; i += 1) {
      settings.forEach((s) => {
        notificationSettingsObjectList.push({
          setting: s,
          enabled: s !== 'Emergency',
          userId: i,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      });
    }
    await queryInterface.bulkInsert(
      'NotificationSettings',
      notificationSettingsObjectList,
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('NotificationSettings', null, {});
  },
};
