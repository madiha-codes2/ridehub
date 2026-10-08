const adminAuth = (req, res, next) => {

    if (!req.session.adminId) {

        return res.status(401).json({
            success: false,
            message: "Unauthorized. Please login first."
        });

    }

    next();
};


module.exports = adminAuth;