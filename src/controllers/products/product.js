import Product from "../../models/products.js"; // ✅ सही

export const getProductsByCategory = async (req, reply) => {
  const { categoryId } = req.params;
  try {
    const products = await Product.find({ category: categoryId })
      .seletect("-category")
      .exec();

    return reply.send(products);
  } catch (error) {
    return reply.status(500).send({ message: "Internal server error", error });
  }
};
