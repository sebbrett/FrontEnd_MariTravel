let topics = {};
fetch('/src/models/culture.json')
    .then(response => response.json())
    .then(data => {
        topics = data;
        console.log('Loaded topics:', topics);
        updateContent();
    })

    .catch(error => console.error('Error loading the topics:', error));

const stateSelect = document.getElementById('state-select');
const contentDiv = document.getElementById('content');
const urlParams = new URLSearchParams(window.location.search);
let currentPage = parseInt(urlParams.get('page')) || 1;
const topicsPerPage = 9;

// Load state selection from sessionStorage if available
if (sessionStorage.getItem('selectedState')) {
    stateSelect.value = sessionStorage.getItem('selectedState');
}

function loadContent(page, filteredTopics) {
    const startIndex = (page - 1) * topicsPerPage;
    const endIndex = startIndex + topicsPerPage;
    const pagedTopics = filteredTopics.slice(startIndex, endIndex);
    console.log('Paged topics:', pagedTopics); // Add this line to check paged topics

    if (pagedTopics.length === 0) {
        contentDiv.innerHTML = "<p>No topics available.</p>";
        return;
    }
    contentDiv.innerHTML = pagedTopics.map(topic =>
        `<div class="topic">
            <a href="culture-details.html?state=${encodeURIComponent(topic.state)}&title=${encodeURIComponent(topic.title)}">
                <img src="${topic.image}" alt="${topic.title}">
                <h3>${topic.title} - ${topic.state}</h3>
            </a>
        </div>`
    ).join('');

    // Update pagination links
    const totalPages = Math.ceil(filteredTopics.length / topicsPerPage);
    document.getElementById('page1').style.display = totalPages > 1 && currentPage > 1 ? 'inline' : 'none';
    document.getElementById('page2').style.display = totalPages > 1 && currentPage < totalPages ? 'inline' : 'none';
}

function getFilteredTopics(selectedState) {
    const allTopics = Object.entries(topics).flatMap(([state, topicsArray]) =>
        topicsArray.map(topic => ({ ...topic, state }))
    );

    const filteredTopics = selectedState === "" ? allTopics : allTopics.filter(topic => topic.state === selectedState);
    console.log('Filtered topics:', filteredTopics); // Add this line to check filtered topics
    return filteredTopics;

}

function updateContent() {
    const selectedState = stateSelect.value;
    const filteredTopics = getFilteredTopics(selectedState);
    loadContent(currentPage, filteredTopics);

    // Save state selection to sessionStorage
    sessionStorage.setItem('selectedState', selectedState);
}

// Initial load
updateContent();

stateSelect.addEventListener('change', () => {
    currentPage = 1; // Reset to the first page when the state is changed
    updateContent();
});

// Handle pagination
document.getElementById('page1').addEventListener('click', (e) => {
    e.preventDefault();
    currentPage = 1;
    updateContent();
});

document.getElementById('page2').addEventListener('click', (e) => {
    e.preventDefault();
    currentPage = 2;
    updateContent();
});