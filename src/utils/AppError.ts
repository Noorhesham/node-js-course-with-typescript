//inherits all the properties and methods of Error
class AppError extends Error {
  public statusCode: number;
  public status: string;
  public isOperational: boolean;
  //The constructor is a special method that is called when an instance of the class is created

  constructor(message: string, statusCode: number) {
    /*The super keyword calls the constructor of the parent class (Error) and passes the message parameter to it as 
      The super keyword is used to access the parent class's methods and properties.*/
    super(message);
    // this keyword refers to the current instance of the class (the object properties )
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    /*static method of the Error class
       The Error.captureStackTrace method is used to capture the stack trace of the error object.
       stack trace: is a record of the sequence of function calls that led to the error. 
       It includes information about the function, file, and line number where each function was called.
       captureStackTrace method 
       target: The error object to which the stack trace should be added.
  constructorOpt: The constructor function of the error object.
  
       */
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
