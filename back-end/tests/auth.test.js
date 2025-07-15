const request = require('supertest');
const app = require('../server'); // or your app export

describe('Auth API', () => {
  it('should signup a new user', async () => {
    const res = await request(app).post('/api/auth/signup').send({
      name: 'Test User',
      email: 'test@example.com',
      password: 'test123'
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.token).toBeDefined();
  });

  it('should not signup with existing email', async () => {
    await request(app).post('/api/auth/signup').send({
      name: 'Test User',
      email: 'test@example.com',
      password: 'test123'
    });

    const res = await request(app).post('/api/auth/signup').send({
      name: 'Test User',
      email: 'test@example.com',
      password: 'test123'
    });

    expect(res.statusCode).toBe(400);
  });
});
