let startTime, updatedTime, difference, tInterval, running = false;
let laps = [];

const display = document.querySelector('.display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsList = document.getElementById('laps');

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', recordLap);

function startTimer() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(updateTimer, 1);
        running = true;
        toggleButtons();
    }
}

function pauseTimer() {
    if (running) {
        clearInterval(tInterval);
        difference = new Date().getTime() - startTime;
        running = false;
        toggleButtons();
    }
}

function resetTimer() {
    clearInterval(tInterval);
    difference = 0;
    running = false;
    display.textContent = '00:00:00';
    laps = [];
    renderLaps();
    toggleButtons();
}

function recordLap() {
    if (running) {
        laps.push(formatTime(difference));
        renderLaps();
    }
}

function updateTimer() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    display.textContent = formatTime(difference);
}

function formatTime(time) {
    let hours = Math.floor(time / (1000 * 60 * 60));
    let minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((time % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((time % 1000) / 10);
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 2)}`;
}

function pad(num, size = 2) {
    let s = "0" + num;
    return s.substr(s.length - size);
}

function renderLaps() {
    lapsList.innerHTML = '';
    laps.forEach((lap, index) => {
        const li = document.createElement('li');
        li.textContent = `Lap ${index + 1}: ${lap}`;
        lapsList.appendChild(li);
    });
}

function toggleButtons() {
    startButton.disabled = running;
    pauseButton.disabled = !running;
    resetButton.disabled = running && !difference;
    lapButton.disabled = !running;
}
