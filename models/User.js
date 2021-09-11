import mongoose from "mongoose";
const { Schema } = mongoose;
const crypto = require("crypto");
import { v4 as uuidv4 } from "uuid";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 50,
      trim: true,
    },

    phoneNumber: {
      type: Number,
      required: true,
      minLength: 10,
      maxlength: 10,
      uniqure: true,
    },

    email: {
      type: String,
      required: true,
      uniqure: true,
    },

    countryCode: {
      type: Number,
      required: true,
      minLength: 1,
      maxlength: 3,
    },

    encryPassword: {
      type: String,
      required: true,
    },

    salt: {
      type: String,
    },

    role: {
      type: Number,
      default: 0,
    },

    purchases: {
      type: Array,
      default: [],
    },
  },

  { timestamps: true }
);

userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv4();
    this.encryPassword = this.securePassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.methods = {
  authenticate: function (plainpassword) {
    return this.encryptPassword(plainpassword) === this.securePassword;
  },

  // Function to encrypt the plain Password

  encryptPassword: function (plainpassword) {
    if (!plainpassword) return "";

    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainpassword)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
};

module.exports = mongoose.model("User", userSchema);
