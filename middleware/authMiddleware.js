const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    try {
        const token = req.header("Authorization").split(" ");

        if (!token && token.length < 2) {
            return res.status(401).json({ message: "Unauthorized access" });
        }

        const decode = jwt.verify(token[1], process.env.SECRET_KEY);
        const isUserValid = User.findById(decode.userId);

        if (!isUserValid) {
            return res.status(401).json({ message: "Unauthorized access" });
        }

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = verifyToken;
