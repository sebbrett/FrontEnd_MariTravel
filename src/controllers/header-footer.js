import { auth } from '/src/apis/firebase-auth.js';
import {onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js'
import { state } from './present-state.js';

class MyHeader extends HTMLElement {
   connectedCallback() {
      this.innerHTML = `
      <nav class="navbar navbar-expand-lg fixed-top my-navbar">
      <div class="container-fluid">
         <a class="navbar-brand me-auto" href="/index.html">
            <div id="homeTab">
               <img id="logo" src="/src/resources/images/website-logo.png" alt="favicon">
                <p>MariTravel</p>
             </div>
         </a>
         <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
            <div class="offcanvas-header">
               <h5 class="offcanvas-title" id="offcanvasNavbarLabel">MariTravel</h5>
               <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
               <ul class="navbar-nav justify-content-center flex-grow-1 pe-3">
                  <li id="to-discover-tab" class="nav-item">
                     <a class="nav-link mx-lg-1" href="/src/views/discover-msia.html">Discover</a>
                  </li>
                  <li class="nav-item">
                     <a class="nav-link mx-lg-1" href="/src/views/culture-heritage.html">Culture & Heritage</a>
                  </li>
                  <li class="nav-item">
                     <a class="nav-link mx-lg-1" href="/src/views/getting-around.html">Getting Around</a>
                  </li>
                  <li class="nav-item">
                     <a class="nav-link mx-lg-1" href="/src/views/favourites.html">Favourites</a>
                  </li>
                  <li class="nav-item">
                     <a class="nav-link mx-lg-1" href="/src/views/about-us.html">About us</a>
                  </li>
               </ul>
            </div>
         </div>
         <div class="dropdown">
            <img id="profile-pic" src="/src/resources/images/default-profile-pic.jpg" alt="profile-pic" src="your-image.jpg" class="img-thumbnail dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <ul class="dropdown-menu" id="profile-pic-dropdown">
               <li><div id="sign-out-btn" class="dropdown-item">Sign out</div></li>
            </ul>
         </div>
         <button id="theme-toggle">Customize Theme</button>
         <button id="sign-in-btn">Sign in</button>
         <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
         aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
         <span class="navbar-toggler-icon"></span>
      </button>
      </div>
   </nav>
      `
      this.querySelector('#homeTab').addEventListener('click', () => {
         window.location.href = '/index.html';
      });

      this.querySelector('#sign-in-btn').addEventListener('click', () => {
         window.location.href = '/src/views/sign-in.html';
      })
   }
}

class MyFooter extends HTMLElement {
   connectedCallback() {
      this.innerHTML = `
         <footer>
            <h2 id='footer-title'>Contact Information</h2>
            <p id='footer-statement'>We love to hear from you! Whether you have questions, feedback, or partnership inquiries, please don't hesitate
               to reach out.</p>
            <div class="contact-row">
               <a href="mailto:cqin626@1utar.my">
                  <img src="/src/resources/images/email.png" alt="cqin626@1utar.my"
                     style="width: 50px; height: 50px;margin: 10px">
               </a>

               <a href="https://www.facebook.com/xiiao.qin.716">
                  <img src="/src/resources/images/facebook.png" alt="Facebook"
                     style="width: 20px; height: 20px;margin: 10px;margin: 10px">
               </a>

               <a href="https://www.instagram.com/cqin626">
                  <img src="/src/resources/images/instagram.png" alt="Instagram"
                     style="width: 20px; height: 20px; margin: 30px">
               </a>
            </div>
         </footer>
      `
   }
}

customElements.define(`my-header`, MyHeader)
customElements.define(`my-footer`, MyFooter)

document.getElementById('sign-out-btn').addEventListener('click', () => {
   signOut(auth).then(() => {
      console.log('User signed out')
      window.location.reload()
   })
})

document.querySelector("#to-discover-tab").addEventListener('click', ()=> {
   state.presentState = 'Perak';
})

onAuthStateChanged(auth, (user) => {
   if (user) {
      document.querySelector('#sign-in-btn').style.display = 'none';
      document.querySelector('#profile-pic').style.display = 'initial';
      if (user.photoURL != null) {
         document.querySelector('#profile-pic').setAttribute('src', user.photoURL);
      }
      console.log("Main: User is signed in:", user);
   } else {
      document.querySelector('#sign-in-btn').style.display = 'initial';
      document.querySelector('#profile-pic').style.display = 'none';
      console.log("Main: No user is signed in.");
   }
});


