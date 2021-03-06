import { FirestoreDao } from './FirestoreDao';

export class ClothingCalendarDao extends FirestoreDao {
    constructor() {
        super('clothing-calendar');
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
            console.error('[ClothingCalendarDao][fetchAllByUserId]', err);

            return null;
        }
    }

    async fetchAllByDateAndClothingKey(date, clothingKey) {
        try {
            const result = await this.getCollection()
                .where('date', '==', date)
                .where('clothingKey', '==', clothingKey)
                .get();

            if (result?.docs?.length > 0) {
                return result.docs.map(doc => {
                    return { ...doc.data(), key: doc.id };
                });
            }

            return [];
        } catch (err) {
            console.error('[ClothingCalendarDao][fetchAllByDateAndClothingKey]', err);

            return null;
        }
    }

    async fetchAllByClothingKey(clothingKey) {
        try {
            const result = await this.getCollection()
                .where('clothingKey', '==', clothingKey)
                .get();

            if (result?.docs?.length > 0) {
                return result.docs.map(doc => {
                    return { ...doc.data(), key: doc.id };
                });
            }

            return [];
        } catch (err) {
            console.error('[ClothingCalendarDao][fetchAllClothingKey]', err);

            return null;
        }
    }

    async removeCalendar(selectedDate, clothingKey) {
        return this.fetchAllByDateAndClothingKey(selectedDate, clothingKey).then((clothingCalendars) => {
            return Promise.all(clothingCalendars.map((item) => {
                this.remove(item.key);
            }));
        });
    }

    async removeCalendarByClothingKey(clothingKey) {
        return this.fetchAllByClothingKey(clothingKey).then((clothingCalendars) => {
            return Promise.all(clothingCalendars.map((item) => {
                this.remove(item.key);
            }));
        });
    }
}