const btns = document.querySelectorAll("button");
const display = document.querySelector(".display");
const inputsArray = [];
let errorCheck = false;
let equals = false;

// Negitive placeholder for array conversion
btns[2].addEventListener("click", placeholder);

// Clear button
btns[3].addEventListener("click", () => {
    inputsArray.splice(0, inputsArray.length);
    errorCheck = false;
    equals = false;
})

btns.forEach(btn => btn.addEventListener("click", () => {

// Waits for clear button when dividing by zero occurs
    if (errorCheck == true){
    display.textContent = "ERROR!";

    // Continues if dividing by zero did not occur
    } else if (errorCheck == false){
        if (btn.textContent != "CE" && btn.textContent != "+/-"){

            // Resets number if equals occur and new operend is selected
            if (equals == true){
                if (isNaN(parseFloat(btn.textContent)) == false){
                    if (inputsArray[0] == "@"){
                        inputsArray[0] = "@" + btn.textContent
                    } else {
                        inputsArray.shift();
                        inputsArray.push(btn.textContent);
                        equals = false;
                    }
                } else {
                    inputsArray.push(btn.textContent);
                    equals = false;
                }
            } else if (equals == false){
                inputsArray.push(btn.textContent);
            }
        }

        // Stores negitive number to be called after array split
        let firstNum = Number(inputsArray[0]);
        if (firstNum < 0) inputsArray[0] = inputsArray[0].replace("-", "@");

        // Converts and displays all inputs into correctlty formatted array
        const fullArray = inputsArray.join("").split(/([\^\√=x+/-])/);
        fullArray.forEach(element => modifyArray(fullArray, element));
        display.textContent = fullArray.join(" ");

        // Calls operate function once enough inputs are reached
        if (fullArray.length == 4 || fullArray[1] == "=" || fullArray[1] == "√"){
            if (fullArray[0] == "") fullArray[0] = 0;
            operate(inputsArray, fullArray);
        }
    }
}))

// Formats fullArray
function modifyArray(fullArray, element){
    let arrayIndex = fullArray.indexOf(element);
    fullArray[arrayIndex] = element.replace(/@/g, "-");
    if (element == "") fullArray.pop();
    let count = 0;
    for (let i = 0; i < element.length; i++){
        if (element.search("@") > 0){
            let removeAts = element.replace(/@/g, "");
            fullArray[arrayIndex] = "-" + removeAts;
        }
        if (element[i] == "@") count++;
        if (count > 1){   
            fullArray[arrayIndex] = element.replace(/@/g, "");
        }
    }
    // if (element.startsWith(".")){
    //     fullArray[arrayIndex] = "0" + element.slice(0);
    // } else if (element.startsWith("@.")){
    //     fullArray[arrayIndex] = "-0" + element.slice(1);
    // }
}

// Calculates based on operator
function operate(inputsArray, fullArray){
    let total = 0;
    parseArray(fullArray);

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

    } else if (fullArray[1] == "^"){
        total = fullArray[0] ** fullArray[2];
        resetArrays(inputsArray, fullArray, total);
        return inputsArray;

    } else if (fullArray[1] == "√"){
        total = Math.sqrt(fullArray[0]);
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
    }    
}

// Helper functions

// Converts strings to integers for operate function
function parseArray(array){
    for (let i = 0; i < array.length; i++){                
        if (isNaN(parseFloat(array[i])) == true){
            continue
        } else {
            array[i] = parseFloat(array[i])
        }
    } return array;
}

// Resets and displays new expression
function resetArrays(array1, array2, total){
    if (total.toString().indexOf(".") >= 0){
        let totalSplit = total.toString().split(".");
        let decimalPlaces = totalSplit[1].length;
        if (decimalPlaces >= 8) total = total.toFixed(8);
    }

    array1.splice(0, array1.length);
    if (array2[3] == "="){
        array1.push(total.toString())
        equals = true;
    } else {
        array1.push(total.toString(), array2[3])
    }

    display.textContent = array1.join(" ");
}

// Negitive placeholder for array conversion
function placeholder(){
    if (equals == false){
        inputsArray.push("@")
    } else if (equals == true){
        btns
        inputsArray.shift();
        inputsArray.push("@")
    }
}