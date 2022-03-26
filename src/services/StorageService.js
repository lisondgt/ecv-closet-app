import storage from '@react-native-firebase/storage';

export class StorageService {
    async update() {
        try {

        } catch (error) {
            console.error('message error :', error);
        }
    }

    async uploadAndGetUrl(name, uri) {
        try {
            await this.upload(name, uri);
            return this.getUrl(name);
        } catch (error) {
            console.error('message error :', error);
        }
    }

    async upload(name, uri) {
        try {
            await storage().ref(name).putFile(uri);
        } catch (error) {
            console.error('message error :', error);
        }
    }

    async getUrl(name) {
        try {
            return storage().ref('/' + name).getDownloadURL();
        } catch (error) {
            console.error('message error :', error);
        }
    }

    async remove() {
        try {

        } catch (error) {
            console.error('message error :', error);
        }
    }
}