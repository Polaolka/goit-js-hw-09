import { Notify } from 'notiflix/build/notiflix-notify-aio';
const refs = {
  formElement: document.querySelector('.form'),
  delayElement: document.querySelector('[name="delay"]'),
  stepElement: document.querySelector('[name="step"]'),
  amountElement: document.querySelector('[name="amount"]'),
};

refs.formElement.addEventListener('submit', handleChangeFofm);

function handleChangeFofm(e) {
  e.preventDefault();
  const { delayElement, stepElement, amountElement } = refs;
  const delay = Number(delayElement.value);
  const step = Number(stepElement.value);
  const amount = Number(amountElement.value);
  createPromises(amount, step, delay);
}

function createPromises(amount, step, delay) {
  let resultingDelay = 0;
  let position = 0;
  for (let i = 0; i < amount; i += 1) {
    resultingDelay = delay + step * i;
    position += 1;
    createPromise(position, resultingDelay);
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`Success! Position ${position}, delay ${delay}`);
      } else {
        reject(`Reject! Position ${position}, delay ${delay}`);
      }
    }, delay);
  });
  promise
    .then(value => {
      Notify.success(value);
      console.log(value);
    })
    .catch(error => {
      console.log(error);
      Notify.failure(error);
    });
}
