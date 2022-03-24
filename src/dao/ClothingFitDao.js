import { FirestoreDao } from './FirestoreDao';

export class ClothingFitDao extends FirestoreDao {
    constructor() {
        super('clothing-fit');
    }
}