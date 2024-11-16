import { Request, Response } from 'express';
import { MagicItemService } from "../../application/services/magic-Item-service";

/**
 * MagicItemController - Handles the HTTP requests for Magic Items.
 *
 * @class
 */
export class MagicItemController {
    private readonly magicItemService: MagicItemService;

    /**
     * Constructor for MagicItemController.
     * Initializes the MagicItemService.
     */
    constructor() {
        this.magicItemService = new MagicItemService();
    }

    /**
     * Handles the GET request to retrieve all Magic Items.
     *
     * @param {Request} req - The request object.
     * @param {Response} res - The response object.
     * @returns {Promise<void>} - Sends a JSON response with all magic items.
     */
    async getAllItems(req: Request, res: Response): Promise<void> {
        const items = await this.magicItemService.getAllItems();
        res.status(200).json(items);
    }

    /**
     * Handles the GET request to retrieve a Magic Item by its ID.
     *
     * @param {Request} req - The request object with the item ID in params.
     * @param {Response} res - The response object.
     * @returns {Promise<void>} - Sends a JSON response with the item data or a 404 if not found.
     */
    async getItemById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const item = await this.magicItemService.getItemById(id);
        if (item) {
            res.status(200).json(item);
        } else {
            res.status(404).json({ message: 'Item not found' });
        }
    }

    /**
     * Handles the POST request to create a new Magic Item.
     *
     * @param {Request} req - The request object containing the item data in body.
     * @param {Response} res - The response object.
     * @returns {Promise<void>} - Sends a JSON response with the created item data.
     */
    async createItem(req: Request, res: Response): Promise<void> {
        const { name, weight } = req.body;
        const newItem = await this.magicItemService.createItem({ name, weight });
        res.status(201).json(newItem);
    }

    /**
     * Handles the PUT request to update a Magic Item by its ID.
     *
     * @param {Request} req - The request object with the item ID in params and updated data in body.
     * @param {Response} res - The response object.
     * @returns {Promise<void>} - Sends a JSON response with the updated item data or a 404 if not found.
     */
    async updateItem(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { name, weight } = req.body;
        const updatedItem = await this.magicItemService.updateItem(id, { name, weight });
        if (updatedItem) {
            res.status(200).json(updatedItem);
        } else {
            res.status(404).json({ message: 'Item not found' });
        }
    }

    /**
     * Handles the DELETE request to remove a Magic Item by its ID.
     *
     * @param {Request} req - The request object with the item ID in params.
     * @param {Response} res - The response object.
     * @returns {Promise<void>} - Sends a 204 response if successful, or a 404 if not found.
     */
    async deleteItem(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const deleted = await this.magicItemService.deleteItem(id);
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Item not found' });
        }
    }
}
