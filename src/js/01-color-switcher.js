const btnStartEl = document.querySelector('[data-start]');
const btnStopEl = document.querySelector('[data-stop]');
let intervalId = null;

const toggleActiveBtnState = btnEl => {
  const isDisabled = btnEl.disabled;
  btnEl.disabled = !isDisabled;
};
const getRandomHexColor = () => {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
};
const changeBackgroundColor = ({ interval }) => {
  intervalId = setInterval(() => {
    const currentColor = getRandomHexColor();
    document.body.style.background = currentColor;
  }, interval);
};

toggleActiveBtnState(btnStopEl);
btnStartEl.addEventListener('click', () => {
  toggleActiveBtnState(btnStopEl);
  toggleActiveBtnState(btnStartEl);
  changeBackgroundColor({ interval: 1000 });
});
btnStopEl.addEventListener('click', () => {
  toggleActiveBtnState(btnStartEl);
  toggleActiveBtnState(btnStopEl);
  clearInterval(intervalId);
});
