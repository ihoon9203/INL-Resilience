module.exports = {
  up: async (queryInterface) => {
    const goals = [
      ['Goal 1', 'Take all surveys.', new Date(2023, 0, 1), false, 2, null, null],
      ['Goal 2', 'Get 90 on Financial Survey.', new Date(2023, 1, 1), true, 2, 1, null],
      ['Goal 3', 'Get 100 on Cyber Survey.', new Date(2023, 2, 1), false, 2, 4, null],
      ['Goal 4', 'Get 100 on Emergency Survey.', new Date(2023, 3, 1), false, 2, 2, null],
      ['Goal 5', 'Retake the Public Health Survey.', new Date(2023, 4, 1), true, 2, 3, null],
      ['Goal 6', 'Get at least 70 on all surveys.', new Date(2023, 5, 1), false, 2, null, null],
      ['Goal 7', 'Complete all the high priority tasks in my Financial Improvement plan.', new Date(2023, 6, 1), false, 3, 1, null],
      ['Goal 8', 'Do all the tasks about internet safety with my children.', new Date(2023, 7, 1), false, 3, 4, null],
      ['Goal 9', 'Take all surveys.', new Date(2023, 8, 1), true, 3, null, null],
      ['Goal 10', 'Improve my score on the Financial Survey.', new Date(2023, 9, 1), false, 3, 1, null],
      ['Goal 11', 'Complete improvement plan task.', new Date(2023, 9, 1), false, 4, 1, 1],
      ['Goal 12', 'Complete improvement plan task.', new Date(2023, 9, 1), false, 4, 1, 2],
      ['Goal 13', 'Complete improvement plan task.', new Date(2023, 9, 1), false, 4, 1, 3],
    ];
    const goalObjectList = [];
    goals.forEach((g) => {
      goalObjectList.push({
        title: g[0],
        goal: g[1],
        dueDate: g[2],
        completed: g[3],
        userId: g[4],
        surveyId: g[5],
        improvementPlanId: g[6],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });
    await queryInterface.bulkInsert(
      'Goals',
      goalObjectList,
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Goals', null, {});
  },
};
