import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyAhvAeKgQBhAFd6MzOnybKO9Us7GsSnN-Q",
    authDomain: "llamachatapp.firebaseapp.com",
    projectId: "llamachatapp",
    storageBucket: "llamachatapp.appspot.com",
    messagingSenderId: "988695303666",
    appId: "1:988695303666:web:703b84b8a5d09e16e5876b",
    measurementId: "G-NY8FEN7QT4"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };

