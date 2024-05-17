let startTime;
let elapsedTime = 0;
let timerInterval;
let laps = [];
let lapCount = 0;

const display = document.getElementById('display');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const pauseButton = document.getElementById('pauseButton');
const resetButton = document.getElementById('resetButton');
const lapButton = document.getElementById('lapButton');
const lapsList = document.getElementById('laps');

function formatTime(time) {
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  let milliseconds = Math.floor((time % 1) * 100);

  minutes = String(minutes).padStart(2, '0');
  seconds = String(seconds).padStart(2, '0');
  milliseconds = String(milliseconds).padStart(2, '0');

  return `${minutes}:${seconds}.${milliseconds}`;
}

function updateDisplay() {
  display.textContent = formatTime(elapsedTime);
}

function startTimer() {
  if (!timerInterval) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function() {
      elapsedTime = (Date.now() - startTime) / 1000;
      updateDisplay();
    }, 10); // Update every 10 milliseconds
  }
}


function stopTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  updateDisplay();
}

function pauseTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function resetTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  elapsedTime = 0;
  lapCount = 0;
  laps = [];
  lapsList.innerHTML = '';
  updateDisplay();
}

function lapTimer() {
  lapCount++;
  const lapTime = formatTime(elapsedTime);
  const lapItem = document.createElement('li');
  lapItem.textContent = `Lap ${lapCount}: ${lapTime}`;
  lapsList.prepend(lapItem);
}

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', lapTimer);

resetTimer(); // Start with the timer reset
