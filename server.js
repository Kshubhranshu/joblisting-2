require("dotenv").config();
const express = require("express");
const { default: mongoose } = require("mongoose");
const auth = require("./routes/auth");
const job = require("./routes/job");
const errorHandler = require("./middleware/errorHandler");

const app = express();
app.use(express.json());

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Db connected"))
    .catch((error) => console.log(error));

app.use("/api/v1/auth", auth);
app.use("/api/v1/job", job);

app.use("/*", (req, res) => {
    res.status(404).json({ errorMessage: "Route not found" });
});

app.use(errorHandler);

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 3000;

app.get("/health", (req, res) => {
    res.json({
        service: "Job Listing Backend API Server",
        status: "true",
        time: new Date(),
    });
});

app.listen(PORT, () => {
    console.log(`Backend server running at http://${HOST}:${PORT}`);
});
