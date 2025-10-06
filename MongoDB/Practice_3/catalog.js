const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/ecommerce_catalog")
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error(" Connection error:", err));

const variantSchema = new mongoose.Schema({
  color: { type: String, required: true },
  size: { type: String, required: true },
  stock: { type: Number, required: true, min: 0 }
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  category: { type: String, required: true, trim: true },
  variants: [variantSchema]
});

const Product = mongoose.model("Product", productSchema);

(async () => {
  try {
    await Product.deleteMany({});

    await Product.insertMany([
      {
        name: "T-Shirt",
        price: 19.99,
        category: "Clothing",
        variants: [
          { color: "Red", size: "M", stock: 50 },
          { color: "Blue", size: "L", stock: 30 }
        ]
      },
      {
        name: "Running Shoes",
        price: 89.99,
        category: "Footwear",
        variants: [
          { color: "Black", size: "9", stock: 20 },
          { color: "White", size: "10", stock: 15 }
        ]
      },
      {
        name: "Bluetooth Headphones",
        price: 129.99,
        category: "Electronics",
        variants: [
          { color: "Black", size: "Standard", stock: 25 },
          { color: "Blue", size: "Standard", stock: 10 }
        ]
      }
    ]);

    console.log("Sample products inserted!");

    // 📋 1. Retrieve all products
    const allProducts = await Product.find();
    console.log("\n All Products:");
    console.log(allProducts);

    // 2. Filter products by category
    const electronics = await Product.find({ category: "Electronics" });
    console.log("\n🔌 Electronics Category:");
    console.log(electronics);

    const variantProjection = await Product.find(
      {},
      { name: 1, "variants.color": 1, "variants.stock": 1, _id: 0 }
    );
    console.log("\n Variant Details (Color + Stock):");
    console.log(variantProjection);

    const redVariants = await Product.find({ "variants.color": "Red" });
    console.log("\n Products with Red variant:");
    console.log(redVariants);

    const updatedProduct = await Product.findOneAndUpdate(
      { name: "T-Shirt", "variants.color": "Blue" },
      { $inc: { "variants.$.stock": -5 } }, // Decrease stock by 5
      { new: true }
    );
    console.log("\n🆙 Updated Product after stock change:");
    console.log(updatedProduct);

  } catch (error) {
    console.error(" Error:", error);
  } finally {
    await mongoose.connection.close();
  }
})();
