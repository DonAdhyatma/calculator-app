const numbers = document.querySelectorAll(".number");

// for (let i = 0; i < numbers.length; i++) {
//   numbers[i].addEventListener("click", () => {
//     console.log("tombol angka ditekan");
//   })
// };

const calculatorScreen = document.querySelector(".calculator-screen");

const updateScreen = (number) => {
  calculatorScreen.value = number
};

let previousNumber = "";
let calculationOperator = "";
let currentNumber = "";

// for (let i = 0; i < numbers.length; i++) {
//   numbers[i].addEventListener("click", (event) =>{
//     updateScreen(event.target.value);
//   });
// };

const inputNumber = (number) => {
  currentNumber += number
};

for (let i = 0; i < numbers.length; i++) {
  numbers[i].addEventListener("click", (event) => {
    inputNumber(event.target.value)
    if (calculationOperator && previousNumber) {
      updateScreen(previousNumber + calculationOperator + currentNumber);
    } else {
      updateScreen(currentNumber);
    }
  });
};

const inputOperator = (operator) => {

  if (previousNumber && currentNumber && calculationOperator){
    calculate();
  };

  previousNumber = currentNumber || previousNumber;
  calculationOperator = operator;
  currentNumber = "";

  updateScreen(previousNumber + operator);
};

const operators = document.querySelectorAll(".operator");

for (let i = 0; i < operators.length; i++) {
  operators[i].addEventListener("click", (event) => {
    inputOperator(event.target.value)
  });
};

const equalSign = document.querySelector(".equal-sign");

const calculate = () => {
  let result = ""

  if (!previousNumber || !currentNumber || !calculationOperator) {
    return;  // Validasi input
  }

  switch (calculationOperator) {
    case "+":
      result = parseInt(previousNumber) + parseInt(currentNumber)
      break
    case "-":
      result = previousNumber - currentNumber
      break
    case "x":
      result = previousNumber * currentNumber
      break
    case "/":
      result = previousNumber / currentNumber
      break
    default:
      return
  };
  currentNumber = result
  calculationOperator = ""
};

equalSign.addEventListener("click", () => {
  if (previousNumber && currentNumber && calculationOperator) {
    calculate();
    updateScreen(currentNumber);
  }
});

const clearAll = () => {
  previousNumber = ""
  calculationOperator = ""
  currentNumber = ""
  updateScreen("0")
};

const clearSign = document.querySelector(".all-clear");

clearSign.addEventListener("click", () => {
  clearAll()
});