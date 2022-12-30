const numBtns = document.querySelectorAll(".num");
const operatorBtns = document.querySelectorAll(".operator");

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

function operate(x,y,operator){
    if (operator = "+"){
        return addNums(x,y)
    } else if (operator == "-"){
        return subtractNums(x,y)
    } else if (operator == "/"){
        return divideNums(x,y)
    } else if (operator == "x"){
        return multiplyNums(x,y)
    }
}