import request from 'supertest';
import app from '../../src/app.js';
import pool from '../../src/config/db.js';

let jwtToken;

describe('E2E - Users Routes', () => {

  const testUser = {
    username: 'e2eUser',
    password: 'Motdepasse1!'
  };

  afterAll(async () => {
    await pool.query('DELETE FROM users WHERE username = ?', [testUser.username]);
    await pool.end();
  });

  test('Inscription - succès', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send(testUser);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('userId');
  });

  test('Inscription - username déjà utilisé', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send(testUser);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  test('Login - succès', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send(testUser);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
    jwtToken = res.body.token;
  });

  test('Login - mot de passe incorrect', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: testUser.username, password: 'WrongPass1!' });

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty('error');
  });

  test('Dashboard - accès avec JWT valide', async () => {
    const res = await request(app)
      .get('/api/users/dashboard')
      .set('Authorization', `Bearer ${jwtToken}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message');
    expect(res.body.user.username).toBe(testUser.username);
  });

  test('Dashboard - accès sans JWT', async () => {
    const res = await request(app)
      .get('/api/users/dashboard');

    expect(res.status).toBe(401);
  });

  test('Logout - succès', async () => {
    const res = await request(app)
      .post('/api/users/logout')
      .set('Authorization', `Bearer ${jwtToken}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message');
  });

});
