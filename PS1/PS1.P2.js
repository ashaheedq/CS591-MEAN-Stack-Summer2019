// PS1 Problem 2

// This function Determine the operator(+, *, -, or / ) embedded in the string
// and return a function to implement the input operator that returns the result
const evaluateExpression = str => {
    let operator = str.replace(/[0-9]/g, "");
    switch(operator) {
        case "+":
        return expression => parseInt(expression[0]) + parseInt(expression[2]);
    
        case "*":
        return expression => parseInt(expression[0]) * parseInt(expression[2]);
    
        case "-":
        return expression => parseInt(expression[0]) - parseInt(expression[2]);
        
        case "/":
        return expression => parseInt(expression[0]) / parseInt(expression[2]);
    }
}

const addExpression = '4+2';
let addOperator = evaluateExpression(addExpression);
console.log(`${addExpression} = ${addOperator(addExpression)}`)

const multExpression = '5*7';
let multOperator = evaluateExpression(multExpression);
console.log(`${multExpression} = ${multOperator(multExpression)}`)

const subExpression = '6-1';
let minOperator = evaluateExpression(subExpression);
console.log(`${subExpression} = ${minOperator(subExpression)}`)

const divExpression = '9/2';
let divOperator = evaluateExpression(divExpression);
console.log(`${divExpression} = ${divOperator(divExpression)}`)