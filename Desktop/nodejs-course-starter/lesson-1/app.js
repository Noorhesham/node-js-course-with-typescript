import express from "express";
import fs from "fs";
const app = express();
const data = fs.readFileSync("./data.json", "utf-8");
const dataObj = JSON.parse(data);
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
//middleware
/*runs before every request */
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use((req, res, next) => {
  console.log("Hello from the middleware 👋");

  req.requestTime = new Date().toISOString();
  next();
});

/*specify the route then based on that route execute the callback */
app.get("/fighters", (req, res) => {
  //   res.status(200).send("hello world");
  console.log(req.requestTime);
  res.status(200).json({ message: "hello world", data: { dataObj }, time: req.requestTime });
});
const server = app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
