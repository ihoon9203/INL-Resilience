module.exports = {
  up: async (queryInterface) => {
    const subcategories = [
      ['Maintaining an emergency fund', 1],
      ['Organizations for Financial Assistance', 1],
      ['Financial preparedness', 1],
      ['Individual/Family Emergency Plan', 2],
      ['Power Outage Preparedness', 2],
      ['Financial, Household, & Medical Information', 2],
      ['New & Expecting Parents', 2],
      ['Public Health', 3],
      ['Internet Connection Security', 4],
      ['Password Protection', 4],
      ['Workstation & High-Level Protection', 4],
      ['Public Wi-Fi Protection', 4],
      ['Smart Home User Protection', 4],
      ['Data Recovery After an Emergency', 4],
      ['Children, Teen & Elderly Internet Safety', 4],
    ];
    const subcategoryObjectList = [];
    subcategories.forEach((s) => {
      subcategoryObjectList.push({
        subcategory: s[0],
        surveyId: s[1],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });
    await queryInterface.bulkInsert(
      'Subcategories',
      subcategoryObjectList,
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Subcategories', null, {});
  },
};
