const express = require("express");
const router = express.Router();
const Job = require("../models/job");
const verifyToken = require("../middleware/authMiddleware");

router.post("/create", verifyToken, async (req, res, next) => {
    try {
        const a = 10;
        const {
            companyName,
            logoUrl,
            title,
            description,
            salary,
            location,
            duration,
            locationType,
        } = req.body;

        console.log(a());

        if (
            !companyName ||
            !logoUrl ||
            !title ||
            !description ||
            !salary ||
            !location ||
            !duration ||
            !locationType
        ) {
            return res.status(400).json({
                errorMessage: "Bad request",
            });
        }

        const jobDetails = new Job({
            companyName,
            logoUrl,
            title,
            description,
            salary,
            location,
            duration,
            locationType,
        });

        await jobDetails.save();
        res.json({ message: "Job created successfully" });
    } catch (error) {
        next(error);
    }
});

router.get("/details/:jobId", async (req, res, next) => {
    try {
        const jobId = req.params.jobId;

        if (!jobId) {
            return res.status(400).json({
                errorMessage: "Bad Request",
            });
        }

        const jobDetails = await Job.findById(jobId);
        res.json({ data: jobDetails });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
