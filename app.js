const dietEntries = [];
const sleepEntries = [];
const physicalHealthEntries = [];
const mentalHealthEntries = [];

let calendar;

document.addEventListener('DOMContentLoaded', function() {
    const calendarEl = document.getElementById('calendar');
    calendar = new FullCalendar.Calendar(calendarEl, {
        plugins: ['dayGrid'],
        initialView: 'dayGridMonth',
        events: []
    });
    calendar.render();
});

function addEntry(type) {
    let input, list, entries, eventTitle;
    
    switch (type) {
        case 'diet':
            input = document.getElementById('dietInput');
            list = document.getElementById('dietList');
            entries = dietEntries;
            eventTitle = 'Diet';
            break;
        case 'sleep':
            input = document.getElementById('sleepInput');
            list = document.getElementById('sleepList');
            entries = sleepEntries;
            eventTitle = 'Sleep';
            break;
        case 'physicalHealth':
            input = document.getElementById('physicalHealthInput');
            list = document.getElementById('physicalHealthList');
            entries = physicalHealthEntries;
            eventTitle = 'Physical Health';
            break;
        case 'mentalHealth':
            input = document.getElementById('mentalHealthInput');
            list = document.getElementById('mentalHealthList');
            entries = mentalHealthEntries;
            eventTitle = 'Mental Health';
            break;
        default:
            return;
    }

    if (input.value.trim() === "") {
        alert("Please enter a valid input.");
        return;
    }

    entries.push(input.value);

    let li = document.createElement('li');
    li.textContent = input.value;

    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function () {
        list.removeChild(li);
        const index = entries.indexOf(input.value);
        if (index > -1) {
            entries.splice(index, 1);
        }
    };

    li.appendChild(deleteButton);
    list.appendChild(li);

    input.value = "";

    calendar.addEvent({
        title: eventTitle,
        start: new Date(),
        allDay: true
    });
}

function generateReport() {
    const dietReport = document.getElementById('dietReport');
    const sleepReport = document.getElementById('sleepReport');
    const physicalHealthReport = document.getElementById('physicalHealthReport');
    const mentalHealthReport = document.getElementById('mentalHealthReport');
    const recommendationsList = document.getElementById('recommendationsList');

    dietReport.textContent = Diet entries: ${dietEntries.join(', ')};
    sleepReport.textContent = Average sleep hours: ${average(sleepEntries)};
    physicalHealthReport.textContent = Physical health entries: ${physicalHealthEntries.join(', ')};
    mentalHealthReport.textContent = Mental health entries: ${mentalHealthEntries.join(', ')};

    recommendationsList.innerHTML = '';

    if (average(sleepEntries) < 7) {
        addRecommendation("You should aim to get at least 7-8 hours of sleep each night.");
    }

    if (dietEntries.length < 3) {
        addRecommendation("Try to include more meals in your diet.");
    }

    if (physicalHealthEntries.length === 0) {
        addRecommendation("Make sure to include some physical activity in your daily routine.");
    }

    if (mentalHealthEntries.length === 0) {
        addRecommendation("Consider practicing mindfulness or talking to someone about your mental health.");
    }
}

function average(entries) {
    if (entries.length === 0) return 0;
    const total = entries.reduce((acc, curr) => acc + parseFloat(curr), 0);
    return (total / entries.length).toFixed(2);
}

function addRecommendation(text) {
    const li = document.createElement('li');
    li.textContent = text;
    recommendationsList.appendChild(li);
}