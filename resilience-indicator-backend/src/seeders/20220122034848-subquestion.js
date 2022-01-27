module.exports = {
  up: async (queryInterface) => {
    const subquestions = [
      [1, 1, 'Do you believe that you maintain a healthy lifestyle that includes a balance of recommended physical activity and nutritious food choices?', null],
      [4, 1, 'Do you feel that you have a comfortable social network that includes neighbors, friends and family that would come to your aid in an emergency?', null],
      [4, 1, 'Do you have access to media sources (television, radio and/or internet) that would alert you of an emergency event that is occurring in your area?', null],
      [4, 1, 'Can you safely and efficiently evacuate from your living location by yourself with no assistance?', null],
      [4, 1, 'Are there any individual physical health impairments that prevent you from acting in an emergency situation?', null],
      [4, 1, 'Would you feel comfortable handling anxiety that may be created in an emergency situation?', null],
      [4, 1, 'Are there underlying individual mental health impairments that could result in delays in evacuation?', null],
      [7, 1, 'Do you have paper copies?', null],
      [7, 1, 'Do you have electronic copies?', null],
      [13, 1, 'Do you have a backup generator with enough fuel to last several days?', null],
      [13, 1, 'Do you have alternate plans for refrigerating medicine, food, and other necessitates?', null],
      [13, 1, 'Do you have alternative power sources such as portable power banks and charges?', null],
      [13, 1, 'Do you have enough flashlights for every member of the household?', null],
      [13, 1, 'Do you have enough nonperishable food and water to last at least three days?', null],
      [14, 1, 'Do you have an evacuation plan?', null],
      [14, 1, 'Do you have a shelter-in-place plan?', null],
      [14, 1, 'Do you have a communication plan?', null],
      [18, 1, 'Do you know first aid?', null],
      [18, 1, 'Do you know CPR?', null],
      [23, 1, 'Do you have a plan in place for the vulnerable individual?', null],
      [34, 1, 'Have you changed the default name of your router?', null],
      [34, 1, 'Have you changed the routers original password?', null],
      [34, 1, 'Do you regularly change your router’s password every three months?', null],
      [34, 1, 'Do you regularly update your router’s firmware?', null],
      [34, 1, 'Have you installed a network firewall?', null],
      [34, 1, 'Do you have a guest network set up?', null],
      [34, 1, 'Do you use a third party ISP (internet service provider) rental modem for your home networking?', null],
      [35, 1, 'Are you aware of open service set identifiers (SSID)?', null],
      [35, 1, 'Do you delete saved hotspots on your devices?', null],
      [35, 1, 'Do you make it a priority to verify the security of all public networks when connecting to them?', null],
      [35, 1, 'Do you use a virtual private network?', null],
      [38, 1, 'Are your passwords at least 16 characters long?', null],
      [38, 1, 'Are you using upper and lowercase letters, numbers and special characters?', null],
      [38, 1, 'Are your passwords unique for each account?', null],
      [38, 1, 'Are your passwords unique for each device?', null],
      [38, 1, 'Are you using dual-factor authorization when available?', null],
      [38, 1, 'Are you using unique passwords instead of variations of old ones?', null],
      [38, 1, 'Are you regularly changing your password every three months?', null],
      [38, 1, 'Are you using a password manager?', null],
      [44, 1, 'Is your data backed up to the cloud?', null],
      [44, 1, 'Is your data backed up on flash drives or other external drives?', null],
      [44, 1, 'Do you test your plan every three months?', null],
      [45, 1, 'Do you use a cloud-based firewall?', null],
      [45, 1, 'Do you use commercial home network firewall?', null],
      [45, 1, 'Do you keep your devices with sensative on a separate network?', null],
      [46, 1, 'Is your information encrypted?', null],
      [46, 1, 'Is your information password protected?', null],
      [48, 1, 'Have you discussed the dangers of malware and how it can be downloaded?', null],
      [48, 1, 'Have you discussed online frauds and scams?', null],
      [48, 1, 'Have you discussed the dangers of online predators?', null],
      [48, 1, 'Have you discussed how to properly use social media?', null],
      [48, 1, 'Are you using internet filters?', null],
    ];
    const subquestionObjectList = [];
    subquestions.forEach((s) => {
      subquestionObjectList.push({
        questionId: s[0],
        weight: s[1],
        subquestion: s[2],
        information: s[3],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });
    await queryInterface.bulkInsert(
      'Subquestions',
      subquestionObjectList,
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Subquestions', null, {});
  },
};
