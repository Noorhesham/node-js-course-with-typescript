// //Write a program that prints numbers from 1 to 10 using a for loop.
// for (let i = 1; i <= 10; i++) {
//   console.log(`Number is ${i}`);
// }
//2️⃣ Problem: Print Even Numbers from 2 to 20 (Easy)
// for (let i = 1; i <= 20; i++) {
//   if (i % 2 === 0) console.log(`Number is ${i}`);
// }
//3️⃣ Problem: Reverse Loop (Medium)
// for (let i = 10; i >= 1; i--) {
//   console.log(i);
// }
//4️⃣ Problem: Sum of First 10 Natural Numbers (Medium)
// let Sum=0;
// let i = 1;
// while (i <= 10) {
//   Sum += i;
//   i++;
// }
// console.log(Sum);
//5️⃣ Problem: Multiplication Table of a Number (Advanced)

// let num = 5;
// const max = 10;
// let j = 0;
// do {
//   console.log(`${num}* ${j}=${num * j}`);
//   j++;
// } while (j <= max);

//nested loop
// 0 [] 1[] 2 3 4 5 6 7 8 9
//
let stringPyramid = "";
// 1 2 3 4 5
// 1 2 3 4 5
const N = 10;
for (let i = 1; i <= N; i++) {
  const spaces = N - i;
  stringPyramid += " ".repeat(spaces);
  for (let j = 1; j <= i; j++) {
    stringPyramid += "* ";
  }
  stringPyramid += "\n";
}
/*

    *    
   * *   
  * * *  
 * * * *  
* * * * *  


5
   *   
  ****
 *******

*/

//2d array
// let matrix = [
//   [1, 2, 3],
//   [4, 5, 6],
//   [7, 8, 9],
// ];
// for (let index = 0; index < matrix.length; index++) {
//   const innerMatrix = matrix[index];
//   for (let j = 0; j < innerMatrix.length; j++) {
//     console.log(`Element at [${index}][${j}] = ${matrix[index][j]}`);
//   }
// }
