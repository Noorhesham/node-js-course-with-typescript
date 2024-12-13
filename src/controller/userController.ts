
import { User } from "../models/userModel";
import { createEntitiy, deleteEntitiy, getAllEntitiy, getEntitiy, updateEntitiy } from "./factoryController";
export const getAllUsers = getAllEntitiy(User);
export const getUser = getEntitiy(User);
export const createUser = createEntitiy(User);
export const updateUser = updateEntitiy(User);
export const deleteUser = deleteEntitiy(User);
// export const getAllUsers = catchError(async (req: Request, res: Response, next: NextFunction) => {
//   const userFeatures = new APIFeatures(User.find(), req.query).paginate().filter().sort().limitFields();
//   const allusers = await userFeatures.query;
//   res.status(200).json({ data: { allusers } });
// });

// export const getuser = catchError(async (req: Request, res: Response, next: NextFunction) => {
//   const { id } = req.params;
//   const user = await User.findById(id);
//   res.status(200).json({ data: { user } });
// });

// export const createUser = catchError(async (req: Request, res: Response, next: NextFunction) => {
//   const userData = req.body;
//   const newUser = await User.create(req.body);
//   res.status(200).json({ message: "user created successfuuly", data: { newUser } });
// });
// export const updateUser = catchError(async (req: Request, res: Response, next: NextFunction) => {
//   const data = req.body;
//   const { id } = req.params;
//   const user = await User.findByIdAndUpdate(id, data, { new: true });
//   res.status(200).json({ data: { user } });
// });
// export const deleteUser = catchError(async (req: Request, res: Response, next: NextFunction) => {
//   const { id } = req.params;
//   const user = await User.findByIdAndDelete(id);
//   res.status(200).json({ message: "succsessfully deleted" });
// });
