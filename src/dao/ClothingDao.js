import { FirestoreDao } from './FirestoreDao';
import { StorageService } from '../services/StorageService';

export class ClothingDao extends FirestoreDao {
    storageService = new StorageService();

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
                const docs = result.docs.map(doc => {
                    return { ...doc.data(), key: doc.id };
                });
                await Promise.all(docs.map((doc) => {
                    return this.storageService.getUrl('/' + doc.image).then((url) => {
                        doc.imageUrl = url;
                    });
                }));
                return docs;
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
                const docs = result.docs.map(doc => {
                    return { ...doc.data(), key: doc.id };
                });
                await Promise.all(docs.map((doc) => {
                    return this.storageService.getUrl('/' + doc.image).then((url) => {
                        doc.imageUrl = url;
                    });
                }));
                return docs;
            }

            return [];
        } catch (err) {
            console.error('[ClothingDao][fetchAllBottoms]', err);

            return null;
        }
    }
}