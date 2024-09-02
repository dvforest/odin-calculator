
// Main variables

const width = 200;
const height = 300;
const clampDecimals = 8;

// Create all the container divs

const mainDiv = document.querySelector(".main-div");
mainDiv.style.width = width + "px";
mainDiv.style.height = height + "px";

const displayDiv = document.createElement("div");
displayDiv.setAttribute("class", "display-div");
displayDiv.textContent = "0";
mainDiv.appendChild(displayDiv);

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

const numbers = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];

numbers.forEach(num => {
    let button = document.createElement("button");
    button.textContent = num;
    button.setAttribute("id", num);
    button.setAttribute("class", "number-button");
    numberDiv.appendChild(button);
});

const operators = [
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
        let str = displayDiv.textContent;
        let id = e.target.id;
        let arr = tokenize(str);

        if (isEqualSign(id)){
            str = operate(Number(arr[0]), arr[1], Number(arr[2]));    
        }

        else {
            arr.push(id);
            str = stringify(arr);
        }
        
        displayDiv.textContent = str;
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
    return Number(result.toFixed(clampDecimals)); // Number() removes unnecessary zeros
}

function tokenize(str) {
    let arr = str.match(/(?<!\d)-?\d+(\.\d+)?|[-+*/^]/g); //split into numbers (int or float) and operators.
    return arr;
}

function stringify(arr) {
    return arr.join('')
              .replace(/^0/, ''); //remove zero from beginning
}

function isOperator(char){
    const op = ["+", "-", "*", "/"];
    return (op.includes(char));
}

function isEqualSign(char){
    return (char === "=");
}
