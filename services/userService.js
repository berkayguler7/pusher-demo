const User = require('../models/userModel');

const userService = {
    async createUser(name, email, password) {
        return await User.create({ name, email, password });
    },
    async getUserById(id) {
        return await User.findByPk(id);
    },
    async checkUserLoginDetails(email, password) {
        return await User.findOne({ where: { email, password } });
    },
};

module.exports = userService;
