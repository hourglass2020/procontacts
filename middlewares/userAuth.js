const jwt = require("jsonwebtoken");

const {createError} = require("../utils/errorParser");

exports.userAuthenticated = (req, res, next) => {
    const authHeader = req.get("Authorization");

    try {
        if (!authHeader) {
            throw createError("You do not have sufficient permissions.", 401);
        }

        const token = authHeader.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        if (!decodedToken) {
            throw createError("You do not have sufficient permissions", 401);
        }

        const user = decodedToken.user ?? decodedToken;

        req.userId = user.userId;
        next();

    } catch (err) {
        next(err);
    }
}