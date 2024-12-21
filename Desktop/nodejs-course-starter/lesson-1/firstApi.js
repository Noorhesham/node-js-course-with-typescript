import http from "http";
import fs from "fs";
import url from "url";

const createHTMLTemplate = (character) => {
  return `<a href="/?${character.name}" class="card">
              <img src="${character.image}" alt="${character.name}">
              <h2>${character.name}</h2>
              <p><strong>Power Level:</strong> ${character.abilities.map((ability) => `<span>${ability}</span>`)}</p>
              <p>${character.description}</p>
            </a>`;
};
const htmlFile = fs.readFileSync("./public/index.html", "utf-8");
const data = fs.readFileSync("./data.json", "utf-8");
const dataObj = JSON.parse(data);
// console.log(htmlFile);
const server = http.createServer((req, res) => {
  const pathname = req.url;
  if (pathname === "/script.js") {
    fs.readFile("./public/script.js", (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("File not found");
      } else {
        res.writeHead(200, { "Content-Type": "application/javascript" });
        res.end(data);
      }
    });
    return;
  }
  const { query } = url.parse(pathname);
  console.log(query);
  const isSingleCharacter = query && dataObj.find((character) => character.name.toLowerCase() === query.toLowerCase());
  const HTMLContent = isSingleCharacter
    ? createHTMLTemplate(isSingleCharacter)
    : dataObj
        .map((character) => {
          return createHTMLTemplate(character);
        })
        .join("");
  const newHTML = htmlFile.replace(
    '<div id="cards-container"></div>',
    `<div id="cards-container">${HTMLContent}</div>`
  );
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(newHTML);
});
server.listen(3000, () => {
  console.log("listening on port 3000");
});
