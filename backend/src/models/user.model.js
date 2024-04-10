const mongoose = require("mongoose");
const { toHash } = require("../utils/password");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: false,
  },
  password: {
    type: String,
    required: true,
  },
  blogs: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Blog",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
