
// Main variables

const width = 200;
const height = 300;
const clampDecimals = 8;

let input = {
    a: 0,
    b: 0,
    operator: "",
}

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

// Function updating the display each time the user clicks a button

const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
        let id = e.target.id;
        let disp = displayDiv.textContent;
        if (id === "="){
            let op = disp.match(/-?\d+|[-+*/]/g); //store numbers (negative or not) and operators separately in an array
            console.log(op);
            // feed each elements of the array into the operate function
            if (op.length === 2){
                disp = operate("+", Number(op[0]), Number(op[1]));
            }
            if (op.length === 3){
                disp = operate(op[1], Number(op[0]), Number(op[2]));
            }
        } 
        else {
            disp = disp.replace(/^0/, '');
            disp += e.target.id;
        }
        displayDiv.textContent = disp;
    });
});

// Helper functions

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
