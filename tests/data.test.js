// tests/data.test.js
import request from 'supertest';
import app from '../index.js';

describe('Data Collection Endpoint', () => {
    it('should collect data successfully', async () => {
        const response = await request(app)
            .post('/api/data/collect')
            .send({ data: { key: 'value' } });
        
        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe('Data collected successfully.');
    });

    it('should return 500 on server error', async () => {
        const response = await request(app)
            .post('/api/data/collect')
            .send(null);
        
        expect(response.statusCode).toBe(500);
    });
});
