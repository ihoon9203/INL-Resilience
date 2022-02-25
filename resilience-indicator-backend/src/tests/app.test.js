const request = require('supertest');
const app = require('../app');
const pjson = require('../../package.json');
const sequelize = require('../models');
const sessionStore = require('../auth/sessionStore');

const {
  User, Score, FeedbackCategory, Feedback,
} = sequelize.models;
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
    isAdmin: 1,
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

  // ensure deletion (if tests fail) of created feedback categories
  await FeedbackCategory.destroy({
    where: { feedbackCategoryLabel: 'New Category' },
  });
  await FeedbackCategory.destroy({
    where: { feedbackCategoryLabel: 'Updated Category' },
  });

  // ensure deletion (if tests fail) of created feedback
  await Feedback.destroy({
    where: { feedback: 'New feedback!' },
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
        expect(response.body.Subcategories.length).toEqual(1);
        expect(response.body.Subcategories[0].Questions.length).toEqual(10);
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

describe('Test feedback API endpoints', () => {
  test('GET feedback categories', async () => {
    const count = await FeedbackCategory.count();
    await request(app)
      .get('/api/feedback-categories')
      .set('cookie', cookie)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toEqual(count);
      });
  });

  // IMPORTANT: This POST and the following DELETE & PUT work together
  test('POST new feedback category', async () => {
    const prevCount = await FeedbackCategory.count();
    const newFeedbackCategoryLabel = 'New Category';
    await request(app)
      .post('/api/admin/feedback-categories')
      .send({ feedbackCategoryLabel: newFeedbackCategoryLabel })
      .set('cookie', cookie)
      .then((response) => {
        expect(response.statusCode).toBe(201);
      });
    const afterCount = await FeedbackCategory.count();
    expect(afterCount - prevCount === 1);

    const newCat = await FeedbackCategory.findOne({
      where: { feedbackCategoryLabel: newFeedbackCategoryLabel },
    });
    expect(newCat.feedbackCategoryLabel === newFeedbackCategoryLabel);
  });

  test('PUT update feedback category', async () => {
    const prevCount = await FeedbackCategory.count();
    const updatedFeedbackCategoryLabel = 'Updated Category';
    const newFeedbackCategoryLabel = 'New Category';

    const newCat = await FeedbackCategory.findOne({
      where: { feedbackCategoryLabel: newFeedbackCategoryLabel },
    });
    const newCatId = newCat.id;

    await request(app)
      .put(`/api/admin/feedback-categories/${newCatId}`)
      .send({ feedbackCategoryLabel: updatedFeedbackCategoryLabel })
      .set('cookie', cookie)
      .then((response) => {
        expect(response.statusCode).toBe(200);
      });

    const afterCount = await FeedbackCategory.count();
    expect(prevCount).toEqual(afterCount);

    const updatedCat = await FeedbackCategory.findOne({
      where: { id: newCatId },
    });
    expect(updatedCat.feedbackCategoryLabel).toEqual(updatedFeedbackCategoryLabel);
  });

  test('DELETE feedback category', async () => {
    const prevCount = await FeedbackCategory.count();
    const updatedFeedbackCategoryLabel = 'Updated Category';

    const updatedCat = await FeedbackCategory.findOne({
      where: { feedbackCategoryLabel: updatedFeedbackCategoryLabel },
    });
    const updatedCatId = updatedCat.id;

    await request(app)
      .delete(`/api/admin/feedback-categories/${updatedCatId}`)
      .set('cookie', cookie)
      .then((response) => {
        expect(response.statusCode).toBe(200);
      });

    const afterCount = await FeedbackCategory.count();
    expect(prevCount - afterCount === 1);

    const cat = await FeedbackCategory.findOne({
      where: { id: updatedCatId },
    });
    expect(cat).toBe(null);
  });

  test('GET all feedback', async () => {
    const count = await Feedback.count();
    await request(app)
      .get('/api/admin/feedback')
      .set('cookie', cookie)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toEqual(count);
      });
  });

  test('GET feedback for specified category', async () => {
    const feedbackCategoryId = 1;
    const feedback = await Feedback.findAll({
      where: { feedbackCategoryId },
    });
    const count = feedback.length;
    await request(app)
      .get(`/api/admin/feedback/${feedbackCategoryId}`)
      .set('cookie', cookie)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toEqual(count);
      });
  });

  // IMPORTANT: This POST and the following DELETE & PUT work together
  test('POST new feedback', async () => {
    const feedbackCategoryId = 1;
    const prevCount = await Feedback.count();
    const newFeedback = 'New feedback!';

    await request(app)
      .post(`/api/feedback/${feedbackCategoryId}`)
      .send({ feedback: newFeedback, resolved: false })
      .set('cookie', cookie)
      .then((response) => {
        expect(response.statusCode).toBe(201);
      });
    const afterCount = await Feedback.count();
    expect(afterCount - prevCount === 1);

    const newFeedbackCreated = await Feedback.findOne({
      where: { feedback: newFeedback },
    });
    expect(newFeedbackCreated.feedbackCategoryId === feedbackCategoryId);
    expect(newFeedbackCreated.resolved).toBe(false);
  });

  test('PUT update feedback resolved status', async () => {
    const prevCount = await Feedback.count();
    const newFeedback = 'New feedback!';

    const newlyCreatedFeedback = await Feedback.findOne({
      where: { feedback: newFeedback },
    });
    const newlyCreatedFeedbackId = newlyCreatedFeedback.id;

    await request(app)
      .put(`/api/admin/feedback/${newlyCreatedFeedbackId}`)
      .send({ resolved: true })
      .set('cookie', cookie)
      .then((response) => {
        expect(response.statusCode).toBe(200);
      });

    const afterCount = await Feedback.count();
    expect(prevCount).toEqual(afterCount);

    const updatedFeedbackResult = await Feedback.findOne({
      where: { id: newlyCreatedFeedbackId },
    });
    expect(updatedFeedbackResult.resolved).toBe(true);
  });

  test('DELETE feedback', async () => {
    const prevCount = await Feedback.count();
    const newFeedback = 'New feedback!';

    const updatedFeedbackResult = await Feedback.findOne({
      where: { feedback: newFeedback },
    });
    const updatedFeedbackResultId = updatedFeedbackResult.id;

    await request(app)
      .delete(`/api/admin/feedback/${updatedFeedbackResultId}`)
      .set('cookie', cookie)
      .then((response) => {
        expect(response.statusCode).toBe(200);
      });

    const afterCount = await Feedback.count();
    expect(prevCount - afterCount === 1);

    const feedback = await Feedback.findOne({
      where: { id: updatedFeedbackResultId },
    });
    expect(feedback).toBe(null);
  });
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

  test('POST failed login', async () => {
    const user = {
      username: 'test@mail.com',
      password: 'incorrectpassword',
    };

    await request(app)
      .post('/api/login')
      .send(user)
      .then(async (response) => {
        expect(response.statusCode).toBe(400);
      });
  });

  test('POST change password', async () => {
    const newPassword = 'newpassword';
    await request(app)
      .post('/api/change_password')
      .send({ password: newPassword })
      .set('cookie', cookie)
      .then(async (response) => {
        expect(response.statusCode).toBe(200);
      });

    // try to login with old password
    await request(app)
      .post('/api/login')
      .send(superUser)
      .then(async (response) => {
        expect(response.statusCode).toBe(400);
      });

    // try to login with new password
    await request(app)
      .post('/api/login')
      .send({
        username: superUser.username,
        password: newPassword,
      })
      .then(async (response) => {
        expect(response.statusCode).toBe(302);
        expect(response.redirect).toBe(true);
        expect(response.header.location).toBe('/home');
      });

    // change password back for other tests
    await request(app)
      .post('/api/change_password')
      .send({ password: superUser.password })
      .set('cookie', cookie)
      .then(async (response) => {
        expect(response.statusCode).toBe(200);
      });
  });

  test('POST change username', async () => {
    const newUsername = 'newUsername@mail.com';
    await request(app)
      .post('/api/change_username')
      .send({ username: newUsername })
      .set('cookie', cookie)
      .then(async (response) => {
        expect(response.statusCode).toBe(200);
      });

    // try to login with old username
    await request(app)
      .post('/api/login')
      .send(superUser)
      .then(async (response) => {
        expect(response.statusCode).toBe(400);
      });

    // try to login with new username
    await request(app)
      .post('/api/login')
      .send({
        username: newUsername,
        password: superUser.password,
      })
      .then(async (response) => {
        expect(response.statusCode).toBe(302);
        expect(response.redirect).toBe(true);
        expect(response.header.location).toBe('/home');
      });

    // change back for other tests
    await request(app)
      .post('/api/change_username')
      .send({ username: superUser.username })
      .set('cookie', cookie)
      .then(async (response) => {
        expect(response.statusCode).toBe(200);
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
