import { injectable } from 'tsyringe';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

@injectable()

export class DatabaseService {
    constructor() {
        this.connect();
    }

    public async connect(
    ): Promise<void> {
        try {
            const dbUri = 'mongodb://root:password@localhost:27017/unifi?authSource=admin';

            await mongoose.connect(dbUri);  // No need for extra options
            console.log('Database connection successful');
        } catch (error) {
            console.error('Database connection error:', error);
            throw error;
        }
    }
}