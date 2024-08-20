import { state } from "./present-state.js";

document.addEventListener('DOMContentLoaded', function () {
   // Load swiper initialization when the referenced DOM elements are available
   const swiper = new Swiper('.swiper', {
      loop: true,
      autoplay: {
         delay: 3000,
      },
      effect: 'fade',
      pagination: {
         el: '.swiper-pagination',
      },
      navigation: {
         nextEl: '.swiper-button-next',
         prevEl: '.swiper-button-prev',
      },
   });
});

document.querySelector('#explore-more-states-btn').addEventListener('click', () => {
   state['presentState'] = 'Perak';
   window.location.href = '/src/views/discover-msia.html';
})

document.querySelector('#perak-card').addEventListener('click', () => {
   state['presentState'] = 'Perak';
   console.log(state['presentState']);
   window.location.href = '/src/views/discover-msia.html';
})

document.querySelector('#malacca-card').addEventListener('click', () => {
   state['presentState'] = 'Malacca';
   console.log("At home" + state.presentState);
   window.location.href = '/src/views/discover-msia.html';
})

document.querySelector('#johor-card').addEventListener('click', () => {
   state['presentState'] = 'Johor';
   window.location.href = '/src/views/discover-msia.html';
})

document.querySelector('#penang-card').addEventListener('click', () => {
   state['presentState'] = 'Penang';
   window.location.href= '/src/views/discover-msia.html';
})

document.querySelector('#selangor-card').addEventListener('click', () => {
   state['presentState']= 'Selangor';
   window.location.href = '/src/views/discover-msia.html';
})

document.querySelector('#sarawak-card').addEventListener('click', () => {
   state['presentState'] = 'Sarawak';
   window.location.href = '/src/views/discover-msia.html';
})

