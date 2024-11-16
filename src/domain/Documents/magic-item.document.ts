// Define the Mongoose Document interface for the MagicMover
import {ObjectId} from "mongoose";

 // Define the Mongoose Document interface for the MagicMover
export interface MagicItemDocument extends Document {
     name: string;
    weight: number;
}

import { Document } from 'mongoose';

/**
 * MagicItemDocument defines the schema for a Magic Item in the database.
 */
export interface MagicItemDocument extends Document {
    name: string;         // The name of the magic item
    weight: number;       // The weight of the magic item
}