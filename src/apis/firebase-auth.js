import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js'

const firebaseConfig = {
   apiKey: "AIzaSyCjrZqbFcMY0Mv-ur9SnQiQw303C2l9KWQ",
   authDomain: "maritravel-4abe7.firebaseapp.com",
   projectId: "maritravel-4abe7",
   storageBucket: "maritravel-4abe7.appspot.com",
   messagingSenderId: "495008977447",
   appId: "1:495008977447:web:a46002f4daa481d5053402"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider();
export const auth = getAuth(app);

