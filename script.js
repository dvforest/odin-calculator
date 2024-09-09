
// Main variables

const width = 200;
const height = 300;
const clampDecimals = 8;

let lockedString = "0";
let inputString = "";
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
lockedDiv.textContent = "0";
displayDiv.appendChild(lockedDiv);

const inputDiv = document.createElement("div");
inputDiv.setAttribute("class", "input-div");
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

// Create event listeners

const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
        let id = e.target.id;
        processInput(id);
    });
});

document.addEventListener("keydown", (e) => {
    const validInputs = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "-", "+", "*", "/", "="]
    let id = e.key;
    id = (id === "Enter") ? "=" : id;
    console.log(id);
    if (validInputs.includes(id)) {
        processInput(id);
    }
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
    return Number(result.toFixed(clampDecimals)); //Number() avoids 0s being added on integers
}

function parseOperation() {
    let tokens = tokenize(lockedString + inputString);
    if (tokens.length === 3) {
        let a = Number(tokens[0]);
        let op = tokens[1];
        let b = Number(tokens[2]);
        return operate(a, op, b);
    }
    else {
        return false;
    }
}

function processInput(id) {
        inputString += id;

        if (id === "C") {
            lockedString = "0"
            inputString = ""
        }
        
        if (id === "=") {
            let result = parseOperation();
            if (result) {
                lockedString = result;
                inputString = "";          
            }
            else {
                inputString = inputString.slice(0, -1) //backtrack
            }
        }

        if (hasInvalidInput(inputString)) { 
            inputString = inputString.slice(0, -1) //backtrack
        }

        else if (hasdoubleOperators(inputString)) {
            inputString = inputString.slice(0, -2) + inputString.slice(-1); //replace with new operator
        }

        else if (areBothNumbers(inputString, lockedString)) {
            lockedString = "";
        }

        else if (exceedesTokens(3, lockedString + inputString)) { 
            inputString = inputString.slice(0, -1) //backtrack
            lockedString = parseOperation();
            inputString = "" + id;
        }

        if (inputString  === "" && lockedString === "") {
            lockedString = "0";
        }

        if (/^0\d/.test(inputString)) { //cut useless zero starting the str
            inputString = inputString.substring(1);
        }

        lockedDiv.textContent = lockedString;
        inputDiv.textContent = inputString;
}

function tokenize(str) {
    let arr = str.match(/(?<!\d)-?\d+\.*\d*|[-+*/^]/g); //split into tokens (numbers and operators)
    return arr;
}

function hasdoubleOperators(str) {
    const doubleOp = /[-+*/][+*/]/;
    return (doubleOp.test(str));
}

function areBothNumbers(str, str2) {
    const digit = /^\d+$/; //check if str consists only of digits
    return (digit.test(str) && digit.test(str2));
}

function hasInvalidInput(str) {
    const doubleDecimal = /\d*\.\d*\./; //forbid double decimals
    const negativeSign = /[-+*/]\-\D/; //a number must follow a second token starting with a negative sign
    return (doubleDecimal.test(str) || negativeSign.test(str))
}

function exceedesTokens(limit, str) {
    let tokens = tokenize(str);
    return (tokens.length > limit);
}
