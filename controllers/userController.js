const crypto = require('crypto');
const userService = require('../services/userService');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hash = crypto.createHash('sha256');
        hash.update(password);
        const hashedPassword = hash.digest('hex');
        const newUser = await userService.createUser(name, email, hashedPassword);
        res.status(200).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const hash = crypto.createHash('sha256');
        hash.update(password);
        const hashedPassword = hash.digest('hex');
        const user = await userService.checkUserLoginDetails(email, hashedPassword);
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }
        const accessToken = jwt.sign(
            { id: user.dataValues.id, name: user.dataValues.name },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: '1h',
                algorithm: 'HS256'
            });
        const refreshToken = jwt.sign(
            { id: user.dataValues.id, name: user.dataValues.name },
            process.env.JWT_REFRESH_SECRET_KEY,
            { expiresIn: '1d' });
        console.log('User logged in successfully');
        console.log('user:', user);
        console.log('Access token:', accessToken);
        res
            .status(200)
            .cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'strict' })
            .header('Authorization', accessToken)
            .json({ accessToken, refreshToken });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { register, login };
