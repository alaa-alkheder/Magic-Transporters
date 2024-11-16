// __tests__/magicMover.e2e.test.ts
import request from 'supertest';
import app from "../../app";

describe('MagicMoverController E2E Tests', () => {
    let newMoverId: string;

    // Test the creation of a new Magic Mover
    it('should create a new Magic Mover', async () => {
        const response = await request(app)
            .post('/movers')
            .send({ name: 'Mover1', weightLimit: 100 });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('_id');
        expect(response.body.name).toBe('Mover1');
        expect(response.body.weightLimit).toBe(100);
        newMoverId = response.body._id; // Save the ID for future tests
    });

    // Test getting all Magic Movers
    it('should return all Magic Movers', async () => {
        const response = await request(app).get('/movers');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body.length).toBeGreaterThan(0);
    });

    // Test getting top Magic Movers
    it('should return top Magic Movers', async () => {
        const response = await request(app).get('/movers/top');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
    });

    // Test loading a Magic Mover with an item (mocking item)
    it('should load a Magic Mover with an item', async () => {
        const itemId = 'someItemId'; // Replace with a valid item ID or mock it
        const response = await request(app).post(`/movers/${newMoverId}/load/${itemId}`);

        expect(response.status).toBe(200);
        expect(response.body.items).toContain(itemId);
    });

    // Test starting a mission for the Magic Mover
    it('should start a mission for the Magic Mover', async () => {
        const response = await request(app).post(`/movers/${newMoverId}/start`);

        expect(response.status).toBe(200);
        expect(response.body.questState).toBe('on-mission');
    });

    // Test ending a mission for the Magic Mover
    it('should end a mission for the Magic Mover', async () => {
        const response = await request(app).post(`/movers/${newMoverId}/end`);

        expect(response.status).toBe(200);
        expect(response.body.questState).toBe('resting');
    });
});
