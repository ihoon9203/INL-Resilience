module.exports = {
  up: async (queryInterface) => {
    const feedbackCategories = [
      ['survey-question-suggestion', 'Survey Question Suggestion'],
      ['user-interface-suggestion', 'User Interface Suggestion'],
      ['report-a-bug', 'Report A Bug'],
      ['zzother', 'Other'], // prepend 'zz' because we want this to always sort to last spot
    ];
    const feedbackCategoryObjectList = [];
    feedbackCategories.forEach((fc) => {
      feedbackCategoryObjectList.push({
        feedbackCategoryValue: fc[0],
        feedbackCategoryLabel: fc[1],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });
    await queryInterface.bulkInsert(
      'FeedbackCategories',
      feedbackCategoryObjectList,
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('FeedbackCategories', null, {});
  },
};
