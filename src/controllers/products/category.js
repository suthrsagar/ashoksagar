export const createCategory = async (req, reply) => {
  try {
    const categories = "";
    return reply.send(categories);
  } catch (error) {
    return reply.status(500).send({ message: "Internal server error", error });
  }
};
