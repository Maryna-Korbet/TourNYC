// To work with firebase, you must initialize the project
import { initializeApp } from 'firebase/app';
// Function for connecting authorization to the projectт
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
// A function for connecting a database to a project
import { getFirestore } from "firebase/firestore";
// Function for connecting file storage to the project
import { getStorage } from "firebase/storage";
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    FIREBASE_WEB_API_KEY,
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_DATABASE_URL,
    FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET_DOMAIN,
    FIREBASE_SENDER_ID,
} from "@env"; 

const firebaseConfig = {
    apiKey: FIREBASE_WEB_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    databaseURL: FIREBASE_DATABASE_URL,
    projectId: FIREBASE_PROJECT_ID,
    storageBucket: FIREBASE_STORAGE_BUCKET_DOMAIN,
    messagingSenderId: FIREBASE_SENDER_ID,
    /* appId: 'app-id', */
    /* measurementId: 'G-measurement-id', */
};

const app = initializeApp(firebaseConfig);

//Auth initialization with AsyncStorage for redux persistor operation
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});

// export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);