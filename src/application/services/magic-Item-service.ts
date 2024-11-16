import { MagicItemRepository } from "../../infrastructure/mongoose/repository/magic-item.repository";
import { MagicItemDocument } from "../../domain/Documents/magic-item.document";
import { MagicItem } from "../../domain/models/magic-Item.model";

/**
 * Service for managing Magic Items.
 */
export class MagicItemService {
    private readonly magicItemRepository: MagicItemRepository;

    /**
     * Creates an instance of MagicItemService.
     * Initializes the MagicItemRepository with the MagicItem model.
     */
    constructor() {
        this.magicItemRepository = new MagicItemRepository(MagicItem);
    }

    /**
     * Retrieves all Magic Items.
     * @returns {Promise<MagicItemDocument[]>} - A promise that resolves to an array of MagicItem documents.
     */
    async getAllItems(): Promise<MagicItemDocument[]> {
        return this.magicItemRepository.find({});
    }

    /**
     * Retrieves a Magic Item by its ID.
     * @param {string} id - The ID of the Magic Item.
     * @returns {Promise<MagicItemDocument | null>} - A promise that resolves to the MagicItem document or null if not found.
     */
    async getItemById(id: string): Promise<MagicItemDocument | null> {
        return this.magicItemRepository.findById(id);
    }

    /**
     * Creates a new Magic Item.
     * @param {Partial<MagicItemDocument>} data - Partial data to create the Magic Item.
     * @returns {Promise<MagicItemDocument>} - A promise that resolves to the newly created MagicItem document.
     */
    async createItem(data: Partial<MagicItemDocument>): Promise<MagicItemDocument> {
        return this.magicItemRepository.create(data);
    }

    /**
     * Updates an existing Magic Item by its ID.
     * @param {string} id - The ID of the Magic Item.
     * @param {Partial<MagicItemDocument>} data - Partial data to update the Magic Item.
     * @returns {Promise<MagicItemDocument | null>} - A promise that resolves to the updated MagicItem document or null if not found.
     */
    async updateItem(id: string, data: Partial<MagicItemDocument>): Promise<MagicItemDocument | null> {
        return this.magicItemRepository.update(id, data);
    }

    /**
     * Deletes a Magic Item by its ID.
     * @param {string} id - The ID of the Magic Item.
     * @returns {Promise<boolean>} - A promise that resolves to true if the item was deleted, false otherwise.
     */
    async deleteItem(id: string): Promise<boolean> {
        return this.magicItemRepository.delete(id);
    }
}
