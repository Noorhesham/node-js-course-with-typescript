// const add = function (num1, num2) {
//   return num1 + num2;
// };

// const addArrow = (num1, num2) => (num1 + num2) / 2;
// console.log(addArrow(1, 2), add(1, 3)   );

//higher order functions
// const applyOperation = (a, b, operation) => operation(a, b);

// const multiply = (x, y) => x * y;
// const add = (x, y) => x + y;
// const subtract = (x, y) => Math.abs(x - y);
// const divide = (x, y) => x / y;
// const power = (x, y) => x ** y;

// console.log(applyOperation(4, 5, multiply)); // Output: 20
// console.log(applyOperation(15, 3, divide)); // Output: 15
// console.log(applyOperation(3, 3, power)); // Output: 15

///closures
// function counter() {
//   let count = 0;
//   return function () {
//     count++;
//     return count;
//   };
// }

// const increment = counter();

// console.log(increment()); // Output: 1
// console.log(increment()); // Output: 2

// function createCounter() {
//   let count = 0;
//   return {
//     increment: function () {
//       count++;
//       return count;
//     },
//     decrement: function () {
//       count--;
//       return count;
//     },
//   };
// }
// const counter = createCounter();
// console.log(counter.increment()); // Output: 1
// console.log(counter.decrement()); // Output: 0

// here  we are dealing with objects
// const counterObj = {
//   count: 0,
//   increment: function () {
//     this.count++;
//   },
//   decrement: function () {
//     this.count--;
//   },
// };
// console.log(counterObj);
// let i = 0;
// while (i < 10) {
//   counterObj.increment();
//   i++;
// }
// console.log(counterObj);

// function makeAdder(x) {
//   return function (y) {
//     return x + y;
//   };
// }

// const add5 = makeAdder(5);
// console.log(add5(2)); // Output: 7

// const noor = {
//   name: "mohamaed ",
//   hello: function () {
//     console.log(`hello i am ${this.name} and my age is ${this.age}`);
//   },
//   age: 50,
// };
// noor.hello();

// Immediately Invoked Function Expressions (IIFE)

// (function () {
//   console.log("This function runs immediately!");
// })();
