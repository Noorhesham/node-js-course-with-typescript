import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError";

/**
 * Handles MongoDB CastErrors for invalid IDs or paths.
 * @param err - The MongoDB CastError object
 */
const handleCastErrorDB = (err: any): AppError => {
  const message = `Invalid  ${err.path}: ${err.value}.`;
  //create new instance of the AppError class (object) and passing the message and status code
  return new AppError(message, 400);
};

/**
 * Handles duplicate fields in MongoDB.
 * @param err - The MongoDB Duplicate Key Error object
 */
const handleDuplicateFieldsDB = (err: any): AppError => {
  const value = Object.values(err.keyValue).join(", ");
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

/**
 * Handles validation errors from Mongoose.
 * @param err - The Mongoose ValidationError object
 */
const handleValidationErrorDB = (err: any): AppError => {
  const errors = Object.values(err.errors).map((el: any) => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

/**
 * Handles errors during development.
 * @param err - The error object
 * @param res - The response object
 */
const sendErrorDev = (err: AppError, res: Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

/**
 * Handles errors during production.
 * @param err - The error object
 * @param res - The response object
 */
const sendErrorProd = (err: AppError, res: Response) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error("ERROR 💥", err);
    res.status(500).json({
      status: "error",
      message: "Something went wrong!",
    });
  }
};

const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  /*sets the statusCode and status properties of the error object to default values if they're not already set. 
  This ensures that every error has a status code and a status message. */
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  console.log(err);
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    if (err.name === "CastError") error = handleCastErrorDB(err);
    if (err.code === 11000) error = handleDuplicateFieldsDB(err);
    if (err._message === "Validation failed") error = handleValidationErrorDB(err);

    sendErrorProd(error as AppError, res);
  }
};

export default globalErrorHandler;
