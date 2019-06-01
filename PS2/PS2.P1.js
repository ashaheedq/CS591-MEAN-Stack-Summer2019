// // PS2 Problem 1

// // two generators that work together to return a series of even Fibonacci numbers. The first
// // generator return the series of fibonacci numbers starting from 0. The series F is defined
// // as F(0) = 0; F(1) = 1; F(n) = F(n-1) + F(n-2)
// // The second generator uses the first to obtain the next number in the sequence, rejecting
// // it if it is odd and asking for the next. Once an even Fibonacci number is obtained, it is emitted.


function* fibs () {
    let [val1, val2, result] = [0, 1, 0] 
    while (true) {
        result = val1+val2
        val1 = val2
        val2 = result
        yield result
    }
}

function* evenFibs() {
    const myFibs = fibs();
    while (true) {
        let nextFib = myFibs.next();
        if (nextFib.value % 2 == 0) {
            yield nextFib.value;
        }
    }
}

// Use the generators to print out the first 5 even Fibonacci numbers.
myFibs = evenFibs();
let count = 5;
while (count --> 0) {
    console.log(myFibs.next().value);
}