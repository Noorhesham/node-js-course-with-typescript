// console.log(x); // undefined (Hoisted)
// var x = 10;
// console.log(x); // 10
// // var is hoisted => no error but undefined (it does like this) var x=undefined then redecalre it

// //🔹 JavaScript internally does this:
// var x; // Hoisted to the top
// console.log(x); // undefined
// x = 10;
// console.log(x); // 10
// //ده الي بيحصل خلف الكواليس

// var x = 5;
// var x = 10; // ✅ No error Redeclaration allowed
// console.log(x); // 10

//when a is defiend with var it is scoped to the entire function
// function example() {
//   //scope
//   if (2 < 3) {
//     var a = 20; // Scoped to the entire function
//   }
//   // مع اني معرفها جوه if فقدرت اوصلها برضو
//   // لان اي تعريف ليها بنقدر نوصله جوه الفانكشن كلها مش البلوك
//   console.log(a); // 20 ✅ (Accessible outside the block)
// }
// console.log(a);
// example();
// if (true) {
//   var y = 10;
//   console.log(y); // 10 ✅ Inside the block
// }
// console.log(y); // ❌ Error: y is not defined (outside block)

//The Temporal Dead Zone (TDZ) is the time between when a
// // variable is hoisted (recognized by JavaScript) and when it is initialized with a value.

// block scope  2.hoisting and TDZ 3.reassign redeclare
let counter = 0;

// const person = {
//   name: "Noor",
//   age: 55,
// };
// person.name = "mohamed";
// console.log(person);

// const numbers = [1, 2, 3, 5, 6];
// numbers.push(4);
// console.log(numbers);
// const a ; // Error
// let b;
// console.log(a, b);
