import mongoose, { Schema } from "mongoose";
import { localizedStringSchema } from "./Course";

const imageSchema = new Schema({
  secure_url: { type: String, required: true },
  public_id: { type: String, required: true },
});

const commentSchema = new Schema({
  name: localizedStringSchema,
  description: localizedStringSchema,
  photo: imageSchema,
  courseId: { type: Schema.Types.ObjectId, ref: "Course" },
});
const Comment = mongoose.models.Comment || mongoose.model("Comment", commentSchema);
export default Comment;
