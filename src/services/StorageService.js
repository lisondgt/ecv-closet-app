import storage from '@react-native-firebase/storage';

export class StorageService {
    async update() {
        try {

        } catch (err) {
            console.error('[StorageService][update]', err);
        }
    }

    async uploadAndGetUrl(name, uri, progressCallBack) {
        try {
            const ref = await this.upload(name, uri, progressCallBack);
            // return this.getUrl(name);
            return ref.getDownloadURL();
        } catch (err) {
            console.error('[StorageService][uploadAndGetUrl]', err);
        }
    }

    async upload(name, uri, progressCallBack) {
        try {
            const ref = storage().ref(name);
            const task = ref.putFile(uri);
            task.on('state_changed', (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                if (progressCallBack) {
                    progressCallBack(progress);
                }
            });
            await task;
            return ref;
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