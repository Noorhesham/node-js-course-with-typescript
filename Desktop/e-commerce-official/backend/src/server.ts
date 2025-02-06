import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app";
dotenv.config();

const DB_URI = process.env.DATABASE_URI || "";
mongoose
  .connect(DB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));
const port = process.env.PORT || 3000;
const server = app.listen(port);
// async function triggerUnhandledRejection() {
//   try {
//     throw new Error("This is an unhandled rejection using async/await!");
//   } catch (error) {
//     console.log(error);
//   }
// }

// triggerUnhandledRejection();
// No try-catch or `.catch()` to handle the rejection, triggering the event.

/*
The process object in Node.js is a global object that provides information about and control over the current Node.js process.
The .on() method is used to attach a listener to a specific event emitted by the process. 
this case, the event is "unhandledRejection", and the listener is a function that will handle the event.
 */

process.on("unhandledRejection", (err: any) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
