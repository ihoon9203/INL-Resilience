module.exports = {
  up: async (queryInterface) => {
    const scores = [
      [50, 1, 1],
      [70, 1, 2],
      [80, 1, 3],
      [90, 1, 4],
      [0, 2, 1],
      [0, 2, 2],
      [0, 2, 3],
      [0, 2, 4],
      [50, 3, 1],
      [0, 3, 2],
      [90, 3, 3],
      [0, 3, 4],
    ];
    const scoreObjectList = [];
    scores.forEach((s) => {
      scoreObjectList.push({
        score: s[0],
        userId: s[1],
        surveyId: s[2],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });
    await queryInterface.bulkInsert(
      'Scores',
      scoreObjectList,
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Scores', null, {});
  },
};
