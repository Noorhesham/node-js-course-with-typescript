console.log(String(123)); // "123"
console.log((123).toString()); // "123"

console.log(Number("42")); // 42
console.log(Number("42px")); // NaN
console.log(parseInt("42px")); // 42
console.log(parseFloat("3.14px")); // 3.14

console.log(Boolean(1)); // true
console.log(Boolean(0)); // false
console.log(Boolean("Hello")); // true
console.log(Boolean("")); // false

console.log(5 + "5"); // "55"
console.log(5 - "3"); // 2 (String converted to Number)
console.log(5 * "2"); // 10
console.log(5 + null); // 5 (null is 0)
console.log(5 + undefined); // NaN

console.log(5 == "5"); // true (Type coercion)
console.log(5 === "5"); // false (Different types)
console.log(null == undefined); // true
console.log(null === undefined); // false
