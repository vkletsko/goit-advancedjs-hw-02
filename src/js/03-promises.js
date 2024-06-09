import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

export const toastOptions = {
  icon: '',
  messageColor: 'white',
  position: 'center',
  timeout: 2000,
  close: false,
  animateInside: false,
  progressBar: false,
  transitionIn: 'bounceInUp',
};

const createPromise = (position, delay) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
};

const onFormSubmit = event => {
  event.preventDefault();
  const form = event.currentTarget;
  const { delay, step, amount } = form.elements;

  for (let i = 0; i < +amount.value; i += 1) {
    const timeout = +delay.value + +step.value * i;
    const position = i + 1;
    createPromise(position, timeout)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        iziToast.success({
          title: '✅ ',
          message: `Fulfilled promise ${position} in ${delay}ms`,
          backgroundColor: 'lightgreen',
          ...toastOptions,
        });
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        iziToast.error({
          title: '❌ ',
          message: `Rejected promise ${position} in ${delay}ms`,
          backgroundColor: 'tomato',
          ...toastOptions,
        });
      });
  }

  form.reset();
};

form.addEventListener('submit', onFormSubmit);

