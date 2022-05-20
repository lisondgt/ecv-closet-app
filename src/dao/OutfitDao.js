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

    async fetchAllByTopKey(topKey) {
        try {
            const result = await this.getCollection()
                .where('topKey', '==', topKey)
                .get();

            if (result?.docs?.length > 0) {
                return result.docs.map(doc => {
                    return { ...doc.data(), key: doc.id };
                });
            }

            return [];
        } catch (err) {
            console.error('[OutfitDao][fetchAllByTopKey]', err);

            return null;
        }
    }

    async fetchAllByBottomKey(bottomKey) {
        try {
            const result = await this.getCollection()
                .where('bottomKey', '==', bottomKey)
                .get();

            if (result?.docs?.length > 0) {
                return result.docs.map(doc => {
                    return { ...doc.data(), key: doc.id };
                });
            }

            return [];
        } catch (err) {
            console.error('[OutfitDao][fetchAllByBottomKey]', err);

            return null;
        }
    }

    async fetchAllByLayerKey(layerKey) {
        try {
            const result = await this.getCollection()
                .where('layerKey', '==', layerKey)
                .get();

            if (result?.docs?.length > 0) {
                return result.docs.map(doc => {
                    return { ...doc.data(), key: doc.id };
                });
            }

            return [];
        } catch (err) {
            console.error('[OutfitDao][fetchAllByLayerKey]', err);

            return null;
        }
    }

    async fetchAllByShoesKey(shoesKey) {
        try {
            const result = await this.getCollection()
                .where('shoesKey', '==', shoesKey)
                .get();

            if (result?.docs?.length > 0) {
                return result.docs.map(doc => {
                    return { ...doc.data(), key: doc.id };
                });
            }

            return [];
        } catch (err) {
            console.error('[OutfitDao][fetchAllByShoesKey]', err);

            return null;
        }
    }

    async fetchAllByAccessoriesKey(accessoriesKey) {
        try {
            const result = await this.getCollection()
                .where('accessoriesKey', 'array-contains-any', [accessoriesKey])
                .get();

            if (result?.docs?.length > 0) {
                return result.docs.map(doc => {
                    return { ...doc.data(), key: doc.id };
                });
            }

            return [];
        } catch (err) {
            console.error('[OutfitDao][fetchAllByAccessoriesKey]', err);

            return null;
        }
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

    async removeTopKey(topKey) {
        return this.fetchAllByTopKey(topKey).then((outfits) => {
            return Promise.all(outfits.map((outfit) => {
                this.update(outfit.key, {
                    topKey: '',
                });
            }));
        });
    }

    async removeBottomKey(bottomKey) {
        return this.fetchAllByBottomKey(bottomKey).then((outfits) => {
            return Promise.all(outfits.map((outfit) => {
                this.update(outfit.key, {
                    bottomKey: '',
                });
            }));
        });
    }

    async removeLayerKey(layerKey) {
        return this.fetchAllByLayerKey(layerKey).then((outfits) => {
            return Promise.all(outfits.map((outfit) => {
                this.update(outfit.key, {
                    layerKey: '',
                });
            }));
        });
    }

    async removeShoesKey(shoesKey) {
        return this.fetchAllByShoesKey(shoesKey).then((outfits) => {
            return Promise.all(outfits.map((outfit) => {
                this.update(outfit.key, {
                    shoesKey: '',
                });
            }));
        });
    }

    async removeAccessoriesKey(accessoriesKey) {
        return this.fetchAllByAccessoriesKey(accessoriesKey).then((outfits) => {
            return Promise.all(outfits.map((outfit) => {
                var array = [outfit.accessoriesKey]; // make a separate copy of the array
                var index = array.indexOf(outfit.accessoriesKey);
                if (index !== -1) {
                    array.splice(index, 1);
                }
                this.update(outfit.key, {
                    accessoriesKey: array,
                });
            }));
        });
    }
}