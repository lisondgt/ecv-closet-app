import { FirestoreDao } from './FirestoreDao';

export class ClothingDao extends FirestoreDao {
    constructor() {
        super('clothing');
    }

    async fetchAllByType(type) {
        try {
            const result = await this.getCollection()
                .where('type', '==', type)
                .get();

            if (result?.docs?.length > 0) {
                return result.docs.map(doc => {
                    return { ...doc.data(), key: doc.id };
                });
            }

            return [];
        } catch (err) {
            console.error('[ClothingDao][fetchAllByType]', err);

            return null;
        }
    }
}