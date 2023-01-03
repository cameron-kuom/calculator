const btns = document.querySelectorAll("button");
const inputsArray = [];

function calcInputs(){
    btns.forEach(btn => btn.addEventListener("click", () => {
        inputsArray.push(btn.textContent);

        const fullArray = inputsArray.join("").split(/([=x+/-])/);
        fullArray.forEach(element => {
            if (element == "") fullArray.pop();
        })

        if (fullArray.length == 4){
            parseArray(fullArray);
            operate(inputsArray, fullArray);
        }
    }))
}

function operate(inputsArray, fullArray){
    if (fullArray[1] == "+"){
        let total = fullArray[0] + fullArray[2];
        resetArrays(inputsArray, fullArray, total);
        return inputsArray;
    } else if (fullArray[1] == "-"){
        let total = fullArray[0] - fullArray[2];
        resetArrays(inputsArray, fullArray, total);
        return inputsArray;
    } else if (fullArray[1] == "x"){
        let total = fullArray[0] * fullArray[2];
        resetArrays(inputsArray, fullArray, total);
        return inputsArray;
    } else if (fullArray[1] == "/"){
        let total = fullArray[0] / fullArray[2];
        resetArrays(inputsArray, fullArray, total);
        return inputsArray;
    }
}

// Helper functions
function parseArray(array){
    for (let i = 0; i < array.length; i++){                
        if (isNaN(parseInt(array[i])) == true){
            continue
        } else {
            array[i] = parseInt(array[i])
        }
    }
    return array;
}

function resetArrays(array1, array2, total) {
    array1.splice(0, array1.length);
    array2[3] == "=" ? array1.push(total.toString()) : array1.push(total.toString(), array2[3]);
}