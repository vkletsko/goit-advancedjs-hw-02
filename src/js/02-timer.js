import flatpickr from 'flatpickr';
import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/airbnb.css';

export const toastOptions = {
  invalid: {
    message: 'Please select a date and time first.',
    position: 'topRight',
    timeout: 2000,
    progressBar: false,
    transitionIn: 'bounceInDown',
    transitionOut: 'fadeOutUp',
  },
  valid: {
    message: 'Time is up!',
    position: 'topRight',
    timeout: 5000,
    progressBar: false,
    transitionIn: 'bounceInDown',
    transitionOut: 'fadeOutUp',
  },
  caution: {
    message: 'Please choose a date in the future',
    position: 'topRight',
    timeout: 2000,
    progressBar: false,
    transitionIn: 'bounceInDown',
    transitionOut: 'fadeOutUp',
  },
};

let selectedDate = null;
const refs = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  timerDisplay: document.querySelectorAll('.value'),
};

flatpickr(refs.input, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = Date.now();
    selectedDate = selectedDates[0].getTime();

    if (currentDate >= selectedDate) {
      iziToast.info(toastOptions.caution);
      refs.startBtn.disabled = true;
      return;
    }

    refs.startBtn.disabled = false;
  },
});

const updateTimer = (timerInterval, btnStart) => {
  const now = Date.now();
  const timeDifference = selectedDate - now;

  if (timeDifference < 0) {
    clearInterval(timerInterval);
    refs.input.disabled = false;
    iziToast.success(toastOptions.valid);
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(timeDifference);

  const timerItems = [
    zeroPad(days),
    zeroPad(hours),
    zeroPad(minutes),
    zeroPad(seconds),
  ];

  timerItems.forEach((value, index) => {
    refs.timerDisplay[index].textContent = value;
  });
};

refs.startBtn.addEventListener('click', event => {
  if (!selectedDate) {
    iziToast.info(toastOptions.invalid);
    return;
  }

  const btnStart = event.currentTarget;
  btnStart.disabled = true;
  refs.input.disabled = true;

  const timerInterval = setInterval(() => {
    updateTimer(timerInterval, btnStart);
  }, 1000);
});

// Utils
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function zeroPad(value) {
  try {
    const stringifyValue = String(value);
    return stringifyValue.padStart(2, '0');
  } catch (error) {
    console.error('The incoming parameter is not of type string');
  }
}