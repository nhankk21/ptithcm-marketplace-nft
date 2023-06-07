import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDTesWUr6x85wQti9eqkp8clZeeHFvzhAw",
    authDomain: "nft-marketplace-c23d2.firebaseapp.com",
    projectId: "nft-marketplace-c23d2",
    storageBucket: "nft-marketplace-c23d2.appspot.com",
    messagingSenderId: "836370222228",
    appId: "1:836370222228:web:f3bc3eb9f8506e8ba17881",
    measurementId: "G-DCRV9WPSMJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

/**
 * @param {File} file
 * @param {string} path
 * @return {Promise<string>}
 */
export default async function (file: File, path: string): Promise<string> {
    // Create a unique file name for the image
    const fileName = `${Date.now()}-${file.name}`;

    // Get a reference to the location where the image will be stored in Firebase Storage
    const storageRef = ref(storage, `${path}/${fileName}`);
    const metadata = {
        contentType: file.type,
    };
    // Upload the file to Firebase Storage
    const snapshot = await uploadBytes(storageRef, file, metadata);

    // Get the download URL of the uploaded file
    const downloadURL = await getDownloadURL(snapshot.ref);

    // Return the download URL
    return downloadURL;
}
