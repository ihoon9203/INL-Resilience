module.exports = {
  up: async (queryInterface) => {
    const questions = [
      [1, 1, 'Do you maintain an emergency fund of at least three month\'s expenses?', null],
      [1, 1, 'Do you know the organizations that can help you immediately after a disaster for financial assistance?', null],
      [1, 1, 'In the event of an evacuation, do you have an easily accessible inventory of your financial and banking information?', null],
      [1, 1, 'Do you know the steps to take after a disaster to protect your finances?', null],
      [1, 1, 'Do you or your beneficiary have estate planning documents such as a will, living will, life insurance policy or health insurance plan?', null],
      [1, 1, 'Do you have a disaster and financial planning checklist for preparedness and recovery?', null],
      [2, 1, 'Do you have your (or your family) financial, household, and medical information in a secure but easily accessible location?', null],
      [2, 1, 'Do you have property (homeowners or renters), health, life or hazard insurance?', null],
      [2, 1, 'Do you have a first-aid kit, three-day survival kit and car survival kit?', null],
      [2, 1, 'Do you check your emergency supply kit every six months to ensure the supplies are still up-to-date?', null],
      [2, 1, 'Do you have enough water and means to purify if clean water becomes unavailable?', null],
      [2, 1, 'Do you have a post-disaster safety and recovery plan?', null],
      [2, 1, 'Are you prepared in the events of a power outage?', null],
      [2, 1, 'Do you have an individual plan in case of an emergency?', null],
      [2, 1, 'Do you have the ability to help others around you in a disaster event?', null],
      [2, 1, 'Do you know how to access government aid after an emergency or disaster?', null],
      [2, 1, 'Do you have an emergency plan in place for your pets?', null],
      [2, 1, 'Do you or your family practice your emergency plan?', null],
      [2, 1, 'Have you ever received any training on disaster preparation?', null],
      [2, 1, 'Are you or someone in your family considered part of a vulnerable population with special health-care needs?', null],
      [2, 1, 'Do you know where to get prenatal care or delivery help if your doctor’s office or hospital is closed?', null],
      [2, 1, 'Do you have a plan in order to help your baby sleep safely if you evacuate your home?', null],
      [2, 1, 'Do you have ready-to-feed formula available if clean water isn’t available? ', null],
      [3, 1, 'Do you believe that you maintain a healthy lifestyle that includes a balance of recommended physical activity and nutritious food choices?', null],
      [3, 1, 'Do you feel that you have a comfortable social network that includes neighbors, friends and family that would come to your aid in an emergency?', null],
      [3, 1, 'Do you have access to media sources (television, radio and/or internet) that would alert you of an emergency event that is occurring in your area?', null],
      [3, 1, 'Can you safely and efficiently evacuate from your living location by yourself with no assistance?', null],
      [3, 1, 'Are there any individual physical health impairments that prevent you from acting in an emergency situation?', null],
      [3, 1, 'Would you feel comfortable handling anxiety that may be created in an emergency situation?', null],
      [3, 1, 'Are there underlying individual mental health impairments that could result in delays in evacuation?', null],
      [3, 1, 'Do you know how to prepare and pack your prescription medications that would last 7-10 days?', null],
      [3, 1, 'Do you have a list of medical organizations in your area, including routes to hospitals and emergency centers?', null],
      [3, 1, 'Do you have an emergency preparedness kit available and ready to be used in an emergency situation (items of inclusion would be food and water to sustain you for 3 days, personal essentials including a change in clothing, medications, electronics including and AM/FM radio, copies of critical documents such as passport, and an adequate supply of cash )?', null],
      [4, 1, 'Do you have secure internet connection?', null],
      [4, 1, 'Are you protecting yourself when using public Wi-Fi?', null],
      [4, 1, 'Are you protecting yourself against spyware, malware, and phishing?', null],
      [4, 1, 'Have you installed antivirus or anti-malware protection software on your devices?', null],
      [4, 1, 'Are you using safe passwords to secure your personal and private accounts?', null],
      [4, 1, 'Do you have automatic security updates turned on for your operating systems, PCs, applications and smart devices?', null],
      [4, 1, 'Is your data protected on external hard drives, USBs or the cloud?', null],
      [4, 1, 'Have you installed antivirus or anti-malware protection software on your devices?', null],
      [4, 1, 'Do you have automatic updates turned on for antivirus or anti-malware software?', null],
      [4, 1, 'Do you regularly backup your data?', null],
      [4, 1, 'Do you have a plan in place to recover your data after an emergency?', null],
      [4, 1, 'Are you protecting your smart home user devices?', null],
      [4, 1, 'Is your workstation, laptop, or mobile device clear of any high-level protected information?', null],
      [4, 1, 'Do you review your banking and credit reports frequently?', null],
      [4, 1, 'Are you trained on how to identify internet and social media scams?', null],
    ];
    const questionObjectList = [];
    questions.forEach((q) => {
      questionObjectList.push({
        surveyId: q[0],
        weight: q[1],
        question: q[2],
        information: q[3],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });
    await queryInterface.bulkInsert(
      'Questions',
      questionObjectList,
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Questions', null, {});
  },
};
