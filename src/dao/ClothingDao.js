import { FirestoreDao } from './FirestoreDao';

export class ClothingDao extends FirestoreDao {
    constructor() {
        super('clothing');
    }

    async fetchAllByType(type, currentUserId) {
        try {
            const result = await this.getCollection()
                .where('type', '==', type)
                .where('userId', '==', currentUserId)
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

    async fetchAllBottoms(currentUserId) {
        try {
            const result = await this.getCollection()
                .where('type', 'in', ['Pantalons', 'Robes', 'Jupes'])
                .where('userId', '==', currentUserId)
                .get();

            if (result?.docs?.length > 0) {
                return result.docs.map(doc => {
                    return { ...doc.data(), key: doc.id };
                });
            }

            return [];
        } catch (err) {
            console.error('[ClothingDao][fetchAllBottoms]', err);

            return null;
        }
    }
}