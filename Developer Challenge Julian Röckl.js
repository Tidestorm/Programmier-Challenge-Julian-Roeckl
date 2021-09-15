//let array = [0, 1, 2, 3, 4, 5, 6];
//let elementsToMove = [2, 3, 4];
let array = [{id: 0, name: 'zero' }, {id: 1, name: 'one'}, {id: 2, name: 'two' },{id: 3, name: 'three'}, {id: 4, name: 'four' },{id: 5, name: 'five'},{id: 6, name: 'six' }];
let elementsToMove = [{id: 2, name: 'two' }, {id: 3, name: 'three' }, {id: 4, name: 'four' }];

function insertElementsAfterIndex(moveElementsAfterIndex) {

    if(moveElementsAfterIndex + 1 < elementsToMove.length){
        console.log("Error - Too many elements to move after index. There is no Space left to move them.");
        return;
    }

    // Var just to make the following code easy to read
    let piece1Lenght = moveElementsAfterIndex + 1 - elementsToMove.length; // + 1 because index starts at 0 and lenghts at 1

    // Function returns an array, that puts piece1, 2 and 3 together
    let piece1 = array.slice(0, piece1Lenght); // elements before elementsToMove
    let piece2 = elementsToMove;
    let piece3 = array.slice(moveElementsAfterIndex, array.length); // elements after elementsToMove
    let overwrittenElements = array.slice(moveElementsAfterIndex + 1 - elementsToMove.length, moveElementsAfterIndex + 1);

    // if piece1 contains elements of elementsToMove(piece2) --> remove them from piece1 ad make adjustments with piece3
    for (let i = 0; i < piece1.length; i++) {
        // If element in piece1 is contained in elementsToMove -> use next usable element from piece1/piece3 instead
        if (arrayContains(elementsToMove, piece1[i])) {
            if(piece1.lenght < i + 1) {
                piece1.splice(i, 2, piece1[i + 1]);
            }
            piece1.splice(i, 1, piece3.shift());
        }
    }

    // Add elements from array that are overwritten by elementsToMove(piece2) tp piece3
    overwrittenElements.forEach(function (element) {
        if(!arrayContains(piece2, element) && !arrayContains(piece3, element)) {
            piece3.unshift(element);
        }
    });

    //remove overriding elements of piece1 and elementsToMove(piece2) from piece3
    piece3.forEach(function (element) {
        if(arrayContains(elementsToMove, element)) {
            piece3 = piece3.filter(element_ => element_ != element);
        }
        if(arrayContains(piece1, element)) {
            piece3 = piece3.filter(element_ => element_ != element);
        }
    });

    piece1.sort(function (a, b) { return a.id - b.id; })
    piece3.sort(function (a, b) { return a.id - b.id; })
    return getArrayToReturn(piece1, piece2, piece3);
}

function insertElementsBeforeIndex(moveElementsBeforeIndex) {

    if(moveElementsBeforeIndex + elementsToMove.length > array.length){
        console.log("Error - Too many elements to move before index. There is no Space left to move them.");
        return;
    }

    // Function returns an array, that puts piece1, 2 and 3 together
    let piece1 = array.slice(0, moveElementsBeforeIndex); // elements before elementsToMove
    let piece2 = elementsToMove;
    let piece3 = array.slice(moveElementsBeforeIndex + piece2.length, array.length);// elements after elementsToMove
    let overwrittenElements = array.slice(moveElementsBeforeIndex, moveElementsBeforeIndex + elementsToMove.length); // Elements that are going to be overwritten by elementsToMove

    //Check for any required Adjustments in piece1 (add an overwritten element if required)
    piece1.forEach(function (element) {
        if(arrayContains(elementsToMove, element)){
            piece1[piece1.indexOf(element)] = overwrittenElements.shift();
        }
    });

    //Check for any required Adjustments in piece3
    piece3.forEach(function (element) {
        if(arrayContains(elementsToMove, element)){
            piece3[piece3.indexOf(element)] = overwrittenElements.shift();
        }
    });

    piece1.sort(function (a, b) { return a.id - b.id; })
    piece3.sort(function (a, b) { return a.id - b.id; })
    return getArrayToReturn(piece1, piece2, piece3);
}

//--------------------------------------------------------------------
// Subfunctions

// put array pieces together and return expectedResult.
function getArrayToReturn(p1, p2, p3){
    let arrayToReturn = Array();
    let mergedArray = Array();

    //Push every single element in mergedArray
    p1.forEach((element) => {  mergedArray.push(element); });
    p2.forEach((element) => {  mergedArray.push(element); });
    p3.forEach((element) => {  mergedArray.push(element); });

    arrayToReturn = arrayToReturn.filter((val) => val != ""); // prevent array from starting with ", "

    // Check element type of arrays to return the correct value.
    if (typeof mergedArray[0] == 'object') {
        mergedArray.forEach((element) => {  arrayToReturn.push(element.id); });
    }
    else { arrayToReturn = mergedArray; }

    return arrayToReturn;
}
// Asks if int intToContain is contained in array ar
function arrayContains(ar, intToContain) {

    if (typeof ar[0] == 'object') {
        for(let i = 0; i < ar.length; i++) {
            if (ar[i].id == intToContain.id) { return true; }
        }
    }

    for(let i = 0; i < ar.length; i++) {
        if (ar[i] == intToContain) { return true; }
    }
    return false;
}

//--------------------------------------------------------------------

// Task 1 & 2:
// By simply changing the int arrays ("array" and "elementsToMove") to dict arrays, the code still works without a problem.
// However if we want to return the same array of integers instead of an array of dictionaries, we need to check the array type ( of "array" and "elementsToMove")
// in the subfunction getArrayToReturn(...) and arrayContains(...) by checking type of the array.

// Task 3:
// As already explained in Task2, the desired result is achievable.
// To return the same array of integers with both inputs, we just need a few lines of code. This makes the subfunction
// getArrayToReturn(...) arrayContains(...)a bit more complex but that's not too bad.
// This could be a good solution if we are not sure about the type of the arrays "array" and "elementsToMove", but want a consistent result.
// A good example could be a situation where we are not sure if we want to pass a certain required value
// of some customers or their whole dictionary to this function.

// Task 4:
// In order to have everything clearly arranged in one class and to be able to just copy, paste and run this code,
// i just printed some tests in the console.
// An alternative and generally better solution would be running those tests by Mocha or JUnit tests.

const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b); // https://www.30secondsofcode.org/articles/s/javascript-array-comparison

console.debug('--------------------------------------------------------------------');
let Result1 = insertElementsAfterIndex(5);
let Result2 = insertElementsBeforeIndex(0);
let expectedResult1 = [0, 1, 5, 2, 3, 4, 6];
let expectedResult2 = [2, 3, 4, 0, 1, 5, 6];
console.debug('Task 1 & 2:');
console.debug('Result1: insertElementsAfterIndex(5) = ' + Result1);
console.debug('Result2: insertElementsBeforeIndex(0) = ' + Result2);
console.debug('expectedResult1 = ' + expectedResult1);
console.debug('expectedResult2 = ' + expectedResult2);
console.debug('Result1 equals expectedResult1: ' + equals(expectedResult1, Result1));
console.debug('Result2 equals expectedResult2: ' + equals(expectedResult2, Result2));
console.debug('--------------------------------------------------------------------');
Result1 = insertElementsAfterIndex(3);
Result2 = insertElementsBeforeIndex(4);
expectedResult1 = [ 0,2,3,4,1,5,6 ];
expectedResult2 = [ 0,1,4,5,2,3,4 ];
console.debug('Changing input index:');
console.debug('Result1: insertElementsAfterIndex(3) = ' + Result1);
console.debug('Result2: insertElementsBeforeIndex(4) = ' + Result2);
console.debug('expectedResult1 = ' + expectedResult1);
console.debug('expectedResult2 = ' + expectedResult2);
console.debug('Result1 equals expectedResult1: ' + equals(expectedResult1, Result1));
console.debug('Result2 equals expectedResult2: ' + equals(expectedResult2, Result2));
console.debug('--------------------------------------------------------------------');
expectedResult1 = undefined;
expectedResult2= undefined;
console.debug('Changing input index, should display error:');
Result1 = insertElementsAfterIndex(1);
Result2 = insertElementsBeforeIndex(5);
console.debug('Result1: insertElementsAfterIndex(1) = ' + Result1);
console.debug('Result2: insertElementsBeforeIndex(5) = ' + Result2);
console.debug('expectedResult1 = ' + expectedResult1);
console.debug('expectedResult2 = ' + expectedResult2);
console.debug('Expected Error1: Error - Too many elements to move after index. There is no Space left to move them.');
console.debug('Expected Error2: Error - Too many elements to move before index. There is no Space left to move them.');
console.debug('Result1 equals expectedResult1: ' + equals(expectedResult1, Result1));
console.debug('Result2 equals expectedResult2: ' + equals(expectedResult2, Result2));
console.debug('--------------------------------------------------------------------');
elementsToMove = [{id: 2, name: 'two' }, {id: 4, name: 'four' }];
Result1 = insertElementsAfterIndex(1);
Result2 = insertElementsBeforeIndex(5);
expectedResult1 = [ 2,4,0,1,3,5,6 ];
expectedResult2 = [ 0,1,3,5,6,2,4 ];
console.debug('Let input index and change elementsToMove so that no error should occur:');
console.debug('elementsToMove = [{id: 2, name: \'two\' }, {id: 4, name: \'four\' }]');
console.debug('Result1: insertElementsAfterIndex(1) = ' + Result1);
console.debug('Result2: insertElementsBeforeIndex(5) = ' + Result2);
console.debug('expectedResult1 = ' + expectedResult1);
console.debug('expectedResult2 = ' + expectedResult2);
console.debug('Result1 equals expectedResult1: ' + equals(expectedResult1, Result1));
console.debug('Result2 equals expectedResult2: ' + equals(expectedResult2, Result2));

