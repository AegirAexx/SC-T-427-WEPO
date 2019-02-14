"use strict";

/*
    CentaurJS - A modern JavaScript helper library. It offers various functionality for objects, arrays and strings
*/

/* Objects */

    // 1. setReadOnly

    // 2. countProperties

    // 3. toArray

/* Arrays */

    // 1. removeByCondition

    // 2. findIndexByCondition

    // 3. union

/* Strings */

    // 1. capitalize

    // 2. removeAllInstanceOf

    // 3. shiftRight

/* Test cases */
// /* Objects */
// var myObj = { x: 1 };
// _c.setReadOnly(myObj);
//
//
// var countObject = { x: 1, y: 2 };
// console.log(_c.countProperties(countObject));
//
// var toArrayObject = {
//     x: 1,
//     student: { name: 'Miyagi' },
//     list: [1, 2]
// }
//
// console.log(_c.toArray(toArrayObject));
//
// /* Arrays */
// var removeArr = [1, 2, 3];
// _c.removeByCondition(removeArr, e => e > 1);
// console.log(removeArr);
//
// var findArr = [1, 2, 3];
// var idx = _c.findIndexByCondition(findArr, e => e % 2 === 0);
// var notFound = _c.findIndexByCondition(findArr, e => e > 5);
// console.log(idx);
// console.log(notFound);
//
// var unionArr = _c.union([1, 2, 3], [1, 4, 5, 6]);
// console.log(unionArr);
//
// /* Strings */
// var capitalizedString = _c.capitalize('hi ho silver away!');
// console.log(capitalizedString);
//
// var removeStr = 'Morning!';
// console.log(_c.removeAllInstanceOf(removeStr, 'n'));
//
// var otherRemoveStr = 'NaNNaNNaNNaN Batman!';
// console.log(_c.removeAllInstanceOf(otherRemoveStr, 'NaN'));
//
// console.log(_c.shiftRight('number', 2));
// console.log(_c.shiftRight('timber', 6));
