import { Model, Document, ObjectId } from 'mongoose';
import { injectable } from "tsyringe";
import { MissionLogDocument } from "../../../domain/Documents/mission-log.document";
import { MissionLog } from "../../../domain/models/mission-log.model";

/**
 * MissionLogRepository - A repository class for managing MissionLog documents.
 *
 * @class
 */
@injectable()
export class MissionLogRepository {
    private _model: Model<MissionLogDocument>;

    /**
     * Constructor for MissionLogRepository.
     *
     * @param {Model<MissionLogDocument>} magicMoverModel - The Mongoose model for MissionLog.
     */
    constructor(magicMoverModel: Model<MissionLogDocument>) {
        this._model = magicMoverModel;
    }

    /**
     * Find MissionLog documents based on a query.
     *
     * @param {object} query - The query object to filter mission logs.
     * @returns {Promise<MissionLogDocument[]>} - A promise that resolves to an array of MissionLogs.
     */
    async find(query: object): Promise<MissionLogDocument[]> {
        return await this._model.find(query).exec();
    }

    /**
     * Find a MissionLog document by its ID.
     *
     * @param {string} id - The ID of the MissionLog.
     * @returns {Promise<MissionLogDocument | null>} - A promise that resolves to the MissionLog or null if not found.
     */
    async findById(id: string): Promise<MissionLogDocument | null> {
        return this._model.findById(id).exec();
    }

    /**
     * Create a new MissionLog document.
     *
     * @param {Partial<MissionLogDocument>} data - The data for creating a new MissionLog.
     * @returns {Promise<MissionLogDocument>} - A promise that resolves to the created MissionLog.
     */
    async create(data: Partial<MissionLogDocument>): Promise<MissionLogDocument> {
        const newRecord = new this._model(data);
        return await newRecord.save();
    }

    /**
     * Update a MissionLog document by its ID.
     *
     * @param {string} id - The ID of the MissionLog to update.
     * @param {Partial<MissionLogDocument>} data - The data to update the MissionLog with.
     * @returns {Promise<MissionLogDocument | null>} - A promise that resolves to the updated MissionLog or null if not found.
     */
    async update(id: string, data: Partial<MissionLogDocument>): Promise<MissionLogDocument | null> {
        return this._model.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    /**
     * Delete a MissionLog document by its ID.
     *
     * @param {string} id - The ID of the MissionLog to delete.
     * @returns {Promise<boolean>} - A promise that resolves to true if the MissionLog was deleted, otherwise false.
     */
    async delete(id: string): Promise<boolean> {
        const result = await this._model.findByIdAndDelete(id).exec();
        return result !== null;
    }
}
