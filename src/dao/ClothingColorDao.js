import { FirestoreDao } from './FirestoreDao';

export class ClothingColorDao extends FirestoreDao {
    constructor() {
        super('clothing-color');
    }
}