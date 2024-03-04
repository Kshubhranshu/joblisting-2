const errorHandler = (error, req, res, next) => {
    console.log(`[ERROR]:: ${error}`);
    res.status(500).json({ errorMessage: "Internal server error!" });
};

module.exports = errorHandler;
