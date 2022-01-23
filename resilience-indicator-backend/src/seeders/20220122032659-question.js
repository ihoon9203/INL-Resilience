module.exports = {
  up: async (queryInterface) => {
    const questions = [
      [1, 1, 'Do you maintain an emergency fund of at least three month\'s expenses?'],
      [1, 1, 'Do you know the organizations that can help you immediately after a disaster for financial assistance?'],
      [1, 1, 'In the event of an evacuation, do you have an easily accessible inventory of your financial and banking information?'],
      [1, 1, 'Do you know the steps to take after a disaster to protect your finances?'],
      [1, 1, 'Do you or your beneficiary have estate planning documents such as a will, living will, life insurance policy or health insurance plan?'],
      [1, 1, 'Do you have a disaster and financial planning checklist for preparedness and recovery?'],
      [2, 1, 'Do you have your (or your family) financial, household, and medical information in a secure but easily accessible location? '],
      [2, 1, 'Do you have property (homeowners or renters), health, life or hazard insurance?'],
      [2, 1, 'Do you have a first-aid kit, three-day survival kit and car survival kit? '],
      [2, 1, 'Do you check your emergency supply kit every six months to ensure the supplies are still up-to-date? '],
      [2, 1, 'Do you have enough water and means to purify if clean water becomes unavailable?'],
      [2, 1, 'Do you have a post-disaster safety and recovery plan?'],
      [2, 1, 'Are you prepared in the events of a power outage?'],
      [2, 1, 'Do you have an individual plan in case of an emergency? '],
      [2, 1, 'Do you have the ability to help others around you in a disaster event?'],
      [2, 1, 'Do you know how to access government aid after an emergency or disaster?'],
      [2, 1, 'Do you have an emergency plan in place for your pets?'],
      [2, 1, 'Do you or your family practice your emergency plan?'],
      [2, 1, 'Have you ever received any training on disaster preparation?'],
      [2, 1, 'Are you or someone in your family considered part of a vulnerable population with special health-care needs?'],
      [2, 1, 'Do you know where to get prenatal care or delivery help if your doctor’s office or hospital is closed?'],
      [2, 1, 'Do you have a plan in order to help your baby sleep safely if you evacuate your home?'],
      [2, 1, 'Do you have ready-to-feed formula available if clean water isn’t available? '],
      [3, 1, 'Do you believe that you maintain a healthy lifestyle that includes a balance of recommended physical activity and nutritious food choices?'],
      [3, 1, 'Do you feel that you have a comfortable social network that includes neighbors, friends and family that would come to your aid in an emergency?'],
      [3, 1, 'Do you have access to media sources (television, radio and/or internet) that would alert you of an emergency event that is occurring in your area?'],
      [3, 1, 'Can you safely and efficiently evacuate from your living location by yourself with no assistance?'],
      [3, 1, 'Are there any individual physical health impairments that prevent you from acting in an emergency situation?'],
      [3, 1, 'Would you feel comfortable handling anxiety that may be created in an emergency situation?'],
      [3, 1, 'Are there underlying individual mental health impairments that could result in delays in evacuation?'],
      [3, 1, 'Do you know how to prepare and pack your prescription medications that would last 7-10 days?'],
      [3, 1, 'Do you have a list of medical organizations in your area, including routes to hospitals and emergency centers?'],
      [3, 1, 'Do you have an emergency preparedness kit available and ready to be used in an emergency situation (items of inclusion would be food and water to sustain you for 3 days, personal essentials including a change in clothing, medications, electronics including and AM/FM radio, copies of critical documents such as passport, and an adequate supply of cash )?'],
      [4, 1, 'Do you have secure internet connection?'],
      [4, 1, 'Are you protecting yourself when using public Wi-Fi?'],
      [4, 1, 'Are you protecting yourself against spyware, malware, and phishing?'],
      [4, 1, 'Have you installed antivirus or anti-malware protection software on your devices?'],
      [4, 1, 'Are you using safe passwords to secure your personal and private accounts?'],
      [4, 1, 'Do you have automatic security updates turned on for your operating systems, PCs, applications and smart devices?'],
      [4, 1, 'Is your data protected on external hard drives, USBs or the cloud?'],
      [4, 1, 'Have you installed antivirus or anti-malware protection software on your devices?'],
      [4, 1, 'Do you have automatic updates turned on for antivirus or anti-malware software?'],
      [4, 1, 'Do you regularly backup your data?'],
      [4, 1, 'Do you have a plan in place to recover your data after an emergency?'],
      [4, 1, 'Are you protecting your smart home user devices?'],
      [4, 1, 'Is your workstation, laptop, or mobile device clear of any high-level protected information?'],
      [4, 1, 'Do you review your banking and credit reports frequently?'],
      [4, 1, 'Are you trained on how to identify internet and social media scams?'],
    ];
    const questionObjectList = [];
    questions.forEach((q) => {
      questionObjectList.push({
        surveyId: q[0],
        weight: q[1],
        question: q[2],
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
