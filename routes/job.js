const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const jobController = require("../controller/job");

router.post("/create", verifyToken, jobController.createJobPost);
router.get("/details/:jobId", jobController.getJobDetailsById);
router.put("/edit/:jobId", verifyToken, jobController.updateJobDetailsById);
router.get("/all-jobs", jobController.getAllJobs);

module.exports = router;
