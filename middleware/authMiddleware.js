const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    try {
        const reqHeader = req.header("Authorization").split(" ");
        const token = reqHeader[1];

        if (!token) {
            return res.status(401).json({ message: "Unauthorized access" });
        }

        const decode = jwt.verify(token, process.env.SECRET_KEY);
        req.userId = decode.userId;

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = verifyToken;
