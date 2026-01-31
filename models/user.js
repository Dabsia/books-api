import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  password: String,
  email: String,
  age: Number,
  isActive: Boolean,
  tags: [String],
  createdAt: { type: Date, default: Date.now() },
});

const User = mongoose.model("User", userSchema);
export default User;
