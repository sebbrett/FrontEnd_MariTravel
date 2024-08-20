let topics = {};

fetch('/src/models/culture.json')
    .then(response => response.json())
    .then(data => {
        topics = data;
        console.log('Loaded topics:', topics);
        updateContent(); // Call updateContent only after data is loaded
    })
    .catch(error => console.error('Error loading the topics:', error));

function updateContent() {
    const urlParams = new URLSearchParams(window.location.search);
    const state = urlParams.get('state');
    const title = urlParams.get('title');

    if (state && title) {
        const topic = topics[state]?.find(t => t.title === title);

        if (topic) {
            document.getElementById('detail-image').src = topic.image;
            document.getElementById('detail-title').textContent = topic.title;
            document.getElementById('detail-description').textContent = topic.description;
        } else {
            document.getElementById('detail-title').textContent = "Topic not found";
            document.getElementById('detail-description').textContent = "Sorry, the topic you are looking for does not exist.";
        }
    } else {
        document.getElementById('detail-title').textContent = "Invalid Request";
        document.getElementById('detail-description').textContent = "No state or title was provided in the URL.";
    }
}