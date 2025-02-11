import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userReferralCode: { type: String, required: true, unique: true }, // Ensure uniqueness
  referredTo: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }], // Store references
  referredBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" }, // Store reference to referrer
});

const User = mongoose.model("user", UserSchema);

export default User;
