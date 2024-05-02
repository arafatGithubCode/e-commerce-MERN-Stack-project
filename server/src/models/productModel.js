const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    name: {
      type: String,
      unique: [true, "product name should be unique."],
      required: [true, "product name is required."],
      trim: true,
      minLength: [3, "The length of product name minimum 3 characters."],
      maxLength: [50, "The length of product name maximum 50 characters."],
    },
    slug: {
      type: String,
      required: [true, "product slug is required."],
      unique: [true, "product slug should be unique."],
      lowercase: true,
    },
    description: {
      type: String,
      trim: true,
      required: [true, "product description is required."],
      minLength: [3, "The length of product description minimum 3 characters."],
      maxLength: [
        500,
        "The length of product description maximum 500 characters.",
      ],
    },
    price: {
      type: Number,
      trim: true,
      required: [true, "product price is required."],
      validate: {
        validator: (v) => v > 0,
        message: (props) =>
          `${props.value} is not a valid price! Price must be greater then 0.`,
      },
    },
    quantity: {
      type: Number,
      trim: true,
      required: [true, "product quantity is required."],
      validate: {
        validator: (v) => v > 0,
        message: (props) =>
          `${props.value} is not a valid quantity! Quantity must be greater then 0.`,
      },
    },
    sold: {
      type: Number,
      trim: true,
      default: 0,
      required: [true, "product sold quantity is required."],
    },
    shipping: {
      type: Number,
      default: 0, //shipping free o or paid something amount
    },
    image: {
      type: String,
      required: [true, "Product image is required."],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);

const Product = model("product", productSchema);

module.exports = Product;
