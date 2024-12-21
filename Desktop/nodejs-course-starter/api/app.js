import express from "express";
import dotenv from "dotenv";
import { productRoute } from "./routes/productsRoute.js";
import { fightersRoute } from "./routes/fightersRoute.js";
dotenv.config();
const app = express();
//Instead of defining all routes in a single file, you can organize routes into smaller modules using express.Router.
console.log(process.env.NODE_ENV);
// 1) MIDDLEWARES
/*runs before every request */
app.use(express.json());
app.use((req, res, next) => {
  console.log("Hello from the middleware 👋");

  req.requestTime = new Date().toISOString();
  next();
});

// example on routes
/*specify the route then based on that route execute the callback */
// app.get("/fighters", (req, res) => {
//   //   res.status(200).send("hello world");
//   console.log(req.requestTime);
//   res.status(200).json({ message: "hello world", data: { dataObj }, time: req.requestTime });
// });

app.use("/products", productRoute);
app.use((req, res, next) => {
  console.log("i am here");
  next();
});
app.use("/fighters", fightersRoute);
// app.use("/products", productRoute);
// app.use("/products", productRoute);

export default app;
