module.exports = {
  up: async (queryInterface) => {
    const feedback = [
      ['Consider adding a question about pets.', 1, false],
      ['I think there should be more questions about food storage in the emergency survey.', 1, false],
      ['The buttons are too small. Consider making all buttons bigger.', 2, false],
      ['The privacy documents are not viewable.', 3, false],
      ['I just wanted to say great work! I love this app! It is helping me become more resilient.', 4, false],
    ];
    const feedbackObjectList = [];
    feedback.forEach((fc) => {
      feedbackObjectList.push({
        feedback: fc[0],
        feedbackCategoryId: fc[1],
        resolved: fc[2],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });
    await queryInterface.bulkInsert(
      'Feedbacks',
      feedbackObjectList,
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Feedbacks', null, {});
  },
};
