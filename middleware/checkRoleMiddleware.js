const { SECRET_KEY } = require('./../utils/config');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = function (role) {
    return async function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1];
            if (!token) {
                return res.status(401).json("Не авторизован")
            }

            const decoded = jwt.verify(token, SECRET_KEY)
            const object = await User.findById(decoded.id)

            if (object.role !== role) {
                return res.status(403).json("Нет доступа")
            }
            req.user = decoded;
            next()
        } catch (e) {
            res.status(401).json("Не авторизован")
        }
    };
}
