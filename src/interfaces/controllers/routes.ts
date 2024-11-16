import { Application } from 'express';
import { MagicMoverController } from "./magic-mover.controller";
import {MagicItemController} from "./magic-Itemc.ontroller";

const magicMoverController = new MagicMoverController();
const magicItemController = new MagicItemController();

/**
 * Sets up all the routes for the Magic Mover and Magic Item controllers.
 *
 * @param {Application} app - The Express application instance.
 */
export const setupRoutes = (app: Application): void => {

    /**
     * Route to add a new Magic Mover.
     * @route POST /movers
     * @param {Request} req - Request containing the Magic Mover data.
     * @param {Response} res - Response containing the newly created Magic Mover.
     */
    app.post('/movers', (req, res) => magicMoverController.addMagicMover(req, res));

    /**
     * Route to get all Magic Movers.
     * @route GET /movers
     * @param {Request} req - Request for retrieving all movers.
     * @param {Response} res - Response containing all movers.
     */
    app.get('/movers', (req, res) => magicMoverController.getAllMagicMover(req, res));

    /**
     * Route to load a Magic Mover with items.
     * @route POST /movers/:moverId/load/:itemId
     * @param {Request} req - Request containing the mover ID and item ID.
     * @param {Response} res - Response containing the updated mover data.
     */
    app.post('/movers/:moverId/load/:itemId', (req, res) => magicMoverController.loadMagicMover(req, res));

    /**
     * Route to start a mission for a Magic Mover.
     * @route POST /movers/:moverId/start
     * @param {Request} req - Request containing the mover ID.
     * @param {Response} res - Response containing the updated mover after starting the mission.
     */
    app.post('/movers/:moverId/start', (req, res) => magicMoverController.startMission(req, res));

    /**
     * Route to end a mission for a Magic Mover.
     * @route POST /movers/:moverId/end
     * @param {Request} req - Request containing the mover ID.
     * @param {Response} res - Response containing the updated mover after ending the mission.
     */
    app.post('/movers/:moverId/end', (req, res) => magicMoverController.endMission(req, res));

    /**
     * Route to get the top movers by completed missions.
     * @route GET /movers/top
     * @param {Request} req - Request for retrieving the top movers.
     * @param {Response} res - Response containing the top movers.
     */
    app.get('/movers/top', (req, res) => magicMoverController.getTopMovers(req, res));

    // Magic Item Routes

    /**
     * Route to get all Magic Items.
     * @route GET /items
     * @param {Request} req - Request for retrieving all items.
     * @param {Response} res - Response containing all items.
     */
    app.get('/items', magicItemController.getAllItems.bind(magicItemController));

    /**
     * Route to get a Magic Item by ID.
     * @route GET /items/:id
     * @param {Request} req - Request containing the item ID.
     * @param {Response} res - Response containing the item with the specified ID.
     */
    app.get('/items/:id', magicItemController.getItemById.bind(magicItemController));

    /**
     * Route to create a new Magic Item.
     * @route POST /items
     * @param {Request} req - Request containing the new item data.
     * @param {Response} res - Response containing the newly created item.
     */
    app.post('/items', magicItemController.createItem.bind(magicItemController));

    /**
     * Route to update a Magic Item by ID.
     * @route PUT /items/:id
     * @param {Request} req - Request containing the item ID and the updated data.
     * @param {Response} res - Response containing the updated item.
     */
    app.put('/items/:id', magicItemController.updateItem.bind(magicItemController));

    /**
     * Route to delete a Magic Item by ID.
     * @route DELETE /items/:id
     * @param {Request} req - Request containing the item ID.
     * @param {Response} res - Sends a success response or an error if the item is not found.
     */
    app.delete('/items/:id', magicItemController.deleteItem.bind(magicItemController));
};
