import { Model, Document, ObjectId } from 'mongoose';
import { injectable } from "tsyringe";

/**
 * MagicMoverDocument - The Mongoose Document interface for a MagicMover.
 *
 * @interface
 */
interface MagicMoverDocument extends Document {
    name: string;
    weightLimit: number;
    questState: 'resting' | 'loading' | 'on-mission';
    currentWeight: number;
    missionsCompleted: number;
    items: ObjectId[];
}

/**
 * MagicMoverRepository - A repository class for managing MagicMover documents.
 *
 * @class
 */
@injectable()
export class MagicMoverRepository {
    private _model: Model<MagicMoverDocument>;

    /**
     * Constructor for MagicMoverRepository.
     *
     * @param {Model<MagicMoverDocument>} magicMoverModel - The Mongoose model for MagicMover.
     */
    constructor(magicMoverModel: Model<MagicMoverDocument>) {
        this._model = magicMoverModel;
    }

    /**
     * Find MagicMover documents based on a query.
     *
     * @param {object} query - The query object to filter Magic Movers.
     * @returns {Promise<MagicMoverDocument[] | []>} - A promise that resolves to an array of Magic Movers.
     */
    async find(query: object): Promise<MagicMoverDocument[] | []> {
        return await this._model.find(query).exec();
    }

    /**
     * Get the top Magic Movers based on completed missions.
     *
     * @returns {Promise<MagicMoverDocument[] | []>} - A promise that resolves to an array of top Magic Movers.
     */
    async getTopMovers(): Promise<MagicMoverDocument[] | []> {
        return await this._model.aggregate([
            {
                $project: {
                    name: 1,  // Project the name and other fields to return
                    completedMissionsCount: { $size: { $ifNull: ["$completedMissions", []] } }  // Count completed missions
                }
            },
            {
                $sort: { completedMissionsCount: -1 }  // Sort by completed missions count in descending order
            }
        ]).exec();
    }

    /**
     * Find a MagicMover document by its ID.
     *
     * @param {string} id - The ID of the MagicMover.
     * @returns {Promise<MagicMoverDocument | null>} - A promise that resolves to the MagicMover or null if not found.
     */
    async findById(id: string): Promise<MagicMoverDocument | null> {
        return this._model.findById(id).exec();
    }

    /**
     * Create a new MagicMover document.
     *
     * @param {Partial<MagicMoverDocument>} data - The data for creating a new MagicMover.
     * @returns {Promise<MagicMoverDocument>} - A promise that resolves to the created MagicMover.
     */
    async create(data: Partial<MagicMoverDocument>): Promise<MagicMoverDocument> {
        const newRecord = new this._model(data);
        return await newRecord.save();
    }

    /**
     * Update a MagicMover document by its ID.
     *
     * @param {string} id - The ID of the MagicMover to update.
     * @param {Partial<MagicMoverDocument>} data - The data to update the MagicMover with.
     * @returns {Promise<MagicMoverDocument | null>} - A promise that resolves to the updated MagicMover or null if not found.
     */
    async update(id: string, data: Partial<MagicMoverDocument>): Promise<MagicMoverDocument | null> {
        return this._model.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    /**
     * Delete a MagicMover document by its ID.
     *
     * @param {string} id - The ID of the MagicMover to delete.
     * @returns {Promise<boolean>} - A promise that resolves to true if the MagicMover was deleted, otherwise false.
     */
    async delete(id: string): Promise<boolean> {
        const result = await this._model.findByIdAndDelete(id).exec();
        return result !== null;
    }
}
