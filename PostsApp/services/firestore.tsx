import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, storage } from '../firebase.config';
import { UserData } from '../utils/authTypes';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';



// ===== Functions for adding a document to a Firestore collection ===== //

// The function of adding a new user 
export const addUser = async (userId: string, userData: UserData) => {
    try {
        await setDoc(doc(db, 'users', userId), userData, { merge: true });
        
        //! Delete cosole.log
        console.log('User added:', userId);
    } catch (error) {
        console.error('Error adding user:', error);
    }
};

// The function of adding a new post 
export const addPost = async (userId: string, post: any) => {
    try {
        await setDoc(doc(db, 'posts', userId), { userId, posts: [post] }, { merge: true });
        
        //! Delete cosole.log
        console.log('Post added:', userId);
    } catch (error) {
        console.error('Error adding post:', error);
    }
};


// ===== Functions for getting a document into a Firestore collection ===== //

// Function for getting data about the user from the collection
export const getUser = async (userId: string) => {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log('User data:', docSnap.data());
        return docSnap.data();
    } else {
        console.log('No such document!');
        return null;
    }
};

// A function for recording user data in Firestore
export const updateUserInFirestore = async (uid: string, data: any) => {
    try {
        await setDoc(doc(db, 'users', uid), data, { merge: true }); // merge: true - для оновлення існуючого документа або створення нового
        console.log('User data updated to Firestore:', uid);
    } catch (error) {
        console.error('Error saving user data to Firestore:', error);
    }
};

// Image upload function 
export const uploadImage = async (
    userId: string,
    file: Blob,
    fileName: string,
) => {
    try {
        const imageRef = ref(storage, `profilePhotos/${userId}/${fileName}`);

        console.log('Uploading to:', imageRef.fullPath);
        const result = await uploadBytes(imageRef, file);
        console.log('Upload result:', result);
        return imageRef;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
};


// A function to get the URL of the uploaded image
export const getImageUrl = async (imageRef: any) => {
    const url = await getDownloadURL(imageRef);
    return url;
};