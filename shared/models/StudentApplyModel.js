const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const applySchema = new Schema({
  studentId:String,
  projectId: String,
  name: String,
  studentNumber: String,
  email: String,
  description: String,
  resume: String,
  isApplied: Boolean,
});

const ApplyForm = mongoose.model("studentapplies", applySchema);

module.exports = ApplyForm;
