import { Request, Response } from 'express';
import { container, injectable } from 'tsyringe';
import { MagicMoverService } from "../../application/services/magic-mover.service";

// Instantiate the service
const magicMoverService = new MagicMoverService();

@injectable()
/**
 * MagicMoverController - Handles HTTP requests for managing Magic Movers.
 *
 * @class
 */
export class MagicMoverController {

    /**
     * Add a new Magic Mover.
     *
     * @param {Request} req - The request object containing the name and weight limit of the new mover.
     * @param {Response} res - The response object.
     * @returns {Promise<void>} - Sends a JSON response with the new mover data.
     */
    async addMagicMover(req: Request, res: Response): Promise<void> {
        try {
            const { name, weightLimit } = req.body;
            const newMover = await magicMoverService.addMagicMover({ name, weightLimit });
            res.status(201).json(newMover);
        } catch (err) {
            res.status(400).json({ error: err });
        }
    }

    /**
     * Get all Magic Movers.
     *
     * @param {Request} req - The request object.
     * @param {Response} res - The response object.
     * @returns {Promise<void>} - Sends a JSON response with all movers.
     */
    async getAllMagicMover(req: Request, res: Response): Promise<void> {
        try {
            const movers = await magicMoverService.getMagicMover();
            res.status(200).json(movers);
        } catch (err) {
            res.status(404).json({ error: err });
        }
    }

    /**
     * Get the top Magic Movers based on completed missions.
     *
     * @param {Request} req - The request object.
     * @param {Response} res - The response object.
     * @returns {Promise<void>} - Sends a JSON response with the top movers.
     */
    async getTopMovers(req: Request, res: Response): Promise<void> {
        try {
            const topMovers = await magicMoverService.getTopMovers();
            res.status(200).json(topMovers);
        } catch (err) {
            res.status(404).json({ error: err });
        }
    }

    /**
     * Load a Magic Mover with an item.
     *
     * @param {Request} req - The request object containing the mover ID and item ID in params.
     * @param {Response} res - The response object.
     * @returns {Promise<void>} - Sends a JSON response with the updated mover data.
     */
    async loadMagicMover(req: Request, res: Response): Promise<void> {
        try {
            const { moverId, itemId } = req.params;
            const updatedMover = await magicMoverService.loadMagicMover(moverId, itemId);
            res.status(200).json(updatedMover);
        } catch (err) {
            res.status(400).json({ error: err });
        }
    }

    /**
     * Start a mission for a Magic Mover.
     *
     * @param {Request} req - The request object containing the mover ID in params.
     * @param {Response} res - The response object.
     * @returns {Promise<void>} - Sends a JSON response with the updated mover data after starting the mission.
     */
    async startMission(req: Request, res: Response): Promise<void> {
        try {
            const { moverId } = req.params;
            const updatedMover = await magicMoverService.startMission(moverId);
            res.status(200).json(updatedMover);
        } catch (err) {
            res.status(400).json({ error: err });
        }
    }

    /**
     * End a mission and unload a Magic Mover.
     *
     * @param {Request} req - The request object containing the mover ID in params.
     * @param {Response} res - The response object.
     * @returns {Promise<void>} - Sends a JSON response with the updated mover data after ending the mission.
     */
    async endMission(req: Request, res: Response): Promise<void> {
        try {
            const { moverId } = req.params;
            const updatedMover = await magicMoverService.endMission(moverId);
            res.status(200).json(updatedMover);
        } catch (err) {
            res.status(400).json({ error: err });
        }
    }
}
