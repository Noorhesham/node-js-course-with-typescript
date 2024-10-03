import mongoose, { Schema } from "mongoose";
const userSchema = new Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, select: false, required: true },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
