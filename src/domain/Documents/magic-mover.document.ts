import { Document, ObjectId } from 'mongoose';

/**
 * MagicMoverDocument defines the schema for a Magic Mover in the database.
 */
export interface MagicMoverDocument extends Document {
    name: string;                     // The name of the magic mover
    weightLimit: number;              // The weight limit of the magic mover
    questState: 'resting' | 'loading' | 'on-mission'; // The state of the mover
    currentWeight: number;            // The current weight carried by the mover
    missionsCompleted: number;        // The number of missions completed by the mover
    items: ObjectId[];                // List of Magic Item ObjectIds the mover is carrying
}
