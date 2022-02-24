module.exports = {
  up: async (queryInterface) => {
    const improvements = [
      ['Start an emergency savings account. Read more about saving for emergencies here: https://www.researchgate.net/publication/268424813_Emergency_funds_and_alternative_forms_of_saving.', 'High', 1],
      ['Start saving up a 1-month budget for emergencies. Read more about saving for emergencies here: https://www.researchgate.net/publication/268424813_Emergency_funds_and_alternative_forms_of_saving.', 'Medium', 1],
      ['Find and save the number of your insurance company.', 'Medium', 1],
      ['Find and save the number or email of your mortgage loan servicer.', 'Medium', 1],
      ['Find and save the number or email of your utility company.', 'Medium', 1],
      ['Find and save the number or email of your auto loan lender.', 'Medium', 1],
      ['Find and save the number or email of your credit card companies.', 'Medium', 1],
      ['Find and save the number or email of your student loan servicer', 'Medium', 1],
      ['Find a safe way that works for you to keep track of your financial and banking information.', 'Medium', 1],
      ['Read about the steps to take after a disaster to protect your finances here: https://www.ready.gov/sites/default/files/2021-01/ready_financial-emergency_info-sheet.pdf.', 'High', 1],
      ['Contact an offical to make a will, living will, life insurance policy, or health insurance plan.', 'High', 1],
      ['Make a disaster plan using this Red Cross e-booklet: https://www.ready.gov/sites/default/files/2021-01/ready_financial-emergency_info-sheet.pdf.', 'Medium', 1],
      ['Create an evacuation plan, shelter-in-place plan, and communication plan using these links: https://www.ready.gov/evacuation, https://www.ready.gov/shelter, https://www.ready.gov/sites/default/files/2021-04/family-emergency-communication-plan.pdf', 'High', 2],
      ['Have plans and supplies for disaster events, and learn how to do first-aid and CPR, and you should be ready to help others in an emergency!', 'High', 2],
      ['Learn how to do first-aid here: https://www.mayoclinic.org/first-aid. \nLearn the steps to CPR here: https://www.redcross.org/take-a-class/cpr/performing-cpr/cpr-steps', 'High', 2],
      ['Build a first-aid kit and car-survival kit by following the steps in these links: https://www.ready.gov/kit and https://www.ready.gov/car. \nUse this checklist to make a three-day survival kit: https://www.aafp.org/dam/AAFP/documents/patient_care/disaster/personal-prep/3-day-checklist.pdf. \n', 'High', 2],
      ['Check your emergency supply kit to ensure everything is up-to-date. Use this link to make sure you have everything you need: https://www.ready.gov/kit', 'High', 2],
      ['Buy a supply of clean water and read about how to purify water here: https://www.ready.gov/water', 'High', 2],
      ['Discover all the government aid provided after an emergency, and know how to access them here: https://www.benefits.gov/categories/Disaster%20Relief', 'High', 2],
      ['Ensure you have supplies for your pets in all of your emergency kits.', 'Medium', 2],
      ['Create and practice an emergency plan with your household. You can get help creating an emergency plan here: https://www.redcross.org/get-help/how-to-prepare-for-emergencies/make-a-plan.html', 'High', 2],
      ['Take disaster preparation training using these links: https://training.fema.gov/is/, https://www.ready.gov/community-preparedness-toolkit, https://www.ready.gov/cert ', 'High', 2],
      ['Buy a backup generator.', 'Low', 2],
      ['Buy a portable refrigerator or a cooler to store necessities that need to stay cold.', 'Low', 2],
      ['Buy a portable charger for your mobile devices and other electronic items', 'Low', 2],
      ['Buy flashlights for every member in your household.', 'Low', 2],
      ['Buy and store at least three-days worth of non-perishable food and water for emergencies. ', 'Low', 2],
      ['Get paper copies of your financial, household, and medical information and store it in a safe place.', 'Low', 2],
      ['Get electronic copies of your financial, household, and medical information and store it in a password-protected format.', 'Low', 2],
      ['Get property, health, life, and hazard insurance.', 'Medium', 2],
      ['Know who the vulnerable individuals are in your family and have a plan in place for them for emergencies.', 'Low', 2],
      ['Find and write down the different options nearby of where to get prenatal care or delivery help.', 'Medium', 2],
      ['Ensure you have food for babies or toddlers prepared for emergencies, as well as any special dietary meals that are needed.', 'Medium', 2],
      ['Eat balanced meals and try to get 30 minutes of physical activity a day. You can read tips on how to live a healthy lifestyle here: https://www.niddk.nih.gov/health-information/weight-management/adult-overweight-obesity/eating-physical-activity.', 'High', 3],
      ['Find a social network/community that you feel comfortable and safe in. Read more here on how to build a resilient community: https://www.annualreviews.org/doi/pdf/10.1146/annurev-publhealth-031914-122829.', 'High', 3],
      ['Ensure you have some kind of media where you can get alerted of emergencies. Find out which sources are available to you here: https://www.ready.gov/alerts.', 'High', 3],
      ['Ensure you have the means to evacuate your household by yourself.', 'Medium', 3],
      ['Find out if you have any major physical health impairments that may prevent you from acting in an emergency here: https://www.health.state.mn.us/diseases/coronavirus/hcp/conditions.html.', 'Medium', 3],
      ['Find ways to handle anxiety in emergency situations. Read some tips here: https://emergency.cdc.gov/coping/selfcare.asp.', 'Medium', 3],
      ['Find out if there are mental health impairments that could prevent you from acting in an emergency. You can seek help here: https://www.samhsa.gov/find-help/national-helpline.', 'Low', 3],
      ['Learn how to prepare and pack your prescription medications for longer periods of time here: https://www.cdc.gov/cpr/npm/npm2019prescriptionsblog.htm.', 'Low', 3],
      ['Know what and where the medical organizations are in your area, like hospitals and emergency centers.', 'Low', 3],
      ['Make an emergency preparedness kit using this checklist: https://www.ready.gov/sites/default/files/2021-02/ready_checklist.pdf', 'High', 3],
      ['Change the name of your default router.', 'High', 4],
      ['Change your router\'s original password.', 'High', 4],
      ['Set up a reminder to change your router\'s password every 3 months.', 'High', 4],
      ['Update your router\'s firmware.', 'High', 4],
      ['Install a network firewall in your computers.', 'High', 4],
      ['Set up a guest network.', 'High', 4],
      ['Get a third-party Internet Service Provider rental modem to use for your home networking.', 'High', 4],
      ['Ensure all your passwords are at least 16 characters long.', 'High', 4],
      ['Ensure all your passwords have upper and lowercase letters, numbers, and special characters.', 'Medium', 4],
      ['Ensure you don\'t have the same password for any account.', 'Medium', 4],
      ['Try to use dual-factor authorization whenever available.', 'Medium', 4],
      ['Ensure all your passwords aren\'t variations of each other.', 'Medium', 4],
      ['Set a reminder to change your password every 3 months.', 'Medium', 4],
      ['Start to use a password manager.', 'Medium', 4],
      ['Encrypt and password protect your critical and personal data.', 'Medium', 4],
      ['Start to frequently review your banking and credit reports.', 'Medium', 4],
      ['Install antivirus of anti-malware protection software on all your devices.', 'Medium', 4],
      ['Delete any saved hotspots on your devices.', 'Medium', 4],
      ['Start verifying the security of a public network before connecting to it.', 'Medium', 4],
      ['Use a virtual private network.', 'Low', 4],
      ['Use a cloud-based firewall.', 'Low', 4],
      ['Use a commercial home network firewall.', 'Low', 4],
      ['Ensure all your devices with sensitive information are on a separate network.', 'Low', 4],
      ['Turn on automatic updates for antivirus or anti-malware software.', 'Low', 4],
      ['Back your data up to the cloud.', 'Low', 4],
      ['Back your data up on flash drives or other external drives.', 'Low', 4],
      ['Set a reminder to test your data plan every 3 months.', 'Low', 4],
      ['Turn on automatic security updates for your devices at home.', 'Low', 4],
      ['Have a discussion about the dangers of malware and how to avoid them with your children and elderly.', 'Low', 4],
      ['Have a discussion about the dangers of online frauds and scams with your children and elderly.', 'Low', 4],
      ['Have a discussion about the dangers of online predators with your children.', 'Low', 4],
      ['Use internet filters on your children\'s devices.', 'Low', 4],
      ['Have a discussion about how to properly use social media with your children.', 'Low', 4],
    ];
    const improvementsObjectList = [];
    improvements.forEach((p) => {
      improvementsObjectList.push({
        task: p[0],
        priority: p[1],
        surveyId: p[2],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });
    await queryInterface.bulkInsert(
      'ImprovementPlans',
      improvementsObjectList,
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('ImprovementPlans', null, {});
  },
};