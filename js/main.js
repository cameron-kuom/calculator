const btns = document.querySelectorAll("button");
const inputsArray = [];

function operate(){
    btns.forEach(btn => btn.addEventListener("click", () => {
        inputsArray.push((btn.textContent));

        const operendsArray = inputsArray.join("").split(/[=x+/-]/).map(input => 
            parseInt(input));
        operendsArray.forEach(operend => {
            if (isNaN(operend))operendsArray.pop();
        })

        const operatorArray = inputsArray.filter(input => 
            ["+","-","x","/","="].includes(input));

        if (operendsArray.length == 2 && operatorArray.length == 2){ 
            if (operatorArray[0] == "+"){
                let total = addNums(operendsArray[0], operendsArray[1]);
                resetArrays(inputsArray, operatorArray, total);
            } else if (operatorArray[0] == "-"){
                let total = subtractNums(operendsArray[0], operendsArray[1]);
                resetArrays(inputsArray, operatorArray, total);
            } else if (operatorArray[0] == "x"){
                let total = multiplyNums(operendsArray[0], operendsArray[1]);
                resetArrays(inputsArray, operatorArray, total);
            } else if (operatorArray[0] == "/"){
                let total = divideNums(operendsArray[0], operendsArray[1]);
                resetArrays(inputsArray, operatorArray, total);
            }
        }
    }))
}

operate();

// Helper functions
function resetArrays(array1, array2, total){
    array1.splice(0, array1.length);
    array2[1] == "=" ? array1.push(total) : array1.push(total, array2[1]);
}

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