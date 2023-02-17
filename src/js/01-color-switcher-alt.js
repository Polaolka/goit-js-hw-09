function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop');
const bodyEl = document.body;
let timerId = null;
const markup = ``;
let color = null;
{/* <button type="button" data-stop>Stop</button> */}
startButton.addEventListener('click', handleStartButtonClick);
stopButton.addEventListener('click', handleStopButtonClick);

function handleStartButtonClick(evt) {
    if (timerId) return;
    timerId = setInterval(changeBGColor, 1000, bodyEl);
};

function handleStopButtonClick(evt) {
    clearInterval(timerId);
};

function changeBGColor(el) {
    el.style.backgroundColor = getRandomHexColor();

}
