import { ClothingDao } from "../dao/ClothingDao";
import { OutfitDao } from "../dao/OutfitDao";
import { StorageService } from '../services/StorageService';

export class OutfitService {
    outfitDao = new OutfitDao();
    clothingDao = new ClothingDao();
    storageService = new StorageService();

    async fetchAllById(currentUserId) {
        return this.outfitDao.fetchAllById(currentUserId).then((outfits) => {
            return Promise.all(outfits.map((outfit) => {
                return Promise.all([
                    this.fetchClothingImage(outfit.topKey).then((clothingImage) => {
                        this.storageService.getUrl('/' + clothingImage).then((url) => {
                            outfit.top = url;
                        });
                    }),
                    this.fetchClothingImage(outfit.bottomKey).then((clothingImage) => {
                        outfit.bottom = clothingImage;
                    }),
                    this.fetchClothingImage(outfit.layerKey).then((clothingImage) => {
                        outfit.layer = clothingImage;
                    }),
                    this.fetchClothingImage(outfit.shoesKey).then((clothingImage) => {
                        outfit.shoes = clothingImage;
                    }),
                    this.fetchClothingImages(outfit.accessoriesKey).then((clothingImage) => {
                        outfit.accessories = clothingImage;
                    })
                ]).then(() => outfit);
            }));
        });
    }

    async fetchAllBySeason(season, currentUserId) {
        return this.outfitDao.fetchAllBySeason(season, currentUserId).then((outfits) => {
            return Promise.all(outfits.map((outfit) => {
                return Promise.all([
                    this.fetchClothingImage(outfit.topKey).then((clothingImage) => {
                        outfit.top = clothingImage;
                    }),
                    this.fetchClothingImage(outfit.bottomKey).then((clothingImage) => {
                        outfit.bottom = clothingImage;
                    }),
                    this.fetchClothingImage(outfit.layerKey).then((clothingImage) => {
                        outfit.layer = clothingImage;
                    }),
                    this.fetchClothingImage(outfit.shoesKey).then((clothingImage) => {
                        outfit.shoes = clothingImage;
                    })
                ]).then(() => outfit);
            }));
        });
    }

    async fetchOne(key) {
        return this.outfitDao.fetchOne(key).then((outfit) => {
            return Promise.all([
                this.fetchClothingImage(outfit.topKey).then((clothingImage) => {
                    outfit.topImage = clothingImage;
                }),
                this.fetchClothingImage(outfit.bottomKey).then((clothingImage) => {
                    outfit.bottomImage = clothingImage;
                }),
                this.fetchClothingImage(outfit.layerKey).then((clothingImage) => {
                    outfit.layerImage = clothingImage;
                }),
                this.fetchClothingImage(outfit.shoesKey).then((clothingImage) => {
                    outfit.shoesImage = clothingImage;
                }),
                this.fetchClothingImages(outfit.accessoriesKey).then((clothingImage) => {
                    outfit.accessoriesImage = clothingImage;
                })
            ]).then(() => outfit);
        });
    }

    async fetchClothingImages(clothingKeys) {
        if (clothingKeys) {
            return Promise.all(clothingKeys.map((clothingKey) => this.fetchClothingImage(clothingKey)));
        }
        return [];
    }

    async fetchClothingImage(clothingKey) {
        if (clothingKey) {
            return this.clothingDao.fetchOne(clothingKey).then((clothing) => {
                return this.storageService.getUrl('/' + clothing.image).then((url) => {
                    clothing.image = url;
                    return clothing.image;
                });
            });
        }
        return null;
    }
}