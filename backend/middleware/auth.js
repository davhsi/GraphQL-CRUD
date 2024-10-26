const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) return res.status(401).send('Access Denied');
    
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; // Add user info to request
        next();
    } catch (error) {
        res.status(400).send('Invalid Token');
    }
};

module.exports = authMiddleware;
