// PS1 Problem 1

// this function takes a string as its input and returns a new string that contains all of the
// letters in the original string, but in alphabetical order after removing punctuation and numbers

const cleanSortString = string => string.replace(/[^A-Za-z]/g, "").split('').sort().join('');

console.log(cleanSortString('supercalifragilisticexpialidocious'));
