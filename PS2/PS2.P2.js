// PS1 Problem 2

// a generator that is initialized with a sentence 
// and that emits each word of the sentence in turn.

function* spitSentence(s) {
    let splitted = s.split(' ');
    yield* splitted;
} 

//Get a few fibs
const spit = spitSentence("All I know is something like a bird within her sang"); 
let word = spit.next();
while (!word.done) {
    console.log(word.value);
    word = spit.next();
}