import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

class Timer {
  constructor({ everySecond }) {
    this.finishTime = null;
    this.intervalId = null;
    this.isActive = false;
    this.everySecond = everySecond;
  }
  start() {
    if (this.isActive) {
      return;
    }
    this.isActive = true;
    this.intervalId = setInterval(() => {
      const startTime = Date.now();
      const deltaTime = this.finishTime - startTime;
      if (deltaTime < 1000) {
        this.stop();
      }
      const timeToEnd = convertMs(deltaTime);
      this.everySecond(timeToEnd);
    }, 1000);
  }
  stop() {
    clearInterval(this.intervalId);
    this.isActive = false;
    this.everySecond(convertMs(0));
  }
}

const timer = new Timer({
  everySecond: updateClockFace,
});

const refs = {
  startButtonEl: document.querySelector('[data-start]'),
  daysEl: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minutesEl: document.querySelector('[data-minutes]'),
  secondsEl: document.querySelector('[data-seconds]'),
  myInput: document.querySelector('#datetime-picker'),
};
refs.startButtonEl.addEventListener('click', handleStartButtonClick);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (timer.isActive) {
      this.enableTime = false;
      Notify.warning('The timer has already started!');
      return;
    }

    const selectTime = selectedDates[0].getTime();
    const rightNowTime = Date.now();
    const deltaTime = selectTime - rightNowTime;
    if (deltaTime <= 0) {
      Notify.failure('Please choose a date in the future');
      refs.startButtonEl.setAttribute('disabled', 'disabled');
      timer.stop();
      return;
    }
    timer.finishTime = selectTime;
    refs.startButtonEl.removeAttribute('disabled');
  },
};
const fp = flatpickr(refs.myInput, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
function updateClockFace({ days, hours, minutes, seconds }) {
  const { daysEl, hoursEl, minutesEl, secondsEl } = refs;
  daysEl.textContent = `${days}`;
  hoursEl.textContent = `${hours}`;
  minutesEl.textContent = `${minutes}`;
  secondsEl.textContent = `${seconds}`;
}
function handleStartButtonClick(e) {
  timer.start();
  refs.startButtonEl.setAttribute('disabled', 'disabled');
}
