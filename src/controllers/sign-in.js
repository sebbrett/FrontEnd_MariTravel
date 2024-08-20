import { auth, provider } from "/src/apis/firebase-auth.js"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup} from 'https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js'

const signInForm = document.querySelector('#sign-in-form')
const notMemberLabel = document.querySelector('#not-member-label')
const showPasswordLabel = document.querySelector('#show-password')
const googleSignInBtn = document.querySelector('#google-login-btn')

//Initialize the show-password button
document.querySelector('#show-password').classList.add('fa-eye-slash');

//Define sign in 
const signIn = (event) => {
   event.preventDefault()
   const email = signInForm['email-input'].value
   const password = signInForm['password-input'].value

   signInWithEmailAndPassword(auth, email, password)
      .then(() => { 
         window.location.replace('/index.html')
      })
      .catch(error => {
         const errorLabel = document.querySelector('#error-message')
         switch (error.code) {
            case 'auth/invalid-credential':
               errorLabel.textContent = "Invalid credential";
               break;
            case 'auth/wrong-password':
               errorLabel.textContent = "Provided password is incorrect";
               break;
            case 'auth/invalid-email':
               errorLabel.textContent = "Invalid email address";
               break;
            case 'auth/user-disabled':
               errorLabel.textContent = "User is disabled";
               break;
            case 'auth/user-not-found':
               errorLabel.textContent = "User not found";
               break;
            default:
               console.log(error.code)
               errorLabel.textContent = "An unknown error occurred";
         }
      });
}

//Define sign up
const signUp = (event) => {
   event.preventDefault()
   const email = signInForm['email-input'].value
   const password = signInForm['password-input'].value

   createUserWithEmailAndPassword(auth, email, password)
      .then(() => { 
         window.location.replace('/index.html')
      })
      .catch(error => {
         const errorLabel = document.querySelector('#error-message')
         switch (error.code) {
            case 'auth/weak-password':
               errorLabel.textContent = "Password should be at least 6 characters";
               break;
            case 'auth/email-already-in-use':
               errorLabel.textContent = "Email address is already in use by another account";
               break;
            case 'auth/invalid-email':
               errorLabel.textContent = "Invalid email address";
               break;
            case 'auth/operation-not-allowed':
               errorLabel.textContent = "Email/password accounts are not enabled";
               break;
            default:
               errorLabel.textContent = "An unknown error occurred";
         }
      });
}

//Define sign in with google
const signInWithGoogle = () => {
   signInWithPopup(auth, provider)
      .then((result) => {
         window.location.replace('/index.html')
      }).catch((error) => {
         console.log(error.message);
      });
}

//Adding event listener to respective button/label
signInForm.addEventListener('submit', signIn)
googleSignInBtn.addEventListener('click', signInWithGoogle)

notMemberLabel.addEventListener('click', function () {
   document.querySelector('#prompt-input-label').textContent = 'Sign up an account'
   document.querySelector('#sign-in-btn').value = "Join"
   document.querySelector('#email-input').value = ''
   document.querySelector('#password-input').value = ''

   signInForm.removeEventListener('submit', signIn);
   signInForm.addEventListener('submit', signUp);
   this.remove()
})

showPasswordLabel.addEventListener('click', function () {
   this.classList.toggle('fa-eye-slash');

   // Toggle the password field type
   const passwordField = document.querySelector('#password-input')
   const passwordType = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
   passwordField.setAttribute('type', passwordType);
})
