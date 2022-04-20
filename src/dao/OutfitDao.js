import { FirestoreDao } from './FirestoreDao';

export class OutfitDao extends FirestoreDao {
    constructor() {
        super('outfit');
    }

    async fetchAllBySeason(season, currentUserId) {
        try {
            const result = await this.getCollection()
                .where('season', '==', season)
                .where('userId', '==', currentUserId)
                .get();

            if (result?.docs?.length > 0) {
                return result.docs.map(doc => {
                    return { ...doc.data(), key: doc.id };
                });
            }

            return [];
        } catch (err) {
            console.error('[OutfitDao][fetchAllBySeason]', err);

            return null;
        }
    }
}