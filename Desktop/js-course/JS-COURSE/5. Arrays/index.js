const array = [1, 2, 4, 5];
// 0  1   2
// console.log(array, array[0], array[1], array[2], array[array.length - 1]);

// const getAvg = (arr) => {
//   let sum = 0;
//   for (let index = 0; index < arr.length; index++) {
//     const element = arr[index];
//     sum += element;
//   }
//   return sum / arr.length;
// };
// console.log(getAvg([1, 21, 31223, 123, 123, 123123]));
//sparse array
// const sparse = [0, 1, , , 4];
// console.log("Sparse Array:", sparse); // [0, 1, <2 empty items>, 4]
// let sum = 0;
// array.forEach(function (currentIndex) {
//   sum += currentIndex;
// });
// console.log(sum)
// const fruits = ["apple", "banana"];
// fruits.push("cherry");
// console.log("After push:", fruits); // ["apple", "banana", "cherry"]
const fighters = ["goku", "vegeta ", "bulma", "gohan", "trunks", "goten", "jiren", "beruss"];
// const FirstFighter = fighters.shift();
// const lastFighter = fighters.pop();
// console.log(lastFighter, FirstFighter, fighters);

//Objects : any function defined on an object is considred a method

//slice method on the array  does not mutate the original array and the last index of it (the second argument )
// is not included in the result array
// const slicedArray = fighters.slice(3, -3);
// console.log(fighters, slicedArray);
// if (slicedArray.includes("gohan") && slicedArray.includes("trunks")) {
//   console.log("gotenks");
// }

//splice
// const letters = ["a", "b", "c", "d", "e"];
// letters.splice(2, 2, "x", "y");
// console.log(letters);
let fruits = ["Apple", "Banana", "Cherry"]; // Using array literal
// let numbers = new Array(1, 2, 3, 4); // Using Array constructor
// fruits.splice(1, 1, "Kiwi"); // Removes 1 element at index 1 and adds "Kiwi"
// console.log(fruits); // ["Apple", "Kiwi", "Cherry"]

// // concat() - Merges arrays
let moreFruits = ["Mango", "Peach", "Mango"];
let allFruits = fruits.concat(moreFruits);
// console.log(allFruits);
// console.log(allFruits); // ["Apple", "Kiwi", "Cherry", "Mango", "Peach"]
// // join() - Converts array to a string
console.log(allFruits.join(",")); // "Apple - Kiwi - Cherry - Mango - Peach"

// //indexOf() & lastIndexOf() - Find element index
//check on the unique appearance of element in the array
console.log(allFruits.indexOf("Cherry")); // 2
console.log(allFruits.lastIndexOf("Mango")); // 3

// //reverse()
// console.log(allFruits.reverse()); // ["Peach", "Mango", "Cherry", "Kiwi", "Apple"]

// // Higher-Order Array Methods (Functional Programming)
// // let numbers = [1, 2, 3, 4];
// // let squared = numbers.map((num) => num ** 2);
// // console.log(squared); // [1, 4, 9, 16]
// //filter
// // let evenNumbers = numbers.filter(num => num % 2 === 0);
// // console.log(evenNumbers); // [2, 4]

// //reduce
// let sum = numbers.reduce((acc, curr) => acc + curr, 0);
// console.log(sum); // 10

// //find
// let firstEven = numbers.find((num) => num % 2 === 0);
// console.log(firstEven); // 2

// //some
// // console.log(numbers.some(num => num > 3)); // true

// //every
// // console.log(numbers.every(num => num > 0)); // true

// //sort
// let numArray = [4, 1, 9, 3];
// console.log(numArray.sort()); // [1, 3, 4, 9] (alphabetical order)
// console.log(numArray.sort((a, b) => a - b)); // [1, 3, 4, 9] (numerical order)
// //flat
// let nestedArray = [1, [2, 3], [4, [5, 6]]];
// console.log(nestedArray.flat(2)); // [1, 2, 3, 4, 5, 6]
// //flatMap
// let doubled = numbers.flatMap(num => [num, num * 2]);
// console.log(doubled); // [1, 2, 2, 4, 3, 6, 4, 8]

/*
- **Avoid using `splice()` in large arrays**: It's slow because it modifies the original array.
- **Prefer `map()`, `filter()`, and `reduce()` for immutability**.
- **Use `Set` to remove duplicates**:
 */
