
const width = 200;
const height = 300;
const clampDecimals = 8;

let input = {
    a: 0,
    b: 0,
    operator: "",
    operation: "",
    
    update: function(button) {
        //if a number is clicked        
            //if operator is ""
                //if a is zero
                    // a = button clicked
                //else
                    // a = a + button clicked (as string, then back to number)
            //else
                //if b is zero
                    // b = button clicked
                //else
                    //b = b + button clicked (as string, then back to number)
        //if an operator is clicked
            //if it's "="
                // operation = a + " " + operator + " " + b + "="
                //operate(operator, a, b)            
            //else
                //operator = button clicked
                //operation = a + " " + operator
    },
}

const mainDiv = document.querySelector(".main-div");
mainDiv.style.width = width + "px";
mainDiv.style.height = height + "px";

const operationDiv = document.createElement("div");
operationDiv.setAttribute("class", "operation-div");
operationDiv.textContent = "0";
mainDiv.appendChild(operationDiv);

const inputDiv = document.createElement("div");
inputDiv.setAttribute("class", "input-div");
inputDiv.textContent = "0";
mainDiv.appendChild(inputDiv);

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

const numbers = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
numbers.forEach(num => {
    let button = document.createElement("button");
    button.textContent = num;
    button.setAttribute("id", num);
    button.setAttribute("class", "number-button");
    button.addEventListener("click", (e) => {console.log(`input number ${e.target.id}`)});
    numberDiv.appendChild(button);
});

const operators = [
    {
        type: "/",
        div: "top",
    },
    {
        type: "*",
        div: "top",
    },
    {
        type: "-",
        div: "top",
    },
    {
        type: "+",
        div: "right",
    },
    {
        type: "=",
        div: "right",
    },
];
operators.forEach(op => {
    let button = document.createElement("button");
    button.textContent = op.type;
    button.setAttribute("id", op.type);
    button.setAttribute("class", "operator-button");
    button.addEventListener("click", (e) => {console.log(`input operator ${e.target.id}`)});
    let div = document.getElementsByClassName(`${op.div}-operator-div`)[0];
    div.appendChild(button);
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