
// Main variables

const width = 200;
const height = 300;
const clampDecimals = 8;

let lockedString = "";
let inputString = "0";
let operationTokens = [];

// Create all the container divs

const mainDiv = document.querySelector(".main-div");
mainDiv.style.width = width + "px";
mainDiv.style.height = height + "px";

const displayDiv = document.createElement("div");
displayDiv.setAttribute("class", "display-div");
mainDiv.appendChild(displayDiv);

const lockedDiv = document.createElement("div");
lockedDiv.setAttribute("class", "locked-div");
displayDiv.appendChild(lockedDiv);

const inputDiv = document.createElement("div");
inputDiv.setAttribute("class", "input-div");
inputDiv.textContent = "0";
displayDiv.appendChild(inputDiv);

const topOperatorDiv = document.createElement("div");
topOperatorDiv.setAttribute("class", "top-operator-div");
mainDiv.appendChild(topOperatorDiv);

const bottomDiv = document.createElement("div");
bottomDiv.setAttribute("class", "bottom-div");
mainDiv.appendChild(bottomDiv);

const numberDiv = document.createElement("div");
numberDiv.setAttribute("class", "number-div");
bottomDiv.appendChild(numberDiv);

const rightOperatorDiv = document.createElement("div");
rightOperatorDiv.setAttribute("class", "right-operator-div");
bottomDiv.appendChild(rightOperatorDiv);

// Create all the buttons

const numbers = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0, "."];

numbers.forEach(num => {
    let button = document.createElement("button");
    button.textContent = num;
    button.setAttribute("id", num);
    button.setAttribute("class", "number-button");
    numberDiv.appendChild(button);
});

const operators = [
    {type: "C", div:"top"},
    {type: "/", div: "top"},
    {type: "*", div: "top"},
    {type: "-", div: "top"},
    {type: "+", div: "right"},
    {type: "=", div: "right"},
];

operators.forEach(op => {
    let button = document.createElement("button");
    button.textContent = op.type;
    button.setAttribute("id", op.type);
    button.setAttribute("class", "operator-button");
    let div = document.getElementsByClassName(`${op.div}-operator-div`)[0];
    div.appendChild(button);
});

// Update the display when a button is clicked

const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
        let id = e.target.id;
        inputString += id;

        if (id === "C") {
            inputString = "0"
            lockedString = ""
        }
        
        if (id === "=") {
            lockedString = parseOperation(id);
            inputString = ""; 
        }

        else if (hasInvalidInput(inputString)) { 
            inputString = inputString.slice(0, -1) //backtrack
        }

        else if (hasdoubleOperators(inputString)) {
            inputString = inputString.slice(0, -2) + inputString.slice(-1); //replace with new operator
        }

        else if (areBothNumbers(inputString, lockedString)) {
            lockedString = "";
        }

        else if (exceedesTokens(lockedString + inputString, 3)) { 
            inputString = inputString.slice(0, -1) //backtrack
            lockedString = parseOperation(id);
            inputString += id;
        }

        if (inputString  === "" && lockedString === "") {
            inputString = "0";
        }

        if (/^0\d/.test(inputString)) { //cut useless zero starting the str
            inputString = inputString.substring(1);
        }

        lockedDiv.textContent = lockedString;
        inputDiv.textContent = inputString;
    });
});

// Helper functions

function operate(a, op, b) {
    let result;
    if (op === "+"){
        result = a + b;
        }
    if (op === "-"){
        result = a - b;
    }
    if (op === "*"){
        result = a * b;
    }
    if (op === "/"){
        result = a / b;
    }
    return Number(result.toFixed(clampDecimals)); // converting to Number() avoids 0s being added on integers
}

function parseOperation(id) {
    operationTokens = tokenize(lockedString + inputString)
    console.log(operationTokens);
    let a = Number(operationTokens[0]);
    let op = operationTokens[1];
    let b = Number(operationTokens[2]);
    return operate(a, op, b);
}

function tokenize(str) {
    let arr = str.match(/(?<!\d)-?\d+\.*\d*|[-+*/^]/g); //split into tokens (numbers and operators).
    return arr;
}

function hasdoubleOperators(str) {
    const doubleOp = /[-+*/][+*/]/;
    return (doubleOp.test(str));
}

function areBothNumbers(str, str2) {
    const digit = /\d/; 
    return (digit.test(str) && digit.test(str2));
}

function hasInvalidInput(str) {
    const doubleDecimal = /\d*\.\d*\./; //forbid double decimals
    const negativeSign = /[-+*/]\-\D/; //a number must follow a second token starting with a negative sign
    return (doubleDecimal.test(str) || negativeSign.test(str))
}

function exceedesTokens(str, limit) {
    let tokens = tokenize(str);
    return (tokens.length > 3);
}


        // TO DO!
        // add a check to make sure operation is valid
        