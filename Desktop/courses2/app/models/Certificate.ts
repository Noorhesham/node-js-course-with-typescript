import mongoose, { Schema } from "mongoose";
import { localizedStringSchema } from "./Course";

// Certificate Schema
const certificateSchema = new Schema({
  person: localizedStringSchema, // Name or ID of the person
  course: { type: Schema.Types.ObjectId, ref: "Course", required: true }, // Reference to the course
  code: { type: String, required: true }, // Certificate code
});

// Pre-save hook to populate course information
certificateSchema.pre("find", function () {
  this.populate("course");
});

const Certificate = mongoose.models.Certificate || mongoose.model("Certificate", certificateSchema);
export default Certificate;
