const previousTextElement = document.querySelector('[data-previous-operand]');
const currentTextElement = document.querySelector('[data-current-operand]');
const allClearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const equalButton = document.querySelector('[data-equal]');
const operationButtons = document.querySelectorAll('[data-operation]');
const NumberButtons = document.querySelectorAll('[data-number]');
let currentValue = '';
let previousValue = '';
let currentOperator = '';

allClearButton.addEventListener('click', ()=>{
  currentValue = '';
  previousValue = '';
  updateDisplay();
});

deleteButton.addEventListener('click', ()=>{
  currentValue = currentValue.slice(0, -1);
  previousValue = previousValue.slice(0, -1);
  updateDisplay();
});

NumberButtons.forEach(button => {
  button.addEventListener('click', ()=>{
    if (currentValue === '∞') {
      currentValue = 0;
      currentValue += button.innerText;
    }else if(button.innerText === '.' && currentValue.includes('.')) return
    else{ currentValue += button.innerText;
    }
    updateDisplay();
  });
});

operationButtons.forEach(button => {
  button.addEventListener('click', ()=>{
    if (currentValue === '∞' || currentValue === 'NaN'){
      currentValue = '';
      previousValue = '';
    }
    previousValue = currentValue;
    currentOperator = button.innerText;
    currentValue = '';
    updateDisplay();
  });
});

equalButton.addEventListener('click', ()=>{
  result = compute(currentOperator, currentValue, previousValue);
  currentValue = result;
  previousValue = '';
  updateDisplay();
})

document.addEventListener('keydown', (event) => {
  const key = event.key;

  if (/\d/.test(key)) { // Check if the key pressed is a number
    currentValue += key;
    updateDisplay();
  } else if (key === '.') { // Check if the key pressed is a decimal point
    if(currentValue.includes('.')) {
      return;
    }
    currentValue += key;
    updateDisplay();
  } else if (key === '+' || key === '-' || key === '*' || key === '/') { // Check if the key pressed is an operator
    previousValue = currentValue;
    currentOperator = key === '*' ? '×' : key === '/' ? '÷' : key; // Convert * and / keys to × and ÷
    currentValue = '';
    updateDisplay();
  } else if (key === 'Enter') { // Check if the key pressed is the Enter key
    result = compute(currentOperator, currentValue, previousValue);
    currentValue = result;
    previousValue = '';
    updateDisplay();
  } else if (key === 'Backspace') { // Check if the key pressed is the Backspace key
    currentValue = currentValue.slice(0, -1);
    previousValue = previousValue.slice(0, -1);
    updateDisplay();
  }
});

function compute(operationValue, currentValue, previousValue){
  currentValue = parseFloat(currentValue);
  previousValue = parseFloat(previousValue);
  if(operationValue == '+'){
    return previousValue + currentValue;
  }else if (operationValue == '-') {
    return previousValue - currentValue;
  }else if (operationValue == '×'){
    return previousValue * currentValue;
  }else if (operationValue == '÷') {
    if (currentValue == 0) {
      return '∞';
    } else {
      return (previousValue)/(currentValue);
    }
  }else {
    return
  }
}
function updateDisplay(){
  currentTextElement.innerText = currentValue;
  previousTextElement.innerText = previousValue;
}