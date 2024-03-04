const Job = require("../models/job");

const createJobPost = async (req, res, next) => {
    try {
        const {
            companyName,
            logoUrl,
            title,
            description,
            salary,
            location,
            duration,
            locationType,
            skills,
        } = req.body;

        if (
            !companyName ||
            !logoUrl ||
            !title ||
            !description ||
            !salary ||
            !location ||
            !duration ||
            !locationType ||
            !skills
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
            skills,
        });

        await jobDetails.save();
        res.json({ message: "Job created successfully" });
    } catch (error) {
        next(error);
    }
};

const getJobDetailsById = async (req, res, next) => {
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
};

const updateJobDetailsById = async (req, res, next) => {
    try {
        const jobId = req.params.jobId;

        if (!jobId) {
            return res.status(400).json({
                errorMessage: "Bad Request",
            });
        }

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

        await Job.updateOne(
            { _id: jobId },
            {
                $set: {
                    companyName,
                    logoUrl,
                    title,
                    description,
                    salary,
                    location,
                    duration,
                    locationType,
                },
            }
        );

        res.json({ message: "Job details updated successfully" });
    } catch (error) {
        next(error);
    }
};

const getAllJobs = async (req, res, next) => {
    try {
        const title = req.query.title || "";
        const skills = req.query.skills;

        let filter = {};
        let formattedSkills;
        if (skills) {
            formattedSkills = skills.split(",");

            if (formattedSkills) {
                filter = { skills: { $in: [...filterSkills] } };
            }
        }

        const jobList = await Job.find(
            {
                title: { $regex: title, $options: "i" },
                ...filter,
            },
            { title: 1, salary: 1, logoUrl: 1, location: 1, skills: 1 }
        );

        res.json({ data: jobList });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createJobPost,
    updateJobDetailsById,
    getJobDetailsById,
    getAllJobs,
};
