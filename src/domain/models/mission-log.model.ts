import { Schema, model } from 'mongoose';
import { MissionLogDocument } from "../Documents/mission-log.document";

/**
 * MissionLog Schema represents the structure for MissionLog documents in MongoDB.
 * It keeps track of the actions taken by each magic mover.
 */
const missionLogSchema = new Schema<MissionLogDocument>({
    // References the 'Mover' model to associate the log with a specific mover.
    mover: { type: Schema.Types.ObjectId, ref: 'MagicMover', required: true },

    // Defines the action that the mover performed, e.g., 'loading', 'on-mission', or 'unloading'.
    action: {
        type: String,
        enum: ['loading', 'on-mission', 'unloading'], // Enforcing specific action states.
        required: true
    },

    // Timestamp when the action occurred. Defaults to the current time.
    timestamp: { type: Date, default: Date.now }
}, {
    timestamps: true // Adds 'createdAt' and 'updatedAt' automatically for record tracking.
});

// Create and export the MissionLog model using the schema
export const MissionLog = model<MissionLogDocument>('MissionLog', missionLogSchema);
