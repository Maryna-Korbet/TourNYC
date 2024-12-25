import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    updateProfile,
    signOut,
} from 'firebase/auth';
import { auth } from '../firebase.config';
import { setUserInfo, clearUserInfo } from '../redux/auth/authReducer';
import { AppDispatch } from '../redux/store';
import { addUser, getUser, updateUserInFirestore } from './firestore';

// Types for registration and authorization
interface AuthCredentials {
    profilePhoto: string;
    displayName: string;
    email: string;
    password: string;
};

// New user registration function
export const registerDB = async ({ email, password, displayName, profilePhoto }: AuthCredentials) => {
    try {
        const credentials = await createUserWithEmailAndPassword(auth, email, password);
        const user = credentials.user;

        await updateProfile(user, { displayName, photoURL: profilePhoto });

        await addUser(user.uid, { uid: user.uid, email: user.email || '', displayName: user.displayName || '', profilePhoto: user.photoURL || "" });
    } catch (error) {
        console.log('SIGNUP ERROR:', error)
    };
};

// Function for user login and saving it in Redux
export const loginDB = async ({ email, password }: AuthCredentials, dispatch: AppDispatch) => {
    try {
        const credentials = await signInWithEmailAndPassword(auth, email, password);
        const user = credentials.user;

        dispatch(setUserInfo({
            uid: user.uid,
            email: user?.email || '',
            displayName: user?.displayName || '',
            profilePhoto: user?.photoURL || "",
        }));
        return user;
    } catch (error) {
        throw error;
    }
};

// Logout function
export const logoutDB = async (dispatch: AppDispatch) => {
    try {
        await signOut(auth);
        // Clear user information in Redux
        dispatch(clearUserInfo());
    } catch (error) {
        console.error('Logout error:', error);
    }
};

// Tracking changes in authentication status
export const authStateChanged = async (dispatch: AppDispatch) => {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const userData = await getUser(user.uid)

            dispatch(setUserInfo({
                ...userData,
                uid: user.uid,
                email: user.email || '',
            }));
        } else {
            dispatch(clearUserInfo());
        }
    });
};

//Updating user profile
export const updateUserProfile = async (update: { displayName?: string; photoURL?: string }) => {
    const user = auth.currentUser;
    if (user) {
        try {
            await updateProfile(user, update);
            await updateUserInFirestore(user.uid, update);
        } catch (error) {
            throw error;
        }
    }
};