import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import Category from "./src/models/category.js";
import Product from "./src/models/products.js";  // Product model
import { categories, products } from "./seedData.js";

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    // Pehle purani categories aur products delete karo
    await Product.deleteMany({});
    await Category.deleteMany({});

    // Categories insert karo
    const categoryDocs = await Category.insertMany(categories);
    console.log("Categories seeded");

    // Category name se id map banao, taaki products me category reference sahi mile
    const categoryMap = categoryDocs.reduce((map, cat) => {
      map[cat.name] = cat._id;
      return map;
    }, {});

    // Products me category field ko ObjectId assign karo
    const productsWithCategoryId = products.map(prod => ({
      ...prod,
      category: categoryMap[prod.category],
    }));

    // Products insert karo (mongoose automatically _id dega)
    await Product.insertMany(productsWithCategoryId);
    console.log("Products seeded");

  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await mongoose.disconnect();
    console.log("MongoDB connection closed");
  }
}

seedDatabase();
