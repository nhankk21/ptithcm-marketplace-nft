import { initializeApp } from 'firebase/app';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDTesWUr6x85wQti9eqkp8clZeeHFvzhAw',
  authDomain: 'nft-marketplace-c23d2.firebaseapp.com',
  projectId: 'nft-marketplace-c23d2',
  storageBucket: 'nft-marketplace-c23d2.appspot.com',
  messagingSenderId: '836370222228',
  appId: '1:836370222228:web:f3bc3eb9f8506e8ba17881',
  measurementId: 'G-DCRV9WPSMJ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const uploadImageWithPath = async ({ blob, address, name, path }) => {
  const pathRef = ref(storage, `${path}/${address}/${name}.png`);
  await uploadBytes(pathRef, blob);
  return getDownloadURL(pathRef);
};

export const uploadImage = async ({ uri, address, name, type }) => {
  let blob;
  try {
    blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });
    return uploadImageWithPath({ blob, address, name, path: type });
  } catch (error) {
    return error.message;
  } finally {
    blob && blob.close();
  }
};
