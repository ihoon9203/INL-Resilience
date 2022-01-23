module.exports = {
  up: async (queryInterface) => {
    const users = [
      ['John@gmail.com', 'password', 1, 1],
      ['Peter@gmail.com', 'password', 0, 2],
      ['Amy@gmail.com', 'password', 0, 3],
      ['Hannah@gmail.com', 'password', 0, 4],
      ['Michael@gmail.com', 'password', 0, 5],
      ['Sandy@gmail.com', 'password', 0, 6],
      ['Betty@gmail.com', 'password', 0, 7],
      ['Richard@gmail.com', 'password', 0, 8],
      ['Susan@gmail.com', 'password', 0, 9],
      ['Vicky@gmail.com', 'password', 0, 10],
      ['Ben@gmail.com', 'password', 0, 11],
      ['William@gmail.com', 'password', 0, 12],
      ['Chuck@gmail.com', 'password', 0, 13],
      ['Viola@gmail.com', 'password', 0, 14],
    ];
    const userObjectList = [];
    users.forEach((u) => {
      userObjectList.push({
        email: u[0],
        password: u[1],
        isAdmin: u[2],
        timesVisited: u[3],
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
