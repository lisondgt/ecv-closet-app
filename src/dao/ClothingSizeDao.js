import { FirestoreDao } from './FirestoreDao';

export class ClothingSizeDao extends FirestoreDao {
    constructor() {
        super('clothing-size');
    }
}