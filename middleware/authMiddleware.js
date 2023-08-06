const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('./../utils/config');

module.exports = function () {
    return async function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return res.status(401).json("Не авторизован")
            }
            const decoded = jwt.verify(token, SECRET_KEY)
            req.user = decoded
            next()
        } catch (e) {
            res.status(401).json("Не авторизован")
        }
    }
}