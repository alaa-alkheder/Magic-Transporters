import { Document, ObjectId } from 'mongoose';

/**
 * MissionLogDocument defines the schema for a Mission Log entry.
 */
export interface MissionLogDocument extends Document {
    timestamp: Date;  // The timestamp of the mission log entry
    action: string;    // The action taken (e.g., 'loading', 'on-mission', 'unloading')
    mover: ObjectId;   // Reference to the Magic Mover associated with this log
}
