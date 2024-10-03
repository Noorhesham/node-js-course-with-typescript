import mongoose, { Schema } from "mongoose";
import { localizedStringSchema } from "./Course";
const categorySchema = new Schema({
  name: localizedStringSchema,
});

const Category = mongoose.models.Category || mongoose.model("Category", categorySchema);
export default Category;
