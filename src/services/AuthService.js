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
            console.log('User registered successfully!');
        } catch (err) {
            console.error('[AuthService][signUp]', err);
        }
    }

    async signIn(email, password) {
        try {
            await auth().signInWithEmailAndPassword(email, password);
            console.log('User logged-in successfully!');
        } catch (err) {
            console.error('[AuthService][signIn]', err);
        }

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
            console.log("Email updated!");
        } catch (err) {
            console.error('[AuthService][changeEmail]', err);
        }
    }

    async changePassword(newPassword) {
        try {
            await auth().currentUser.updatePassword(newPassword);
            console.log("Password updated!");
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