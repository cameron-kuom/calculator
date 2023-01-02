const btns = document.querySelectorAll("button");
const numBtns = document.querySelectorAll(".num");
const operatorBtns = document.querySelectorAll(".operator");
const inputsArray = [];

function operate(){
    btns.forEach(btn => btn.addEventListener("click", () => {
        inputsArray.push(btn.textContent);

        let operends = inputsArray.join("").split(/[=x+/-]/).map(item => 
            parseInt(item));

        let operatorArray = inputsArray.filter(input => 
            ["+","-","x","/", "="].includes(input));
        let operator = secondLastIndex(operatorArray);

        if (isNaN(operends[2]) && operends.length == 3){
            if (operator == "+"){
                let total = addNums(operends[0], operends[1]);
            } else if (operator == "-"){
                let total = subtractNums(operends[0], operends[1]);
            } else if (operator == "x"){
                let total = multiplyNums(operends[0], operends[1]);
            } else if (operator == "/"){
                let total = divideNums(operends[0], operends[1]);
            }
        }
    }))
}

// Helper functions
function addNums(x,y){
    return x + y;
}

function subtractNums(x,y){
    return x - y;
}

function divideNums(x,y){
    return x / y;
}

function multiplyNums(x,y){
    return x * y;
}

function secondLastIndex(array){
    let Index = array.length - 2;
    let element = array[Index];
    return element;
}