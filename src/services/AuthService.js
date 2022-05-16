import auth from '@react-native-firebase/auth';

export class AuthService {
    async signUp({ email, password, firstname, lastname, photoURL = null }) {
        try {
            const result = await auth()
                .createUserWithEmailAndPassword(email, password);
            await result.user.updateProfile({
                displayName: firstname + ' ' + lastname,
                photoURL
            });
        } catch (err) {
            console.error('[AuthService][signUp]', err);
        }
    }

    async signIn(email, password) {
        return auth().signInWithEmailAndPassword(email, password);
    }

    getUser() {
        return auth().currentUser;
    }

    getUserState(userStateCallBack) {
        return auth().onAuthStateChanged(userStateCallBack);
    }

    async editUser({ firstname, lastname, photoURL }) {
        try {
            await auth()
                .currentUser.updateProfile({
                    displayName: firstname + ' ' + lastname,
                    photoURL
                });
        } catch (err) {
            console.error('[AuthService][editUser]', err);
        }
    }

    async reauthenticate(password) {
        try {
            var user = auth().currentUser;
            var cred = auth.EmailAuthProvider.credential(
                user.email, password);
            return user.reauthenticateWithCredential(cred);
        } catch (err) {
            console.error('[AuthService][reauthenticate]', err);
        }
    }

    async changeEmail(email) {
        try {
            await auth().currentUser.updateEmail(email);
        } catch (err) {
            console.error('[AuthService][changeEmail]', err);
        }
    }

    async changePassword(newPassword) {
        try {
            await auth().currentUser.updatePassword(newPassword);
        } catch (err) {
            console.error('[AuthService][changePassword]', err);
        }
    }

    async signOut() {
        try {
            await auth().signOut();
        } catch (err) {
            console.error('[AuthService][signOut]', err);
        }
    }

    async accountRemove() {
        try {
            await auth().currentUser.delete();
        } catch (err) {
            console.error('[AuthService][accountRemove]', err);
        }
    }
}