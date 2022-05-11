import { FirestoreDao } from './FirestoreDao';

export class OutfitCalendarDao extends FirestoreDao {
    constructor() {
        super('outfit-calendar');
    }

    async fetchAllById(currentUserId) {
        try {
            const result = await this.getCollection()
                .where('userId', '==', currentUserId)
                .get();

            if (result?.docs?.length > 0) {
                return result.docs.map(doc => {
                    return { ...doc.data(), key: doc.id };
                });
            }

            return [];
        } catch (err) {
            console.error('[OutfitDao][fetchAllById]', err);

            return null;
        }
    }

    async fetchAllByDateAndOutfitKey(date, outfitKey) {
        try {
            const result = await this.getCollection()
                .where('date', '==', date)
                .where('outfitKey', '==', outfitKey)
                .get();

            if (result?.docs?.length > 0) {
                return result.docs.map(doc => {
                    return { ...doc.data(), key: doc.id };
                });
            }

            return [];
        } catch (err) {
            console.error('[OutfitDao][fetchAllByDateAndOutfitKey]', err);

            return null;
        }
    }

    async removeCalendar(selectedDate, outfitKey) {
        return this.fetchAllByDateAndOutfitKey(selectedDate, outfitKey).then((outfitCalendars) => {
            return Promise.all(outfitCalendars.map((item) => {
                this.remove(item.key);
            }));
        });
    }
}