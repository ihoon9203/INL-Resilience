const request = require('supertest');
const app = require('../app');
const pjson = require('../../package.json');
const sequelize = require('../models');
const sessionStore = require('../auth/sessionStore');

const { User, Score } = sequelize.models;
const superUser = {
  username: 'superuser@mail.com',
  password: 'password',
};
let cookie = '';

beforeAll(async () => {
  // setup superuser for authenticated endpoints
  const newSuperUser = await new User({
    email: superUser.username,
    password: '$2a$10$frnYnKlcC8X1c2tM9QwateCsRRVcL4a/cf15Lfc0SHKXI/eMrJ9Cu',
    isAdmin: 0,
    timesVisited: 1,
  });
  await newSuperUser.save();

  const res = await request(app)
    .post('/api/login')
    .send(superUser);

  // user cookie in authenticated requests
  cookie = res.headers['set-cookie'];
});

afterAll(async () => {
  // delete test user
  await User.destroy({
    where: { email: 'test@mail.com' },
  });

  // delete superuser
  await User.destroy({
    where: { email: 'superuser@mail.com' },
  });

  await sequelize.close();
  await sessionStore.close();
});

describe('Test info API endpoints', () => {
  test('GET welcome message', () => request(app)
    .get('/api/')
    .then((response) => {
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe('Welcome to the Resilience Indicator API!');
    }));

  test('GET version', () => request(app)
    .get('/api/version')
    .then((response) => {
      expect(response.statusCode).toBe(200);
      expect(response.body.version).toBe(pjson.version);
    }));
});

describe('Test survey API endpoints', () => {
  test('GET survey-questions for existing category', async () => {
    await request(app)
      .get('/api/survey-questions/health')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.Questions.length).toBeGreaterThan(0);
      });
  });

  test('GET survey-questions for non-existing category', async () => {
    await request(app)
      .get('/api/survey-questions/test')
      .then((response) => {
        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual({}); // ensure empty response
      });
  });

  test('GET survey-answers for existing category', () => request(app)
    .get('/api/survey-answers/health')
    .then((response) => {
      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBeGreaterThan(0);
    }));

  test('GET survey-answers for non-existing category', () => request(app)
    .get('/api/survey-answers/test')
    .then((response) => {
      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({}); // ensure empty response
    }));
});

describe('Test user API endpoints', () => {
  test('POST register', async () => {
    const user = {
      username: 'test@mail.com',
      password: 'pass',
    };

    const userCount = await User.count();
    expect(userCount > 0);

    await request(app)
      .post('/api/register')
      .send(user)
      .then(async (response) => {
        expect(response.statusCode).toBe(201);
        const newUserCount = await User.count();
        expect(newUserCount).toBe(userCount + 1);
      });
  });

  test('POST login', async () => {
    const user = {
      username: 'test@mail.com',
      password: 'pass',
    };

    await request(app)
      .post('/api/login')
      .send(user)
      .then(async (response) => {
        expect(response.statusCode).toBe(302);
        expect(response.redirect).toBe(true);
        expect(response.header.location).toBe('/home');
      });
  });

  test('GET score for survey category', async () => {
    const user = await User.findOne({
      where: { email: superUser.username },
    });

    const score = {
      score: 20,
      surveyId: 3,
      userId: user.id,
      createdAt: sequelize.literal('NOW()'),
      updatedAt: sequelize.literal('NOW()'),
    };

    const newScore = new Score(score);
    await newScore.save();

    await request(app)
      .get('/api/score/health')
      .set('cookie', cookie)
      .then(async (response) => {
        expect(response.statusCode).toBe(200);
      });
  });

  test('GET logged in status (true)', async () => {
    await request(app)
      .get('/api/logged_in')
      .set('cookie', cookie)
      .then(async (response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.loggedIn).toBe(true);
        expect(response.body.user.email).toBe(superUser.username);
      });
  });

  test('GET logged in status (false)', async () => {
    await request(app)
      .get('/api/logged_in')
      .set('cookie', 'fake_cookie')
      .then(async (response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.loggedIn).toBe(false);
      });
  });

  test('POST logout', async () => {
    await request(app)
      .post('/api/logout')
      .then(async (response) => {
        expect(response.statusCode).toBe(302);
        expect(response.redirect).toBe(true);
        expect(response.header.location).toBe('/login');
      });
  });
});

describe('Test swagger doc rendering', () => {
  test('GET swagger docs', () => request(app)
    .get('/api/docs/')
    .then((response) => {
      expect(response.statusCode).toBe(200);
    }));
});
