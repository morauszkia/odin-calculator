const displayExpressionEl = document.querySelector(
  '.calculator__display--expression'
);
const displayResultEl = document.querySelector('.calculator__display--result');
const calculatorKeys = document.querySelectorAll('.key');

const add = (num1, num2) => num1 + num2;
const subtract = (num1, num2) => num1 - num2;
const multiply = (num1, num2) => num1 * num2;
const divide = (num1, num2) => num1 / num2;

const roundNumber = (num, dec) => {
  return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
};

const operate = (numString1, numString2, operation) => {
  const num1 = +numString1;
  const num2 = +numString2;

  let result;

  if (operation === 'add') {
    result = add(num1, num2);
  }

  if (operation === 'subtract') {
    result = subtract(num1, num2);
  }

  if (operation === 'multiply') {
    result = multiply(num1, num2);
  }

  if (operation === 'divide') {
    result = divide(num1, num2);
  }

  return roundNumber(result, 8);
};

const updateDisplay = (firstPart = '', operator = '', result = '') => {
  displayExpressionEl.textContent = `${firstPart} ${operator}`;
  displayResultEl.textContent = result;
};

let firstNumber;
let operation;

const handleKeyClick = (e) => {
  const key = e.target;
  const { type } = key.dataset;

  if (type === 'number') {
    const value = key.textContent;
    const actualNum = displayResultEl.textContent;

    if (actualNum === '0') {
      displayResultEl.textContent = value;
    } else if (operation === 'equals') {
      firstNumber = null;
      operation = null;
      displayResultEl.textContent = value;
      displayExpressionEl.textContent = '';
    } else displayResultEl.textContent = actualNum + value;
  }

  if (type === 'decimal') {
    const actualNum = displayResultEl.textContent;

    if (actualNum.includes('.')) return;
    else if (!actualNum) displayResultEl.textContent = '0.';
    else displayResultEl.textContent = actualNum + '.';
  }

  if (type === 'clear') {
    updateDisplay();
    firstNumber = undefined;
  }

  if (type === 'operator') {
    const operator = e.target.textContent;

    if (!firstNumber) {
      firstNumber = displayResultEl.textContent;
      operation = e.target.dataset.operation;
      updateDisplay(firstNumber, operator);
    }

    if (
      firstNumber &&
      (!displayResultEl.textContent || operation === 'equals' || !operation)
    ) {
      operation = e.target.dataset.operation;
      updateDisplay(firstNumber, operator);
    }

    if (firstNumber && operation !== 'equals' && displayResultEl.textContent) {
      firstNumber = operate(
        firstNumber,
        displayResultEl.textContent,
        operation
      );
      operation = e.target.dataset.operation;
      updateDisplay(firstNumber, operator);
    }
  }

  if (type === 'equals') {
    if (firstNumber && operation !== 'equals' && displayResultEl.textContent) {
      const enteredNumber = displayResultEl.textContent;
      const prevExpression = displayExpressionEl.textContent;
      const newExpression = `${prevExpression} ${enteredNumber}`;
      const result = operate(firstNumber, enteredNumber, operation);
      updateDisplay(newExpression, ' =', result);
      firstNumber = result;
      operation = 'equals';
    } else return;
  }
};

calculatorKeys.forEach((k) => k.addEventListener('click', handleKeyClick));

// TODO
// Add DEL functionality
// Add +/- functionality
