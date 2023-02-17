function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop');
const DELAY = 1000;
const bodyEl = document.body;
let timerId = null;

startButton.addEventListener('click', handleStartButtonClick);
stopButton.addEventListener('click', handleStopButtonClick);

function handleStartButtonClick(evt) {
    if (timerId) return;
    timerId = setInterval(changeBGColor, DELAY, bodyEl);
    startButton.setAttribute('disabled', 'disabled');
    stopButton.removeAttribute('disabled');
};

function handleStopButtonClick(evt) {
    clearInterval(timerId);
    startButton.removeAttribute('disabled');
    stopButton.setAttribute('disabled', 'disabled');
    timerId = null;
};

function changeBGColor(el) {
    el.style.backgroundColor = getRandomHexColor();
}
