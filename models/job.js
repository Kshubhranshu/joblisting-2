const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
    {
        companyName: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        logoUrl: {
            type: String,
            required: true,
        },
        salary: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        duration: {
            type: String,
            required: true,
        },
        locationType: {
            type: String,
            required: true,
        },
    },
    { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

module.exports = mongoose.model("Job", jobSchema);

/**
company name
logo url
job positionn || title
montly salary
job type // Fulltime Partime
remote office
location
job description
about company
skills required // come back to this later
additional informations
duration
 */
