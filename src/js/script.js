// Results
const tipAmount = document.querySelector('.first-row .number');
const total = document.querySelector('.second-row .number');

// Inputs
const peopleInput = document.querySelector('.people-input');
const billInput = document.querySelector('.bill-input');
const button = document.querySelector('button');

let bill;
let tipValue;
let people;

let num = 1;
let isCustom = false;
let tipsCount = 6;

// Checks if number argument is a whole num or has decimals
const hasDecimal = num => {
  return num % 1;
};

// Removing all * activeTip * class from all * tips *
const clearAllClasses = () => {
  for (let i = 1; i < tipsCount; i++) {
    document.querySelector(`.tip-${i}`).classList.remove('activeTip');
  }
};

// Reseting all inputs;
const reset = () => {
  total.innerText = '0.00';
  tipAmount.innerText = '0.00';

  document.querySelector(`.tip-${tipsCount}`).value = '';

  peopleInput.value = '';
  billInput.value = '';

  button.classList.remove('enabled');
  button.classList.add('disabled');

  clearAllClasses();
};

// Displaying the data
const displayData = () => {
  if (!bill || !people) {
    total.innerText = '0.00';
    tipAmount.innerText = '0.00';
  } else {
    button.classList.remove('disabled');
    button.classList.add('enabled');
    if (people <= 0) {
      document.querySelector('small').style.opacity = 1;
    } else {
      document.querySelector('small').style.opacity = 0;
      let division = bill / people;
      if (Number.isInteger(division)) {
        total.innerText = division + '.00';
      } else {
        total.innerText = division.toFixed(2);
      }
      if (!isCustom) {
        let result = division * tipValue;
        tipAmount.innerText = result.toFixed(2);
      } else {
        if (!hasDecimal(tipValue)) {
          // console.log('integer!');
          tipAmount.innerText = tipValue + '.00';
        } else {
          // console.log('not integer');
          tipAmount.innerText = tipValue;
          tipAmount.innerText = Number(tipAmount.innerText).toFixed(2);
        }
      }
    }
  }
};

// Getting all input Data
const getData = () => {
  // Bill
  if (billInput.value === '') {
    bill = 0;
  } else {
    bill = billInput.value;
  }
  // Tip
  while (num < tipsCount + 1) {
    let currentTip = document.querySelector(`.tip-${num}`);

    if (tipValue === undefined || tipValue === null) {
      tipValue = 0;
    } else {
      if (num == tipsCount) {
        currentTip.addEventListener('input', () => {
          clearAllClasses();
          tipValue = currentTip.value;
          isCustom = true;
        });
      } else {
        currentTip.addEventListener('click', () => {
          clearAllClasses();
          currentTip.classList.add('activeTip');
          tipValue = currentTip.dataset.tip;
          isCustom = false;
        });
      }
      num++;
    }
  }
  // People
  if (peopleInput.value === '') {
    people = 0;
  } else {
    people = peopleInput.value;
  }

  // Displaying Data
  displayData();
};
// on document load
document.addEventListener('DOMContentLoaded', reset);

setInterval(getData, 0);
button.addEventListener('click', reset);
