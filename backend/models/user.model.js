import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [/.+\@.+\..+/, 'Please enter a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    userprofile: {
      type: String,
      default: "https://imgs.search.brave.com/fF4DH9KVHeM_hqgjNV8wlH6pitxTOcZC1nGUY0uVMTw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA5LzE1LzQ2Lzc0/LzM2MF9GXzkxNTQ2/NzQ2NF9TcEY4dUxL/NGJ3c3ZxMTJ2V01u/NjU4QnVyaFBsTTYx/Wi5qcGc",
    }
  },
  {
    timestamps: true,
  }
);

// Adding new comment now for user database
const User = mongoose.model('User', userSchema);
export default User;
