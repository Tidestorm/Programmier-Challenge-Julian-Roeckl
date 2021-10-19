let array = [0, 1, 2, 3, 4, 5, 6];
let elementsToMove = [2, 3, 4];
let objectArray = [{id: 0, name: 'zero' }, {id: 1, name: 'one'}, {id: 2, name: 'two' },{id: 3, name: 'three'}, {id: 4, name: 'four' },{id: 5, name: 'five'},{id: 6, name: 'six' }];
let objectElementsToMove = [{id: 2, name: 'two' }, {id: 3, name: 'three' }, {id: 4, name: 'four' }];

const equals = (a, b) => a.length === b.length && a.every((v, i) => v === b[i]);

console.log("Testing insertElementsAtIndex(3, array, elementsToMove, true) ...");
console.assert(equals([0,1,5,2,3,4,6], moveElementsAtIndex(3, array, elementsToMove)));
console.log("Testing insertElementsAtIndex(0, array, elementsToMove, true) ...");
console.assert(equals([2,3,4,0,1,5,6], moveElementsAtIndex(0, array, elementsToMove)));
console.log("Testing insertElementsAtIndex(3, array, elementsToMove, false) ...");
console.assert(equals([0,2,3,4,1,5,6], moveElementsAtIndex(3, array, elementsToMove)));
console.log("Testing insertElementsAtIndex(6, array, elementsToMove, false) ...");
console.assert(equals([0,1,5,6,2,3,4], moveElementsAtIndex(6, array, elementsToMove)));
//TODO Add Error assertions
//TODO Write assertion that can compare equal dictionaries

function moveElementsAtIndex(index, array, elementsToMove) {

    indexesToMove = getIndexesToReplace(index, array, elementsToMove);
    elementsToOverwrite = getElementsToOverwrite(array, indexesToMove);
    arrayWithReplacedElements = overwriteElements(index, array,elementsToOverwrite , elementsToMove);
    duplicates = getDuplicatesOfArray(arrayWithReplacedElements);
    return replaceDuplicates(duplicates, overwrittenElements, indexesToMove);

}

function moveForward(index, array, elementsToMove){
    return elementsToMove.length + index  - 1 > array.length;
}

function getElementsToOverwrite(array, indexesToMove){
    let elementsToReturn;    
    for(let i = 0; i < indexesToMove.length; i++) {elementsToReturn.Add(array[indexesToMove[i]])}
}

//TODO: Vereinfache getElementsToOverwrite & overwriteElements damit
//TODO Prüfe ob die + / - 1 in der for schleife korrekt sind, wenn der Code nicht funktioniert
function getIndexesToReplace(index, array, elementsToMove){
    let arrayToReturn;
    if(moveForward(index, array, elementsToMove)){ 
        for(let i = index; i < elementsToMove.length + index + 1; i++){ array.Add(i); }
    }
    else{
        for(let i = elementsToMove.length + index - 1; i < index; i++){ array.Add(i); }

    }
}

//TODO: Implement getIndexesToReplace() to simplify this function
function overwriteElements(index, array, elementsToOverwrite, elementsToMove){
    let count;
    let arrayToReturn = array;
    for (let i = 0; i < array.length; i++){
        if(arrayContains(elementsToOverwrite, arrayToReturn[i])) { // 'includes' not found in syntax 
        
            arrayToReturn[i] = elementsToMove[count];
            count++;
        }
    }
    return arrayToReturn;
}

function getDuplicatesOfArray(array){

}

function replaceDuplicates(duplicatesToReplace, elemetsToPlace, movedIndexes){
    // replaces duplicates that do not have a index of 'movedIndexes'
}

function arrayContains(array, elementToContain){
    for(let i = 0; i < array.length; i++) {
        if (array[i] == elementToContain) { return true; }
    }
    return false;
}

