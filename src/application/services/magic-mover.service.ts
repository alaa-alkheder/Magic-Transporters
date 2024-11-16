import {injectable} from 'tsyringe';
import {MagicMoverRepository} from "../../infrastructure/mongoose/repository/magic-mover.repository";
import {MagicMover} from "../../domain/models/mover.model";
import {MagicItem} from "../../domain/models/magic-Item.model";
import {MagicItemRepository} from "../../infrastructure/mongoose/repository/magic-item.repository";
import {MissionLogRepository} from "../../infrastructure/mongoose/repository/mission-log.repository";
import {MissionLog} from "../../domain/models/mission-log.model";
import {ObjectId} from "mongoose"; // Dependency injection

interface MagicMoverCreateDto {
    name: string;
    weightLimit: number;
}

interface MagicItem {
    name: string;
    weight: number;
}

const magicMoverRepository = new MagicMoverRepository(MagicMover);
const magicItemRepository = new MagicItemRepository(MagicItem);
const missionLogRepository = new MissionLogRepository(MissionLog);

/**
 * MagicMoverService handles business logic related to Magic Movers, their items, and missions.
 */
@injectable()
export class MagicMoverService {
    private magicMoverRepository: MagicMoverRepository;
    private missionLogRepository: MissionLogRepository;
    private magicItemRepository: MagicItemRepository;

    constructor() {
        this.magicMoverRepository = magicMoverRepository;
        this.magicItemRepository = magicItemRepository;
        this.missionLogRepository = missionLogRepository;
    }


    /**
     * Creates and adds a new Magic Mover.
     *
     * @param {MagicMoverCreateDto} magicMoverData - Data to create a new Magic Mover.
     * @returns {Promise<MagicMover>} - The created Magic Mover.
     */    async addMagicMover(magicMoverData: MagicMoverCreateDto) {
        const mover = await this.magicMoverRepository.create({
            name: magicMoverData.name,
            weightLimit: magicMoverData.weightLimit,
            questState: 'resting', // Default state
            currentWeight: 0,
            missionsCompleted: 0,
            items: []
        });
        await this.missionLogRepository.create({action: 'resting', mover: mover._id  as ObjectId , timestamp: new Date()})
        return mover;
    }
    /**
     * Loads a Magic Mover with a Magic Item.
     *
     * @param {string} moverId - The ID of the Magic Mover.
     * @param {string} itemId - The ID of the Magic Item to be loaded.
     * @returns {Promise<MagicMover>} - The updated Magic Mover after loading the item.
     * @throws Will throw an error if the Magic Mover is on a mission or exceeds weight limit.
     */
    async loadMagicMover(moverId: string, itemId: string) {
        // Fetch the Magic Mover by its ID
        const mover = await this.magicMoverRepository.findById(moverId);

        if (!mover) {
            throw new Error('Magic Mover not found');
        }

        // Validate if mover is in loading state and has capacity
        if (mover.questState === 'on-mission') {
            throw new Error('Magic Mover on mission state,so he can not load items');
        }

        //
        if (mover.questState === 'resting') {
            await this.missionLogRepository.create({action: 'loading', mover: mover._id  as ObjectId, timestamp: new Date()})
        }

        // Fetch the Magic Item by its ID
        const item = await magicItemRepository.findById(itemId);
        if (!item) {
            throw new Error('Magic Item not found');
        }

        // Check if the mover has enough capacity to carry the item
        if (mover.currentWeight + item.weight > mover.weightLimit) {
            throw new Error('Exceeds weight limit');
        }

        // Add the item ObjectId to the mover's items array
        mover.items.push(item.id);
        mover.currentWeight += item.weight;
        mover.questState = 'loading';

        // Update the Magic Mover's state in the database
        return this.magicMoverRepository.update(moverId, mover);
    }

    /**
     * Starts a mission for a Magic Mover.
     *
     * @param {string} moverId - The ID of the Magic Mover.
     * @returns {Promise<MagicMover>} - The Magic Mover with its state updated to 'on-mission'.
     * @throws Will throw an error if the Mover is not in 'loading' state.
     */
    async startMission(moverId: string) {
        const mover = await this.magicMoverRepository.findById(moverId);

        if (!mover) {
            throw new Error('Magic Mover not found');
        }

        if (mover.questState !== 'loading') {
            throw new Error('Mover must be in loading state to start a mission');
        }

        // Change state to on-mission and log the mission start
        mover.questState = 'on-mission';
        await this.missionLogRepository.create({action: 'on-mission', mover: mover._id  as ObjectId, timestamp: new Date()})

        return this.magicMoverRepository.update(moverId, mover);
    }

    /**
     * Ends the mission for a Magic Mover, resets the mover, and logs the completion.
     *
     * @param {string} moverId - The ID of the Magic Mover.
     * @returns {Promise<MagicMover>} - The Magic Mover after resetting its state to 'resting'.
     * @throws Will throw an error if the Mover is not currently on a mission.
     */
    async endMission(moverId: string) {
        const mover = await this.magicMoverRepository.findById(moverId);

        if (!mover) {
            throw new Error('Magic Mover not found');
        }

        if (mover.questState !== 'on-mission') {
            throw new Error('Mover must be on-mission to end it');
        }

        // Clear items, reset weight, and change state to resting
        mover.items = [];
        mover.currentWeight = 0;
        mover.questState = 'resting';
        mover.missionsCompleted += 1;
        await this.missionLogRepository.create({action: 'resting', mover: mover._id  as ObjectId, timestamp: new Date()})

        return this.magicMoverRepository.update(moverId, mover);
    }

    /**
     * Retrieves the top Magic Movers based on the number of completed missions.
     *
     * @returns {Promise<MagicMover[]>} - A list of top Magic Movers.
     */
    async getTopMovers() {
        return await this.magicMoverRepository.getTopMovers();    }
    /**
     * Fetches all Magic Movers.
     *
     * @returns {Promise<MagicMover[]>} - A list of all Magic Movers.
     */

    async getMagicMover() {
        return await this.magicMoverRepository.find({})
    }
}
