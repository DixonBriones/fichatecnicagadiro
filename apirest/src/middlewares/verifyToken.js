const { JWT_SECRET } = require("../config");
const jwt = require("jsonwebtoken");

function verifyToken(req,res,next){
    const token= req.headers['x-access-token'];
    if(!token){
        return res.status(401).json({
            auth:false,
            msg:'No hay token'
        });
    }
    const decoded = jwt.verify(token, JWT_SECRET)
    req.userId=decoded.id;
    next();
}

module.exports = {verifyToken};