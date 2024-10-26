const User = require('../models/User');

const UserService = {
    async getUserById(id) {
        return await User.getUserById(id);
    },
    async createUser(data) {
        return await User.createUser(data);
    },
    async getUserByEmail(email) {
        return await User.getUserByEmail(email);
    },
    async verifyPassword(password, hashedPassword) {
        return await User.verifyPassword(password, hashedPassword);
    },
};

module.exports = UserService;
