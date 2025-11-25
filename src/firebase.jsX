import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyAkX6Ag5musydSuPaG4bL9p829TdTqcWAc",
  authDomain: "Furniture-web-reviews.firebaseapp.com",
  projectId: "Furniture-web-reviews",
  storageBucket: "Furniture-web-reviews.firebasestorage.app",
  messagingSenderId: "1042682787611",
  appId: "1:1042682787611:web:952ae1e895852fd53145be",
  measurementId: "G-Z9VEP8ZE4Y"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
