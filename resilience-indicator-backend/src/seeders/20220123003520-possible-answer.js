module.exports = {
  up: async (queryInterface) => {
    const possibleAnswers = [
      [1, 'Yes'],
      [1, 'No'],
      [1, 'Not applicable'],
      [2, 'Yes'],
      [2, 'No'],
      [2, 'Not applicable'],
      [3, 'Yes'],
      [3, 'No'],
      [3, 'Not applicable'],
      [4, 'Yes'],
      [4, 'No'],
      [4, 'Not applicable'],
      [5, 'Yes'],
      [5, 'No'],
      [5, 'Not applicable'],
      [6, 'Yes'],
      [6, 'No'],
      [6, 'Not applicable'],
      [7, 'Yes'],
      [7, 'No'],
      [7, 'Not applicable'],
      [8, 'Yes'],
      [8, 'No'],
      [8, 'Not applicable'],
      [9, 'Yes'],
      [9, 'No'],
      [9, 'Not applicable'],
      [10, 'Yes'],
      [10, 'No'],
      [10, 'Not applicable'],
      [11, 'Yes'],
      [11, 'No'],
      [11, 'Not applicable'],
      [12, 'Yes'],
      [12, 'No'],
      [12, 'Not applicable'],
      [13, 'Yes'],
      [13, 'No'],
      [13, 'Not applicable'],
      [14, 'Yes'],
      [14, 'No'],
      [14, 'Not applicable'],
      [15, 'Yes'],
      [15, 'No'],
      [15, 'Not applicable'],
      [16, 'Yes'],
      [16, 'No'],
      [16, 'Not applicable'],
      [17, 'Yes'],
      [17, 'No'],
      [17, 'Not applicable'],
      [18, 'Yes'],
      [18, 'No'],
      [18, 'Not applicable'],
      [19, 'Yes'],
      [19, 'No'],
      [19, 'Not applicable'],
      [20, 'Yes'],
      [20, 'No'],
      [20, 'Not applicable'],
      [21, 'Yes'],
      [21, 'No'],
      [21, 'Not applicable'],
      [22, 'Yes'],
      [22, 'No'],
      [22, 'Not applicable'],
      [23, 'Yes'],
      [23, 'No'],
      [23, 'Not applicable'],
      [24, 'Yes'],
      [24, 'No'],
      [24, 'Not applicable'],
      [25, 'Yes'],
      [25, 'No'],
      [25, 'Not applicable'],
      [26, 'Yes'],
      [26, 'No'],
      [26, 'Not applicable'],
      [27, 'Yes'],
      [27, 'No'],
      [27, 'Not applicable'],
      [28, 'Yes'],
      [28, 'No'],
      [28, 'Not applicable'],
      [29, 'Yes'],
      [29, 'No'],
      [29, 'Not applicable'],
      [30, 'Yes'],
      [30, 'No'],
      [30, 'Not applicable'],
      [31, 'Yes'],
      [31, 'No'],
      [31, 'Not applicable'],
      [32, 'Yes'],
      [32, 'No'],
      [32, 'Not applicable'],
      [33, 'Yes'],
      [33, 'No'],
      [33, 'Not applicable'],
      [34, 'Yes'],
      [34, 'No'],
      [34, 'Not applicable'],
      [35, 'Yes'],
      [35, 'No'],
      [35, 'Not applicable'],
      [36, 'Yes'],
      [36, 'No'],
      [36, 'Not applicable'],
      [37, 'Yes'],
      [37, 'No'],
      [37, 'Not applicable'],
      [38, 'Yes'],
      [38, 'No'],
      [38, 'Not applicable'],
      [39, 'Yes'],
      [39, 'No'],
      [39, 'Not applicable'],
      [40, 'Yes'],
      [40, 'No'],
      [40, 'Not applicable'],
      [41, 'Yes'],
      [41, 'No'],
      [41, 'Not applicable'],
      [42, 'Yes'],
      [42, 'No'],
      [42, 'Not applicable'],
      [43, 'Yes'],
      [43, 'No'],
      [43, 'Not applicable'],
      [44, 'Yes'],
      [44, 'No'],
      [44, 'Not applicable'],
      [45, 'Yes'],
      [45, 'No'],
      [45, 'Not applicable'],
      [46, 'Yes'],
      [46, 'No'],
      [46, 'Not applicable'],
      [47, 'Yes'],
      [47, 'No'],
      [47, 'Not applicable'],
      [48, 'Yes'],
      [48, 'No'],
      [48, 'Not applicable'],
      [49, 'Yes'],
      [49, 'No'],
      [49, 'Not applicable'],
      [50, 'Yes'],
      [50, 'No'],
      [50, 'Not applicable'],
      [51, 'Yes'],
      [51, 'No'],
      [51, 'Not applicable'],
      [52, 'Yes'],
      [52, 'No'],
      [52, 'Not applicable'],
      [53, 'Yes'],
      [53, 'No'],
      [53, 'Not applicable'],
      [54, 'Yes'],
      [54, 'No'],
      [54, 'Not applicable'],
      [55, 'Yes'],
      [55, 'No'],
      [55, 'Not applicable'],
      [56, 'Yes'],
      [56, 'No'],
      [56, 'Not applicable'],
      [57, 'Yes'],
      [57, 'No'],
      [58, 'Not applicable'],
      [58, 'Yes'],
      [58, 'No'],
      [59, 'Not applicable'],
      [59, 'Yes'],
      [59, 'No'],
      [59, 'Not applicable'],
      [60, 'Yes'],
      [60, 'No'],
      [60, 'Not applicable'],
      [61, 'Yes'],
      [61, 'No'],
      [61, 'Not applicable'],
      [62, 'Yes'],
      [62, 'No'],
      [62, 'Not applicable'],
      [63, 'Yes'],
      [63, 'No'],
      [63, 'Not applicable'],
      [64, 'Yes'],
      [64, 'No'],
      [64, 'Not applicable'],
      [65, 'Yes'],
      [65, 'No'],
      [65, 'Not applicable'],
      [66, 'Yes'],
      [66, 'No'],
      [66, 'Not applicable'],
      [67, 'Yes'],
      [67, 'No'],
      [67, 'Not applicable'],
      [68, 'Yes'],
      [68, 'No'],
      [68, 'Not applicable'],
      [69, 'Yes'],
      [69, 'No'],
      [69, 'Not applicable'],
      [70, 'Yes'],
      [70, 'No'],
      [70, 'Not applicable'],
      [71, 'Yes'],
      [71, 'No'],
      [71, 'Not applicable'],
      [72, 'Yes'],
      [72, 'No'],
      [72, 'Not applicable'],
      [73, 'Yes'],
      [73, 'No'],
      [73, 'Not applicable'],
      [74, 'Yes'],
      [74, 'No'],
      [74, 'Not applicable'],
      [75, 'Yes'],
      [75, 'No'],
      [75, 'Not applicable'],
      [76, 'Yes'],
      [76, 'No'],
      [76, 'Not applicable'],
      [77, 'Yes'],
      [77, 'No'],
      [77, 'Not applicable'],
    ];
    const possibleAnswerObjectList = [];
    possibleAnswers.forEach((a) => {
      possibleAnswerObjectList.push({
        questionId: a[0],
        possibleAnswer: a[1],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });
    await queryInterface.bulkInsert(
      'PossibleAnswers',
      possibleAnswerObjectList,
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('PossibleAnswers', null, {});
  },
};
