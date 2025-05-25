// Light elements
const redLight = document.getElementById('red');
const yellowLight = document.getElementById('yellow');
const greenLight = document.getElementById('green');

// Buttons
const stopBtn = document.getElementById('stopButton');
const slowBtn = document.getElementById('slowButton');
const goBtn = document.getElementById('goButton');
const toggleBtn = document.getElementById('toggle-button');

// Timer display
let timerDisplay = document.createElement('div');
timerDisplay.id = 'timer';
document.body.appendChild(timerDisplay);

let countdown = null;
let intervalId = null;

function clearLights() {
  redLight.style.opacity = 0;
  yellowLight.style.opacity = 0;
  greenLight.style.opacity = 0;
}

// Manual control
function illuminateRed() {
  stopAuto();
  clearLights();
  redLight.style.opacity = 1;
}

function illuminateYellow() {
  stopAuto();
  clearLights();
  yellowLight.style.opacity = 1;
}

function illuminateGreen() {
  stopAuto();
  clearLights();
  greenLight.style.opacity = 1;
}

// Assign buttons
stopBtn.onclick = illuminateRed;
slowBtn.onclick = illuminateYellow;
goBtn.onclick = illuminateGreen;

class State {
  constructor(name, dur, next = null) {
    this.name = name;
    this.dur = dur;
    this.next = next;
  }
}

class Controller {
  trigger(state) {
    updateLight(state.name);
    startCountdown(state.dur);
    intervalId = setTimeout(() => {
      this.trigger(state.next);
    }, state.dur * 1000);
  }
}

function updateLight(color) {
  clearLights();
  if (color === 'red') redLight.style.opacity = 1;
  else if (color === 'yellow') yellowLight.style.opacity = 1;
  else if (color === 'green') greenLight.style.opacity = 1;
}

function startCountdown(seconds) {
  clearInterval(countdown);
  let timeLeft = seconds;
  timerDisplay.textContent = `Timer: ${timeLeft}s`;
  countdown = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Timer: ${timeLeft}s`;
    if (timeLeft <= 0) clearInterval(countdown);
  }, 1000);
}

// Stop cycle
function stopAuto() {
  clearTimeout(intervalId);
  clearInterval(countdown);
  intervalId = null;
  toggleBtn.textContent = 'Click Me to Start';
  timerDisplay.textContent = '';
}

// Toggle cycle
let controller = new Controller();

toggleBtn.addEventListener('click', () => {
  if (intervalId === null) {
    let green = new State('green', 10);
    let yellow = new State('yellow', 5);
    let red = new State('red', 10);

    green.next = yellow;
    yellow.next = red;
    red.next = green;

    controller.trigger(green);
    toggleBtn.textContent = 'Click Me to Stop';
  } else {
    stopAuto();
  }
});