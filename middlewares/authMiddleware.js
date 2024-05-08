const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const accessToken = req.cookies?.accessToken; // cookie patch
    const refreshToken = req.cookies?.refreshToken;

    if (!accessToken && !refreshToken) {
        console.log('No token provided');
        return res.status(401).redirect('/login');
    }
    try {
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
        console.log('Access token is valid:', decoded);
        req.user = decoded;
        next();
    } catch (error) {
        console.log('Access token is expired, trying to refresh it...');
        if(!refreshToken) return res.status(401).json({ error: 'Invalid token' });

        jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET_KEY, (err, decoded) => {
            if (err) return res.status(401).json({ error: 'Invalid token' });
            const newAccessToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
            res.header('Authorization', newAccessToken);
            console.log('New access token:', newAccessToken);
            console.log('User:', decoded);
            req.user = decoded;
            next();
        });
    }
};

module.exports = authMiddleware;
