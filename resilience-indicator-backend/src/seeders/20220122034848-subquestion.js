module.exports = {
  up: async (queryInterface) => {
    const subquestions = [
      [1, 1, 'Do you believe that you maintain a healthy lifestyle that includes a balance of recommended physical activity and nutritious food choices?'],
      [4, 1, 'Do you feel that you have a comfortable social network that includes neighbors, friends and family that would come to your aid in an emergency?'],
      [4, 1, 'Do you have access to media sources (television, radio and/or internet) that would alert you of an emergency event that is occurring in your area?'],
      [4, 1, 'Can you safely and efficiently evacuate from your living location by yourself with no assistance?'],
      [4, 1, 'Are there any individual physical health impairments that prevent you from acting in an emergency situation?'],
      [4, 1, 'Would you feel comfortable handling anxiety that may be created in an emergency situation?'],
      [4, 1, 'Are there underlying individual mental health impairments that could result in delays in evacuation?'],
      [7, 1, 'Do you have paper copies?'],
      [7, 1, 'Do you have electronic copies?'],
      [13, 1, 'Do you have a backup generator with enough fuel to last several days?'],
      [13, 1, 'Do you have alternate plans for refrigerating medicine, food, and other necessitates?'],
      [13, 1, 'Do you have alternative power sources such as portable power banks and charges?'],
      [13, 1, 'Do you have enough flashlights for every member of the household?'],
      [13, 1, 'Do you have enough nonperishable food and water to last at least three days?'],
      [14, 1, 'Do you have an evacuation plan?'],
      [14, 1, 'Do you have a shelter-in-place plan?'],
      [14, 1, 'Do you have a communication plan?'],
      [18, 1, 'Do you know first aid?'],
      [18, 1, 'Do you know CPR?'],
      [23, 1, 'Do you have a plan in place for the vulnerable individual?'],
      [34, 1, 'Have you changed the default name of your router?'],
      [34, 1, 'Have you changed the routers original password?'],
      [34, 1, 'Do you regularly change your router’s password every three months?'],
      [34, 1, 'Do you regularly update your router’s firmware?'],
      [34, 1, 'Have you installed a network firewall?'],
      [34, 1, 'Do you have a guest network set up?'],
      [34, 1, 'Do you use a third party ISP (internet service provider) rental modem for your home networking?'],
      [35, 1, 'Are you aware of open service set identifiers (SSID)?'],
      [35, 1, 'Do you delete saved hotspots on your devices?'],
      [35, 1, 'Do you make it a priority to verify the security of all public networks when connecting to them?'],
      [35, 1, 'Do you use a virtual private network?'],
      [38, 1, 'Are your passwords at least 16 characters long?'],
      [38, 1, 'Are you using upper and lowercase letters, numbers and special characters?'],
      [38, 1, 'Are your passwords unique for each account?'],
      [38, 1, 'Are your passwords unique for each device?'],
      [38, 1, 'Are you using dual-factor authorization when available?'],
      [38, 1, 'Are you using unique passwords instead of variations of old ones?'],
      [38, 1, 'Are you regularly changing your password every three months?'],
      [38, 1, 'Are you using a password manager?'],
      [44, 1, 'Is your data backed up to the cloud?'],
      [44, 1, 'Is your data backed up on flash drives or other external drives?'],
      [44, 1, 'Do you test your plan every three months?'],
      [45, 1, 'Do you use a cloud-based firewall?'],
      [45, 1, 'Do you use commercial home network firewall?'],
      [45, 1, 'Do you keep your devices with sensative on a separate network?'],
      [46, 1, 'Is your information encrypted?'],
      [46, 1, 'Is your information password protected?'],
      [48, 1, 'Have you discussed the dangers of malware and how it can be downloaded?'],
      [48, 1, 'Have you discussed online frauds and scams?'],
      [48, 1, 'Have you discussed the dangers of online predators?'],
      [48, 1, 'Have you discussed how to properly use social media?'],
      [48, 1, 'Are you using internet filters?'],
    ];
    const subquestionObjectList = [];
    subquestions.forEach((s) => {
      subquestionObjectList.push({
        questionId: s[0],
        weight: s[1],
        subquestion: s[2],
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
