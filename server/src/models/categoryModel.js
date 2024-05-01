const { Schema, model } = require("mongoose");

const categorySchema = new Schema(
  {
    name: {
      type: String,
      unique: [true, "category name should be unique."],
      required: [true, "category name is required."],
      trim: true,
      minLength: [3, "The length of category name minimum 3 characters."],
    },
    slug: {
      type: String,
      required: [true, "slug is required."],
      unique: true,
      lowercase: true,
    },
  },
  { timestamps: true }
);

const Category = model("category", categorySchema);

module.exports = Category;
