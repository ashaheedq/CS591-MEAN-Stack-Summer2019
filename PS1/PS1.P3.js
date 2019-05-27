// PS1 Problem 3

// This function that accepts two input parameters: a string, and a function.
// The function then execute the passed function with the passed string and return the result. 
const doString = (string, lambda) => lambda(string);

let first = doString('supercalifragilisticexpialidocious', str => str.split(/(?=c)/g));
console.log(first);

let second = doString('supercalifragilisticexpialidocious', str => {
    let strObject = {
        originalString: str,
        modifiedString: str.replace(/a/g, 'A'),
        numberReplaced: (str.match(/a/g) || []).length,
        length: str.length
    };
    return strObject;
})
console.log(second.o);