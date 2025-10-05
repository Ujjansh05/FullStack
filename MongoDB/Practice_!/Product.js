const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters long"]
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price cannot be negative"]
    },
    category: {
      type: String,
      required: [true, "Product category is required"],
      enum: ["Electronics", "Clothing", "Food", "Home", "Other"],
      default: "Other"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
