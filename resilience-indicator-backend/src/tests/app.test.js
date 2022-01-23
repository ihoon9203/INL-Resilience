const request = require('supertest');
const app = require('../app');
const pjson = require('../../package.json');
const sequelize = require('../models');

describe('Test API endpoints', () => {
  afterAll((done) => {
    sequelize.close();
    done();
  });

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

  test('GET survey-questions for existing category', () => request(app)
    .get('/api/survey-questions/health')
    .then((response) => {
      expect(response.statusCode).toBe(200);
      expect(response.body.Questions.length).toBeGreaterThan(0);
    }));

  test('GET survey-questions for non-existing category', () => request(app)
    .get('/api/survey-questions/test')
    .then((response) => {
      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({}); // ensure empty response
    }));

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

describe('Test swagger doc rendering', () => {
  test('GET swagger docs', () => request(app)
    .get('/api/docs/')
    .then((response) => {
      expect(response.statusCode).toBe(200);
    }));
});
