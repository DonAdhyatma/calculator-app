// Script improvement fitur with ai supports
const numbers = document.querySelectorAll(".number");
const calculatorScreen = document.querySelector(".calculator-screen");

const updateScreen = (display) => {
  calculatorScreen.value = display;
};

let previousNumber = "";
let calculationOperator = "";
let currentNumber = "";
let displayValue = ""; // Variabel baru untuk menampung tampilan lengkap

const inputNumber = (number) => {
  currentNumber += number;
  displayValue += number; // Tambahkan angka ke display
  updateScreen(displayValue);
};

for (let i = 0; i < numbers.length; i++) {
  numbers[i].addEventListener("click", (event) => {
    inputNumber(event.target.value);
  });
}

const inputOperator = (operator) => {
  if (currentNumber === "") return; // Cegah operator tanpa angka
  
  previousNumber = currentNumber;
  calculationOperator = operator;
  displayValue += operator; // Tambahkan operator ke display
  currentNumber = "";
  updateScreen(displayValue);
};

const operators = document.querySelectorAll(".operator");

for (let i = 0; i < operators.length; i++) {
  operators[i].addEventListener("click", (event) => {
    inputOperator(event.target.value);
  });
}

const equalSign = document.querySelector(".equal-sign");

const calculate = () => {
  if (previousNumber === "" || currentNumber === "" || calculationOperator === "") return;
  
  let result = "";
  const prev = parseFloat(previousNumber);
  const current = parseFloat(currentNumber);
  
  switch (calculationOperator) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "x":
      result = prev * current;
      break;
    case "/":
      result = prev / current;
      break;
    default:
      return;
  }
  
  // Reset semua variabel dan tampilkan hasil
  currentNumber = result.toString();
  previousNumber = "";
  calculationOperator = "";
  displayValue = currentNumber;
  updateScreen(currentNumber);
};

equalSign.addEventListener("click", () => {
  calculate();
});

const clearAll = () => {
  previousNumber = "";
  calculationOperator = "";
  currentNumber = "";
  displayValue = ""; // Reset display juga
  updateScreen("0");
};

const clearSign = document.querySelector(".all-clear");

clearSign.addEventListener("click", () => {
  clearAll();
});

// PERCENTAGE BUTTON - Dalam konteks operasi
const percentageBtn = document.querySelector(".percentage");

const calculatePercentage = () => {
  if (currentNumber !== "" && previousNumber !== "" && calculationOperator !== "") {
    const prev = parseFloat(previousNumber);
    const current = parseFloat(currentNumber);
    let percentValue;
    
    switch (calculationOperator) {
      case "+":
        // 200+10% = 200+(10% dari 200) = 200+20 = 220
        percentValue = (prev * current) / 100;
        currentNumber = percentValue.toString();
        displayValue = previousNumber + "+" + current + "%";
        updateScreen(displayValue);
        break;
      case "-":
        // 100-20% = 100-(20% dari 100) = 100-20 = 80
        percentValue = (prev * current) / 100;
        currentNumber = percentValue.toString();
        displayValue = previousNumber + "-" + current + "%";
        updateScreen(displayValue);
        break;
      case "x":
        // 50x25% = 50x0.25 = 12.5
        percentValue = current / 100; // Konversi ke desimal
        currentNumber = percentValue.toString();
        displayValue = previousNumber + "x" + current + "%";
        updateScreen(displayValue);
        break;
      case "/":
        // 50/25% = 50/0.25 = 200
        percentValue = current / 100; // Konversi ke desimal
        currentNumber = percentValue.toString();
        displayValue = previousNumber + "/" + current + "%";
        updateScreen(displayValue);
        break;
      default:
        return;
    }
  } else if (currentNumber !== "") {
    // Percentage simple: 50% = 0.5
    const percentValue = parseFloat(currentNumber) / 100;
    currentNumber = percentValue.toString();
    displayValue = currentNumber;
    updateScreen(currentNumber);
  }
};

percentageBtn.addEventListener("click", () => {
  calculatePercentage();
});

const inputDecimal = (dot) => {
  if (currentNumber.includes(".")) {
    return;
  }
  currentNumber += dot;
  displayValue += dot;
  updateScreen(displayValue);
};

const decimal = document.querySelector(".decimal");
decimal.addEventListener("click", (event) => {
  inputDecimal(event.target.value);
});