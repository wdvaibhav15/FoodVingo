
import jwt from "jsonwebtoken";

export const isAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        

        // ✅ FIX: Check capital 'UserId' first, fall back to lowercase 'userId'
        req.userId = decodedToken.UserId || decodedToken.userId;

        if (!req.userId) {
            return res.status(401).json({ message: "Unauthorized: User ID not found in token" });
        }

        next();
    } catch (error) {
        console.error("Error in isAuth middleware:", error);
        // Return 401 if JWT verification fails or token is expired
        return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
    }
};