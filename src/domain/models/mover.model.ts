import { Schema, model, Document, ObjectId, Types } from 'mongoose';

/**
 * MagicMoverSchema - Defines the structure for the Magic Mover document in MongoDB.
 *
 * Fields:
 * @property {string} name - The name of the Magic Mover. This field is required.
 * @property {number} weightLimit - The maximum weight that the Magic Mover can carry. This field is required.
 * @property {('resting'|'loading'|'on-mission')} questState - The current state of the Magic Mover. The possible values are 'resting', 'loading', and 'on-mission'. Defaults to 'resting'.
 * @property {number} currentWeight - The current weight of the items the Magic Mover is carrying. Defaults to 0.
 * @property {number} missionsCompleted - The number of missions the Magic Mover has completed. Defaults to 0.
 * @property {ObjectId[]} items - An array of ObjectId references to MagicItem documents.
 */
const MagicMoverSchema = new Schema({
    name: { type: String, required: true },
    weightLimit: { type: Number, required: true },
    questState: { type: String, enum: ['resting', 'loading', 'on-mission'], default: 'resting' },
    currentWeight: { type: Number, default: 0 },
    missionsCompleted: { type: Number, default: 0 },
    items: [{ type: Types.ObjectId, ref: 'MagicItem' }]
});

/**
 * MagicMover Model - Represents a Magic Mover document in the database.
 *
 * @typedef {Object} MagicMoverDocument
 * @property {string} name - The name of the Magic Mover.
 * @property {number} weightLimit - The maximum weight the Magic Mover can carry.
 * @property {('resting'|'loading'|'on-mission')} questState - The current state of the Magic Mover.
 * @property {number} currentWeight - The current weight being carried by the Magic Mover.
 * @property {number} missionsCompleted - The total number of missions the Magic Mover has completed.
 * @property {ObjectId[]} items - The array of MagicItem ObjectId references currently being carried.
 *
 * @type {model<MagicMoverDocument>}
 */
export const MagicMover = model<Document & {
    name: string;
    weightLimit: number;
    questState: 'resting' | 'loading' | 'on-mission';
    currentWeight: number;
    missionsCompleted: number;
    items: ObjectId[];
}>('MagicMover', MagicMoverSchema);
