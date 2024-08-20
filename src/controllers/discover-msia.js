import { state } from './present-state.js';
let statesInMsia = [
   'Perak',
   'Penang',
   'Selangor',
   'Johor',
   'Malacca',
   'Negeri Sembilan',
   'Pahang',
   'Kelantan',
   'Terengganu',
   'Sarawak',
   'Sabah',
   'Kedah',
   'Perlis',
   'Kuala Lumpur',
   'Labuan',
   'Putrajaya'
]

var presentState = state['presentState'];
getState(presentState);

const getStateButtons = document.querySelectorAll('.get-info-btn')

getStateButtons.forEach(btn => {
   btn.addEventListener('click', () => {
      const btnID = btn.id;
      switch (btnID) {
         case 'get-perak-btn':
            getState('Perak');
            break;
         case 'get-johor-btn':
            getState('Johor');
            break;
         case 'get-kedah-btn':
            getState('Kedah');
            break;
         case 'get-kelantan-btn':
            getState('Kelantan');
            break;
         case 'get-kl-btn':
            getState('Kuala Lumpur');
            break;
         case 'get-labuan-btn':
            getState('Labuan');
            break;
         case 'get-malacca-btn':
            getState('Malacca');
            break;
         case 'get-negeri-sembilan-btn':
            getState('Negeri Sembilan');
            break;
         case 'get-pahang-btn':
            getState('Pahang');
            break;
         case 'get-perlis-btn':
            getState('Perlis');
            break;
         case 'get-penang-btn':
            getState('Penang');
            break;
         case 'get-putrajaya-btn':
            getState('Putrajaya');
            break;
         case 'get-sabah-btn':
            getState('Sabah');
            break;
         case 'get-sarawak-btn':
            getState('Sarawak');
            break;
         case 'get-selangor-btn':
            getState('Selangor');
            break;
         case 'get-terengganu-btn':
            getState('Terengganu');
            break;
      }
   });
});

window.addEventListener('resize', getPlacesAndFood);
document.addEventListener('DOMContentLoaded', function () {
   const swiper = new Swiper('.swiper', {
      loop: true,
      pagination: {
         el: '.swiper-pagination',
      },
      navigation: {
         nextEl: '.swiper-button-next',
         prevEl: '.swiper-button-prev',
      },
   });
});

document.getElementById('modal-btn-close').addEventListener('click', () => {
   document.querySelector('#attraction-details-modal').style.display = 'none'
   document.body.style.overflow = '';
})

function updateInfoCardsEvent() {
   const getInfoButtons = document.querySelectorAll('.info-card')
   getInfoButtons.forEach(btn => {
      btn.addEventListener('click', () => {
         const btnID = btn.id;
         switch (btnID) {
            case 'place-0':
               showInfo('place', 0);
               break;
            case 'place-1':
               showInfo('place', 1);
               break;
            case 'place-2':
               showInfo('place', 2);
               break;
            case 'place-3':
               showInfo('place', 3);
               break;
            case 'food-0':
               showInfo('food', 0);
               break;
            case 'food-1':
               showInfo('food', 1);
               break;
            case 'food-2':
               showInfo('food', 2);
               break;
            case 'food-3':
               showInfo('food', 3);
               break;
         }
      });
   });
}

function showInfo(targetType, index) {
   const state = JSON.parse(localStorage.getItem(presentState));
   let target = null;
   if (targetType === 'place') {
      target = state['places'][index];
   } else {
      target = state['foods'][index];
   }

   document.querySelector('#attraction-name').textContent = target['title'];
   document.querySelector('#attraction-details-statement').textContent = target['modalDescription'];
   document.querySelector('#attraction-location').setAttribute('src', target['mapUrl']);
   document.querySelector('#attraction-img').setAttribute('src', target['image']);

   document.querySelector('#attraction-details-modal').style.display = 'flex'
   document.body.style.overflow = 'hidden';
}

function getCard(id, img, title, stateDesc) {
   return `
         <div class="info-card" id="${id}">
            <img src="${img}" class="info-photo"
               alt="${title}">
            <div class="info-description-container">
               <h3>${title}</h3>
               <p>${stateDesc}</p>
            </div>
         </div>
         `
}

function getMustGoContainer(str) {
   return `<div class="d-flex flex-row justify-content-center must-go-container">${str}</div>`;
}

function getMustGoSwiperSlide(str) {
   return `<div id="must-go-swiper-slide" class="swiper-slide">${str}</div>`
}

function getPlacesAndFood() {
   const width = window.innerWidth;
   const currentState = JSON.parse(localStorage.getItem(presentState));
   const currentPlaces = currentState['places'];
   const currentFood = currentState['foods'];
   const currentPlacesNo = currentPlaces.length;
   const currentFoodNo = currentFood.length;
   const placeImgCards = new Array(currentPlacesNo);
   const foodImgCards = new Array(currentFoodNo);

   for (let i = 0; i < currentPlacesNo; i++) {
      placeImgCards[i] = getCard('place-' + i, currentPlaces[i]['image'], currentPlaces[i]['title'], currentPlaces[i]['stateDescription']);
      foodImgCards[i] = getCard('food-' + i, currentFood[i]['image'], currentFood[i]['title'], currentFood[i]['stateDescription']);
   }

   if (width < 768) {
      // If screen size is less than medium
      let mustGoContainers = new Array(currentPlacesNo);
      let mustGoSwiperSlides = new Array(currentPlacesNo);
      let mustEatContainers = new Array(currentFoodNo);
      let mustEatSwiperSlides = new Array(currentFoodNo);
      let placeResult = ''
      let foodResult = ''
      for (let i = 0; i < currentPlacesNo; i++) {
         mustGoContainers[i] = getMustGoContainer(placeImgCards[i]);
         mustGoSwiperSlides[i] = getMustGoSwiperSlide(mustGoContainers[i]);
         placeResult += mustGoSwiperSlides[i];
      }
      for (let i = 0; i < currentFoodNo; i++) {
         mustEatContainers[i] = getMustGoContainer(foodImgCards[i]);
         mustEatSwiperSlides[i] = getMustGoSwiperSlide(mustEatContainers[i]);
         foodResult += mustEatSwiperSlides[i];
      }
      document.querySelector('#must-go-swiper-wrapper').innerHTML = placeResult;
      document.querySelector('#must-eat-swiper-wrapper').innerHTML = foodResult;
   }
   else if (width >= 768 && width < 992) {
      // If screen size is medium
      let placeContainer1 = getMustGoContainer(placeImgCards[0] + placeImgCards[1]);
      let placeContainer2 = getMustGoContainer(placeImgCards[2] + placeImgCards[3]);
      let foodContainer1 = getMustGoContainer(foodImgCards[0] + foodImgCards[1]);
      let foodContainer2 = getMustGoContainer(foodImgCards[2] + foodImgCards[3]);
      let placeSlide1 = getMustGoSwiperSlide(placeContainer1);
      let placeSlide2 = getMustGoSwiperSlide(placeContainer2);
      let foodSlide1 = getMustGoSwiperSlide(foodContainer1);
      let foodSlide2 = getMustGoSwiperSlide(foodContainer2);
      let placeResult = placeSlide1 + placeSlide2;
      let foodResult = foodSlide1 + foodSlide2;
      document.querySelector('#must-go-swiper-wrapper').innerHTML = placeResult;
      document.querySelector('#must-eat-swiper-wrapper').innerHTML = foodResult;
   }
   else {
      // If screen is greater than medium
      let placeContainer1 = getMustGoContainer(placeImgCards[0] + placeImgCards[1] + placeImgCards[2]);
      let placeContainer2 = getMustGoContainer(placeImgCards[3]);
      let foodContainer1 = getMustGoContainer(foodImgCards[0] + foodImgCards[1] + foodImgCards[2]);
      let foodContainer2 = getMustGoContainer(foodImgCards[3]);
      let placeSlide1 = getMustGoSwiperSlide(placeContainer1);
      let placeSlide2 = getMustGoSwiperSlide(placeContainer2);
      let foodSlide1 = getMustGoSwiperSlide(foodContainer1);
      let foodSlide2 = getMustGoSwiperSlide(foodContainer2);
      let placeResult = placeSlide1 + placeSlide2;
      let foodResult = foodSlide1 + foodSlide2;
      document.querySelector('#must-go-swiper-wrapper').innerHTML = placeResult;
      document.querySelector('#must-eat-swiper-wrapper').innerHTML = foodResult;
   }
}

async function getState(info) {
   presentState = info;
   if (!isExistingStateAtLocal(info)) {
      const fetchedStates = await fetchStates();
      for (let i = 0; i < statesInMsia.length; i++) {
         localStorage.setItem(statesInMsia[i], JSON.stringify(fetchedStates[i]));
      }
      const currentState = JSON.parse(localStorage.getItem(info));
      document.querySelector('#info-name').textContent = info;
      document.querySelector('#must-go-desc').textContent = currentState['descriptions']['placesdesc'];
      document.querySelector('#must-eat-desc').textContent = currentState['descriptions']['fooddesc'];
      getPlacesAndFood();
      updateInfoCardsEvent();
   } else {
      const currentState = JSON.parse(localStorage.getItem(info));
      document.querySelector('#info-name').textContent = info;
      document.querySelector('#must-go-desc').textContent = currentState['descriptions']['placesdesc'];
      document.querySelector('#must-eat-desc').textContent = currentState['descriptions']['fooddesc'];
      getPlacesAndFood();
      updateInfoCardsEvent();
   }
}

function isExistingStateAtLocal(stateName) {
   // Check if the info data is stored in localStorage
   const info = localStorage.getItem(stateName);

   if (info === null) {
      return false;
   }
   try {
      JSON.parse(info);
      return true;
   } catch (error) {
      return false;
   }
}

async function fetchStates() {
   try {
      const response = await fetch('/src/models/states.json');
      const data = await response.json();
      return Array.isArray(data) ? data : [];
   } catch (error) {
      return [];
   }
}