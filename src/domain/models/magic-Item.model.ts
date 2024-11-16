import { Schema, model, Document, ObjectId } from 'mongoose';
import { MagicItemDocument } from '../Documents/magic-item.document';

/**
 * MagicItem Schema represents the structure for MagicItem documents in MongoDB.
 */
const itemSchema = new Schema<MagicItemDocument>({
    name: { type: String, required: true },  // The name of the magic item
    weight: { type: Number, required: true } // The weight of the magic item
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Create and export the MagicItem model using the schema
export const MagicItem = model<MagicItemDocument>('MagicItem', itemSchema);
