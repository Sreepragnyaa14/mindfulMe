// Select all mood buttons
const moodButtons = document.querySelectorAll('.mood-btn');

// Function to handle mood selection
function handleMoodSelection(event) {
    // Remove active class from all buttons
    moodButtons.forEach(button => button.classList.remove('active'));
    
    // Add active class to the clicked button
    event.target.classList.add('active');
    
    // Store selected mood in local storage
    const selectedMood = event.target.textContent;
    localStorage.setItem('mood', selectedMood);
    
    // Display message based on the selected mood
    displayMoodMessage(selectedMood);
}




// Load saved mood from local storage on page load
window.addEventListener('load', () => {
    const savedMood = localStorage.getItem('mood');
    if (savedMood) {
        moodButtons.forEach(button => {
            if (button.textContent === savedMood) {
                button.classList.add('active');
                //displayMoodMessage(savedMood);
            }
        });
    }
});

// Add event listeners to all mood buttons
moodButtons.forEach(button => {
    button.addEventListener('click', handleMoodSelection);
});

// Function to save input data to local storage
function saveInputData() {
    const smile = document.getElementById('smile').value;
    const improve = document.getElementById('improve').value;
    const helped = document.getElementById('helped').value;
    const gratitude = document.getElementById('gratitude').value;
    const journal = document.getElementById('journal').value;

    localStorage.setItem('smile', smile);
    localStorage.setItem('improve', improve);
    localStorage.setItem('helped', helped);
    localStorage.setItem('gratitude', gratitude);
    localStorage.setItem('journal', journal);
}

// Load input data from local storage on page load
window.addEventListener('load', () => {
    document.getElementById('smile').value = localStorage.getItem('smile') || '';
    document.getElementById('improve').value = localStorage.getItem('improve') || '';
    document.getElementById('helped').value = localStorage.getItem('helped') || '';
    document.getElementById('gratitude').value = localStorage.getItem('gratitude') || '';
    document.getElementById('journal').value = localStorage.getItem('journal') || '';
});

// Save input data on input change
document.querySelectorAll('input[type="text"], textarea').forEach(input => {
    input.addEventListener('input', saveInputData);
});


// Array of Positive Affirmations
const affirmations = [
    "You are capable of amazing things!",
    "You are stronger than you think.",
    "Believe in yourself and all that you are.",
    "Every day is a fresh start.",
    "You are worthy of love and respect.",
    "You are enough just as you are.",
    "Keep pushing forward, you got this!",
    "Your mind is a powerful thing.",
    "Embrace the glorious mess that you are."
];

// Function to display a random affirmation
function displayRandomAffirmation() {
    const affirmationText = document.getElementById('affirmation-text');
    const randomIndex = Math.floor(Math.random() * affirmations.length);
    affirmationText.textContent = affirmations[randomIndex];
}

// Call the function to display an affirmation on page load
window.addEventListener('load', () => {
    displayRandomAffirmation();

    // Existing code to load saved data
    const savedMood = localStorage.getItem('mood');
    if (savedMood) {
        moodButtons.forEach(button => {
            if (button.textContent === savedMood) {
                button.classList.add('active');
                //displayMoodMessage(savedMood);
            }
        });
    }

    document.getElementById('smile').value = localStorage.getItem('smile') || '';
    document.getElementById('improve').value = localStorage.getItem('improve') || '';
    document.getElementById('helped').value = localStorage.getItem('helped') || '';
    document.getElementById('gratitude').value = localStorage.getItem('gratitude') || '';
    document.getElementById('journal').value = localStorage.getItem('journal') || '';
});


// Timer functionality


let timerInterval;

function startTimer() {
    const inputMinutes = parseInt(document.getElementById('timer-input').value);
    const display = document.getElementById('timer-display');
    const endMessage = document.getElementById('timer-end-message');
    const endSound = document.getElementById('end-sound'); // Select the end sound element
    const meditationMusic = document.getElementById('meditation-music'); // Select the music element

    if (isNaN(inputMinutes) || inputMinutes < 1 || inputMinutes > 30) {
        alert("Please enter a number between 1 and 30.");
        return;
    }

    let totalTimeInSeconds = inputMinutes * 60;

    function updateTimer() {
        const minutes = Math.floor(totalTimeInSeconds / 60);
        const seconds = totalTimeInSeconds % 60;
        display.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        if (totalTimeInSeconds > 0) {
            totalTimeInSeconds--;
        } else {
            clearInterval(timerInterval);
            endMessage.style.display = 'block';
            endSound.play(); // Play end sound when timer ends

            setTimeout(() => {
                endSound.pause();
                endSound.currentTime = 0; // Reset the audio to the start
            }, 3300);
            meditationMusic.pause(); // Pause meditation music when timer ends
        }
    }

    updateTimer();
    endMessage.style.display = 'none'; // Hide end message when restarting the timer
    timerInterval = setInterval(updateTimer, 1000);

    // Start playing meditation music
    meditationMusic.play();
}

// Function to stop the timer and pause the music
function stopTimer() {
    clearInterval(timerInterval);
    document.getElementById('timer-display').textContent = "00:00";
    document.getElementById('timer-end-message').style.display = 'none';
    document.getElementById('meditation-music').pause(); // Pause meditation music
}

// Function to play meditation music
function playMusic() {
    document.getElementById('meditation-music').play();
}

// Function to pause meditation music
function pauseMusic() {
    document.getElementById('meditation-music').pause();
}

// Add event listeners to the timer and music buttons
document.getElementById('start-timer-btn').addEventListener('click', startTimer);
document.getElementById('stop-timer-btn').addEventListener('click', stopTimer);
document.getElementById('play-music-btn').addEventListener('click', playMusic);
document.getElementById('pause-music-btn').addEventListener('click', pauseMusic);



//calendar features
// JavaScript for Calendar and Mood Tracking

const calendarGrid = document.querySelector('.calendar-grid');
const monthYearDisplay = document.getElementById('month-year');
const selectedDateDisplay = document.getElementById('selected-date');
const moodSelect = document.getElementById('mood-select');
const saveMoodBtn = document.getElementById('save-mood-btn');

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let selectedDate = null;

// Function to generate calendar
function generateCalendar(month, year) {
    calendarGrid.innerHTML = ''; // Clear previous calendar days

    const firstDay = new Date(year, month).getDay(); // Get the first day of the month
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Get the number of days in the month

    // Display month and year
    monthYearDisplay.textContent = new Date(year, month).toLocaleString('default', { month: 'long', year: 'numeric' });

    // Create empty slots for days of the previous month
    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        calendarGrid.appendChild(emptyCell);
    }

    // Create day cells
    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement('div');
        dayCell.textContent = day;

        // Check if there's a mood entry for this day
        const storedMood = localStorage.getItem(`${year}-${month}-${day}`);
        if (storedMood) {
            dayCell.classList.add(storedMood); // Apply mood class
            const moodIcon = document.createElement('span');
            moodIcon.classList.add('mood-icon');
            moodIcon.textContent = getMoodEmoji(storedMood); // Add mood emoji
            dayCell.appendChild(moodIcon);
        }

        // Click event to select a day
        dayCell.addEventListener('click', () => {
            selectedDate = `${year}-${month}-${day}`;
            selectedDateDisplay.textContent = `Selected Date: ${day}/${month + 1}/${year}`;
            moodSelect.value = storedMood || ''; // Set the mood select to the stored mood, if any
        });

        calendarGrid.appendChild(dayCell);
    }
}

// Function to save mood
function saveMood() {
    if (selectedDate && moodSelect.value) {
        localStorage.setItem(selectedDate, moodSelect.value);
        generateCalendar(currentMonth, currentYear); // Refresh calendar to reflect the saved mood
        alert('Mood saved!');
    } else {
        alert('Please select a date and a mood.');
    }
}

// Function to get emoji based on mood
function getMoodEmoji(mood) {
    switch (mood) {
        case 'happy':
            return '🥳';
        case 'sad':
            return '😢';
        case 'content':
            return '😊';
        case 'angry':
            return '😡';
        case 'neutral':
            return '😐';
        default:
            return '';
    }
}

// Event listeners for month navigation
document.getElementById('prev-month').addEventListener('click', () => {
    currentMonth = (currentMonth - 1 + 12) % 12;
    if (currentMonth === 11) currentYear--; // Go to previous year if current month is January
    generateCalendar(currentMonth, currentYear);
});

document.getElementById('next-month').addEventListener('click', () => {
    currentMonth = (currentMonth + 1) % 12;
    if (currentMonth === 0) currentYear++; // Go to next year if current month is December
    generateCalendar(currentMonth, currentYear);
});

// Event listener for saving mood
saveMoodBtn.addEventListener('click', saveMood);

// Generate initial calendar
generateCalendar(currentMonth, currentYear);


