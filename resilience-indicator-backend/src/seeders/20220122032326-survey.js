module.exports = {
  up: async (queryInterface) => {
    const surveys = [
      ['finance'],
      ['emergency'],
      ['health'],
      ['cyber'],
    ];
    const surveyObjectList = [];
    surveys.forEach((s) => {
      surveyObjectList.push({
        category: s[0],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });
    await queryInterface.bulkInsert(
      'Surveys',
      surveyObjectList,
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Surveys', null, {});
  },
};
