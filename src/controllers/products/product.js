import { Product } from "../../models/index.js";  // models फोल्डर से इम्पोर्ट करें

export const getProductsByCategoryId = async (request, reply) => {
  const { categoryId } = request.params;

  try {
    // categoryId के हिसाब से प्रोडक्ट्स खोजो
    const products = await Product.find({ category: categoryId });

    // अगर products नहीं मिले तो खाली array भेजो
    if (!products || products.length === 0) {
      return reply.status(404).send({ message: "No products found for this category" });
    }

    return reply.send(products);
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return reply.status(500).send({ error: "Failed to fetch products by category" });
  }
};
