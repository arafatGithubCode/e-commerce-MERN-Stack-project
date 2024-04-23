const { Schema, model, set } = require("mongoose");

const bcrypt = require("bcrypt");
const { defaultUserImage } = require("../secret");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name is required."],
      trim: true,
      maxLength: [31, "The length of name maximum 31 characters."],
      minLength: [3, "The length of name minimum 3 characters."],
    },
    email: {
      type: String,
      required: [true, "email is required."],
      trim: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
        },
        message: "Please enter a valid email address",
      },
    },
    password: {
      type: String,
      required: [true, "password is required."],
      trim: true,
      minLength: [6, "The length of password minimum 6 characters."],
      set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(10)),
    },
    image: {
      type: String,
      default: defaultUserImage,
    },
    address: {
      type: String,
      required: [true, "address is required."],
    },
    phone: {
      type: String,
      required: [true, "phone is required."],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = model("users", userSchema);

module.exports = User;
