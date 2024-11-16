import 'reflect-metadata';
import express, { Application } from 'express';
import { container } from 'tsyringe';
import { setupRoutes } from './interfaces/controllers/routes';
import { DatabaseService } from './infrastructure/mongoose/DatabaseService';
import {MagicMoverService} from "./application/services/magic-mover.service";
import {MagicMoverRepository} from "./infrastructure/mongoose/repository/magic-mover.repository";
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const app: Application = express();
app.use(express.json());

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Magic Transporters API',
            version: '1.0.0',
            description: 'API for managing Magic Movers and Magic Items',
        },
        servers: [{ url: 'http://localhost:3000' }],
    },
    apis: ['./src/**/*.ts'], // Path to your API docs
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Inject DatabaseService for MongoDB connection
container.resolve(DatabaseService);
// Register the MagicMoverRepository
container.register('MagicMoverRepository', {
    useClass: MagicMoverRepository,
});

// If needed, register other dependencies like MagicMoverService
container.register('MagicMoverService', {
    useClass: MagicMoverService,
});

// Setup routes
setupRoutes(app);

export default app;
