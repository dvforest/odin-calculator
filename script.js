let a, b;
let op = "";
const clampDecimals = 8;
const width = 200;
const height = 300;

const container = document.querySelector(".flex-container");
container.style.width = width + "px";
container.style.height = height + "px";

const orderedNumbers = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
orderedNumbers.forEach(num => {
    let button = document.createElement("button");
    button.textContent = num;
    button.style.width = width / 3 + "px";
    button.setAttribute("id", num);
    button.setAttribute("class", "number");
    container.appendChild(button);
});

function add(a, b) {
    return a + b;
};

function subtract(a, b) {
    return a - b;
};

function multiply(a, b) {
    return a * b;
};

function divide(a, b) {
    return a / b;
};

function operate(op, a, b) {
    let result = 0;
    if (op === "+") {
        result = add(a, b);
    }
    if (op === "-") {
        result = subtract(a, b);
    }
    if (op === "*") {
        result = multiply(a, b);
    }
    if (op === "/") {
        result = divide(a, b);
    }
    return Number(result.toFixed(clampDecimals)); // Number() removes unnecessary zeros
}

console.log(operate("/", 5, 12));