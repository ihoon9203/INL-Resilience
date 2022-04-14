module.exports = {
  up: async (queryInterface) => {
    const emailNotifications = [
      ['resilience@inl.gov', 'General', 'General Resilience Updates', 'INL Resilience', 'https://resilience.inl.gov/', 'Resilience Updates!', 'http://ec2-3-23-105-118.us-east-2.compute.amazonaws.com/', 'Update your resilience score!', 'We have made some updates to our general resilience survey which may affect your resilience score. To ensure your resilience score is up-to-date and accurate, please consider coming back to our application and retaking the survey!', 'These updates are normal and will continue to happen. This is how INL ensures that their Resilience Indicator application stays up-to-date and gives out accurate resilience scores as the world changes.'],
      ['resilience@inl.gov', 'Emergency', 'Emergency Resilience Updates', 'INL Resilience', 'https://resilience.inl.gov/', 'Resilience Updates!', 'http://ec2-3-23-105-118.us-east-2.compute.amazonaws.com/', 'Update your resilience score!', 'We have made some updates to our emergency resilience survey which may affect your resilience score. To ensure your resilience score is up-to-date and accurate, please consider coming back to our application and retaking the survey!', 'These updates are normal and will continue to happen. This is how INL ensures that their Resilience Indicator application stays up-to-date and gives out accurate resilience scores as the world changes.'],
      ['resilience@inl.gov', 'Cyber', 'Cyber Resilience Updates', 'INL Resilience', 'https://resilience.inl.gov/', 'Resilience Updates!', 'http://ec2-3-23-105-118.us-east-2.compute.amazonaws.com/', 'Update your resilience score!', 'We have made some updates to our cyber resilience survey which may affect your resilience score. To ensure your resilience score is up-to-date and accurate, please consider coming back to our application and retaking the survey!', 'These updates are normal and will continue to happen. This is how INL ensures that their Resilience Indicator application stays up-to-date and gives out accurate resilience scores as the world changes.'],
      ['resilience@inl.gov', 'Financial', 'Financial Resilience Updates', 'INL Resilience', 'https://resilience.inl.gov/', 'Resilience Updates!', 'http://ec2-3-23-105-118.us-east-2.compute.amazonaws.com/', 'Update your resilience score!', 'We have made some updates to our financial resilience survey which may affect your resilience score. To ensure your resilience score is up-to-date and accurate, please consider coming back to our application and retaking the survey!', 'These updates are normal and will continue to happen. This is how INL ensures that their Resilience Indicator application stays up-to-date and gives out accurate resilience scores as the world changes.'],
      ['resilience@inl.gov', 'Health', 'Health Resilience Updates', 'INL Resilience', 'https://resilience.inl.gov/', 'Resilience Updates!', 'http://ec2-3-23-105-118.us-east-2.compute.amazonaws.com/', 'Update your resilience score!', 'We have made some updates to our health resilience survey which may affect your resilience score. To ensure your resilience score is up-to-date and accurate, please consider coming back to our application and retaking the survey!', 'These updates are normal and will continue to happen. This is how INL ensures that their Resilience Indicator application stays up-to-date and gives out accurate resilience scores as the world changes.'],
    ];
    const emailNotificationList = [];
    emailNotifications.forEach((e) => {
      emailNotificationList.push({
        sent: false,
        fromEmail: e[0],
        setting: e[1],
        subject: e[2],
        logoText: e[3],
        logoLink: e[4],
        title: e[5],
        buttonLink: e[6],
        buttonText: e[7],
        firstParagraph: e[8],
        secondParagraph: e[9],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });
    await queryInterface.bulkInsert(
      'EmailNotifications',
      emailNotificationList,
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('EmailNotifications', null, {});
  },
};
