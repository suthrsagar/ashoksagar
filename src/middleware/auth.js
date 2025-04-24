import jwt from "jsonwebtoken"; 








export const verifyToken = async (req, reply) => {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return reply.status(401).send({
                message: "Unauthorized",
            })
        }

        const token = authHeader.split(" ")[1];
        const decoded = await req.jwtVerify(token , process.env.ACCESS_TOKEN_SECRET) ;
        req.user = decoded; 
        return true;





    } catch (error) {
        return reply.status(403).send({
            message: "Invalid token",
        })
    }
}