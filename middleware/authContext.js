const jwt = require('jsonwebtoken')
const User = require('../models/userSchema')
const AuthContext = async (req, res, next) => {
    try {
        const token = req.cookies.jwtoken;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

        const rootUser = await User.findOne({ phone: verifyToken.phone, "authToken.token": token });

        if (!rootUser) {
            throw new Error('user Not found')
        }
        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;

        next();
    }
    catch (err) {
        res.status(401).send("unauthorized user")
        console.log(err)
    }
}

module.exports = AuthContext;