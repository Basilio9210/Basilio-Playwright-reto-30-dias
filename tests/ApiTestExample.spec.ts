import { test, expect } from '@playwright/test';

const BASE_URL = 'https://dummyjson.com';

// Known valid seed user from dummyjson.com/users
const VALID_USER = { username: 'emilys', password: 'emilyspass' };

test.describe('DummyJSON API - Products', () => {
  test('GET /products/:id - 200 returns an existing product', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/products/1`);

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('id', 1);
    expect(body).toHaveProperty('title');
    expect(body).toHaveProperty('price');
  });

  test('GET /products/:id - 404 when product does not exist', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/products/999999`);

    expect(response.status()).toBe(404);
    const body = await response.json();
    expect(body.message).toContain('not found');
  });

  test('POST /products/add - 201 creates a product', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/products/add`, {
      data: { title: 'QA Test Product', price: 19.99 },
    });

    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body).toHaveProperty('id');
    expect(body.title).toBe('QA Test Product');
  });

  test('POST /products/add - 400 when request body is malformed JSON', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/products/add`, {
      headers: { 'Content-Type': 'application/json' },
      data: '{ this is not valid json',
    });

    expect(response.status()).toBe(400);
  });
});

test.describe('DummyJSON API - Auth', () => {
  test('POST /auth/login - 200 with valid credentials', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/auth/login`, {
      data: VALID_USER,
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('accessToken');
    expect(body.username).toBe(VALID_USER.username);
  });

  test('POST /auth/login - 400 with wrong password', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/auth/login`, {
      data: { username: VALID_USER.username, password: 'wrongPassword123' },
    });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.message).toBeTruthy();
  });

  test('POST /auth/login - 400 when password field is missing', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/auth/login`, {
      data: { username: VALID_USER.username },
    });

    expect(response.status()).toBe(400);
  });

  test('POST /auth/login - 400 when username does not exist', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/auth/login`, {
      data: { username: 'not_a_real_user_xyz', password: 'whatever123' },
    });

    expect(response.status()).toBe(400);
  });

  test('GET /auth/me - 401 without an access token', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/auth/me`);

    expect(response.status()).toBe(401);
  });

  test('GET /auth/me - 401 with an invalid/garbage access token', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/auth/me`, {
      headers: { Authorization: 'Bearer not-a-real-token' },
    });

    expect(response.status()).toBe(401);
  });
});