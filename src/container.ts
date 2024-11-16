import 'reflect-metadata'; // Required for tsyringe
import { container } from 'tsyringe';
import {MagicMoverRepository} from "./infrastructure/mongoose/repository/magic-mover.repository";
import {MagicMoverService} from "./application/services/magic-mover.service";

// Register the MagicMoverRepository
container.register('MagicMoverRepository', {
    useClass: MagicMoverRepository,
});

// If needed, register other dependencies like MagicMoverService
container.register('MagicMoverService', {
    useClass: MagicMoverService,
});
