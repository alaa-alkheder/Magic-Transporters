import { Document, Model, ObjectId } from 'mongoose';
import { injectable } from "tsyringe";
import { MagicItem } from "../../../domain/models/magic-Item.model";
import { MagicItemDocument } from "../../../domain/Documents/magic-item.document";

/**
 * MagicItemRepository - A repository for managing MagicItem documents.
 *
 * @class
 */
@injectable()
export class MagicItemRepository {
    private readonly _model: Model<MagicItemDocument>;

    /**
     * Constructor for MagicItemRepository
     *
     * @param {Model<MagicItemDocument>} magicItem - The Mongoose model for MagicItem.
     */
    constructor(magicItem: Model<MagicItemDocument>) {
        this._model = magicItem;
    }

    /**
     * Find Magic Items based on a query.
     *
     * @param {object} query - The query object to filter Magic Items.
     * @returns {Promise<MagicItemDocument[]>} - A promise that resolves to an array of Magic Items.
     */
    async find(query: object): Promise<MagicItemDocument[]> {
        return this._model.find(query).exec();
    }

    /**
     * Find a Magic Item by its ID.
     *
     * @param {string} id - The ID of the Magic Item.
     * @returns {Promise<MagicItemDocument | null>} - A promise that resolves to the Magic Item or null if not found.
     */
    async findById(id: string): Promise<MagicItemDocument | null> {
        return this._model.findById(id).exec();
    }

    /**
     * Create a new Magic Item.
     *
     * @param {Partial<MagicItemDocument>} data - The data for creating a new Magic Item.
     * @returns {Promise<MagicItemDocument>} - A promise that resolves to the created Magic Item.
     */
    async create(data: Partial<MagicItemDocument>): Promise<MagicItemDocument> {
        const newItem = new this._model(data);
        return newItem.save();
    }

    /**
     * Update an existing Magic Item by its ID.
     *
     * @param {string} id - The ID of the Magic Item to update.
     * @param {Partial<MagicItemDocument>} data - The data to update the Magic Item with.
     * @returns {Promise<MagicItemDocument | null>} - A promise that resolves to the updated Magic Item or null if not found.
     */
    async update(id: string, data: Partial<MagicItemDocument>): Promise<MagicItemDocument | null> {
        return this._model.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    /**
     * Delete a Magic Item by its ID.
     *
     * @param {string} id - The ID of the Magic Item to delete.
     * @returns {Promise<boolean>} - A promise that resolves to true if the Magic Item was deleted, otherwise false.
     */
    async delete(id: string): Promise<boolean> {
        const result = await this._model.findByIdAndDelete(id).exec();
        return result !== null;
    }
}
