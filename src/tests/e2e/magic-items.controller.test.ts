// __tests__/magicItem.e2e.test.ts
import request from 'supertest';
import app from "../../app";

describe('MagicItemController E2E Tests', () => {
    let newItemId: string;

    // Test the creation of a new Magic Item
    it('should create a new Magic Item', async () => {
        const response = await request(app)
            .post('/items')
            .send({ name: 'Item1', weight: 10 });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('_id');
        expect(response.body.name).toBe('Item1');
        expect(response.body.weight).toBe(10);
        newItemId = response.body._id; // Save the ID for future tests
    });

    // Test getting all Magic Items
    it('should return all Magic Items', async () => {
        const response = await request(app).get('/items');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body.length).toBeGreaterThan(0);
    });

    // Test getting a Magic Item by ID
    it('should return a Magic Item by ID', async () => {
        const response = await request(app).get(`/items/${newItemId}`);

        expect(response.status).toBe(200);
        expect(response.body._id).toBe(newItemId);
    });

    // Test updating a Magic Item by ID
    it('should update a Magic Item', async () => {
        const response = await request(app)
            .put(`/items/${newItemId}`)
            .send({ name: 'UpdatedItem', weight: 15 });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe('UpdatedItem');
        expect(response.body.weight).toBe(15);
    });

    // Test deleting a Magic Item
    it('should delete a Magic Item', async () => {
        const response = await request(app).delete(`/items/${newItemId}`);

        expect(response.status).toBe(204);
    });
});
