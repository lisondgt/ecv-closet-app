import { FirestoreDao } from './FirestoreDao';

export class OutfitDao extends FirestoreDao {
    constructor() {
        super('outfit');
    }
}