import mongoose, { models } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    password: {
      type: String,
      require: true,
    },
    dept_id: {
      type: String,
      require: true,
    },
    dept_code: {
      type: String,
      require: true,
    },
    department: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      require: true,
      enum: ["admin-1", "admin-2", "user"],
    },
  },
  { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema);

export default User;
