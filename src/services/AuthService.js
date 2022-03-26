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
        } catch (error) {
            console.error('errorMessage:', error.message);
        }
    }

    async signIn(email, password) {
        try {
            await auth().signInWithEmailAndPassword(email, password);
            console.log('User logged-in successfully!');
        } catch (error) {
            console.log('errorMessage:', error.message);
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
        } catch (error) {
            console.log('errorMessage:', error.message);
        }
    }

    async reauthenticate(password) {
        try {
            var user = auth().currentUser;
            var cred = auth.EmailAuthProvider.credential(
                user.email, password);
            return user.reauthenticateWithCredential(cred);
        } catch (error) {
            console.log('errorMessage:', error.message);
        }
    }

    async changeEmail(email) {
        try {
            await auth().currentUser.updateEmail(email);
            console.log("Email updated!");
        } catch (error) {
            console.log('errorMessage:', error.message);
        }
    }

    async changePassword(newPassword) {
        try {
            await auth().currentUser.updatePassword(newPassword);
            console.log("Password updated!");
        } catch (error) {
            console.log('errorMessage:', error.message);
        }
    }

    async signOut() {
        try {
            await auth().signOut();
        } catch (error) {
            console.log('errorMessage:', error.message);
        }
    }

    async accountRemove() {
        try {
            await auth().currentUser.delete();
        } catch (error) {
            console.log('errorMessage:', error.message);
        }
    }
}