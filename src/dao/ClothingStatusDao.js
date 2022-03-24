import { FirestoreDao } from './FirestoreDao';

export class ClothingStatusDao extends FirestoreDao {
    constructor() {
        super('clothing-status');
    }
}