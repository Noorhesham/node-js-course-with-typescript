// Import the promises API of the fs module
// This version provides promise-based functions for file operations
// import fs from "fs/promises";

import fs, { readFileSync } from "fs";
import http from "http"; // our first sever
// Difference between `import` and `require`:
// - `import` is ES6 module syntax and requires the project to use "type": "module" in package.json.
// - `require` is CommonJS syntax and is used in older Node.js projects.

console.log("hello world");

// ----------- 1. BLOCKING SYNCHRONOUS CODE -----------

// Reading a file synchronously (Blocking operation)
/*
const text = fs.readFileSync("./data.txt", "utf-8");
console.log(text);

// Writing to a file synchronously (Blocking operation)
const textWritten = `I love Spider-Man; it is my favorite superhero!`;
fs.writeFileSync("./data.txt", textWritten);

console.log(fs.readFileSync("./data.txt", "utf-8"));
console.log("File written successfully!");
*/

// ----------- 2. NON-BLOCKING ASYNCHRONOUS CODE -----------

// Example of Callback Hell:
/*
fs.readFile("./data.txt", "utf-8", (err, data) => {
  console.log(data);

  fs.readFile("./data2.txt", "utf-8", (err, data2) => {
    console.log(data2);

    fs.readFile(`./${data2}.txt`, "utf-8", (err, data3) => {
      if (err) console.error("Huge error 😡", err);
      console.log(data3);

      fs.writeFile("./lastFile.txt", `${data},${data2},${data3}`, (err) => {
        if (err) console.error("Huge error 😡", err);
        console.log("File written successfully!");
      });
    });
  });
});
*/

// ----------- ASYNC/AWAIT IMPLEMENTATION -----------

/*async function processFiles() {
  try {
    // Read the first file
    const data = await fs.readFile("./data.txt", "utf-8");
    console.log(data);

    // Read the second file
    const data2 = await fs.readFile("./data2.txt", "utf-8");
    console.log(data2);

    // Read the third file using content from the second file
    const data3 = await fs.readFile(`./${data2}.txt`, "utf-8");
    console.log(data3);

    // Write to the last file
    await fs.writeFile("./lastFile.txt", `${data},${data2},${data3}`);
    console.log("File written successfully!");
  } catch (err) {
    console.error("Huge error 😡", err); // Catch any errors during the operations
  }
}
 */

// Call the async function
// processFiles();

// console.log(`انا اتكتبت الاول بالرغم اني في السطر اللي بعد القراءة
//      لان العملية هنا غير متزامنة 😎`);

// ----------- Creating a Server -----------
//1.create a server
//reading data outside server is alternative
const data = readFileSync("./data.json", "utf-8");

const server = http.createServer(async (req, res) => {
  const pathName = req.url;
  console.log(pathName);
  if (pathName === "/api") {
    //this code will read the data everytime i enter the api which is not good for performace!
    // fs.readFile(`./data.json`, "utf-8", (err, data) => {
    //   console.log(data);
    //   res.writeHead(200, { "Content-Type": "application/json" });
    //   res.end(data);
    // });
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(data);
  } else if (pathName === "/meow") res.end(" iam the best cat");
  else if (pathName === "/") res.end("hello this is my first http server i am happy happy happy tentententententen");
  else {
    res.writeHead(404, {
      "Content-Type": "text/html",
      "my-own-header": "hello",
    });
    res.end("<h1>404 not found</h1>");
  }
});
// open the browser in http://localhost:3000
const PORT = 3001;
server.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
