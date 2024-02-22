const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
    try {
        const { name, password, email } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                errorMessage: "Bad request",
            });
        }

        const isExistingUser = await User.findOne({ email: email });
        if (isExistingUser) {
            return res
                .status(409)
                .json({ errorMessage: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const userData = new User({
            name,
            email,
            password: hashedPassword,
        });

        await userData.save();
        res.json({ message: "User registered successfully" });
    } catch (error) {
        next(error);
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                errorMessage: "Bad Request! Invalid credentials",
            });
        }

        const userDetails = await User.findOne({ email });

        if (!userDetails) {
            return res
                .status(401)
                .json({ errorMessage: "Invalid credentials" });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            userDetails.password
        );

        if (!passwordMatch) {
            return res
                .status(401)
                .json({ errorMessage: "Invalid credentials" });
        }

        const token = jwt.sign(
            { userId: userDetails._id },
            process.env.SECRET_KEY
        );

        res.json({
            message: "User logged in",
            name: userDetails.name,
            token: token,
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
