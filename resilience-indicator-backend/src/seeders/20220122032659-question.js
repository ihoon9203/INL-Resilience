module.exports = {
  up: async (queryInterface) => {
    const questions = [
      [1, 21.09, 'Do you have at least 3 months of emergency funds available with at least 7 days of cash on hand?', null],
      [1, 15.91, 'Do you have at least 1 month of emergency funds available with at least 72 hours of cash on hand?', null],
      [2, 7.5, 'Do you know how to contact your insurance company?', 'Your policy may require you to file a claim after an incident.'],
      [2, 4.5, 'Do you know how to contact your mortgage loan servicer if you own a home?', 'There may be options to help you make or change your payments while you have financial difficulties.'],
      [2, 6.9, 'Do you know how to contact your utility company if you own or rent a home?', 'If your home is too damaged to stay in safely, suspend your service so you’re not paying for unused services.'],
      [2, 3, 'Do you know how to contact your auto loan lender if the ability to make payments is affected?', 'They may offer a hardship or forbearance program for extreme circumstances'],
      [2, 6.6, 'Do you know how to contact your credit card companies?', ' Some companies will waive fees or pause monthly payments.'],
      [2, 1.5, 'Do you know how to contact your student loan servicer to request disaster forbearance?', null],
      [3, 8.91, 'Do you have an easily accessible inventory of your financial and banking information?', null],
      [3, 6.93, 'Do you know the steps to take after a disaster to protect your finances?', null],
      [3, 9.57, 'Do you or your beneficiary have estate planning documents such as a will, living will, life insurance policy or health insurance plan?', 'A living will is different than a will. It is a document that lets people state their wishes for end-of-life medical care, in case they become unable to communicate their decisions.'],
      [3, 7.59, 'Do you have a disaster and financial planning checklist for preparedness and recovery?', null],
      [4, 6, 'Do you have an evacuation plan, shelter-in-place plan, and communication plan?', 'Many kinds of emergencies can cause you to have to evacuate. In some cases, you may have a day or two to prepare while other situations might call for an immediate evacuation. Planning is vital to making sure that you can evacuate quickly and safely no matter what the circumstances./n/nSheltering is appropriate when conditions require that you seek protection in your home, where you work or other location when other emergencies arise. The length of time you are required to take shelter may be short, such as during a tornado warning, or during a pandemic./n/Communication networks, such as mobile phones and computers, could be unreliable during disasters, and electricity could be disrupted. Planning in advance will help ensure that all the members of your household – including children and people with disabilities and other with access and functional needs, as well as outside caregivers – know how to reach each other and where to meet up in an emergency.'],
      [4, 1.6, 'Do you have the ability to help others around you in a disaster event?', null],
      [4, 2, 'Do you know first aid and CPR?', null],
      [4, 8, 'Do you have a first-aid kit, three-day survival kit, and car survival kit?', 'After an emergency, you may need to survive on your own for several days. Being prepared means having your own food, water and other supplies to last for several days.'],
      [4, 0.4, 'Do you check your emergency supply kit every six months to ensure the supplies are still up-to-date?', null],
      [4, 12, 'Do you have enough water and means to purify if clean water becomes unavailable?', 'Following a disaster clean drinking water may not be available. Your regular water source could be cut-off or compromised through contamination. Prepare yourself by building a supply of water that will meet your family’s needs during an emergency.'],
      [4, 1.2, 'Do you know how to access government aid after an emergency or disaster?', 'Government programs such as Business Physical Disaster Loans, Casualties, Disasters, and Theft tax relief, and Crisis Counseling Assistance and Training exist to aid people recovering from disastsers.'],
      [4, 4.8, 'Do you have an emergency plan in place for your pets?', null],
      [4, 3.2, 'Do you exercise your emergency plan every 6 months?', null],
      [4, 0.8, 'Have you received training on disaster preparation?', null],
      [5, 8, 'Do you have a backup generator with enough fuel to last several days? ', null],
      [5, 3, 'Do you have alternate plans for refrigerating medicine, food, and other necessities?', null],
      [5, 2, 'Do you have alternative power sources such as portable power banks and charges?', null],
      [5, 1, 'Do you have enough flashlights for every member of the household?', null],
      [5, 6, 'Do you have enough nonperishable food and water to last at least three days?', null],
      [6, 1.05, 'Do you have paper copies of your financial, household, and medical information?', 'Examples of paper copies are: a fireproof and waterproof box or a bank safe deposit box.'],
      [6, 0.45, 'Do you have electronic copies of your financial, household, and medical information?', 'Examples of electronic copies are: a password-protected format on a flash drive, cloud storage, or offsite storage service.'],
      [6, 13.5, 'Do you have property (homeowners or renters), health, life, or hazard insurance?', null],
      [7, 11.25, 'Do you have a plan in place for any vulnerable individuals in your family?', 'A vulnurable individual is any individual, group, or community whose circumstances create barriers to obtaining or understanding information, or the ability to react as the general population.'],
      [7, 5, 'Do you know where to get prenatal care or delivery help in the event a doctor’s office or hospital is closed?', null],
      [7, 8.75, 'Do you have ready-to-feed formula, food for toddlers, or special dietary meals prepared?', null],
      [8, 4, 'Do you believe that you maintain a healthy lifestyle that includes a balance of recommended physical activity and nutritious food choices?', 'Overweight and obesity may raise your risk for certain health problems and may be linked to certain emotional and social problems.'],
      [8, 15, 'Do you feel that you have a comfortable social network that includes neighbors, friends and family that would come to your aid in an emergency?', 'Whether a community is in the path of a natural disaster, the target of an act of terror, or simply striving to meet the demands of increasingly dense urban populations, a community resilience paradigm can help communities and individuals not just to mitigate damage and heal, but to thrive.'],
      [8, 18, 'Do you have access to media sources (television, radio and/or internet) that would alert you of an emergency event that is occurring in your area?', 'When emergencies strike, public safety officials use timely and reliable systems to alert you.'],
      [8, 5, 'Can you safely and efficiently evacuate from your living location by yourself with no assistance?', null],
      [8, 5, 'Are there any individual physical health impairments that prevent you from acting in an emergency situation?', null],
      [8, 1, 'Would you feel comfortable handling anxiety that may be created in an emergency situation?', 'Notice and accept how you feel. Taking care of your emotional health during an emergency will help you think clearly and react to the urgent needs to protect yourself and your family. Self-care during an emergency will help your long-term healing.'],
      [8, 5, 'Are there underlying individual mental health impairments that could result in delays in evacuation?', 'SAMHSA’s National Helpline is a free, confidential, 24/7, 365-day-a-year treatment referral and information service (in English and Spanish) for individuals and families facing mental and/or substance use disorders.'],
      [8, 18, 'Do you know how to prepare and pack your prescription medications that would last 7-10 days?', null],
      [8, 3, 'Do you have a list of medical organizations in your area, including routes to hospitals and emergency centers?', 'Healthcare facilities and their staff play a key role in emergency preparedness and response efforts for all types of events, including natural or man-made disasters, pandemic outbreaks or terrorist attacks. The availability of healthcare services is essential to accommodate the surge in demand that accompanies an emergency or disaster.'],
      [8, 26, 'Do you have an emergency preparedness kit available and ready to be used in an emergency situation', 'Items of inclusion would be food and water to sustain you for 3 days, personal essentials including a change in clothing, medications, electronics including and AM/FM radio, copies of critical documents such as passport, and an adequate supply of cash.'],
      [9, 1.32, 'Do you change the default name of your router?', 'Your home networks might have a range of wireless devices on them — from computers and phones to IP cameras, voice assistants, smart TVs, and connected appliances. Taking some basic steps to secure your home Wi-Fi network will help protect your devices from getting hacked — and your information from getting stolen.'],
      [9, 2.64, 'Do you change the router\'s original password?', null],
      [9, 1.32, 'Do you regularly change your router’s password every three months?', null],
      [9, 1.87, 'Do you regularly update your router’s firmware?', null],
      [9, 1.87, 'Have you installed a network firewall?', null],
      [9, 1.32, 'Do you have a guest network set up?', null],
      [9, 0.66, 'Do you use a third-party ISP (internet service provider) rental modem for your home networking?', null],
      [10, 1.54, 'Are your passwords at least 16 characters long?', null],
      [10, 1.54, 'Do you use upper and lowercase letters, numbers, and special characters?', 'Passwords including personal information are also memorable, but they risk to be guessed by people close to the password owner and attackers that have collected information about the user.'],
      [10, 1.1, 'Are your passwords unique for each account?', null],
      [10, 1.1, 'Are you passwords unique for each device?', null],
      [10, 1.98, 'Do you use dual-factor authorization when available?', null],
      [10, 1.1, 'Do you use unique passwords instead of variations of old ones?', null],
      [10, 1.1, 'Do you regularly change your password every three months?', null],
      [10, 1.54, 'Do you use a password manager?', null],
      [11, 3.74, 'Is your critical data encrypted and password protected?', 'One easy way to help keep your information safe from unauthorized access is to maintain a clear workspace and a clear screen. With the move to a paperless culture, it is essential you are taking the proper precautions to keep your sensitive information secure.'],
      [11, 5.61, 'Do you review your banking and credit reports frequently?', null],
      [11, 7.65, 'Have you installed antivirus or anti-malware protection software on your devices?', 'Antivirus programs help prevent viruses and spyware from infecting a computer, and therefore each computer should have one running at all times.'],
      [12, 1.1, 'Do you delete saved hotspots on your devices?', null],
      [12, 5.5, 'Do you make it a priority to verify the security of all public networks when connecting to them?', null],
      [12, 4.4, 'Do you use a virtual private network?', 'A virtual private network ensures a secure connection, which directs “all network traffic (data, voice, and video) through a secure virtual tunnel between the host device (client) and the virtual private network provider’s servers, and is encrypted'],
      [13, 1.98, 'Do you use a cloud-based firewall?', null],
      [13, 1.98, 'Do you use a commercial home network firewall?', null],
      [13, 2.97, 'Do you keep your devices with sensitive information on a separate network?', null],
      [13, 4.07, 'Do you have automatic updates turned on for antivirus or anti-malware software?', null],
      [14, 3.06, 'Is your data backed up to the cloud?', 'iCloud is the service from Apple that securely stores your personal information.'],
      [14, 3.06, 'Is your data backed up on flash drives or other external drives?', null],
      [14, 4.59, 'Do you test your plan every three months?', null],
      [14, 6.29, 'Do you have automatic security updates turned on for your operating systems, PCs, applications and smart devices?', null],
      [15, 2.86, 'Have you discussed the dangers of malware and how it can be downloaded with your children/elderly?', null],
      [15, 2.86, 'Have you discussed online frauds and scams with your children/elderly?', null],
      [15, 4.18, 'Have you discussed the dangers of online predators with your children?', null],
      [15, 6.6, 'Do you use internet filters?', null],
      [15, 5.5, 'Have you discussed how to properly use social media with your children?', null],
    ];
    const questionObjectList = [];
    questions.forEach((q) => {
      questionObjectList.push({
        subcategoryId: q[0],
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
