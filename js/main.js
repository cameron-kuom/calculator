const btns = document.querySelectorAll("button");
const display = document.querySelector(".display");
const inputsArray = [];
let errorCheck = false;

// Clear button
btns[3].addEventListener("click", () => {
    inputsArray.splice(0, inputsArray.length);
    errorCheck = false;
})

// Stores inputs into array and is calculated by operate function
btns.forEach(btn => btn.addEventListener("click", () => {
    if (errorCheck == true){
    display.textContent = "ERROR!";

    } else if (errorCheck == false){
        if (btn.textContent != "CE") inputsArray.push(btn.textContent);
        const fullArray = inputsArray.join("").split(/([\^\√=x+/-])/);
        fullArray.forEach(element => {
            if (element == "") fullArray.pop();
        })
        display.textContent = fullArray.join(" ");
        if (fullArray.length == 4 || fullArray[1] == "=" || fullArray[1] == "√"){
            parseArray(fullArray);
            operate(inputsArray, fullArray);
        }
   }
})) 

// Calculates based on operator
function operate(inputsArray, fullArray){
    let total = 0;

    if (fullArray[1] == "="){
        total = fullArray[0];
        resetArrays(inputsArray, fullArray, total);
        return inputsArray;

    } else if (fullArray[1] == "+"){
        total = fullArray[0] + fullArray[2];
        resetArrays(inputsArray, fullArray, total);
        return inputsArray;

    } else if (fullArray[1] == "-"){
        total = fullArray[0] - fullArray[2];
        resetArrays(inputsArray, fullArray, total);
        return inputsArray;

    } else if (fullArray[1] == "x"){
        total = fullArray[0] * fullArray[2];
        resetArrays(inputsArray, fullArray, total);
        return inputsArray;

    } else if (fullArray[1] == "/"){
        if (fullArray[2] == 0){
            total = "ERROR!";
            display.textContent = total;
            errorCheck = true;
            return errorCheck;
        } else {
            total = fullArray[0] / fullArray[2];
            resetArrays(inputsArray, fullArray, total);
            return inputsArray;
        }

    } else if (fullArray[1] == "^"){
        total = fullArray[0] ** fullArray[2];
        resetArrays(inputsArray, fullArray, total);
        return inputsArray;

    } else if (fullArray[1] == "√"){
        total = Math.sqrt(fullArray[0]);
        resetArrays(inputsArray, fullArray, total);
        return inputsArray;
    }
}

// Helper functions

// Converts strings to integers for operate function
function parseArray(array){
    for (let i = 0; i < array.length; i++){                
        if (isNaN(parseInt(array[i])) == true){
            continue
        } else {
            array[i] = parseInt(array[i])
        }
    } return array;
}

// Resets and displays new expression
function resetArrays(array1, array2, total) {
    array1.splice(0, array1.length);
    array2[3] == "=" ? array1.push(total.toString()) : array1.push(total.toString(), array2[3])
    display.textContent = array1.join(" ");
}