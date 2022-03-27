import storage from '@react-native-firebase/storage';

export class StorageService {
    async update() {
        try {

        } catch (err) {
            console.error('[StorageService][update]', err);
        }
    }

    async uploadAndGetUrl(name, uri) {
        try {
            await this.upload(name, uri);
            return this.getUrl(name);
        } catch (err) {
            console.error('[StorageService][uploadAndGetUrl]', err);
        }
    }

    async upload(name, uri) {
        try {
            await storage().ref(name).putFile(uri);
        } catch (err) {
            console.error('[StorageService][upload]', err);
        }
    }

    async getUrl(name) {
        try {
            return storage().ref('/' + name).getDownloadURL();
        } catch (err) {
            console.error('[StorageService][getUrl]', err);
        }
    }

    async remove() {
        try {

        } catch (err) {
            console.error('[StorageService][remove]', err);
        }
    }
}