const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface) => {
    const password = 'password';
    const hashedPassword = await bcrypt.hash(password, 10);
    const users = [
      ['john@mail.com', hashedPassword, 1, 1],
      ['peter@mail.com', hashedPassword, 0, 2],
      ['amy@mail.com', hashedPassword, 0, 3],
      ['hannah@mail.com', hashedPassword, 0, 4],
      ['michael@mail.com', hashedPassword, 0, 5],
      ['sandy@mail.com', hashedPassword, 0, 6],
      ['betty@mail.com', hashedPassword, 0, 7],
      ['richard@mail.com', hashedPassword, 0, 8],
      ['susan@mail.com', hashedPassword, 0, 9],
      ['vicky@mail.com', hashedPassword, 0, 10],
      ['ben@mail.com', hashedPassword, 0, 11],
      ['william@mail.com', hashedPassword, 0, 12],
      ['chuck@mail.com', hashedPassword, 0, 13],
      ['viola@mail.com', hashedPassword, 0, 14],
    ];
    const userObjectList = [];
    users.forEach((u) => {
      userObjectList.push({
        email: u[0],
        password: u[1],
        isAdmin: u[2],
        timesVisited: u[3],
        emailVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });
    await queryInterface.bulkInsert(
      'Users',
      userObjectList,
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
