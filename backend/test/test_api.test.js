const { test, after, beforeEach } = require('node:test');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const assert = require('assert');


const api = supertest(app);
const helper = require('./test_helper');
const FAQ = require('../models/faqModel');

beforeEach(async () => {
  await FAQ.deleteMany({});
  await FAQ.insertMany(helper.initialFaqs);
});

test('FAQs are returned as json', async () => {
  await api
    .get('/api/faqs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('a specific FAQ is within the returned FAQs', async () => {
  const response = await api.get('/api/faqs');
  const questions = response.body.map(r => r.question);
  assert(questions.includes('What is the return policy?'));
});

after(async () => {
  await mongoose.connection.close();
});