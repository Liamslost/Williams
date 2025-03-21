import request from 'supertest';
import app from '../app';

describe('API Endpoints', () => {
  it('Must GET /api/circuits should return 200 and circuits array', async () => {
    const res = await request(app).get('/api/circuits');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('Must GET /api/drivers should return 200 and drivers array', async () => {
    const res = await request(app).get('/api/drivers');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
