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

        // Inserts zero if operator is selected first
        if (inputsArray.length > 0 && inputsArray[0].match(/[\^\√=x+/-]/)){
                inputsArray.unshift("0")
            }
        
        // Stores negitive number to be called after array split
        let firstNum = Number(inputsArray[0]);
        if (firstNum < 0) inputsArray[0] = inputsArray[0].replace("-", "@");

        // Gets and displays formatted fullArray
        const fullArray = inputsArray.join("").split(/([\^\√=x+/-])/);
        fullArray.forEach(element => formatArray(fullArray, element));
        display.textContent = fullArray.join(" ");

        // Calls operate function once enough inputs are reached
        if (fullArray.length == 4 || fullArray[1] == "=" || fullArray[1] == "√"){
            // if (fullArray[0] == "") fullArray[0] = 0;
            operate(inputsArray, fullArray);
        }
    }
}))

// Formats fullArray
function formatArray(fullArray, element){
    let arrayIndex = fullArray.indexOf(element);
    let phCount = 0;
    fullArray[arrayIndex] = element.replace(/@/g, "-");
    if (element == "") fullArray.pop();
    if (fullArray[0] == "-" && fullArray[1] == "^") fullArray[0] = "-0";

    for (let i = 0; i < element.length; i++){
        if (element[i] == "@") phCount++;

        if (element.search("@") > 0){
            let removeAts = element.replace(/@/g, "");
            fullArray[arrayIndex] = "-" + removeAts;
        }
    }

    if (phCount > 0 && phCount % 2 == 0){
        fullArray[arrayIndex] = element.replace(/@/g, "");
        phCount = 0;
    }
}

// Calculates based on operator
function operate(inputsArray, fullArray){
    let total = 0;
    parseArray(fullArray);

    if (fullArray[1] == "="){
        total = fullArray[0];
        resetArrays(inputsArray, fullArray, total);

    } else if (fullArray[1] == "+"){
        total = fullArray[0] + fullArray[2];
        resetArrays(inputsArray, fullArray, total);

    } else if (fullArray[1] == "-"){
        total = fullArray[0] - fullArray[2];
        resetArrays(inputsArray, fullArray, total);

    } else if (fullArray[1] == "x"){
        total = fullArray[0] * fullArray[2];
        resetArrays(inputsArray, fullArray, total);

    } else if (fullArray[1] == "^"){
        total = fullArray[0] ** fullArray[2];
        resetArrays(inputsArray, fullArray, total);

    } else if (fullArray[1] == "/"){
        if (fullArray[2] == 0){
            total = "ERROR!";
            display.textContent = total;
            errorCheck = true;
        } else {
            total = fullArray[0] / fullArray[2];
            resetArrays(inputsArray, fullArray, total);
        }

    } else if (fullArray[1] == "√"){
        if (fullArray[0] < 0 || fullArray[0] == "-"){
            total = "ERROR!";
            display.textContent = total;
            errorCheck = true;
        } else {
            total = Math.sqrt(fullArray[0]);
            resetArrays(inputsArray, fullArray, total);
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
    // Safeguard if total equals NaN
    if (isNaN(total)){
        total = "ERROR!";
            display.textContent = total;
            errorCheck = true;
    }

    // Rounds number if eight decimal places is exceeded
    if (total.toString().indexOf(".") >= 0){
        let totalSplit = total.toString().split(".");
        let decimalPlaces = totalSplit[1].length;
        if (decimalPlaces >= 8) total = total.toFixed(8);
    }

    // Returns and displays new inputArray values
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
        inputsArray.shift();
        inputsArray.push("@")
    }
}