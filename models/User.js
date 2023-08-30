const { Schema, model } = require('mongoose');

const User = new Schema({
    name: { type: String },
    email: { type: String, unique: true, },
    password: { type: String },
    wishList: { type: Array },
    basket: { type: Object },
    orders: { type: Array },
    date: { type: Date, default: Date.now() },
    role: { type: String, default: "USER" },
})

module.exports = model('Users', User);
