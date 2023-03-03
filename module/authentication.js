//============= authenticating usre here ==============//

const jwt = require("jsonwebtoken");
const { users } = require('./User_Module');

const authentication = async (req , res , next)=>{
    try {
        const token = req.cookies.jwt_user;
        const verifyUser = jwt.verify(token, process.env.SECRET_TOKEN_KEY)
        const user = await users.findOne({ _id : verifyUser._id})

        req.token = token;
        req.user = user;
        next()
    } catch (error) {
        res.status(201)
        console.log(error)
        // next()
    }

}



module.exports = authentication;

