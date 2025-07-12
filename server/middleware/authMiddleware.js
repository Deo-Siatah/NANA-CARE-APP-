const jwt = require("jsonwebtoken");

exports.protect = (req,res,next) => {
    const authHeader = req.headers.authorization;

    //check for token in headers
    if (!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({message: "Access denied. No token provided"});
    }

    const token = authHeader.split(" ")[1];

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next(); //add user data to request object
    } catch (error) {
        res.status(401).json({message: "Invalid or expired token."})
    }
};

//Admin-only access middleware 
exports.requireAdmin = (req,res,next) => {
    if (req.user.role !== "admin"){
        return res.status(403).json({message: "Access denied. Admins only"})
    }
    next();
};