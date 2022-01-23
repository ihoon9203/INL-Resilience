module.exports = {
  up: async (queryInterface) => {
    const answers = [
      [1, 1, null, 'Yes'],
      [1, 2, null, 'Yes'],
      [1, 3, null, 'No'],
      [1, 4, null, 'No'],
      [1, 5, null, 'No'],
      [1, 6, null, 'Yes'],
      [1, 7, null, 'Yes'],
      [1, 8, null, 'No'],
      [1, 9, null, 'Yes'],
      [1, 10, null, 'Yes'],
      [1, 11, null, 'Yes'],
      [1, 12, null, 'No'],
      [1, 13, null, 'Yes'],
      [1, 14, null, 'Yes'],
      [1, 15, null, 'No'],
      [1, 16, null, 'No'],
      [1, 17, null, 'Yes'],
      [1, 19, null, 'No'],
      [1, 20, null, 'Yes'],
      [1, 21, null, 'No'],
      [1, 22, null, 'Yes'],
      [1, 23, null, 'No'],
      [1, 24, null, 'Yes'],
      [1, 25, null, 'Yes'],
      [1, 26, null, 'Yes'],
      [1, 27, null, 'Yes'],
      [1, 28, null, 'No'],
      [1, 29, null, 'No'],
      [1, 30, null, 'Yes'],
      [1, 31, null, 'No'],
      [1, 32, null, 'Yes'],
      [1, 33, null, 'No'],
      [1, 34, null, 'No'],
      [1, 35, null, 'Yes'],
      [1, 36, null, 'Yes'],
      [1, 37, null, 'No'],
      [1, 38, null, 'No'],
      [1, 39, null, 'No'],
      [1, 40, null, 'No'],
      [1, 41, null, 'No'],
      [1, 42, null, 'Yes'],
      [1, 43, null, 'Yes'],
      [1, 44, null, 'No'],
      [1, 45, null, 'No'],
      [1, 46, null, 'Yes'],
      [1, 47, null, 'Yes'],
      [1, 48, null, 'No'],
      [1, null, 1, 'No'],
      [1, null, 2, 'No'],
      [1, null, 3, 'No'],
      [1, null, 4, 'No'],
      [1, null, 5, 'Yes'],
      [1, null, 6, 'Yes'],
      [1, null, 7, 'Yes'],
      [1, null, 8, 'Yes'],
      [1, null, 9, 'No'],
      [1, null, 10, 'Yes'],
      [1, null, 11, 'Yes'],
      [1, null, 12, 'Yes'],
      [1, null, 13, 'No'],
      [1, null, 14, 'No'],
      [1, null, 15, 'Yes'],
      [1, null, 16, 'Yes'],
      [1, null, 17, 'No'],
      [1, null, 18, 'Yes'],
      [1, null, 19, 'Yes'],
      [1, null, 20, 'No'],
      [1, null, 21, 'Yes'],
      [1, null, 22, 'No'],
      [1, null, 23, 'Yes'],
      [1, null, 24, 'Yes'],
      [1, null, 25, 'No'],
      [1, null, 26, 'No'],
      [1, null, 27, 'Yes'],
      [1, null, 28, 'Yes'],
      [1, null, 29, 'Yes'],
      [1, null, 30, 'Yes'],
      [1, null, 31, 'Yes'],
      [1, null, 32, 'Yes'],
      [1, null, 33, 'Yes'],
      [1, null, 34, 'Yes'],
      [1, null, 35, 'No'],
      [1, null, 36, 'No'],
      [1, null, 37, 'Yes'],
      [1, null, 38, 'No'],
      [1, null, 39, 'Yes'],
      [1, null, 40, 'Yes'],
      [1, null, 41, 'No'],
      [1, null, 42, 'Yes'],
      [1, null, 43, 'Yes'],
      [1, null, 44, 'Yes'],
      [1, null, 45, 'No'],
      [1, null, 46, 'Yes'],
      [1, null, 47, 'No'],
      [1, null, 48, 'No'],
      [1, null, 49, 'Yes'],
      [1, null, 50, 'Yes'],
      [1, null, 51, 'Yes'],
      [1, null, 52, 'Yes'],
    ];
    const answerObjectList = [];
    answers.forEach((a) => {
      answerObjectList.push({
        userId: a[0],
        questionId: a[1],
        subquestionId: a[2],
        answer: a[3],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });
    await queryInterface.bulkInsert(
      'Answers',
      answerObjectList,
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Answers', null, {});
  },
};
