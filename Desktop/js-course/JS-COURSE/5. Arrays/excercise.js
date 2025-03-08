function removeDuplicates(arr) {
  return [...new Set(arr)];
}
console.log(removeDuplicates([1, 2, 2, 3, 4, 4, 5])); // [1,2,3,4,5]
function findLargest(arr) {
  return Math.max(...arr);
}
console.log(findLargest([3, 7, 2, 8, 10, 4])); // 10
function sumArray(arr) {
  return arr.reduce((acc, num) => acc + num, 0);
}
console.log(sumArray([1, 2, 3, 4, 5])); // 15
function reverseArray(arr) {
  let reversed = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    reversed.push(arr[i]);
  }
  return reversed;
}
console.log(reverseArray([1, 2, 3, 4])); // [4,3,2,1]
function getEvens(arr) {
  return arr.filter((num) => num % 2 === 0);
}
console.log(getEvens([1, 2, 3, 4, 5, 6])); // [2,4,6]
function findIndex(arr, val) {
  return arr.indexOf(val);
}
console.log(findIndex(["apple", "banana", "cherry"], "banana")); // 1
function flattenArray(arr) {
  return arr.flat(Infinity);
}
console.log(flattenArray([1, [2, 3], [[4], 5]])); // [1,2,3,4,5]
function containsValue(arr, val) {
  return arr.includes(val);
}
console.log(containsValue(["red", "blue", "green"], "blue")); // true
function sortAlphabetically(arr) {
  return arr.sort();
}
console.log(sortAlphabetically(["banana", "apple", "cherry"])); // ['apple', 'banana', 'cherry']
function mostFrequent(arr) {
  let freqMap = {};
  let maxFreq = 0;
  let mostCommon = null;

  arr.forEach((num) => {
    freqMap[num] = (freqMap[num] || 0) + 1;
    if (freqMap[num] > maxFreq) {
      maxFreq = freqMap[num];
      mostCommon = num;
    }
  });
  return mostCommon;
}
console.log(mostFrequent([1, 2, 3, 1, 2, 1, 4])); // 1
