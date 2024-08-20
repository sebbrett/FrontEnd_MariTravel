
// document.addEventListener('DOMContentLoaded', () => {
//     const boxes = document.querySelectorAll('.box');
//     boxes.forEach((box, index) => {
//         box.style.setProperty('--index', index + 1);
//         box.style.animationDelay = `${index * 0.3}s`;
//     });
//     const container = document.querySelector('.saved-main')
//     async function updateBoxContent() {
//         var newElem = [];
//         let state = 'perak'
//         let savedCount = 4
//         for(let i = 0; i < savedCount; i++){
//         try {
//             // Fetch the JSON file
//             const response = await fetch('/src/models/states.json');
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
            
//             let places = await response.json();
//             var tit = places[state]['places'][i]['title']
//             var des = places[state]['places'][i]['stateDescription']
//             var stateStr = state.charAt(0).toUpperCase() + state.substring(1)
//             newElem[i] = "<div class = 'box'><p class = 'saved-title'>" + tit + "</p>";
//             newElem[i] += "<div class='saved-state'>&#8982;" + stateStr + "</div><p class = 'saved-desc'>" + des + "</p></div>";
//         }
//         catch(error){
//             console.error('Error fetching or processing data:', error);
//         }
//     }
//     updateBoxContent();
// }
// });

document.addEventListener('DOMContentLoaded', () => {
    const boxes = document.querySelectorAll('.box');
    boxes.forEach((box, index) => {
        box.style.setProperty('--index', index + 1);
        box.style.animationDelay = `${index * 0.3}s`;
    });

    async function updateBoxContent() {
        let newElem = [];
        
        let savedCount = 4;

        try {
            const response = await fetch('/src/models/states.json');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            let state = 'perak'
            let places = await response.json();
            console.log(places)
            for (let i = 0; i < savedCount; i++) {
                
                var tit = places[0]['places'][i]['title'];
                console.log(tit)
                var des = places[0]['places'][i]['stateDescription'];
                // var des = places
                var stateStr = state.charAt(0).toUpperCase() + state.substring(1);

                newElem[i] = "<div class='box'><p class='saved-title'>" + tit + "</p>";
                newElem[i] += "<div class='saved-state'>&#8982; " + stateStr + "</div>";
                newElem[i] += "<p class='saved-desc'>" + des + "</p></div><br>";
            // }

            const container = document.querySelector('.saved-main');
            container.innerHTML = newElem.join('');
            
            const newBoxes = container.querySelectorAll('.box');
            newBoxes.forEach((box, index) => {
                box.style.setProperty('--index', index + 1);
                box.style.animationDelay = `${index * 0.3}s`;
            });
        }
        } catch (error) {
            console.error('Error fetching or processing data:', error);
        }
    }

    updateBoxContent();
});

