import { FirestoreDao } from './FirestoreDao';

export class ClothingFitDao extends FirestoreDao {
    constructor() {
        super('clothing-fit');
    }

    async fetchAllByUserId(userId) {
        try {
            const result = await this.getCollection()
                .where('userId', 'in', [userId, 'all'])
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