const displayExpressionEl = document.querySelector(
  '.calculator__display--expression'
);
const displayResultEl = document.querySelector('.calculator__display--result');
const calculatorKeys = document.querySelectorAll('.key');

let firstNumber;
let operator;

const handleKeyClick = (e) => {
  const key = e.target;
  const keyType = key.dataset.type;

  if (keyType === 'number') {
    const value = key.textContent;
    const actualNum = displayResultEl.textContent;

    if (actualNum === '0') displayResultEl.textContent = value;
    else displayResultEl.textContent = actualNum + value;
  }

  if (keyType === 'decimal') {
    const actualNum = displayResultEl.textContent;

    if (actualNum.includes('.')) return;
    else displayResultEl.textContent = actualNum + '.';
  }

  console.log('clicked!', key, keyType);
};

calculatorKeys.forEach((k) => k.addEventListener('click', handleKeyClick));
